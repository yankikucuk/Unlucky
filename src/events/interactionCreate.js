/* eslint-disable no-console */

import { EmbedBuilder } from '@discordjs/builders';
import colors from '../constants/discord/colors.js';
import emojis from '../constants/discord/emojiList.js';

export default class InteractionCreate {
  constructor(client) {
    this.client = client;
  }

  run = interaction => {
    if (interaction.isCommand()) {
      let command = this.client.commands.get(interaction.commandName);
      if (command) {
        if (interaction.member.permissions.has(command.permission)) {
          try {
            command.run(interaction, emojis);
          } catch (e) {
            console.log(e);
          }
        } else {
          let response = new EmbedBuilder()
            .setColor(colors.warning)
            .setDescription(`You do not have permission to use this command.`);

          interaction.reply({ embeds: [response] });
        }
      }
    }
  };
}
