const fs = require('fs');
const { Client, Collection, GatewayIntentBits, ActivityType, InteractionType, InteractionResponse} = require('discord.js');
require("dotenv").config();

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
    client.user.setPresence({status: "online", activities: [{ name: "Minecraft | mc.onelots.fr | modded.onelots.fr", type: ActivityType.Playing}]});
});

client.on('interactionCreate', async interaction => {
    if (interaction.isButton()) {
        // BOUTON - ACCEPTER LE REGLEMENT
        if (interaction.customId === "accept-rules") {
            if (await interaction.member.roles.cache.has("1018926458632146995")) {
                await interaction.reply({content: "Vous avez déjà accepté le règlement !", ephemeral: true});
                return;
            }
            await interaction.member.roles.add("1018926458632146995");
            await interaction.reply({content: "**Bienvenue sur Efrei Craft !**\nVa dans <#1016986910268346379> pour choisir tes rôles !", ephemeral: true})
        }

        // BOUTONS - VILLES
        else if (interaction.customId === "paris") {
            await interaction.member.roles.remove("1016966938934657084");
            await interaction.member.roles.add("1016966906340704276");
            await interaction.reply({content: "Vous avez choisi le rôle *Paris* !", ephemeral: true});
        }
        else if (interaction.customId === "bordeaux") {
            await interaction.member.roles.remove("1016966906340704276");
            await interaction.member.roles.add("1016966938934657084");
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
            await interaction.reply({content: "Vous avez choisi le rôle *" + interaction.customId.toUpperCase() + "* !", ephemeral: true})
        }
        return;
    }

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.login(process.env.TOKEN);
