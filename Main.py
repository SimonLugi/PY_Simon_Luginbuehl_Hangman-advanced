import hang
import random

lives=int(6)
gamestart=0
gpUpdate= 0
shtext=[]

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

def showgen(word):
    for i in range(0,len(list(word))):
        shtext.append("_")
        
def guess(listedWord, word):
    graphics(gpUpdate,shtext)
    letter = input("Gib bitte den Buchstaben den du raten möchtest ein:")
    letter = letter.upper()
    if letter in listedWord:
        tfmi(letter=letter,listedWord=listedWord,word=word,shtext=shtext)
    elif listedWord ==  []:
        win()
    elif letter not in listedWord:
        damage(listedWord,word,lives,gpUpdate)
    #elif letter in shtext :
        
def tfmi(letter,listedWord,word,shtext):
    for _ in range(0,len(list(word))):
        if letter in listedWord:
            posinlist = listedWord.index(letter)
            lettertoshowfound = listedWord.pop(posinlist)
            listedWord.insert(posinlist,"/")
            shtext[posinlist]= lettertoshowfound
            print(posinlist,lettertoshowfound)
        else:
            guess(listedWord=listedWord,word=word)
            
def damage(listedWord, word, lives, gpUpdate):
    if lives == 0:
        death()
    else:           
        print("Leider ist der Buchtabe nicht in dem Gesuchten wort! 🗡- 🗡- AUA")
        lives = lives - 1
        gpUpdate = gpUpdate + 1
        print("Du hast noch ",lives," leben")
        guess(listedWord,word)
    return(gpUpdate,lives)
        
        
def death():
    print(hang.death)
    print("You Died")
    
def graphics(gpUpdate, shtext):
    print(hang.man[gpUpdate])
    print(shtext)

def win():
    print(chr(27) + "[2J")
    print("you have won")
    
def main():
    hang.startsceen()
    listedWord, word = generateWord(Wörterliste)
    showgen(word)
    guess(listedWord, word)
    
if __name__ == "__main__":
    main()