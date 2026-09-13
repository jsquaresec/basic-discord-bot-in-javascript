require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');
const { REST, Routes } = require('discord.js');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if ('data' in command && 'execute' in command) {
    commands.push(command.data.toJSON());
  } else {
    console.warn(`[WARNING] ${file} is missing "data" or "execute".`);
  }
}

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

if (!DISCORD_TOKEN || !CLIENT_ID) {
  console.error('DISCORD_TOKEN and CLIENT_ID are required in .env.');
  process.exit(1);
}

const rest = new REST().setToken(DISCORD_TOKEN);

(async () => {
  try {
    console.log(`Refreshing ${commands.length} slash command(s)...`);

    if (GUILD_ID) {
      // Development mode:
      // Registers commands to one server so changes appear quickly.
      await rest.put(
        Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
        { body: commands },
      );

      console.log(`Registered ${commands.length} command(s) to guild ${GUILD_ID}.`);
    } else {
      // Global mode:
      // Remove GUILD_ID from .env when you're ready for every server.
      await rest.put(
        Routes.applicationCommands(CLIENT_ID),
        { body: commands },
      );

      console.log(`Registered ${commands.length} global command(s).`);
    }
  } catch (error) {
    console.error(error);
  }
})();
