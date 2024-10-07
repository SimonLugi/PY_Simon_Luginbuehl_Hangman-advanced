import hang
import random
def startsceen():
    print("|---Welcome to Python Hangman---|")
    print("|            Made By            |")
    print("|                               |")
    print("| #######   #     #    ###      |")
    print("|    #      ##   ##   #         |")
    print("|    #      # # # #   #         |")
    print("|    #      #  #  #    ###      |")
    print("|-------------------------------|")

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

gamestart= 0
def guess(Wörterliste,gamestart):
    if gamestart == 0:
        rnum = random.randint(0,19)
        word = Wörterliste.pop(rnum)
        listedWord = list(word)
        gamestart=1
    letter = str(input("Gib bitte den Buchstaben den du raten möchtest ein:"))
    for i in listedWord:
        if(i.find(letter) == 0 or i.find(letter.lower()) == 0):
            posinlist=listedWord.index(letter)
            lettertoshowfound= listedWord.pop(posinlist)
            print(lettertoshowfound)
        else:
            damage()
            
def damage():            
    print("Leider ist der Buchtabe nicht in dem Gesuchten wort")
    lives = lives - 1
def death():
    print(hang.death)
    
    



    
    
    
    
    
    
    
    
    
startsceen()
guess(Wörterliste,gamestart)