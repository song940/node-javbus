#!/usr/bin/env node

const pkg = require('../package');
const javbus = require('..')();

const [command, ...args] = process.argv.slice(2);

const pad = (str, n = 10) => {
  while (str.length < n) {
    str += ' ';
  }
  return str;
}

const commands = {
  async ls(page = 1) {
    const list = await javbus.page(page);
    for (const show of list) {
      console.log(pad(show.id), show.name);
    }
  },
  async show(id) {
    const show = await javbus.show(id);
    console.log();
    console.log(show.title);
    console.log(show.cover);
    console.log();
    console.log(pad('Director', 15), show.director);
    console.log(pad('Stars', 15), show.stars.map(star => star.name).join(' / '));
    console.log(pad('Length', 15), show.length);
    console.log(pad('Release Date', 15), show.release_date);
    console.log();
    console.log('==== images ====');
    console.log();
    for (const image of show.images) {
      console.log(image);
    }
    console.log();
    const files = await javbus.magnet(show.gid);
    console.log('==== download links ====');
    for (const file of files) {
      console.log();
      console.log(file.name);
      console.log(file.size);
      console.log(file.date);
      console.log(file.link);
    }
  },
  help() {
    console.log();
    console.log(` ${pkg.name}@${pkg.version}`);
    console.log();
    console.log(' - ls');
    console.log(' - show [id]');
    console.log(' - help');
  }
};

(commands[command] || commands.help).apply(this, args);