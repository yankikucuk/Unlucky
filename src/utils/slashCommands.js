/* eslint-disable no-console */
/* eslint-disable no-empty-function */

import process from 'node:process';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';

export default class SlashCommands {
  checkInteractions = client => {
    client.guilds.cache.forEach(async guild => {
      let commandsList = (await guild.commands.fetch().catch(() => {})) || null;

      if (commandsList instanceof Map) {
        this.registerInteractions(guild);
        if (!commandsList.hasAll(this.client.commands.map(c => c.name))) {
          this.registerInteractions(guild);
        }
      } else {
        this.registerInteractions(guild);
      }
    });
  };

  registerInteractions = async guild => {
    let { client, id } = guild;
    const rest = new REST({ version: '10' }).setToken(process.env.CLIENT_TOKEN);
    let slashCommands = client.commands.map(c => c.data);

    try {
      await rest.put(Routes.applicationGuildCommands(client.user.id, id), { body: slashCommands });
    } catch (e) {
      console.log(e);
    }
  };
}
