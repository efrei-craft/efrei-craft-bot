const { SlashCommandBuilder } = require('@discordjs/builders');

const Pole = {
    Design: "1019716929390383164",
    Dev: "1019717015893721179",
    Comm: "1022771050125205605",
    Event: "1022778571976101938",
    Infra: "1027228270980243548"
}

const Respo = {
    Design: "478983992834523166",
    Dev: "372783754025893889",
    Comm: "411912136948973579",
    Event: "280682698740203521",
    Infra: "723644603701395546"
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addtopole')
        .setDescription('Ajoute quelqu\'un à votre pôle')
        .addUserOption(option => option.setName("utilisateur").setDescription("Utilisateur à ajouter à votre pôle").setRequired(true))
    ,
    async execute(interaction) {
        if (interaction.member.roles.cache.some(r => r.name === "Bureau étendu") || interaction.member.roles.cache.some(r => r.name === "Bureau restreint")) {
            const user = interaction.options.getMember("utilisateur");
            let p = "";
            if (interaction.member.id === Respo.Design) {
                p = "Design";
            }
            else if (interaction.member.id === Respo.Dev) {
                p = "Dev";
            }
            else if (interaction.member.id === Respo.Comm) {
                p = "Comm";
            }
            else if (interaction.member.id === Respo.Event) {
                p = "Event";
            }
            else if (interaction.member.id === Respo.Infra) {
                p = "Infra";
            }
            if (p !== "") {
                user.roles.add(Pole[p]);
                interaction.reply({content: "L'utilisateur <@" + user.id + "> a été ajouté au Pôle " + p + " avec succès !", ephemeral: true})
            }
            else {
                interaction.reply({content: "Vous n'êtes pas responsable d'un pôle !", ephemeral: true})
            }
        }
        else {
            await interaction.reply({content: "**Vous n'avez pas la permission d'utiliser cette commande !**", ephemeral: true });
        }
    },
};
