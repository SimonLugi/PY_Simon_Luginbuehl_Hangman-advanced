const { runServer } = require('./server');
const hang = require('./hang');

let lives, graphicsUpdate, out, showtext, alreadyguessLetter;

function web() {
    runServer();
}

function reset() {
    lives = 6;
    graphicsUpdate = 0;
    showtext = [];
    out = "";
    alreadyguessLetter = [];
}

function playagain() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readline.question("Do you want to play again? Yes/No: ", (inx) => {
        inx = inx.toUpperCase();
        if (inx === "YES") {
            readline.close();
            main();
        } else if (inx === "NO") {
            readline.close();
            process.exit(0);
        } else {
            console.log("Invalid input, try again");
            readline.close();
            playagain();
        }
    });
}

function generateWord(Wörterliste) {
    const rnum = Math.floor(Math.random() * 96);
    console.log(rnum);
    const word = Wörterliste.splice(rnum, 1)[0].toUpperCase();
    const listedWord = word.split('');
    const wortlänge = listedWord.length;
    return [listedWord, word];
}

function ShowtextEmptyslotsGenerator(word) {
    showtext = Array(word.length).fill("_");
}

function guess(listedWord, word) {
    if (showtext.join('') === word) {
        win();
    } else if (lives === 0) {
        death();
    }
    graphics(graphicsUpdate, showtext);
    
    const sel = "B";
    if (sel === "B") {
        guessLetter(listedWord, word);
    } else if (sel === "W") {
        guessWord(listedWord, word);
    } else {
        console.log("Invalid input, try again!");
        guess(listedWord, word);
    }
}

function guessWord(listedWord, word) {
    if (showtext.join('') === word) {
        win();
    } else if (lives === 0) {
        death();
    } else {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question("Please enter the word you want to guess: ", (wordguess) => {
            wordguess = wordguess.toUpperCase();
            letter = "/";
            if (wordguess === word) {
                readline.close();
                win();
            } else {
                readline.close();
                damage(listedWord, word);
            }
        });
    }
}

function guessLetter(listedWord, word) {
    if (showtext.join('') === word) {
        win();
    } else if (lives === 0) {
        death();
    } else {
        readline.question("Please enter the letter you want to guess: ", (inputLetter) => {
            letter = inputLetter.toUpperCase();
            if (alreadyguessLetter.includes(letter)) {
                console.log("Letter:", letter, "already guessed");
                alreadyguessLetter.push(letter);
                readline.close();
                guess(listedWord, word);
            } else if (letter === word) {
                readline.close();
                win();
            } else if (listedWord.includes(letter)) {
                readline.close();
                MultipleLetterVerificationMecanism(letter, listedWord, word, showtext);
            } else {
                readline.close();
                damage(listedWord, word);
            }
        });
    }
}

function MultipleLetterVerificationMecanism(letter, listedWord, word, showtext) {
    for (let i = 0; i < word.length; i++) {
        if (listedWord.includes(letter)) {
            const posinlist = listedWord.indexOf(letter);
            const lettertoshowfound = listedWord[posinlist];
            listedWord[posinlist] = "/";
            showtext[posinlist] = lettertoshowfound;
            alreadyguessLetter.push(letter);
        } else {
            guess(listedWord, word);
            return;
        }
    }
    guess(listedWord, word);
}

function damage(listedWord, word) {
    console.log("Unfortunately, the letter or word is not part of the word! 🗡- 🗡- OUCH");
    lives--;
    graphicsUpdate++;
    alreadyguessLetter.push(letter);
    console.log("You have", lives, "lives left");
    guess(listedWord, word);
}

function death() {
    console.log(hang.death);
    console.log("You Died");
    console.log(hang.dragon);
    setTimeout(() => {
        console.clear();
        playagain();
    }, 1000);
}

function graphics(graphicsUpdate, showtext) {
    console.log(hang.man[graphicsUpdate]);
    const dys = [...showtext];
    let out = " ";
    for (let i = 0; i < showtext.length; i++) {
        const le = dys.shift();
        out += le + " ";
    }
    console.log("Word:", out);
}

function win() {
    console.clear();
    console.log(hang.win);
    let count = 0;
    const interval = setInterval(() => {
        console.log("\n");
        count++;
        if (count >= 20) {
            clearInterval(interval);
            playagain();
        }
    }, 125);
}

function singelplayer() {
    const Wörterliste = hang.Wörterliste;
    const [listedWord, word] = generateWord(Wörterliste);
    ShowtextEmptyslotsGenerator(word);
    guess(listedWord, word);
}

function doubleplayer() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readline.question("Enter the word for your partner to guess: ", (inword) => {
        console.clear();
        const word = inword.toUpperCase();
        const listedWord = word.split('');
        ShowtextEmptyslotsGenerator(word);
        readline.close();
        guess(listedWord, word);
    });
}

function main() {
    hang.startsceen();
    reset();
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readline.question("Welcome to HANGMAN! What do you want to play?\nM for Multiplayer, S for Singleplayer: ", (inpex) => {
        inpex = inpex.toUpperCase();
        if (inpex === "M") {
            readline.close();
            doubleplayer();
        } else if (inpex === "S") {
            readline.close();
            singelplayer();
        } else {
            console.clear();
            console.log("Invalid input, try again!\n\n");
            readline.close();
            main();
        }
    });
}

if (require.main === module) {
    main();
}

