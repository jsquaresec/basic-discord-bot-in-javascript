# Discord Bot Starter

A deliberately simple **JavaScript + discord.js** bot with a working slash-command system already installed.

## Included commands

- `/ping`
- `/hello`
- `/say message:`
- `/userinfo [user:]`
- `/serverinfo`

You can delete, rename, or rewrite all of them.

---

## 1. Requirements

Use **Node.js 24.17.0 or newer**.

Check your version:

```bash
node -v
```

## 2. Install packages

Open a terminal inside this project folder:

```bash
npm install
```

## 3. Create your `.env`

Copy:

```text
.env.example
```

and rename the copy to:

```text
.env
```

Fill in:

```env
DISCORD_TOKEN=your_bot_token
CLIENT_ID=your_application_id
GUILD_ID=your_test_server_id
```

### Where they come from

**DISCORD_TOKEN**
- Discord Developer Portal
- Your application
- Bot
- Reset/Copy Token

**CLIENT_ID**
- Discord Developer Portal
- Your application
- General Information
- Application ID

**GUILD_ID**
- Turn on Developer Mode in Discord
- Right-click your test server
- Copy Server ID

Never send your token to anyone.

---

## 4. Invite the bot

In the Discord Developer Portal:

1. Open your application.
2. Go to **OAuth2**.
3. Use the URL Generator / installation settings.
4. Give the app the `bot` and `applications.commands` scopes.
5. Invite it to your test server.

Only grant permissions your bot actually needs.

---

## 5. Register the slash commands

Run:

```bash
npm run deploy
```

Because `GUILD_ID` is in `.env`, the commands are registered to your test server while you're developing.

Run this again whenever you change:

- command name
- command description
- command options
- command permissions

You **do not** need to redeploy just because you changed what happens inside `execute()`.

---

## 6. Start the bot

```bash
npm start
```

You should see something like:

```text
Logged in as YourBot#0000
Serving 1 server(s).
```

---

# The main part you edit

Every slash command is just a file inside:

```text
commands/
```

For example:

```text
commands/ping.js
```

```js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Checks whether the bot is online.'),

  async execute(interaction) {
    await interaction.reply('Pong! 🏓');
  },
};
```

There are two important pieces.

### `data`

This defines the slash command Discord sees:

```js
data: new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Checks whether the bot is online.')
```

### `execute`

This is your JavaScript:

```js
async execute(interaction) {
  await interaction.reply('Pong! 🏓');
}
```

Change:

```js
'Pong! 🏓'
```

to anything you want.

---

# Make your own command

Copy:

```text
commands/template.js.example
```

Rename it:

```text
commands/test.js
```

Then change it to:

```js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('My test command'),

  async execute(interaction) {
    await interaction.reply('I made this command myself.');
  },
};
```

Then run:

```bash
npm run deploy
npm start
```

Now `/test` exists.

---

# Command options

Example text option:

```js
.addStringOption((option) =>
  option
    .setName('text')
    .setDescription('Enter some text')
    .setRequired(true),
)
```

Read it inside `execute()`:

```js
const text = interaction.options.getString('text');
```

Then:

```js
await interaction.reply(`You entered: ${text}`);
```

## Other useful option types

```js
.addUserOption(...)
.addRoleOption(...)
.addChannelOption(...)
.addIntegerOption(...)
.addBooleanOption(...)
.addNumberOption(...)
```

---

# Project layout

```text
discord-bot-starter/
├── commands/
│   ├── hello.js
│   ├── ping.js
│   ├── say.js
│   ├── serverinfo.js
│   ├── template.js.example
│   └── userinfo.js
├── events/
│   ├── interactionCreate.js
│   └── ready.js
├── .env.example
├── .gitignore
├── deploy-commands.js
├── index.js
├── package.json
└── README.md
```

## What each part does

**`index.js`**
Starts the bot and automatically loads command/event files.

**`commands/`**
Where you will spend most of your time.

**`events/`**
Handles Discord events.

**`interactionCreate.js`**
Figures out which slash command somebody used and runs it.

**`deploy-commands.js`**
Registers your slash-command definitions with Discord.

**`.env`**
Stores secrets and IDs. Do not commit it.

---

# When you are ready for global commands

While learning, keep:

```env
GUILD_ID=your_test_server_id
```

When you want the commands registered globally, remove `GUILD_ID` from `.env` and run:

```bash
npm run deploy
```

---

# Important learning rule

Don't rewrite `index.js` every time you want another command.

Normally, just add another file to `commands/`.

That lets you learn one command at a time without breaking the rest of the bot.
