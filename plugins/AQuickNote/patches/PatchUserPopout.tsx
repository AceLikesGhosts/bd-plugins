import { User } from '@lib/stores/UserStore';
import { logger } from '..';
import config from '../config.json';
import { getNoteString } from '../utils';

// USER_NOTE_LOADED
// getNote (NoteStore)
// updateNote
// BdApi.Patcher.before('test', BdApi.Webpack.getModule((_,__,id) => id == 502762).Z, 'render', console.log)
// BdApi.Webpack.getBySource('Overlay:', 'profileThemeStyle', 'profileThemeClassName')

const UpdateNote = BdApi.Webpack.getByKeys('updateNote') as {
    updateNote: (userId: string, note: string) => Promise<unknown>;
};
const NoteStore = BdApi.Webpack.getByKeys('getNote') as {
    getNote: (userId: string) => {
        loading: boolean;
        note: undefined | string;
    };
};
const UserPopout = (BdApi.Webpack.getBySource('Overlay:', 'profileThemeStyle', 'profileThemeClassName') as {
    Z: {
        render: (props: {
            children: JSX.Element[];
            // displayProfile: GuildMember
            profileType: 'FULL_SIZE' | 'BITE_SIZE' | 'PANEL';
            user: User;
        }) => JSX.Element;
    };
}).Z;

const activelyUpdatingMap = new Map<string, boolean>();

function compareAndUpdateNote(userId: string) {
    logger.log('compareAndUpdateNote called');

    if(activelyUpdatingMap.get(userId)) {
        logger.error('currently updating this user\'s notes');
        return;
    }

    const note = NoteStore.getNote(userId);
    if(note.loading) {
        logger.error('note was still loading', note, userId);
        return;
    }

    if(note.note !== undefined) {
        logger.log('DEBUG - user already had a note');
        return;
    }

    activelyUpdatingMap.set(userId, true);
    console.log('updating note');
    UpdateNote.updateNote(
        userId,
        getNoteString()
    ).finally(() => activelyUpdatingMap.delete(userId))
}

export const PatchUserPopout = () => {
    BdApi.Patcher.before(config.name, UserPopout, 'render', (_, args) => {
        if(!args[0] || typeof args[0] !== 'object') {
            logger.log('render called and args wasnt array', args);
            return;
        }

        if(args[0].profileType !== 'FULL_SIZE') {
            logger.log('profile type was not FULL_SIZE', args);
        }

        if(!args[0].user || !args[0].user.id) {
            BdApi.UI.showToast('AQuickNote - Failed to locate user, please report.', { type: 'danger' });
            logger.error('failed to locate user?', args, args[0].user);
            return;
        }

        logger.log('called debounce');
        compareAndUpdateNote(args[0].user.id);
    });
};