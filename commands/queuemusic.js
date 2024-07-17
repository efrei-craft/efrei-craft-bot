const { SlashCommandBuilder } = require('@discordjs/builders');
const { Player } = require('discord-music-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queuemusic')
        .setDescription('Shows the current music queue'),
    async execute(interaction) {
        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) {
            return interaction.reply('You need to be in a voice channel to view the music queue!');
        }

        const player = new Player(interaction.client, {
            leaveOnEmpty: false,
        });

        const queue = player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) {
            return interaction.reply('There is no music currently playing!');
        }

        const queueString = queue.songs.map((song, index) => `${index + 1}. ${song.name}`).join('\n');
        await interaction.reply(`Current music queue:\n${queueString}`);
    },
};
