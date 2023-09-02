const axios = require("axios");

const BASE_URL = process.env.ANIMUS_BASE_URL;
const API_KEY = process.env.ANIMUS_API_KEY;

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json"
    }
});

module.exports = {
    createMember: async function (discordId, firstName, lastName, promo) {
        const member = {};
        member.discordId = discordId;
        member.firstName = firstName;
        member.lastName = lastName;
        member.promo = promo;
        return (await instance.post("/members", member)).data;
    },
    getMember: async function (discordId) {
        try {
            return (await instance.get("/members/" + discordId)).data;
        } catch {
            return null;
        }
    },
    getAllMembers: async function () {
        return (await instance.get("/members")).data;
    },
    updateMember: async function(discordId, data) {
        return (await instance.patch("/members/" + discordId + "/update", data)).data;
    },
    updatePlayerGroups: async function (uuid, permGroups) {
        return (await instance.patch("/players/" + uuid + "/groups", {
            groupNames: permGroups
        })).data;
    },
    createPlayer: async function (discordId, username, uuid, permGroups) {
        return (await instance.post("/players", {
            memberDiscordId: discordId,
            username: username,
            uuid: uuid,
            permGroups: permGroups
        })).data;
    },
    getPlayerFromDiscordId: async function (discordId) {
        try {
            return (await instance.get("/members/" + discordId + "/player")).data;
        } catch {
            return null;
        }
    },
    getPlayerFromUuid: async function (uuid) {
        try {
            return (await instance.get("/players/" + uuid)).data;
        } catch {
            return null;
        }
    },
    migratePlayer: async function (oldUuid, newUuid, newUsername) {
        return (await instance.patch("/players/" + oldUuid + "/migrate", {
            uuid: newUuid,
            username: newUsername
        })).data;
    },
    getGroups: async function() {
        return (await instance.get("/permissions/groups")).data;
    }
};
