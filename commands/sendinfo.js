const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, InteractionType } = require('discord.js');

const channelInfos = {
    "bienvenue": [
        new EmbedBuilder()
            .setColor(0x00a1e0)
            .setTitle("Efrei Craft")
            .setThumbnail("https://avatars.githubusercontent.com/u/113559229")
            .setDescription("**Bienvenue** sur le serveur d’Efrei Craft ! L’équipe te remercie d’avoir fait le pas et de nous avoir rejoint, nous espérons que tu trouveras ici ce que tu es venu chercher : *des potes sur Minecraft*")
            .addFields(
                {
                    name: "\u200B",
                    value: "📜 *Règles :*\n" +
                        "Pour permettre au serveur de rester un endroit sympa et safe, chacun se doit de respecter quelques règles :"
                },
                {
                    name: "\u200B",
                    value: "> :one: (Bonne ambiance) implique (respect) et (bienveillance). Si la table de vérité le dit, c’est que ça doit être vrai 😉"
                },
                {
                    name: "\u200B",
                    value: "> :two: Comme vous l’avez toujours su, insultes et autres intimidations ne sont en aucun cas tolérées sur le serveur, **Ce n’est pas gentil d’être méchant !**"
                },
                {
                    name: "\u200B",
                    value: "> :three: Bien entendu, Aucune discrimination et autres insultes, que ce soit sur la condition physique, les croyances ou autres, n’est tolérée sur le serveur. (~~Les crackés on vous voit~~)"
                },
                {
                    name: "\u200B",
                    value: "> :four: Gardez pour vous le contenu un peu trop douteux (NSFW interdit) : on veut pouvoir ouvrir son discord sans avoir peur de devoir expliquer à ses profs ou à ses proches que l'on ne participe pas à des activités illégales \:) pour rester concentré sur le minage il est préférable de préserver sa santé mentale !"
                },
                {
                    name: "\u200B",
                    value: "> :five: **SPAM mentions et SPAM interdit**, un salon est dédié aux memes et au shitpost, veillez à respecter le rôle des différents salons afin de permettre au serveur d’être le plus accessible possible."
                },
                {
                    name: "\u200B",
                    value: "> :six: Si tu remarques un manquement au règlement, ou que tu ressens le besoin de nous informer d’un problème sur le serveur, contactes nous via <#1019682214574817280> ou via MP."
                },
                {
                    name: "\u200B",
                    value: "> :seven: Les admins se réservent le droit de modifier les règles précédemment énoncées à tout moment : la résolution des problèmes nous étant communiqués et n’ayant pas de solution dans les règles actuelles sera faite à la discrétion des administrateurs du serveur."
                },
                {
                    name: "\u200B",
                    value: "Enfin, nous espérons que vous passerez de bons moments avec nous sur Efrei Craft !"
                }
            ),
        new EmbedBuilder()
            .setColor(0x00a1e0)
            .setTitle("Nos partenaires")
            .setThumbnail("https://avatars.githubusercontent.com/u/113559229")
            .setDescription("Les différentes associations sans qui nous n'existerions pas !")
            .addFields(
                {
                    name: "\u200B",
                    value: "<:onepantheon:1098330912908906546> **One Pantheon**\n" +
                        "> 🌐 **Site web** : https://onepantheon.fr\n" +
                        "> 📺 **Discord** : https://discord.gg/rnQfXBnDZX\n" +
                        "> L'association dont nous sommes pôle. Ils nous accordent notre budget et nous permettent d'organiser des évènements dans l'Efrei !"
                },
                {
                    name: "\u200B",
                    value: "<:clubrezo:1098331946540605541> **Club-Rézo**\n" +
                        "> 🌐 **Site web** : https://club-rezo.net\n" +
                        "> 📺 **Discord** : https://discord.gg/ZAAs87dV9v\n" +
                        "> L'association qui nous héberge nos serveurs Minecraft ainsi que toute notre infrasctructure !"
                }
            ),
        new EmbedBuilder()
            .setColor(0x00a1e0)
            .setTitle("Nos réseaux")
            .setThumbnail("https://avatars.githubusercontent.com/u/113559229")
            .setDescription("Retrouvez-nous sur les différents réseaux sociaux !")
            .addFields(
                {
                    name: "\u200B",
                    value: "<> **Twitter**\n" +
                        "> 🌐 **Site web** : [efreicraft.fr](https://efreicraft.fr)\n" +
                        "> 🖼️ **Instagram** : [@efreicraft](https://instagram.com/efreicraft)\n" +
                        "> 💼 **LinkedIn** : [@efreicraft](https://linkedin.com/company/efreicraft)\n" +
                        "> 💻 **GitHub** : [@efrei-craft](https://github.com/efrei-craft)\n" +
                        "> 💬 **Discord** : https://discord.gg/5kfu9D69AJ"
                }
            )
    ],
    "infos": [
        new EmbedBuilder()
            .setColor(0x00a1e0)
            .setTitle("Efrei Craft - Serveurs")
            .setThumbnail("https://avatars.githubusercontent.com/u/113559229")
            .setDescription("Rejoignez les serveurs d'Efrei Craft :")
            .addFields(
                {
                    name: "\u200B",
                    value: "🖥️ **IP principale :** `efreicraft.fr`\n\n" +
                        "<:minecraft:1016990742419357786> *Minecraft Vanilla :*\n" +
                        "> ❤️ **Type** : ``Survie``\n" +
                        "> 🗂️ **Version** : ``1.20/1.20.1``\n\n" +
                        "<:red_bed:1027288341248475136> *Mini-jeux :*\n" +
                        "> 🕹️ Découvrez nos nouveaux mini-jeux\n" +
                        "> 🗂️ **Version** : ``1.19.3+``\n\n" +
                        "<:forge:1018855440337096765> *Minecraft Moddé :*\n" +
                        "> ❤️ **Type** : ``Survie Moddée``\n" +
                        "> 📦 **Modpack** : [Create Arcane Engineering](https://www.curseforge.com/minecraft/modpacks/create-arcane-engineering)\n" +
                        "> 🗂️ **Version du jeu** : ``1.18.2``\n" +
                        "> 🧬 **Version du modpack** : ``0.1.7``\n" +
                        "> 🖥️ **IP du serveur :** `modded.efreicraft.fr`"
                }
            )
    ],
    "new-members": [
        new EmbedBuilder()
            .setColor(0x00a1e0)
            .setTitle("Efrei Craft")
            .setThumbnail("https://avatars.githubusercontent.com/u/113559229")
            .addFields(
                {
                    name: "\u200B",
                    value: "Pour obtenir tes rôles, clique sur le bouton ci-dessous !\n\n" +
                        "> Il te sera demandé ton nom et ton prénom.\n" +
                        "> \u200B\n> Si tu as une question, n'hésite pas à contacter un membre du Bureau pour lui demander !"
                }
            )
    ],
    "lxp": [
        new EmbedBuilder()
            .setColor(0x00a1e0)
            .setTitle("Barème Learning XP")
            .addFields(
                {
                    name: "\u200B",
                    value: "<:builder:1080087585445118003> **Pôle Build :**\n" +
                        "> :one: à :four: points par map (en fonction de la taille et de la qualité)\n\n" +
                        "<:server:1080087318918074438> **Pôle Dev :**\n" +
                        "> :one: à :five: points par plugin/mini-jeu (en fonction de la difficulté estimée)\n\n" +
                        "<:rainbow_eye:1080753652400140349> **Pôle Design :**\n" +
                        "> :one: à :three: points par design réalisé\n" +
                        "> Jusqu'à :two: points par annonce\n\n" +
                        "<:efrei_color:1017002709032906812> **JPO :**\n" +
                        "> :five: points par JPO\n\n" +
                        "<:logoec:1031265315142770718> **Participation :**\n" +
                        "> :one: à :three: points de participation générale\n" +
                        "> :one: à :three: points de participation aux événements\n" +
                        "> Les points d'événement seront précisés pour chaque événement\n\n" +
                        "***Il est rappelé que ce barême est donné à titre indicatif uniquement, les points sont distribués à la seule discrétion du Bureau.***"
                }
            )
    ]
}

const channelComponents = {
    "infos": [
        new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("bind-mc")
                    .setLabel("Lier mon compte Minecraft")
                    .setStyle(ButtonStyle.Success)
                    .setEmoji("🔗")
            )
    ],
    "new-members": [
        new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("memberize")
                    .setLabel("Compléter mon profil")
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji("👤")
            )
    ]
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sendinfo')
        .setDescription('Envoie les infos spécifiques au channel')
        .addStringOption(option => option.setName("channel").setRequired(true).setAutocomplete(true).setDescription("Nom du du channel d'info")),
    async execute(interaction) {
        if (interaction.isAutocomplete()) { // Autocomplete command
            if (interaction.type === InteractionType.ApplicationCommandAutocomplete) {
                const focusedValue = interaction.options.getFocused();
                const choices = Object.keys(channelInfos);
                const filtered = choices.filter(choice => choice.startsWith(focusedValue));
                await interaction.respond(
                    filtered.map(choice => ({ name: choice, value: choice })),
                );
            }
        }
        else { // Execute command
            const channelName = interaction.options.getString("channel");
            const channel = interaction.channel;
            await channel.send({ embeds: channelInfos[channelName], components: channelComponents[channelName] });
            await interaction.reply({content: "**Message envoyé avec succès !**", ephemeral: true})
        }
    },
};
