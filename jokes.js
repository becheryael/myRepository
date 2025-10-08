const fs = require('fs');
const {Joke} = require('bee-jokes');
const Chance = require('chance');

const loadJokes = () => {
    try {
        const dataBuffer = fs.readFileSync('jokes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return [];
    }
};

const addJoke = () => {
    const jokes = loadJokes();
    const joke = new Joke();
    const chance = new Chance();

    let randomJoke;
    let name;
    let duplicateJoke;
    let duplicateName;

    do {
        randomJoke = joke.getRandomJoke('en').joke;
        duplicateJoke = jokes.find((joke) => joke.joke === randomJoke);
    }
    while (duplicateJoke);  

    do {
        name = chance.name();
        duplicateName = jokes.find((joke) => joke.name === name);
    }
    while (duplicateName);

    const age = chance.age();
    const newJoke = {
        name: name,
        age: age,
        joke: randomJoke
    }

    jokes.push(newJoke);
    saveJokes(jokes);
};

const addByCategory = (category) => {
    const jokes = loadJokes();
    const joke = new Joke();
    const chance = new Chance();
    const allCategories = joke.getCategories();
    
    const doesCatergoryExist = allCategories.find((listItem) => listItem.name === category);

    if (doesCatergoryExist) {
        let categoryJoke;
        let duplicateJoke;
            
        do {
            categoryJoke = joke.getJoke({ category: category, lang: 'en'}).joke;
            duplicateJoke = jokes.find((joke) => joke.joke === categoryJoke);
        }
        while (duplicateJoke);

        const name = chance.name();
        const age = chance.age();
        const newJoke = {
            name: name,
            age: age,
            joke: categoryJoke
        }
    
        jokes.push(newJoke);
        saveJokes(jokes);
    } else {
        console.log("that is not a valid category");
    }
};

const removeJoke = (name) => {
    const jokes = loadJokes();
    const jokesToKeep = jokes.filter((joke) => joke.name !== name);

    if (jokes.length > jokesToKeep.length) {
        console.log('Joke removed!');
        saveJokes(jokesToKeep);
    } else {
        console.log('No joke found!');
    }  
};

const listJokes = () => {
    const jokes = loadJokes();
    console.log('Your jokes:');

    jokes.forEach((joke) => {
        console.log(joke.joke);
    });
};

const findJoke = (name) => {
    const jokes = loadJokes();
    const joke = jokes.find((joke) => joke.name === name);

    if (joke) {
        console.log(joke.joke);
    } else {
        console.log('Joke not found!');
    }
};

const saveJokes = (jokes) => {
    const dataJSON = JSON.stringify(jokes);
    fs.writeFileSync('jokes.json', dataJSON);
};

module.exports = {
    addJoke: addJoke,
    addByCategory: addByCategory,
    removeJoke: removeJoke,
    listJokes: listJokes,
    findJoke: findJoke
}