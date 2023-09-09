const { SlashCommandBuilder } = require("discord.js");
const { getLeetCodeProblem } = require("../../helpers/leetcode");
const TurndownService = require("turndown");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    await interaction.deferReply();
    const leetCodeProblem = await getLeetCodeProblem();
    const turndownService = new TurndownService();
    const markdown = turndownService.turndown(
      leetCodeProblem.content.question.content
    );

    if (leetCodeProblem) {
      await interaction.editReply(markdown);
    } else {
      await interaction.editReply("Error, can't find problem");
    }
  },
};
