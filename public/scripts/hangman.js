var input = document.getElementById("input");
const hang = require('./hang');

function reset(){
    lives=int(6)
    graphicsUpdate= 0
    showtext=[]
    out = ""
    alreadyguessLetter=[]
}
function playagain(){
    inx = input("Do you want to play again? Yes/No{ ")
    inx = inx.toUpperCase()
    if (inx == "YES"){
        main()
    } else if (inx == "No"){
        exit(0)
    } else {
        print("Invalider input try again")
        playagain()
    }
}
function generateWord(Wörterliste ){
    const rnum = random.randint(0,95);
    console.log(rnum);
    const word = Wörterliste.splice(rnum,1)[o].toUpperCase();
    const listedWord = word.split('');
    const wortlänge = listedWord.length;
    return[listedWord, word];
}
function ShowtextEmptyslotsGenerator(word){
    for (i in range(0,len(list(word)))){
        showtext.append("_")
    }
}
function guess(listedWord, word){
    if (showtext == list(word)){
        win()
    }
    else if (lives == 0){
        death()
    }
    graphics(graphicsUpdate, showtext)
    //sel = input("Was wilst du raten? W für Wort / B für Buchstabe{") // Für überkorrekte spieler 
    sel = "B"
    sel = sel.toUpperCase()
    if (sel == "B"){
        guessLetter(listedWord, word)
    }else if (sel == "W"){
        guessWord(listedWord, word)
    }else{
        print("Invalider input versuche es erneut!")
        guess(listedWord,word)        
    }
}
function guessWord(listedWord, word){
    if (showtext == list(word)){
        win()
    }else if (lives == 0){
        death()
    }else{
        wordguess = input("Gib bitte das Wort ein das du raten möchtest ein{")
        wordguess = wordguess.toUpperCase()
        letter = "/"
        wordtest = word.toUpperCase()
        if (wordguess == wordtest){
            win()
        }else if (wordguess != wordtest){
            damage(listedWord,word)
        }
    }
}
function guessLetter(listedWord, word){
    if (showtext == list(word)){
        win()
    }else if (lives == 0){
        death()
    }else{
        letter = input("Gib bitte den Buchstaben den du raten möchtest ein{")
        letter = letter.toUpperCase()
        if (letter in alreadyguessLetter) {
            print("Letter{",letter,"already guess")
            alreadyguessLetter.append(letter) 
            guess(listedWord, word) 
        }else if (list(letter) == list(word)){
            win()
        }else if (letter in listedWord){
            MultipleLetterVerificationMecanism(letter, listedWord, word, showtext)
        }else if (!(letter in listedWord)){
            damage(listedWord,word)
        }
    }
}
function MultipleLetterVerificationMecanism(letter,listedWord,word,showtext){
    for (_ in range(0,len(list(word)))){
        if (letter in listedWord){
            posinlist = listedWord.index(letter)
            lettertoshowfound = listedWord.splice(posinlist)
            listedWord.insert(posinlist,"/")
            showtext[posinlist]= lettertoshowfound
            alreadyguessLetter.append(letter) 
        }else{
            guess(listedWord, word)
        }     
    }
}
function damage(listedWord, word){
    print("Leider ist der Buchtabe oder das Wort kein Bestantteil des Wortes! 🗡- 🗡- AUA")
    lives -= 1
    graphicsUpdate += 1
    alreadyguessLetter.append(letter) 
    print("Du hast noch ",lives," leben")
    guess(listedWord, word)
}
function death(){
    print(hang.death)
    print("You Died")
    print(hang.dragon)
    time.sleep(1)
    print(chr(27) + "[2J")
    playagain()
}
function graphics(graphicsUpdate, showtext){
    print(hang.man[graphicsUpdate])
    var dys = showtext.slice()
    out = " "
    for (i in range(len(showtext))){
        le = dys.splice(0)
        out = out + le + " "
    }
    print("Word{",out)
}
function win(){
    print(chr(27) + "[2J")
    print(hang.win)
    for (_ in range(0,20)){
        print("\n")
        time.sleep(0.125)
    }  
    playagain()
}
function singelplayer(){
    Wörterliste = hang.Wörterliste
    listedWord, word= generateWord(Wörterliste)
    ShowtextEmptyslotsGenerator(word)
    guess(listedWord, word)
}
function doubleplayer(){
    inword = input("Gib das wort ein das dein mitspieler erraten soll{")
    print(chr(27) + "[2J")
    word = inword.toUpperCase()
    listedWord = list(word)
    ShowtextEmptyslotsGenerator(word)
    guess(listedWord, word)
}
function main(){
    hang.startsceen()
    reset()
    inpex = input("Wilkommen zu HANGMAN was wilst du spielen?\n M für Multiplayer S für Singelplayer{")
    inpex = inpex.toUpperCase()
    if (inpex =="M"){
        doubleplayer()
    }else if (inpex =="S"){
        singelplayer()
    }else{
        print(chr(27) + "[2J")
        print("Invalider input versuche es erneut!\n\n")
        main()
    }
}
if (require.main === module) {
    main();
}