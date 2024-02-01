function VoiceStateStoreWebpackChunk(e, t, require) {
    "use strict";

    let clientUserId, clientSessionId;
    require.r(t),
        require.d(t, {
            // exports fucntion 'n' as the default for this chunk
            default: function() {
                return N;
            }
        }),

        require("808653"),
        require("222007");

    var r = require("917351")
        , a = require.n(r)
        , o = require("446674")
        , Dispatcher = require("913144")
        , u = require("628454")
        , LOCAL_ROUTES = require("49111")
        , c = require("99795");

    let f = 0
        , voiceStateStoreVersion = 0
        , allVoiceStates = {}
        , channelVoiceStatesMap = {}
        , channelVideoVoiceStatesMap = {}
        , userVoiceStatesMap = {}
        , p = {};

    function concatWithColon(first, second) {
        return "".concat(first, ":").concat(second);
    }

    function findKey(obj, key) {
        let value = obj[key];

        if(value === null || value === undefined) {
            value = {};
            obj[key] = value;
        }

        return value;
    }

    function updateChannelsForId(channelId) {
        let currentChannels = null !== (allVoiceStates[LOCAL_ROUTES.ME]) && void 0 !== allVoiceStates[LOCAL_ROUTES.ME] ? allVoiceStates[LOCAL_ROUTES.ME] : {};
        let updatedChannels = {};

        a.each(currentChannels, (channel, key) => {
            if(channel.channelId !== channelId) {
                updatedChannels[key] = channel;
            }
        });

        allVoiceStates[LOCAL_ROUTES.ME] = updatedChannels;
    }


    function updateChannelState(guildId, userId, transformer) {
        let channelMap = findKey(allVoiceStates, (guildId !== null) ? guildId : LOCAL_ROUTES.ME);
        let currentChannelState = channelMap[userId];
        let newChannelState = transformer(currentChannelState);

        if(currentChannelState === newChannelState) {
            return [false, newChannelState, currentChannelState];
        } else {
            if(currentChannelState !== null) {
                delete channelMap[userId];

                if(currentChannelState.channelId !== null) {
                    delete findKey(channelVoiceStatesMap, currentChannelState.channelId)[userId];
                    delete findKey(channelVideoVoiceStatesMap, currentChannelState.channelId)[userId];
                }

                if(currentChannelState.sessionId !== null) {
                    delete findKey(userVoiceStatesMap, userId)[currentChannelState.sessionId];
                }
            }

            if(newChannelState !== null) {
                channelMap[userId] = newChannelState;

                if(newChannelState.channelId !== null) {
                    findKey(channelVoiceStatesMap, newChannelState.channelId)[userId] = newChannelState;

                    if(newChannelState.selfVideo) {
                        findKey(channelVideoVoiceStatesMap, newChannelState.channelId)[userId] = newChannelState;
                    }
                }

                if(newChannelState.sessionId !== null) {
                    findKey(userVoiceStatesMap, userId)[newChannelState.sessionId] = newChannelState;
                }
            }

            return [true, newChannelState, currentChannelState];
        }
    }


    function updateVoiceStateForUser(guildId, user) {
        return updateChannelState(guildId, user.userId, e => {
            if(user.channelId == null)
                return null;

            let voiceState = {
                channelId: user.channelId,
                deaf: user.deaf,
                mute: user.mute,
                requestToSpeakTimestamp: user.requestToSpeakTimestamp,
                selfDeaf: user.selfDeaf,
                selfMute: user.selfMute,
                selfStream: user.selfStream,
                selfVideo: user.selfVideo,
                sessionId: user.sessionId,
                suppress: user.suppress,
                userId: user.userId
            };

            if(e != null) {
                return e.merge(voiceState);
            }

            return u.default(voiceState);
        });
    }

    function dontCareAboutThisStoreDoesntUseIt(e) {
        let { guild: t } = e;
        a.forEach(allVoiceStates[t.id], e => {
            updateChannelState(t.id, e.userId, () => null);
        }
        ),
            delete allVoiceStates[t.id];
    }


    class VoiceStateStore extends o.default.Store {
        getAllVoiceStates() {
            return allVoiceStates;
        }
        getVoiceStateVersion() {
            return voiceStateStoreVersion;
        }

        /**
         * Gets the voice states of a guild or your PM calls
         */
        getVoiceStates(guildId) {
            return findKey(allVoiceStates, guildId == null ? guildId : LOCAL_ROUTES.ME);
        }

        getVoiceStatesForChannel(channelId) {
            return findKey(channelVoiceStatesMap, channelId);
        }

        getVideoVoiceStatesForChannel(channelId) {
            return findKey(channelVideoVoiceStatesMap, channelId);
        }

        getVoiceState(guildId, userId) {
            return this.getVoiceStates(guildId)[userId];
        }

        getVoiceStateForChannel(channelId, userId = defaultUserId) {
            const channelVoiceStates = findKey(channelVoiceStatesMap, channelId);
            return channelVoiceStates ? channelVoiceStates[userId] : undefined;
        }

        getVoiceStateForUser(userId) {
            const userVoiceStates = Object.values(findKey(userVoiceStatesMap, userId));
            return userVoiceStates[0];
        }

        getVoiceStateForSession(userId, sessionId) {
            const userVoiceStates = findKey(userVoiceStatesMap, userId);
            return sessionId != null ? userVoiceStates?.[sessionId] : null;
        }

        getUserVoiceChannelId(userId, sessionId) {
            const voiceState = this.getVoiceState(userId, sessionId);
            return voiceState?.channelId;
        }

        getCurrentClientVoiceChannelId(userId) {
            const voiceState = this.getVoiceState(userId, defaultUserId);
            return voiceState != null && clientSessionId != null && voiceState.sessionId === clientSessionId
                ? voiceState.channelId
                : null;
        }

        isCurrentClientInVoiceChannel() {
            const userVoiceStates = userVoiceStatesMap[clientUserId];
            return clientSessionId != null && userVoiceStates?.[clientSessionId] != null;
        }

        isInChannel(channelId, userId = defaultUserId) {
            if(channelId == null) {
                return false;
            }

            const voiceState = this.getVoiceStateForChannel(channelId, userId);
            return voiceState != null && (userId !== defaultUserId || (clientSessionId != null && voiceState.sessionId === clientSessionId));
        }

        hasVideo(channelId) {
            const channelVideoVoiceStates = findKey(channelVideoVoiceStatesMap, channelId);
            return Object.values(channelVideoVoiceStates).length > 0;
        }

        getVoicePlatformForChannel(userId, channelId) {
            const currentClientVoiceChannelId =
                clientSessionId != null &&
                (userVoiceStatesMap[userId]?.[clientSessionId]?.channelId ?? null);

            return userId === defaultUserId && channelId === currentClientVoiceChannelId
                ? VoicePlatforms.DESKTOP
                : voicePlatformConcatenated(userId, channelId);
        }


        get userHasBeenMovedVersion() {
            return f;
        }
    }
    VoiceStateStore.displayName = "VoiceStateStore";
    var N = new VoiceStateStore(Dispatcher.default, {
        CONNECTION_OPEN: function(event) {
            let { user: user, sessionId: sessionId } = event;
            allVoiceStates = {},
                channelVoiceStatesMap = {},
                userVoiceStatesMap = {},
                channelVideoVoiceStatesMap = {},
                clientUserId = user.id,
                sessionId = sessionId;
        },
        OVERLAY_INITIALIZE: function(e) {
            let { voiceStates: t, user: n, sessionId: r } = e;
            for(let [e, n] of(allVoiceStates = {},
                channelVoiceStatesMap = {},
                userVoiceStatesMap = {},
                channelVideoVoiceStatesMap = {},
                Object.entries(t)))
                for(let [t, i] of Object.entries(n))
                    updateChannelState(e, t, () => new u.default(i));
            clientUserId = n.id,
                clientSessionId = r;
        },
        VOICE_CHANNEL_SELECT: function(e) {
            let { guildId: t, channelId: n } = e
                , [s] = updateChannelState(t, clientUserId, e => null == e ? void 0 : e.set("channelId", n));
            return s;
        },
        VOICE_STATE_UPDATES: function(e) {
            let { voiceStates: t } = e;
            return t.reduce((e, t) => {
                let [n, i, r] = updateVoiceStateForUser(t.guildId, t);
                return n ? (t.sessionId === clientSessionId && null != i && null != r && r.channelId !== i.channelId && (f += 1),
                    voiceStateStoreVersion++,
                    !0) : e;
            }
                , !1);
        },
        GUILD_DELETE: dontCareAboutThisStoreDoesntUseIt,
        GUILD_CREATE: dontCareAboutThisStoreDoesntUseIt,
        CHANNEL_DELETE: function(e) {
            let { channel: t } = e;
            updateChannelsForId(t.id);
        },
        CALL_DELETE: function(e) {
            let { channelId: t } = e;
            updateChannelsForId(t);
        },
        PASSIVE_UPDATE_V1: function(e) {
            var t, n;
            let i = !1
                , s = Object.keys(null !== (t = allVoiceStates[e.guildId]) && void 0 !== t ? t : {})
                , r = new Set(s);
            for(let t of null !== (n = e.voiceStates) && void 0 !== n ? n : []) {
                let [n] = updateVoiceStateForUser(e.guildId, t);
                i = i || n,
                    r.delete(t.userId);
            }
            for(let t of r)
                updateChannelState(e.guildId, t, () => null),
                    i = !0;
            return i && voiceStateStoreVersion++,
                i;
        },
        RTC_CONNECTION_PLATFORM: function(e) {
            let { userId: t, channelId: n, platform: i } = e;
            p[concatWithColon(t, n)] = i;
        }
    });
}