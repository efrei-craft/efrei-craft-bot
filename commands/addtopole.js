// const { SlashCommandBuilder } = require('@discordjs/builders');
const { ContextMenuCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder } = require("@discordjs/builders");

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName("Ajouter à un pôle")
        .setType(2),
    async execute(interaction) {
        const user = interaction.targetMember;
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
