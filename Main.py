import hang
import random

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

lives= 0 
gamestart= 0
shtext=[]
def guess(Wörterliste,gamestart):
    if gamestart == 0:
        rnum = random.randint(0,19)
        word = Wörterliste.pop(rnum)
        listedWord = list(word)
        gamestart=1
    gamestart=1
    letter = str(input("Gib bitte den Buchstaben den du raten möchtest ein:"))
    if letter in listedWord or letter.lower() in listedWord:
        tfmi(letter,listedWord)
    else:
        damage(lives)  
def tfmi(letter,listedWord,shtext):
    for i in range(0,len(listedWord)):
        if letter in listedWord or letter.lower() in listedWord:
            posinlist = listedWord.index(letter)
            lettertoshowfound = listedWord.pop(posinlist)  
            shtext = shtext.insert(posinlist,lettertoshowfound)  
        else:
            guess(Wörterliste,gamestart)             
def damage(lives):            
    print("Leider ist der Buchtabe nicht in dem Gesuchten wort")
    lives = lives + 1
    guess(Wörterliste,gamestart)
def death():
    print(hang.death)
   
    



    
    
    
    
    
    
    
    
    
hang.startsceen()
guess(Wörterliste,gamestart)