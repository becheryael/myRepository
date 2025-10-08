const yargs = require('yargs');
const jokes =  require('./jokes');

yargs.command({
    command: 'add',
    describe: 'Add a joke',
    handler() {
        jokes.addJoke();
    }
});

yargs.command({
    command: 'add-by-category',
    describe: 'Add a joke by category',
    builder: {
        category: {
            describe: 'category',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        jokes.addByCategory(argv.category);
    }
});

yargs.command({
    command: 'remove',
    describe: 'Remove a joke',
    builder: {
        name: {
            describe: 'author name',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        jokes.removeJoke(argv.name);
    }
});

yargs.command({
    command: 'list',
    describe: 'List your jokes',
    handler() {
        jokes.listJokes()
    }
});

yargs.command({
    command: 'find',
    describe: 'Find a joke',
    builder: {
        name: {
            describe: 'Name of author',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        jokes.findJoke(argv.name);
    }
});

yargs.parse();