const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  MessageFlags,
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Makes the bot send a message.')
    .addStringOption((option) =>
      option
        .setName('message')
        .setDescription('What should the bot say?')
        .setRequired(true),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const message = interaction.options.getString('message');

    // Reply privately so the command itself does not clutter the channel.
    await interaction.reply({
      content: 'Message sent.',
      flags: MessageFlags.Ephemeral,
    });

    await interaction.channel.send(message);
  },
};
