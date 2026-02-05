import ChannelStore from '@lib/stores/ChannelStore';
import GuildMemberStore from '@lib/stores/GuildMemberStore';
import UserStore from '@lib/stores/UserStore';
import type { UserVoiceState } from '@lib/stores/VoiceStateStore';
import VoiceStateStore from '@lib/stores/VoiceStateStore';
import DadscordAutoBans, { DADSCORD_GUILD_ID, logger, NotificationEvents, ownsVoiceChat } from '..';
import { claimVoiceChannel } from '../messageWrapper';
import { getVoiceController } from '../voiceController';

export function onVoiceStateUpdate(event: {
    type: 'VOICE_STATE_UPDATES';
    voiceStates: UserVoiceState[];
}) {
    if(event.type !== 'VOICE_STATE_UPDATES') return;

    for(const voiceState of event.voiceStates) {
        handleVoiceStateUpdate(voiceState);
    }
}

function handleVoiceStateUpdate(vs: UserVoiceState) {
    const ourId = UserStore.getCurrentUser().id;
    if(ourId === vs.userId) return;

    // left VC, check if we can autoclaim
    if(vs.channelId === null) {
        // we want to attempt to autoclaim
        if(!DadscordAutoBans.settings.autoClaimVoiceChat) return;

        const oldChannel = ChannelStore.getChannel(vs.oldChannelId!);
        if(!oldChannel) return;

        // server was dadscord,
        if(oldChannel?.guild_id !== DADSCORD_GUILD_ID) return;
        // we are in the voice chat
        if(!VoiceStateStore.isInChannel(vs.oldChannelId!)) return;
        // they had ownership permissions (guessed by the permission overwrites)
        if(!ownsVoiceChat(vs.userId, oldChannel.permissionOverwrites_)) return;

        logger.log('claiming voice channel', vs.oldChannelId, oldChannel.name, 'from user', vs.userId);
        claimVoiceChannel(vs.oldChannelId!);
        if(DadscordAutoBans.settings.showNotificationsFor.includes(NotificationEvents.VOICE_AUTOCLAIM)) {
            BdApi.UI.showToast('Automatically claimed voice chat.', { type: 'success' });
        }
    }

    // joined a new channel
    if(vs.channelId !== null) {
        if(!VoiceStateStore.isInChannel(vs.channelId!)) return;

        // updates don't matter, ignore them
        // to prevent cases of allowing certain users
        // then them doing an action in the voice chat again
        // if(vs.oldChannelId !== vs.channelId) return;

        const channel = ChannelStore.getChannel(vs.channelId!);
        if(!ownsVoiceChat(ourId, channel?.permissionOverwrites_)) return;

        const isAutobannedFromUserId = DadscordAutoBans.settings.autoBanUserIds.has(vs.userId);
        let isFilteredName = false;
        const user = UserStore.getUser(vs.userId);

        if(!isAutobannedFromUserId) {
            const guildMember = GuildMemberStore.getMember(channel.guild_id, vs.userId);

            const usernames = [
                user.username,
                user.globalName,
                guildMember?.nick,
            ];

            for(const filterName of DadscordAutoBans.settings.nameFiltering) {
                let regex: RegExp | null = null;
                if(filterName.startsWith('/') && filterName.endsWith('/')) {
                    logger.log('debug: making regex');

                    try {
                        regex = new RegExp(filterName.slice(1, -1));
                    } catch(e) {
                        logger.error('Invalid regex in name filtering:', filterName);
                        continue;
                    }
                }

                for(const username of usernames) {
                    if(!username) continue;

                    logger.log('debug: looking at ' + username + ' | filter | ' + filterName);

                    if(regex) {
                        if(regex.test(username)) {
                            logger.log('debug: regex matched');
                            isFilteredName = true;
                            break;
                        }
                    } else {
                        if(username.toLowerCase().includes(filterName.toLowerCase())) {
                            logger.log('debug: str includes match');
                            isFilteredName = true;
                            break;
                        }
                    }
                }

                // exit outer loop if the name is filtered
                logger.log('debug: break end');
                if(isFilteredName) break;
            }
        }

        if(!isFilteredName && !isAutobannedFromUserId) return;

        const vc = getVoiceController(vs.channelId!);
        if(!vc) {
            if(DadscordAutoBans.settings.showNotificationsFor.includes(NotificationEvents.FAILED_TO_FIND_VOICE_CONTROLLER)) {
                BdApi.UI.showToast('Failed to find voice controller to autoban.', { type: 'error' });
            }

            return;
        }

        vc.ban(vs.userId);

        if(isFilteredName && DadscordAutoBans.settings.showNotificationsFor.includes(NotificationEvents.AUTOBAN_NAME_FILTERING_SUCCESS)) {
            BdApi.UI.showToast(`Autobanned ${ user.username } due to name`, { type: 'success' });
            return;
        }

        if(isAutobannedFromUserId && DadscordAutoBans.settings.showNotificationsFor.includes(NotificationEvents.AUTOBAN_ID_BLACKLIST_SUCCESS)) {
            BdApi.UI.showToast(`Autobanned ${ user.username } due to user id`, { type: 'success' });
        }
    }
}