const { SlashCommandBuilder } = require('@discordjs/builders');
const mariadb = require('mariadb');
require("dotenv").config();
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 5
});

const roles = {
    promos: {
        "2023": "1018861724377559121",
        "2024": "1018861720124526683",
        "2025": "1018861719960961077",
        "2026": "1018861719315030076",
        "2027": "1018861711396175892"
    },
    ancien: "1018867079300001822",
    villes: {
        "Paris": "1016966906340704276",
        "Bordeaux": "1016966938934657084"
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fixbdd')
        .setDescription('Règle les problèmes de synchronisation avec la BDD'),
    async execute(interaction) {
        console.log("Fixing BDD");
        console.log("BDD: " + process.env.DB_HOST + ":" + process.env.DB_PORT + " " + process.env.DB_NAME);
        const visiteur = await interaction.guild.roles.fetch('1018926458632146995');
        try {
            console.log("Connecting...")
            const conn = await pool.getConnection();
            const rows = await conn.query("SELECT * FROM `visiteurs`");
            await conn.release();
            let alreadyIn = [];
            for (const row of rows) {
                alreadyIn.push(row.discordid);
            }
            console.log(alreadyIn);
            for (const m in visiteur.members) {
                if (!alreadyIn.includes(visiteur.members[m].id)) {
                    await pool.execute("INSERT INTO `members` (`discordid`, `rank`) VALUES (?, 'Visiteur')", [m]);
                    if (visiteur.members[m].roles.cache.has(roles.ancien)) {
                        await pool.execute("UPDATE `members` SET `isAncien` = '1' WHERE `discordid` = ?", [m]);
                    }
                    else {
                        for (let p in roles.promos) {
                            if (visiteur.members[m].roles.cache.has(roles.promos[p])) {
                                await pool.execute("UPDATE `members` SET `promo` = ? WHERE `discordid` = ?", [p, m]);
                                break;
                            }
                        }
                    }
                    for (let v in roles.villes) {
                        if (visiteur.members[m].roles.cache.has(roles.villes[v])) {
                            await pool.execute("UPDATE `members` SET `ville` = ? WHERE `discordid` = ?", [v, m]);
                            break;
                        }
                    }
                }
            }
            await interaction.reply({content: 'BDD fixée !'});
        } catch {
            await interaction.reply({content: 'Erreur lors de la connexion à la BDD'});
        }
    },
};
