class UnreachableMojangError extends Error {
    constructor(message) {
        super(message);
        this.name = "Mojang API is unreachable";
    }
}

class NoSuchPlayerError extends Error {
    constructor(message, player) {
        super(message);
        this.name = `${player} does not exist`;
    }
}

// Source: https://github.com/timmyRS/add-dashes-to-uuid
function dashify(uuid) {
    return [uuid.substring(0,8), uuid.substring(8,12), uuid.substring(12,16), uuid.substring(16,20), uuid.substring(20)].join("-");
}

async function getMcUUID(username) {
    let res;
    try {
        res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`, {
            method: "GET",
            headers: {
                'User-Agent': 'OccasionalImportEfreiCraft/1.0.0'
            },
        });
    } catch (e) {
        console.error(`Error while fetching Mojang API for player: ${username}`);
        throw new UnreachableMojangError(e.message);
    }
    let json = await res.json();
    if (json.errorMessage) {
        // FIXME: Attention, errorMessage pourrait dire autre chose que "joueur non trouvé"
        throw new NoSuchPlayerError(username);
    }
    return dashify(json.id)
}

function getUserRanks(discordMember) {
    const groupMap = require("./config.json").discord_roles_id;
    const ranks = [];
    for (const role of discordMember.roles.cache.values()) {
        for (const roleName in groupMap) {
            if (groupMap[roleName] === role.id) {
                ranks.push(roleName);
            }
        }
    }
    return ranks;
}

module.exports = {
    dashify,
    getMcUUID,
    getUserRanks,
    UnreachableMojangError,
    NoSuchPlayerError
}