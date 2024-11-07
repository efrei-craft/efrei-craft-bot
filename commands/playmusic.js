const { SlashCommandBuilder } = require('@discordjs/builders');
const { Player } = require('discord-music-player');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('playmusic')
        .setDescription('Plays music in a voice channel')
        .addStringOption(option => 
            option.setName('url')
                .setDescription('The URL of the music to play')
                .setRequired(true)),
    async execute(interaction) {
        const url = interaction.options.getString('url');
        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) {
            return interaction.reply('You need to be in a voice channel to play music!');
        }

        const player = new Player(interaction.client, {
            leaveOnEmpty: false,
        });

        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });

        const song = await player.play(voiceChannel, url, {
            requestedBy: interaction.user,
        });

        await interaction.reply(`Now playing: ${song.name}`);
    },
};
