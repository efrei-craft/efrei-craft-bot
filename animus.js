const axios = require("axios");

const BASE_URL = process.env.ANIMUS_BASE_URL;
const API_KEY = process.env.ANIMUS_API_KEY;

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
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
        return (await instance.post("/member", member)).data;
    },
    getMember: async function (discordId) {
        return (await instance.get("/member/" + discordId)).data;
    },
    updateMember: async function(discordId, data) {
        console.log("discordId: ", discordId)
        console.log("data: ", data)
        return (await instance.patch("/member/" + discordId + "/update", data)).data;
    },
    getGroups: async function() {
        return (await instance.get("/permissions/groups")).data;
    }
};

(async () => {
    try {
        const groups = await module.exports.getGroups();
        console.log(groups[0]);
    } catch (error) {
        console.error(error);
    }
})();
