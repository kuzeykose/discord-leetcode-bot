const fs = require("node:fs");
const path = require("node:path");
require("dotenv").config();
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const { getLeetCodeProblem } = require("./helpers/leetcode");
const cron = require("node-cron");
const { linkButtonCreator, htmlToMarkdown } = require("./helpers/message");
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
  console.log("Client ready!");

  // Get leet code problem every 02:00 on Monday. -> 0 2 * * 0
  cron.schedule("0 2 * * 0", async () => {
    const leetCodeProblem = await getLeetCodeProblem();
    const content = htmlToMarkdown(leetCodeProblem.content.question.content);

    const buttonRow = linkButtonCreator(
      leetCodeProblem.title.question.titleSlug
    );

    const channel = client.channels.cache.get(process.env.CHANNEL_ID);
    channel.send({ content, components: [buttonRow] });
  });
});

client.login(process.env.DISCORD_TOKEN);
