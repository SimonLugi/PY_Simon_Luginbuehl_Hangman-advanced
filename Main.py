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
    posinlist=listedWord.index(letter)
    lettertoshowfound= listedWord.pop(posinlist)
    print(lettertoshowfound)


    
    
    
    
    
    
    
    
    
startsceen()
guess(Wörterliste,gamestart)