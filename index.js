const fs = require('fs');
const { Client, Collection, GatewayIntentBits, ActivityType, Partials } = require('discord.js');
const { ModalBuilder, ActionRowBuilder, TextInputBuilder } = require("@discordjs/builders");
const animus = require("./animus");
require("./deploy-commands");

const client = new Client({ intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers], partials: [Partials.GuildMember] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    client.on(event.eventName, event.eventHandler);
}

async function getMcUUID(username) {
    let res = await fetch(`https://playerdb.co/api/player/minecraft/${username}`, {
        headers: {
            'User-Agent': 'OccasionalImportEfreiCraft/1.0.0'
        }
    });
    let { data: { player } } = await res.json();
    return player.id
}

async function getUserRanks(discordMember) {
    let ranks = [];
    const availableGroups = await animus.getGroups();
    const groupMap = availableGroups.map((g) => g.name);
    for (const role of discordMember.roles.cache.values()) {
        if (groupMap.includes(role.name)) {
            ranks.push(role.name);
        }
    }
    return ranks;
}

client.once('ready', () => {
    console.log('Successfully logged in!');
    client.user.setPresence({status: "online", activities: [{ name: "Minecraft | efreicraft.fr", type: ActivityType.Playing}]});
});

// COMMANDS
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand() && !interaction.isAutocomplete()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

// MODALS
client.on('interactionCreate', async interaction => {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId.startsWith("addtopole-modal-")) {
        const Pole = {
            Design: "1019716929390383164",
            Dev: "1019717015893721179",
            Build: "1028666709864882276"
        };
        let poleName = interaction.fields.getTextInputValue("poleName");
        poleName = poleName[0].toUpperCase() + poleName.slice(1).toLowerCase();
        const user = interaction.guild.members.cache.get(interaction.customId.split("addtopole-modal-")[1]);
        await user.roles.add(Pole[poleName]);
        await interaction.reply({content: "L'utilisateur <@" + user.id + "> a été ajouté au Pôle " + poleName + " avec succès !", ephemeral: true});
    }

    else if (interaction.customId === "bind-mc-modal") {
        await interaction.deferReply({ephemeral: true});
        const mcName = interaction.fields.getTextInputValue("mcName");
        const user = interaction.member.id;
        const player = await animus.getPlayerFromDiscordId(user);
        if (player) {
            // player is already existing, update it
            if (player.username !== mcName) {
                await animus.migratePlayer(player.uuid, await getMcUUID(mcName), mcName);
            }
            await interaction.editReply({content: "Votre compte Minecraft a été mis à jour avec succès"});
        }
        else {
            // player is not existing, create it
            await animus.createPlayer(user, mcName, await getMcUUID(mcName), await getUserRanks(interaction.member));
            await interaction.editReply({content: "Votre compte Minecraft a été lié avec succès"});
        }
    }

    else if (interaction.customId === "memberize-modal") {
        await interaction.deferReply({ephemeral: true});
        const discordID = interaction.member.id;
        const firstName = interaction.fields.getTextInputValue("firstName");
        const lastName = interaction.fields.getTextInputValue("lastName");
        await interaction.member.roles.remove("1028938423253356544");
        await interaction.member.roles.add("1018926567902158970");
        const player = await animus.getPlayerFromDiscordId(discordID);
        player.permGroups = await getUserRanks(interaction.member);
        await animus.updateMember(discordID, {firstName: firstName, lastName: lastName});
        await animus.updatePlayerPerms(player.uuid, await getUserRanks(interaction.member));
        await interaction.editReply({content: "Votre profil a été mis à jour avec succès !"});
    }
});

// BOUTONS
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    // BOUTON - LIER SON COMPTE MINECRAFT
    else if (interaction.customId === "bind-mc") {
        const player = await animus.getPlayerFromDiscordId(interaction.member.id);
        let mcAccountValue = "";
        if (player) {
            mcAccountValue = player.username;
        }
        const modal = new ModalBuilder()
            .setTitle("Lier son compte Minecraft")
            .setCustomId("bind-mc-modal")

        const mcNameInput = new TextInputBuilder()
            .setCustomId("mcName")
            .setPlaceholder("Pseudo Minecraft")
            .setLabel("Saisissez votre pseudo Minecraft :")
            .setStyle(1)
            .setMinLength(3)
            .setMaxLength(16)

        if (mcAccountValue !== "") {
            mcNameInput.setValue(mcAccountValue);
        }

        const row = new ActionRowBuilder()
            .addComponents(
                mcNameInput
            );
        modal.addComponents(row);
        await interaction.showModal(modal);
    }

    // BOUTON - DEVENIR MEMBRE
    else if (interaction.customId === "memberize") {
        const modal = new ModalBuilder()
            .setTitle("Finaliser votre inscription")
            .setCustomId("memberize-modal")

        const row = new ActionRowBuilder()
            .addComponents(
                new TextInputBuilder()
                    .setCustomId("firstName")
                    .setPlaceholder("Prénom (ex: Jean)")
                    .setLabel("Saisissez votre prénom :")
                    .setStyle(1)
                    .setMinLength(2)
                    .setMaxLength(20)
            );
        const row2 = new ActionRowBuilder()
            .addComponents(
                new TextInputBuilder()
                    .setCustomId("lastName")
                    .setPlaceholder("Nom de famille (ex: Dupont)")
                    .setLabel("Saisissez votre nom :")
                    .setStyle(1)
                    .setMinLength(2)
                    .setMaxLength(20)
            );
        modal.addComponents(row, row2);
        await interaction.showModal(modal);
    }
});

client.login(process.env.TOKEN);
