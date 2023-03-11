const { ContextMenuCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const mariadb = require("mariadb");
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 5
});

const Versions = [
    "Vanilla",
    "Moddé",
    "Mini-jeux"
];

const Pole = {
    Design: "1019716929390383164",
    Dev: "1019717015893721179",
    Comm: "1022771050125205605",
    Event: "1022778571976101938",
    Infra: "1027228270980243548",
    Build: "1028666709864882276"
};

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName("Profil utilisateur")
        .setType(2),
    async execute(interaction) {
        const member = interaction.targetMember;
        const conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM members WHERE discordid = ?", [member.id]);
        const row = rows[0];
        let role = row["rank"];
        let poles = [];
        let ville = row["ville"];
        let versions = [];
        let promo = row["promo"];
        if (row["isAncien"] === 1) {
            promo = "Ancien";
        }
        let message = new EmbedBuilder()
            .setTitle(`Profil de ${member.displayName}`)
            .setAuthor({name: member.user.tag, iconURL: member.user.avatarURL()})
            .setColor(0x00a1e0);
        if (role !== "") {
            message.addFields({
                name: "\u200B",
                value: `:small_blue_diamond: *Rôle :* **${role}**`
            });
        }
        for (let p in Pole) {
            if (member.roles.cache.some(r => r.id === Pole[p])) poles.push(p);
        }
        let polesContent = "";
        for (let p of poles) {
            polesContent += `> **${p}**\n`;
        }
        if (poles.length > 0) {
            message.addFields({
                name: "\u200B",
                value: ":small_blue_diamond: *Pôles :*\n" + polesContent
            })
        }
        message.addFields(
            {
                name: "\u200B",
                value: ":small_blue_diamond: *Ville :* **" + ville + "**"
            },
            {
                name: "\u200B",
                value: ":small_blue_diamond: *Promo :* **" + promo + "**"
            }
        );
        for (let v of Versions) {
            if (member.roles.cache.some(r => r.name === v)) versions.push(v);
        }
        let versionsContent = "";
        for (let v of versions) {
            versionsContent += `> **${v}**\n`;
        }
        message.addFields({
            name: "\u200B",
            value: ":small_blue_diamond: *Modes de jeux :*\n" + versionsContent
        })
        await interaction.reply({embeds: [message], ephemeral: true});
    },
};
