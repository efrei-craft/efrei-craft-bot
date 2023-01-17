const fs = require('fs');
const { Client, Collection, GatewayIntentBits, ActivityType, InteractionType, InteractionResponse} = require('discord.js');
const { ModalBuilder, ActionRowBuilder, TextInputBuilder } = require("@discordjs/builders");
const mariadb = require("mariadb");
require("./deploy-commands");

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 5
});

const client = new Client({ intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });

const promo_roles = {
    "p2023": "1018861724377559121",
    "p2024": "1018861720124526683",
    "p2025": "1018861719960961077",
    "p2026": "1018861719315030076",
    "p2027": "1018861711396175892",
    "p-ancien": "1018867079300001822"
}

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
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
        const mcName = interaction.fields.getTextInputValue("mcName");
        const user = interaction.member.id;
        const conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM discordmclink WHERE discordid = ?", [user]);
        await conn.release();
        if (rows.length > 0) {
            await conn.query("UPDATE discordmclink SET mcaccount = ? WHERE discordid = ?", [mcName, user]);
            await interaction.reply({content: "Votre compte Minecraft a été mis à jour avec succès", ephemeral: true});
        }
        else {
            await pool.execute("INSERT INTO `discordmclink` (`discordid`, `mcaccount`) VALUES (?, ?)", [user, mcName]);
            await interaction.reply({content: "Votre compte Minecraft a été lié avec succès !", ephemeral: true});
        }
    }

    else if (interaction.customId === "memberize-modal") {
        const discordID = interaction.member.id;
        const firstName = interaction.fields.getTextInputValue("firstName");
        const lastName = interaction.fields.getTextInputValue("lastName");
        const EfreiID = interaction.fields.getTextInputValue("EfreiID");
        await interaction.member.roles.remove("1028938423253356544");
        await interaction.member.roles.add("1018926567902158970");
        await pool.execute("UPDATE members SET first_name = ?, last_name = ?, rank = 'Membre', efreiid = ? WHERE discordid = ?", [firstName, lastName, EfreiID, discordID]);
        await interaction.reply({content: "Votre profil a été mis à jour avec succès !", ephemeral: true});
    }
});

// BOUTONS
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    // BOUTON - ACCEPTER LE REGLEMENT
    if (interaction.customId === "accept-rules") {
        if (await interaction.member.roles.cache.has("1018926458632146995") || await interaction.member.roles.cache.has("1018926567902158970")) {
            await interaction.reply({content: "Vous avez déjà accepté le règlement !", ephemeral: true});
            return;
        }
        await interaction.member.roles.add("1018926458632146995");
        try {
            await pool.execute("INSERT INTO members VALUES (?, '', '', '', '0', '0', 'Visiteur', '0')", [interaction.member.id]);
        } catch {
            return interaction.reply({content: "**Bon retour parmi nous !**\nVa dans <#1016986910268346379> pour choisir tes rôles !", ephemeral: true});
        }
        await interaction.reply({content: "**Bienvenue sur Efrei Craft !**\nVa dans <#1016986910268346379> pour choisir tes rôles !", ephemeral: true});
    }

    // BOUTON - LIER SON COMPTE MINECRAFT
    else if (interaction.customId === "bind-mc") {
        const conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM discordmclink WHERE discordid = ?", [interaction.member.id]);
        await conn.release();
        let mcAccountValue = "";
        if (rows.length > 0) {
            mcAccountValue = rows[0].mcaccount;
        }
        const modal = new ModalBuilder()
            .setTitle("Lier son compte Minecraft")
            .setCustomId("bind-mc-modal")

        const row = new ActionRowBuilder()
            .addComponents(
                new TextInputBuilder()
                    .setCustomId("mcName")
                    .setPlaceholder("Pseudo Minecraft")
                    .setLabel("Saisissez votre pseudo Minecraft :")
                    .setValue(mcAccountValue)
                    .setStyle(1)
                    .setMinLength(3)
                    .setMaxLength(16)
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
        const row3 = new ActionRowBuilder()
            .addComponents(
                new TextInputBuilder()
                    .setCustomId("EfreiID")
                    .setPlaceholder("Identifiant MyEfrei (XXXXXXXX)")
                    .setLabel("Saisissez votre Identifiant MyEfrei :")
                    .setStyle(1)
                    .setMinLength(8)
                    .setMaxLength(8)
            );
        modal.addComponents(row, row2, row3);
        await interaction.showModal(modal);
    }

    // BOUTONS - VILLES
    else if (interaction.customId === "paris") {
        await interaction.member.roles.remove("1016966938934657084");
        await interaction.member.roles.add("1016966906340704276");
        await pool.execute("UPDATE members SET ville = 'Paris' WHERE discordid = ?", [interaction.member.id]);
        await interaction.reply({content: "Vous avez choisi le rôle *Paris* !", ephemeral: true});
    }
    else if (interaction.customId === "bordeaux") {
        await interaction.member.roles.remove("1016966906340704276");
        await interaction.member.roles.add("1016966938934657084");
        await pool.execute("UPDATE members SET ville = 'Bordeaux' WHERE discordid = ?", [interaction.member.id]);
        await interaction.reply({content: "Vous avez choisi le rôle *Bordeaux* !", ephemeral: true});
    }

    // BOUTONS - VERSIONS DE MINECRAFT
    else if (interaction.customId === "vanilla") {
        if (!interaction.member.roles.cache.some(r => r.id === "1017137520263311500")) {
            await interaction.member.roles.add("1017137520263311500");
            await interaction.reply({content: "Vous avez choisi le rôle *Vanilla* !", ephemeral: true});
        }
        else {
            await interaction.member.roles.remove("1017137520263311500");
            await interaction.reply({content: "Le rôle *Vanilla* vous a bien été enlevé !", ephemeral: true});
        }
    }
    else if (interaction.customId === "modded") {
        if (!interaction.member.roles.cache.some(r => r.id === "1017137564496441374")) {
            await interaction.member.roles.add("1017137564496441374");
            await interaction.reply({content: "Vous avez choisi le rôle *Moddé* !", ephemeral: true});
        }
        else {
            await interaction.member.roles.remove("1017137564496441374");
            await interaction.reply({content: "Le rôle *Moddé* vous a bien été enlevé !", ephemeral: true});
        }
    }
    else if (interaction.customId === "minijeux") {
        if (!interaction.member.roles.cache.some(r => r.id === "1027288660120449045")) {
            await interaction.member.roles.add("1027288660120449045");
            await interaction.reply({content: "Vous avez choisi le rôle *Mini-jeux* !", ephemeral: true});
        }
        else {
            await interaction.member.roles.remove("1027288660120449045");
            await interaction.reply({content: "Le rôle *Mini-jeux* vous a bien été enlevé !", ephemeral: true});
        }
    }

    // BOUTONS - PROMOS
    else if (interaction.customId.startsWith("p")) {
        for (let i in promo_roles) {
            await interaction.member.roles.remove(promo_roles[i]);
        }
        await interaction.member.roles.add(promo_roles[interaction.customId]);
        if (interaction.customId === "p-ancien") {
            await pool.execute("UPDATE members SET promo = '0' WHERE discordid = ?", [interaction.member.id]);
            await pool.execute("UPDATE members SET isAncien = '1' WHERE discordid = ?", [interaction.member.id]);
        }
        else {
            await pool.execute("UPDATE members SET promo = ? WHERE discordid = ?", [interaction.customId.replace("p", ""), interaction.member.id]);
            await pool.execute("UPDATE members SET isAncien = '0' WHERE discordid = ?", [interaction.member.id]);
        }
        await interaction.reply({content: "Vous avez choisi le rôle *" + interaction.customId.toUpperCase() + "* !", ephemeral: true})
    }
});

client.login(process.env.TOKEN);
