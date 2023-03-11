module.exports = {
    createMember: async function(discordId, firstName, lastName, promo) {
        return true;
    },
    getMember: async function(discordId) {
        return {
            discordId: "123456789",
            firstName: "John",
            lastName: "Doe",
            promo: 2027
        };
    },
    updateMember: async function(discordId, data) {
        return true;
    },
    createPlayer: async function(discordUserId, uuid, username, permGroups) {
        return true;
    },
    getPlayer: async function(discordUserId) {
        return {
            discordUserId: "123456789",
            uuid: "123456789-1234-1234-1234-123456789012",
            username: "JohnDoe",
            permGroups: ["Visiteur"],
            perms: [],
            lastSeen: "2021-01-01T00:00:00.000Z",
            chatChannel: "SERVER",
            serverName: "infraprod-lobby.03DE"
        };
    },
    updatePlayer: async function(discordUserId, data) {
        return true;
    },
    getGroups: async function() {
        return [
            {
                "id": 0,
                "name": "Visiteur",
                "permissions": [],
                "prefix": "Visiteur ",
                "color": "7",
                "bold": false,
                "priority": 0,
                "defaultGroup": true,
                "parentGroupId": ""
            }
        ]
    }
}