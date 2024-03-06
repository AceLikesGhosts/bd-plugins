import { React } from '@lib/components/index';
import AVCStalker, { DefaultSettings, logger } from '..';
import { Margins } from '@lib/components';
import { FormSwitch, FormItem, FormDivider, FormTitle } from '@lib/components/Form';
import RawTextInput from '@lib/components/TextInput';
import _ from '@lib/common/Lodash';
import type { TextInputProps } from '@lib/components/TextInput';
import type { FormItemProps } from '@lib/components/Form';
import { save } from '../data/FileData';

function TextInput(props: TextInputProps & FormItemProps) {
    return (
        <FormItem
            style={{
                width: '50%'
            }}
            className={Margins.marginBottom20}
            {...props}
        >
            <RawTextInput
                {...props}
            />
        </FormItem>
    );
}

export default function Settings(): JSX.Element {
    const [clickVoiceChatButtonClears, setClickVoiceChatButtonClears] = React.useState(AVCStalker.settings.voiceChatFollowing.clickVoiceChatButtonClears ?? DefaultSettings.voiceChatFollowing.clickVoiceChatButtonClears);
    const [userPopout, setUserPopout] = React.useState<boolean>(AVCStalker.settings.userPopout ?? DefaultSettings.userPopout);

    const [isVCLoggingEnabled, setVCLoggingEnabled] = React.useState<boolean>(AVCStalker.settings.vcLogging.enabled);
    const [vcLoggingMaxSize, setVCLoggingMaxSize] = React.useState<number>(AVCStalker.settings.vcLogging.maxSize);
    const [logFriends, setLogFriends] = React.useState<boolean>(AVCStalker.settings.vcLogging.logFriends);
    const [logCorrelatedPeople, setLogCorrelatedPeople] = React.useState<boolean>(AVCStalker.settings.vcLogging.logCorrelatedPeople);
    const [filePath, setFilePath] = React.useState<string>(AVCStalker.settings.vcLogging.filePath);

    const [isPeriodicSaving, setPeriodicSaving] = React.useState<boolean>(AVCStalker.settings.vcLogging.periodicSaving);
    const [saveInterval, setSaveInterval] = React.useState<number>(AVCStalker.settings.vcLogging.saveInterval);

    const [isInvidual, setInvididual] = React.useState<boolean>(AVCStalker.settings.contextMenu.individual);
    const [showLogButton, setShowLogButton] = React.useState<boolean>(AVCStalker.settings.contextMenu.showLogButton);
    const [showWhitelistButton, setShowWhitelistButton] = React.useState<boolean>(AVCStalker.settings.contextMenu.showWhitelistButton);
    const [contextName, setContextName] = React.useState<string>(AVCStalker.settings.contextMenu.name);

    React.useEffect(() => {
        AVCStalker.settings = {
            voiceChatFollowing: {
                clickVoiceChatButtonClears
            },
            userPopout,
            vcLogging: {
                enabled: isVCLoggingEnabled,
                maxSize: vcLoggingMaxSize,
                whitelisted: AVCStalker.settings.vcLogging.whitelisted,
                logFriends,
                filePath,
                logCorrelatedPeople,
                saveInterval,
                periodicSaving: isPeriodicSaving
            },
            contextMenu: {
                individual: isInvidual,
                showLogButton,
                name: contextName,
                showWhitelistButton
            }
        };
    }, [
        clickVoiceChatButtonClears,
        userPopout,
        isVCLoggingEnabled,
        vcLoggingMaxSize,
        logFriends,
        isInvidual,
        contextName,
        showWhitelistButton,
        showLogButton
    ]);

    return (
        <div>
            <FormTitle tag='h2'>
                General Settings
            </FormTitle>

            <FormSwitch
                value={clickVoiceChatButtonClears}
                onChange={((e) => setClickVoiceChatButtonClears(e))}
                note={'Should clicking the following button clear the following list? Setting made for Ollie.'}
            >
                Following Button Clearing
            </FormSwitch>

            <FormSwitch
                note={'Should we show what voice channels someone is in on their user popout?'}
                value={userPopout}
                onChange={((e) => setUserPopout(e))}
            >
                User Popout
            </FormSwitch>

            <FormDivider />

            <FormTitle tag='h2'>
                Voice Chat Logging
            </FormTitle>

            <FormSwitch
                note={'Should we log out voice states for later analysis?'}
                value={isVCLoggingEnabled}
                onChange={((e) => setVCLoggingEnabled(e))}
            >
                Enable Logging
            </FormSwitch>

            <TextInput
                title={'Maximum File Size (megabytes)'}
                value={String(vcLoggingMaxSize)}
                disabled
                onChange={((e) => {
                    if(!_.isNumber(e)) return;
                    setVCLoggingMaxSize(Number(e));
                })}
            />

            <FormSwitch
                note={'Should we always log friend\'s voice states?'}
                value={logFriends}
                onChange={((e) => setLogFriends(e))}
            >
                Log Friends
            </FormSwitch>

            <FormSwitch
                note={'Should we attempt to check if someone we have whitelisted/friended is in their call and log their state if so? WARNING: THIS WILL LAG YOUR DISCORD IF YOU ARE IN BIG SERVERS!'}
                value={logCorrelatedPeople}
                onChange={((e) => setLogCorrelatedPeople(e))}
            >
                Log Correlated People
            </FormSwitch>

            <TextInput
                title={'The location where we should save our VoiceState logs. Use "%plugins%" for plugin folder.'}
                value={filePath}
                onChange={((e) => setFilePath(e))}
            />

            <FormSwitch
                note={'Should we save our voice logs every (x) amount of time?'}
                value={isPeriodicSaving}
                onChange={((e) => setPeriodicSaving(e))}
            >
                Periodic Saving
            </FormSwitch>

            <TextInput
                title={'Save Interval (minutes)'}
                value={String(saveInterval)}
                onChange={((e) => {
                    if(!_.isNumber(e)) return;
                    setSaveInterval(e);

                    if(AVCStalker.saveInterval) clearInterval(AVCStalker.saveInterval);
                    AVCStalker.saveInterval = setInterval(() => {
                        logger.info(`periodic save of voice state logs`);
                        save();
                    }, saveInterval);
                })}
            />

            <FormDivider />
            <FormTitle tag='h2'>
                Context Menu
            </FormTitle>

            <FormSwitch
                note={'Makes each button show as an individual button on the context menu rather than under a group.'}
                value={isInvidual}
                onChange={((e) => setInvididual(e))}
            >
                Individual Context Menu Buttons
            </FormSwitch>

            <FormSwitch
                note={'Should we show a button to open voice state logs on the user context menu?'}
                value={showLogButton}
                onChange={((e) => setShowLogButton(e))}
            >
                Show Log Button
            </FormSwitch>

            <FormSwitch
                note={'Should we show a button that allows for adding a user to our active VoiceState logging?'}
                value={showWhitelistButton}
                onChange={((e) => setShowWhitelistButton(e))}
            >
                Show VoiceLog Whitelist Button
            </FormSwitch>

            <TextInput
                title={'Context Menu Name'}
                disabled={isInvidual}
                value={contextName}
                onChange={((e) => {
                    setContextName(e);
                })}
            />
        </div>
    );
}