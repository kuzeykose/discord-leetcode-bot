const { SlashCommandBuilder } = require("discord.js");
const { getLeetCodeProblem } = require("../../helpers/leetcode");
const TurndownService = require("turndown");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    const leetCodeProblem = await getLeetCodeProblem();
    const turndownService = new TurndownService();
    const markdown = turndownService.turndown(
      leetCodeProblem.content.question.content
    );

    if (leetCodeProblem) {
      await interaction.reply(markdown);
    } else {
      await interaction.reply("Error, can't find problem");
    }
  },
};
