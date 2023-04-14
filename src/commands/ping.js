import { SlashCommandBuilder, EmbedBuilder } from '@discordjs/builders';
import { PermissionsBitField } from 'discord.js';

import colors from '../constants/discord/colors.js';

export default class Ping {
  constructor(client) {
    this.client = client;
    this.name = 'ping';
    this.description = 'Pong!';
    this.usage = '/ping';
    this.permission = PermissionsBitField.Flags.SendMessages;
    this.data = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .setDefaultMemberPermissions(this.permission);
  }

  run = interaction => {
    let { ws } = interaction.client;

    let discordLatency = ws.ping;
    let botLatency = Math.abs(Date.now() - interaction.createdTimestamp);

    const response = new EmbedBuilder().setColor(colors.information).addFields(
      {
        name: 'Discord Latency',
        value: `${discordLatency}ms.`,
        inline: true,
      },
      {
        name: 'Bot Latency',
        value: `${botLatency}ms.`,
        inline: true,
      },
    );

    interaction.reply({ embeds: [response], ephemeral: true });
  };
}
