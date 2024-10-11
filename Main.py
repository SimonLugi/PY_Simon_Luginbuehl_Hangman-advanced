import hang
import random
import time

global lives, graphicsUpdate,out,showtext,alreadyguessLetter
def reset():
    global lives, graphicsUpdate,out,showtext,alreadyguessLetter
    lives=int(6)
    graphicsUpdate= 0
    showtext=[]
    out = ""
    alreadyguessLetter=[]
    
def playagain():
    inx = input("Do you want to play again? Yes/No: ")
    inx = inx.upper()
    if inx == "YES":
        main()
    elif inx == "No":
        exit(0)
    else:
        print("Invalider input try again")
        playagain()

def generateWord(Wörterliste: list):
    global wortlänge
    rnum = random.randint(0,95)
    word: str = Wörterliste.pop(rnum)
    word = word.upper()
    listedWord = list(word)
    wortlänge = len(list(word))
    return(listedWord, word)

def ShowtextEmptyslotsGenerator(word):
    for i in range(0,len(list(word))):
        showtext.append("_")
        
def guess(listedWord, word):
    graphics(graphicsUpdate, showtext)
    sel = input("Was wilst du raten? W für Wort / B für Buchstabe:")
    sel = sel.upper()
    if sel == "B":
        guessLetter(listedWord, word)
    elif sel == "W":
        guessWord(listedWord, word)
    else:
        print("Invalider input versuche es erneut!")
        guess(listedWord,word)        
        
def guessWord(listedWord, word):
    global letter
    if showtext == list(word):
        win()
    elif lives == 0:
        death()
    else:
        wordguess = input("Gib bitte das Wort ein das du raten möchtest ein:")
        wordguess = wordguess.upper()
        letter = "/"
        wordtest = word.upper()
        if wordguess == wordtest:
            win()
        elif wordguess != wordtest:
            damage(listedWord,word)

def guessLetter(listedWord, word):
    global letter,alreadyguessLetter
    if showtext == list(word):
        win()
    elif lives == 0:
        death()
    else:
        letter = input("Gib bitte den Buchstaben den du raten möchtest ein:")
        letter = letter.upper()
        if letter in alreadyguessLetter :
            print("Letter:",letter,"alredy guessLetterd")
            alreadyguessLetter.append(letter) 
            guess(listedWord, word) 
        elif list(letter) == list(word):
            win()
        elif letter in listedWord:
            MultipleLetterVerificationMecanism(letter, listedWord, word, showtext)
        elif letter not in listedWord:
            damage(listedWord,word)

def MultipleLetterVerificationMecanism(letter,listedWord,word,showtext):
    global alreadyguessLetter
    for _ in range(0,len(list(word))):
        if letter in listedWord:
            posinlist = listedWord.index(letter)
            lettertoshowfound = listedWord.pop(posinlist)
            listedWord.insert(posinlist,"/")
            showtext[posinlist]= lettertoshowfound
            alreadyguessLetter.append(letter) 
        else:
            guess(listedWord, word)
            
def damage(listedWord, word):
    global lives, graphicsUpdate,alreadyguessLetter
    print("Leider ist der Buchtabe oder das Wort kein Bestantteil des Wortes! 🗡- 🗡- AUA")
    lives -= 1
    graphicsUpdate += 1
    alreadyguessLetter.append(letter) 
    print("Du hast noch ",lives," leben")
    guess(listedWord, word)
         
def death():
    print(hang.death)
    print("You Died")
    print(hang.dragon)
    time.sleep(1)
    print(chr(27) + "[2J")
    playagain()
    
def graphics(graphicsUpdate, showtext):
    print(hang.man[graphicsUpdate])
    dys:list = showtext[:]
    out:str = " "
    for i in range(len(showtext)):
        le = dys.pop(0)
        out = out + le + " "
    print("Word:",out)

def win():
    print(chr(27) + "[2J")
    print(hang.win)
    for _ in range(0,20):
        print("\n")
        time.sleep(0.125)  
    playagain()
    
def singelplayer():
    Wörterliste = hang.Wörterliste
    listedWord, word= generateWord(Wörterliste)
    ShowtextEmptyslotsGenerator(word)
    guess(listedWord, word)

def doubleplayer():
    inword = input("Gib das wort ein das dein mitspieler erraten soll:")
    print(chr(27) + "[2J")
    word = inword.upper()
    listedWord = list(word)
    ShowtextEmptyslotsGenerator(word)
    guess(listedWord, word)

def main():
    hang.startsceen()
    reset()
    inpex = input("Wilkommen zu HANGMAN was wilst du spielen?\n M für Multiplayer S für Singelplayer:")
    inpex = inpex.upper()
    if inpex =="M":
        doubleplayer()
    elif inpex =="S":
        singelplayer()
    else:
        print(chr(27) + "[2J")
        print("Invalider input versuche es erneut!\n\n")
        main()
        
if __name__ == "__main__":
    main()