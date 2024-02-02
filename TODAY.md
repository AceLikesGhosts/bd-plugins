# TODAY

[x] rewrite build script

[] look into logging voice states of people we have added
[x] -> (look for a FriendshipStore, or something which contains who we have added / find function like `isFriendFromId` etc)
-> RelationshipStore (Has data for direct friends ie who we have added)
-> UserProfileStore (mutual friends)
'getMutualFriends', 'getMutualFriendsCount'