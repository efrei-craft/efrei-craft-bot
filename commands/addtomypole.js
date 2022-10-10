// const { SlashCommandBuilder } = require('@discordjs/builders');
const { ContextMenuCommandBuilder } = require("@discordjs/builders");

const Pole = {
    Design: "1019716929390383164",
    Dev: "1019717015893721179",
    Comm: "1022771050125205605",
    Event: "1022778571976101938",
    Infra: "1027228270980243548",
    Build: "1028666709864882276"
}

const Respo = {
    Design: "478983992834523166",
    Dev: "372783754025893889",
    Comm: "411912136948973579",
    Event: "280682698740203521",
    Infra: "723644603701395546",
    Build: "375764853631090688"
}

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName("Ajouter à mon pôle")
        .setType(2),
    async execute(interaction) {
        const user = interaction.targetMember;
        const poleAdmin = interaction.member;
        let p = "";
        if (poleAdmin.id === Respo.Design) {
            p = "Design";
        }
        else if (poleAdmin.id === Respo.Dev) {
            p = "Dev";
        }
        else if (poleAdmin.id === Respo.Comm) {
            p = "Comm";
        }
        else if (poleAdmin.id === Respo.Event) {
            p = "Event";
        }
        else if (poleAdmin.id === Respo.Infra) {
            p = "Infra";
        }
	else if (poleAdmin.id === Respo.Build) {
	    p = "Build";
	}
        if (p !== "") {
            user.roles.add(Pole[p]);
            interaction.reply({content: "L'utilisateur <@" + user.id + "> a été ajouté au Pôle " + p + " avec succès !", ephemeral: true})
        }
        else {
            interaction.reply({content: "Vous n'êtes pas responsable d'un pôle !", ephemeral: true})
        }
    }
}
