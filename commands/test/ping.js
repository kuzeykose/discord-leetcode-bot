const { SlashCommandBuilder } = require("discord.js");
const { getLeetCodeProblem } = require("../../helpers/leetcode");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    const leetCodeProblem = await getLeetCodeProblem(); // promise.all
    const problemContent = leetCodeProblem[0];
    const problemHints = leetCodeProblem[1];
    const problemTitle = leetCodeProblem[2];

    if (leetCodeProblem) {
      console.log(problemTitle);
      await interaction.reply(problemContent?.question?.content);
    } else {
      await interaction.reply("Error, can't find problem");
    }
  },
};
