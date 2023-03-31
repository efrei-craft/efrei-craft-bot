const { ContextMenuCommandBuilder } = require("@discordjs/builders");

const Pole = {
    Design: "1019716929390383164",
    Dev: "1019717015893721179",
    Build: "1028666709864882276"
}

const Respo = {
    Design: "478983992834523166",
    Dev: "280682698740203521",
    Build: "375764853631090688"
}

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName("Supprimer de mon pôle")
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
	else if (poleAdmin.id === Respo.Build) {
	    p = "Build"
	}
        if (p !== "") {
            user.roles.remove(Pole[p]);
            interaction.reply({content: "L'utilisateur <@" + user.id + "> a été retiré du Pôle " + p + " avec succès !", ephemeral: true})
        }
        else {
            interaction.reply({content: "Vous n'êtes pas responsable d'un pôle !", ephemeral: true})
        }
    }
}
