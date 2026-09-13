const { Events, MessageFlags } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,

  async execute(interaction) {
    // Ignore buttons, menus, autocomplete, etc. for now.
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`No command matching /${interaction.commandName} was found.`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);

      const errorMessage = {
        content: 'There was an error while running that command.',
        flags: MessageFlags.Ephemeral,
      };

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(errorMessage);
      } else {
        await interaction.reply(errorMessage);
      }
    }
  },
};
