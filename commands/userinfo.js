const { ContextMenuCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

const Villes = [
    "Paris",
    "Bordeaux"
];

const Promos = [
    "P2027",
    "P2026",
    "P2025",
    "P2024",
    "P2023",
    "Ancien"
];

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

const Respo = {
    Design: "478983992834523166",
    Dev: "372783754025893889",
    Comm: "411912136948973579",
    Event: "280682698740203521",
    Infra: "723644603701395546",
    Build: "375764853631090688"
};

const BR = {
    "Président": "375259454465245185",
    "Vice Président": "470569212453191698",
    "Trésorier": "256093420206948352",
    "Secrétaire": "373762393487966218"
};

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName("Profil utilisateur")
        .setType(2),
    async execute(interaction) {
        const member = interaction.targetMember;
        const admin = interaction.member;
        let role = "";
        let poles = [];
        let ville = "";
        let versions = [];
        let promo = "";
        if (admin.roles.cache.some(r => (r.name === "Bureau restreint" || r.name === "Bureau étendu"))) {
            let message = new EmbedBuilder()
                .setTitle(`Profil de ${member.displayName}`)
                .setAuthor({name: member.user.tag, iconURL: member.user.avatarURL()})
                .setColor(0x00a1e0);
            for (let r in BR) {
                if (member.user.id === BR[r]) role = `**${r}**`;
            }
            for (let r in Respo) {
                if (member.user.id === Respo[r]) role = `**Responsable Pôle ${r}**`;
            }
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
            for (let v of Villes) {
                if (member.roles.cache.some(r => r.name === v)) ville = `**${v}**`;
            }
            for (let p of Promos) {
                if (member.roles.cache.some(r => r.name === p)) promo = `**${p.replace("P", "")}**`;
            }
            message.addFields(
                {
                    name: "\u200B",
                    value: ":small_blue_diamond: *Ville :* " + ville
                },
                {
                    name: "\u200B",
                    value: ":small_blue_diamond: *Promo :* " + promo
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
        }
        else {
            await interaction.reply({content: "**Vous n'avez pas la permission d'utiliser cette commande !**", ephemeral: true});
        }
    },
};
