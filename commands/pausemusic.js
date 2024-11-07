const { SlashCommandBuilder } = require('@discordjs/builders');
const { Player } = require('discord-music-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pausemusic')
        .setDescription('Pauses the currently playing music'),
    async execute(interaction) {
        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) {
            return interaction.reply('You need to be in a voice channel to pause music!');
        }

        const player = new Player(interaction.client, {
            leaveOnEmpty: false,
        });

        const queue = player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) {
            return interaction.reply('There is no music currently playing!');
        }

        queue.setPaused(true);
        await interaction.reply('Music has been paused.');
    },
};
