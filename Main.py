import hang
import random

global lives, graphicsUpdate
lives=int(6)
gamestart=0
graphicsUpdate= 0
showtext=[]

Wörterliste=[
"Algorithmus",
"API",
"Cloud",
"Datenbank",
"Debugging",
"Frontend",
"Backend",
"Netzwerk",
"Server",
"Virtualisierung",
"Container",
"DevOps",
"Verschlüsselung",
"Skripting",
"Middleware",
"Architektur",
"Benutzeroberfläche",
"Framework",
"Microservices",
"Repository"]

def generateWord(Wörterliste: list):
    rnum = random.randint(0,19)
    word: str = Wörterliste.pop(rnum)
    word = word.upper()
    listedWord = list(word)
    print(listedWord)
    return(listedWord, word)

def ShowtextEmptyslotsGenerator(word):
    for i in range(0,len(list(word))):
        showtext.append("_")
        
def guess(listedWord, word):
    graphics(graphicsUpdate,showtext)
    if lives == 0:
        death()
    else:
        letter = input("Gib bitte den Buchstaben den du raten möchtest ein:")
        letter = letter.upper()
        if letter in showtext :
            print("Letter:",letter,"alredy guessd")
            guess(listedWord,word)  
        elif letter in listedWord:
            MultipleLetterVerificationMecanism(letter=letter,listedWord=listedWord,word=word,showtext=showtext)
        elif listedWord == ['']:
            win()
        elif letter not in listedWord:
            damage(listedWord,word)
     
def MultipleLetterVerificationMecanism(letter,listedWord,word,showtext):
    for _ in range(0,len(list(word))):
        if letter in listedWord:
            posinlist = listedWord.index(letter)
            lettertoshowfound = listedWord.pop(posinlist)
            listedWord.insert(posinlist,"/")
            showtext[posinlist]= lettertoshowfound
            print(posinlist,lettertoshowfound)
        else:
            guess(listedWord=listedWord,word=word)
            
def damage(listedWord, word):
    global lives, graphicsUpdate
    print("Leider ist der Buchtabe nicht in dem Gesuchten wort! 🗡- 🗡- AUA")
    lives -= 1
    print(lives)
    graphicsUpdate += 1
    print("Du hast noch ",lives," leben")
    guess(listedWord, word)
         
def death():
    print(hang.death)
    print("You Died")
    
def graphics(graphicsUpdate, showtext):
    print(hang.man[graphicsUpdate])
    print(showtext)

def win():
    print(chr(27) + "[2J")
    print("you have won")
    
def main():
    hang.startsceen()
    listedWord, word = generateWord(Wörterliste)
    ShowtextEmptyslotsGenerator(word)
    guess(listedWord, word)
    
if __name__ == "__main__":
    main()