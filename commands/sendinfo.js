const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, InteractionType } = require('discord.js');

const channelInfos = {
    "bienvenue": [
        new EmbedBuilder()
            .setColor(0x00a1e0)
            .setTitle("Efrei Craft")
            .setThumbnail("https://avatars.githubusercontent.com/u/113559229")
            .setDescription("**Bienvenue** sur le serveur d’Efrei Craft, le serveur discord de l’association du même nom ! L’équipe te remercie d’avoir fait le pas et de nous avoir rejoint, nous espérons que tu trouveras ici ce que tu es venu chercher : *des potes sur Minecraft* ! ")
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
                    value: "Enfin, nous espérons que vous passerez de bons moments avec nous sur Efrei Craft !\n" +
                        "Veuillez cliquer sur le bouton ci-dessous si vous acceptez le réglement.\n" +
                        "Puis allez dans <#1016986910268346379> pour choisir vos rôles !"
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
                    value: "<:minecraft:1016990742419357786> *Minecraft Vanilla :*\n\n" +
                        "> **IP** : ``mc.onelots.fr``\n" +
                        "> **Version du jeu** : ``1.12.2``\n\n" +
                        "<:forge:1018855440337096765> *Minecraft Moddé :*\n\n" +
                        "> **IP** : ``modded.onelots.fr``\n" +
                        "> **Version du jeu** : ``1.16.5``\n" +
                        "> **Modpack** : ``Enigmatica 6``\n" +
                        "> **Version du Modpack** : ``1.5.1 (dernière version)``"
                }
            )
    ],
    "roles": [
        new EmbedBuilder()
            .setColor(0x00a1e0)
            .setTitle("Efrei Craft - Roles")
            .setThumbnail("https://avatars.githubusercontent.com/u/113559229")
            .setDescription("Choisissez vos rôles !")
            .addFields(
                {
                    name: "\u200B",
                    value: "🏙️ *Votre ville :*\n\n" +
                        "> <:paris:1016994352255475732> **Paris** \u200B \u200B <:bordeaux:1016994287696756816> **Bordeaux**"
                },
                {
                    name: "\u200B",
                    value: "🏫 *Votre promo :*\n\n" +
                        "> :three: **2023** \u200B \u200B :four: **2024** \u200B \u200B :five: **2025**\n" +
                        "> \u200B\n> :six: **2026** \u200B \u200B :seven: **2027** \u200B \u200B :technologist: **Ancien**"
                },
                {
                    name: "\u200B",
                    value: "🎮 *Version du jeu :*\n\n" +
                        "> <:minecraft:1016990742419357786> **Vanilla** \u200B \u200B <:forge:1018855440337096765> **Moddé**"
                }
            )
    ],
    "lxp": [
        new EmbedBuilder()
            .setColor(0x00a1e0)
            .setTitle("Le Learning XP par rapport à la PAVE")
            .setDescription("Les différences entre Learning XP et PAVE")
            .addFields(
                {
                    name: "\u200B",
                    value: ":large_blue_diamond: *Ce qui ne change pas :*\n\n" +
                        "> :one: Les points Learning XP correspondent à une **note semestrielle sur 20**.\n" +
                        "> \u200B\n> :two: Des points seront attribués aux étudiants en fonction de leur investissement.\n" +
                        "> \u200B\n> :three: Pour **prétendre à des points associations** : obligation d’être en règle auprès des ASSOCIATIONS : cotisation payée, licence à jour"
                },
                {
                    name: "\u200B",
                    value: ":large_orange_diamond: *Ce qui change :*\n\n" +
                        "> :one: Les activités proposées sont plus **diversifiées et nombreuses**.\n" +
                        "> \u200B\n> :two: Les points Learning XP sont distribués sous forme de Quest\n" +
                        "> **1 quest = 1 point = 1/20**\n" +
                        "> **1 quest = 2 points = 2/20**\n" +
                        "> **1 quest = 3 points = 3/20**\n" +
                        "> \u200B\n> :three: L’obtention de points ne permet pas de prétendre à un bonus sur une UE.\n" +
                        "> \u200B\n> :four: Les étudiants de Licences et Masters ont **une action Promotion obligatoire** à réaliser à chaque semestre.\n" +
                        "> Exemple : une JPO, un salon étudiant..."
                }
            ),
        new EmbedBuilder()
            .setColor(0x00a1e0)
            .setTitle("Barème Learning XP PGE")
            .setDescription("Les Sidequests")
            .setImage("https://media.discordapp.net/attachments/1019171895435857930/1024718144436178984/unknown.png")
            .addFields(
                {
                    name: "\u200B",
                    value: "❓ *Qu'est-ce que c'est ?*\n\n" +
                        "> :small_orange_diamond: 20 points cumulables à définir selon tes envies.\n" +
                        "> \u200B\n> :small_orange_diamond: **ATTENTION** : Une action promotion obligatoire par semestre (JPO, Salon étudiant...)"
                },
                {
                    name: "\u200B",
                    value: "🏫 *XP For SCHOOL :*\n\n" +
                        "> :small_blue_diamond: **Associations membres** - :three: max\n" +
                        "> :small_blue_diamond: **Associations Bureau restreint** - :keycap_ten: et +\n" +
                        "> :small_blue_diamond: **Délégué de classe, Référent technique** - :five:\n" +
                        "> :small_blue_diamond: **Ambassadeur Social Média** - :five:\n" +
                        "> :small_blue_diamond: **Action Promotion** - :five:"
                },
                {
                    name: "\u200B",
                    value: "💻 *XP For PRO :*\n\n" +
                        "> :small_blue_diamond: **Salons Professionnels** - :two:\n" +
                        "> :small_blue_diamond: **Conférences et Tables rondes EFREI** - :one:"
                },
                {
                    name: "\u200B",
                    value: "🕹️ *XP For Challenge :*\n\n" +
                        "> :small_blue_diamond: **Certifications professionelles** - De :two: à :four:\n" +
                        "> :small_blue_diamond: **Gamejams, Hackatons, Challenges étudiants** - :four:"
                },
                {
                    name: "\u200B",
                    value: "📂 *XP For OPEN :*\n\n" +
                        "> :small_blue_diamond: **Innovation Lab, Nouveaux projets** - :three: max"
                },
                {
                    name: "\u200B",
                    value: "☀️ *XP For GOOD :*\n\n" +
                        "> :small_blue_diamond: **EFREI FOR GOOD** - :two:\n" +
                        "> :small_blue_diamond: **Conférences XP for good** - :two:\n" +
                        "> :small_blue_diamond: **Outsidequest** - :keycap_ten: et +"
                },
                {
                    name: "\u200B",
                    value: "🎓 *XP For PGE :*\n\n" +
                        "> :small_blue_diamond: **Journées dédiées (Participation)** - :three:\n" +
                        "> :small_blue_diamond: **Journées dédiées (Animation)** - :five:\n" +
                        "> :small_blue_diamond: **Learning XP Week** - :five:"
                }
            )
    ]
}

const channelComponents = {
    "bienvenue": [
        new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("accept-rules")
                    .setLabel("J'accepte le règlement")
                    .setStyle(ButtonStyle.Success)
                    .setEmoji("💯")
            )
    ],
    "roles": [
        new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("paris")
                    .setLabel("Paris")
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji("1016994352255475732"),
                new ButtonBuilder()
                    .setCustomId("bordeaux")
                    .setLabel("Bordeaux")
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji("1016994287696756816")
            ),
        new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("p2023")
                    .setLabel("2023")
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji("3️⃣"),
                new ButtonBuilder()
                    .setCustomId("p2024")
                    .setLabel("2024")
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji("4️⃣"),
                new ButtonBuilder()
                    .setCustomId("p2025")
                    .setLabel("2025")
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji("5️⃣"),
                new ButtonBuilder()
                    .setCustomId("p2026")
                    .setLabel("2026")
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji("6️⃣"),
                new ButtonBuilder()
                    .setCustomId("p2027")
                    .setLabel("2027")
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji("7️⃣")
            ),
        new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("p-ancien")
                    .setLabel("Ancien")
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji("🧑‍💻")
            ),
        new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("vanilla")
                    .setLabel("Vanilla")
                    .setStyle(ButtonStyle.Success)
                    .setEmoji("1016990742419357786"),
                new ButtonBuilder()
                    .setCustomId("modded")
                    .setLabel("Moddé")
                    .setStyle(ButtonStyle.Success)
                    .setEmoji("1018855440337096765")
            )
    ],
    "lxp": [
        new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("Plus d'infos")
                    .setURL("https://moodle.myefrei.fr/pluginfile.php/262481/mod_resource/content/1/Règlement%202022-2023%20étudiants%20PGE%20-%20Learning%20XP%20Obligatoire%20-%20L1%20-%20L2%20-%20L3%20-%20M1.pdf")
                    .setEmoji("ℹ️")
                    .setStyle(ButtonStyle.Link)
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
            if (interaction.member.roles.cache.some(r => r.name === "Bureau restreint")) {
                const channelName = interaction.options.getString("channel");
                const channel = interaction.channel;
                await channel.send({ embeds: channelInfos[channelName], components: channelComponents[channelName] });
                await interaction.reply({content: "**Message envoyé avec succès !**", ephemeral: true})
            }
            else {
                await interaction.reply({content: "**Vous n'avez pas la permission d'utiliser cette commande !**", ephemeral: true });
            }
        }
    },
};
