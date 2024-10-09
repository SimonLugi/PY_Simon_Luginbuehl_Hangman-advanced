import hang
import random

lives= 6 
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


def generateWord(Wörterliste):
    rnum = random.randint(0,19)
    word = Wörterliste.pop(rnum)
    word = word.upper()
    listedWord = list(word)
    print(listedWord)
    gamestart=1
    print(gamestart)
    return(listedWord,word)

def showgen(word):
    for i in range(0,len(list(word))):
        shtext.append("_")
        
def guess(listedWord,word):
    graphics(gpUpdate,shtext)
    letter = str(input("Gib bitte den Buchstaben den du raten möchtest ein:"))
    letter = letter.upper()
    if letter in listedWord:
        tfmi(letter=letter,listedWord=listedWord,word=word,shtext=shtext)
    elif listedWord ==  []:
        win()
    elif letter not in listedWord:
        damage(lives,gpUpdate,listedWord,word)
    #elif letter in shtext :
        
def tfmi(letter,listedWord,word,shtext):
    for i in range(0,len(list(word))):
        if letter in listedWord:
            posinlist = listedWord.index(letter)
            lettertoshowfound = listedWord.pop(posinlist)
            listedWord.insert(posinlist,"/")
            shtext[posinlist]= lettertoshowfound
            print(posinlist,lettertoshowfound)
        else:
            guess(listedWord=listedWord,word=word)
            
def damage(listedWord,word,lives=lives,gpUpdate=gpUpdate):
    if lives == 0:
        death()
    else:           
        print("Leider ist der Buchtabe nicht in dem Gesuchten wort! 🗡- 🗡- AUA")
        lives = lives - 1
        print("Du hast noch ",lives," leben")
        gpUpdate = gpUpdate + 1
        guess(listedWord,word) #Applying damage and send update to graphics
        return(gpUpdate,lives)
        
def death():
    print(hang.death)
    print("You Died")
    

def graphics(gpUpdate=gpUpdate,shtext=shtext):
    print(hang.man[gpUpdate])
    print(shtext)

def win():
    print(chr(27) + "[2J")
    
def main():
    hang.startsceen()
    listedWord, word = generateWord(Wörterliste)
    showgen(word)
    guess(listedWord, word)
    
main()