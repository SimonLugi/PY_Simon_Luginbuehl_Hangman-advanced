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
    listedWord = list(word)
    print(listedWord)
    gamestart=1
    print(gamestart)
    return(listedWord)

def guess(listedWord):
    letter = str(input("Gib bitte den Buchstaben den du raten möchtest ein:"))
    if letter.upper() in listedWord or letter.lower() in listedWord:
        print(listedWord)
        tfmi(shtext,letter,listedWord)
    else:
        print(listedWord)
        damage(lives,gpUpdate,listedWord)
        
              
def tfmi(letter,listedWord,shtext):
    for i in range(0,len(list(listedWord))):
        if letter.upper() in listedWord or letter.lower() in listedWord:
            posinlist = listedWord.index(letter)
            lettertoshowfound = listedWord.pop(posinlist)  
            shtext[posinlist]= lettertoshowfound  
        else:
            guess(listedWord)             
def damage(lives,gpUpdate,listedWord):
    if lives == 0:
        death()
    else:           
        print("Leider ist der Buchtabe nicht in dem Gesuchten wort! 🗡- 🗡- AUA")
        lives = lives - 1
        print("Du hast noch ",lives," leben")
        gpUpdate = gpUpdate + 1
        graphics(gpUpdate)
        guess(listedWord) #Applying damage and send update to graphics
def death():
    print(hang.death)
    print("You Died")
def graphics(gpUpdate):
    print(hang.man[gpUpdate])
     
def main():
    hang.startsceen()
    graphics(gpUpdate)
    guess(generateWord(Wörterliste))
    
main()