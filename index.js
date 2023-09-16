const fs = require("node:fs");
const path = require("node:path");
require("dotenv").config();
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const { getLeetCodeProblem } = require("./helpers/leetcode");
const TurndownService = require("turndown");
const cron = require("node-cron");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

client.once(Events.ClientReady, async (c) => {
  cron.schedule("0 0 * * 1", async () => {
    const leetCodeProblem = await getLeetCodeProblem();
    const turndownService = new TurndownService();
    const markdown = turndownService.turndown(
      leetCodeProblem.content.question.content
    );

    const channel = client.channels.cache.get("1150098399073419297");
    channel.send(
      `https://leetcode.com/problems/${leetCodeProblem.title.question.titleSlug}/ \n` +
        markdown
    );
  });
});

client.login(process.env.DISCORD_TOKEN);
