import process from 'node:process';
import { Client, Collection } from 'discord.js';
import dotenv from 'dotenv';
import fs from 'fs-extra';
import Intents from './constants/discord/intents.js';

dotenv.config();

const client = new Client(Intents);
const eventFiles = fs.readdirSync(`${process.cwd()}/src/events`).filter(file => file.endsWith('.js'));
const commandFiles = fs.readdirSync(`${process.cwd()}/src/commands`).filter(file => file.endsWith('.js'));

client.commands = new Collection();

commandFiles.forEach(async file => {
  const commandFile = await import(`./commands/${file}`).then(c => c.default);
  const command = new commandFile(client);
  client.commands.set(command.name, command);
});

eventFiles.forEach(async file => {
  let eventName = file.split('.')[0];
  let event = await import(`./events/${file}`).then(e => e.default);
  let eventClass = new event(client);

  client.on(eventName, eventClass.run.bind());
});

client.login(process.env.CLIENT_TOKEN);
