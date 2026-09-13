require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');

// Create the Discord client.
// Guilds is all this starter needs for normal slash commands.
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// This Collection will hold every command from the commands folder.
client.commands = new Collection();

// -------------------------
// LOAD COMMANDS
// -------------------------
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.warn(`[WARNING] ${file} is missing "data" or "execute".`);
  }
}

// -------------------------
// LOAD EVENTS
// -------------------------
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// -------------------------
// LOGIN
// -------------------------
if (!process.env.DISCORD_TOKEN) {
  console.error('Missing DISCORD_TOKEN in your .env file.');
  process.exit(1);
}

client.login(process.env.DISCORD_TOKEN);
