import { IntentsBitField } from 'discord.js';

export default {
  intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages],
};
