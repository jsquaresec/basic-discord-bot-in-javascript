const {
  SlashCommandBuilder,
  EmbedBuilder,
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Shows basic information about a user.')
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('The user you want information about')
        .setRequired(false),
    ),

  async execute(interaction) {
    const user = interaction.options.getUser('user') ?? interaction.user;
    const member = interaction.guild.members.cache.get(user.id);

    const embed = new EmbedBuilder()
      .setTitle(`User Info — ${user.username}`)
      .setThumbnail(user.displayAvatarURL({ size: 256 }))
      .addFields(
        { name: 'Username', value: user.username, inline: true },
        { name: 'User ID', value: user.id, inline: true },
        {
          name: 'Account Created',
          value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`,
        },
      )
      .setTimestamp();

    if (member?.joinedTimestamp) {
      embed.addFields({
        name: 'Joined This Server',
        value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`,
      });
    }

    await interaction.reply({ embeds: [embed] });
  },
};
