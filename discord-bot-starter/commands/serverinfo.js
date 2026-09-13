const {
  SlashCommandBuilder,
  EmbedBuilder,
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Shows information about this Discord server.'),

  async execute(interaction) {
    const guild = interaction.guild;

    const embed = new EmbedBuilder()
      .setTitle(guild.name)
      .setThumbnail(guild.iconURL({ size: 256 }))
      .addFields(
        { name: 'Server ID', value: guild.id, inline: true },
        { name: 'Members', value: String(guild.memberCount), inline: true },
        { name: 'Owner', value: `<@${guild.ownerId}>`, inline: true },
        {
          name: 'Created',
          value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`,
        },
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
