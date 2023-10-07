const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const TurndownService = require("turndown");

function linkButtonCreator(titleSlug) {
  const button = new ButtonBuilder()
    .setLabel("LeetCode Link")
    .setURL(`https://leetcode.com/problems/${titleSlug}/`)
    .setStyle(ButtonStyle.Link);
  const row = new ActionRowBuilder().addComponents(button);

  return row;
}

function htmlToMarkdown(content) {
  const turndownService = new TurndownService();
  const markdown = turndownService.turndown(content);

  return markdown;
}

module.exports = {
  linkButtonCreator,
  htmlToMarkdown,
};
