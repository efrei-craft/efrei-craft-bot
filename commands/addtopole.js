// const { SlashCommandBuilder } = require('@discordjs/builders');
const { ContextMenuCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder } = require("@discordjs/builders");

const Pole = {
    Design: "1019716929390383164",
    Dev: "1019717015893721179",
    Comm: "1022771050125205605",
    Event: "1022778571976101938",
    Infra: "1027228270980243548"
}

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName("Ajouter à un pôle")
        .setType(2),
    async execute(interaction) {
        const user = interaction.targetMember;
        const admin = interaction.member;
        const modal = new ModalBuilder()
            .setCustomId("addtopole-modal-" + user.id)
            .setTitle("Ajouter " + user.displayName + " à un pôle")

        const poleRow = new ActionRowBuilder()
            .addComponents(
                new TextInputBuilder()
                    .setPlaceholder("Entrez le nom du pôle")
                    .setCustomId("poleName")
                    .setLabel("Nom du Pôle")
                    .setStyle(1)
                    .setRequired(true)
            );

        modal.addComponents(poleRow);
        await interaction.showModal(modal);
    }
}
