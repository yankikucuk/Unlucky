/* eslint-disable no-console */

import SlashCommands from '../utils/slashCommands.js';

export default class Ready extends SlashCommands {
  constructor(client) {
    super(client);
    this.client = client;
  }

  run = () => {
    console.log(`${this.client.user.tag} is ready`);
    this.checkInteractions(this.client);
  };
}
