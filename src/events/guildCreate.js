import SlashCommands from '../utils/slashCommands.js';

export default class GuildCraete extends SlashCommands {
  constructor(client) {
    super();
    this.client = client;
  }

  run = guild => {
    this.registerInteractions(guild);
  };
}
