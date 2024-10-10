import hang
import random

global lives, graphicsUpdate,out
lives=int(6)
gamestart=0
graphicsUpdate= 0
showtext=[]
alreadyguessd:list=[]

Wörterliste=["Algorithmus", "API", "Cloud", "Daten", "Debugging", "Frontend", "Backend", "Server", "Datenbank", "Virtualisierung", "Container", "DevOps", "Verschlüsselung", "Skripting", "Middleware", "Architektur", "Benutzeroberfläche", "Framework", "Microservices", "Repository", "SSH", "VPN", "Load Balancer", "CI/CD", "Docker", "Kubernetes", "SQL", "NoSQL", "Firewall", "DNS", "HTTP", "HTTPS", "JSON", "XML", "API Gateway", "HTTP Proxy", "SSL", "TLS", "IPv4", "IPv6", "LAN", "WAN", "VLAN", "IPsec", "Gateway", "Switch", "Router", "Token", "Zertifikat", "Authentifizierung", "Autorisierung", "OAuth", "Sitzung", "Cookie", "Websocket", "Nginx", "Apache", "BGP", "NAT", "Subnetz", "CIDR", "Lastverteilung", "Backup", "Wiederherstellung", "RAID", "SSD", "HDD", "Bandbreite", "Durchsatz", "Latenz", "Ping", "Traceroute", "QoS", "DNSSEC", "CDN", "Edge Computing", "Cache", "Trefferquote", "DDoS", "Spoofing", "Phishing", "Social Engineering", "Zero Trust", "Malware", "Ransomware", "Virus", "Trojaner", "Wurm", "Botnetz", "Honeypot", "SIEM", "IDS", "IPS", "SOC", "Incident Response", "Penetrationstest", "Schwachstelle", "Exploit", "Patch"]

def generateWord(Wörterliste: list):
    global wortlänge
    rnum = random.randint(0,100)
    word: str = Wörterliste.pop(rnum)
    word = word.upper()
    listedWord = list(word)
    wortlänge = len(list(word))
    return(listedWord, word)

def ShowtextEmptyslotsGenerator(word):
    for i in range(0,len(list(word))):
        showtext.append("_")
        
def guess(listedWord, word):
    global letter
    graphics(graphicsUpdate, showtext)
    if showtext == list(word):
        win()
    elif lives == 0:
        death()
    else:
        letter = input("Gib bitte den Buchstaben den du raten möchtest ein:")
        letter = letter.upper()
        if letter in alreadyguessd :
            print("Letter:",letter,"alredy guessd")
            alreadyguessd.append(letter) 
            guess(listedWord, word) 
        elif letter in listedWord:
            MultipleLetterVerificationMecanism(letter, listedWord, word, showtext)
        elif letter not in listedWord:
            damage(listedWord,word)

def MultipleLetterVerificationMecanism(letter,listedWord,word,showtext):
    for _ in range(0,len(list(word))):
        if letter in listedWord:
            posinlist = listedWord.index(letter)
            lettertoshowfound = listedWord.pop(posinlist)
            listedWord.insert(posinlist,"/")
            showtext[posinlist]= lettertoshowfound
            alreadyguessd.append(letter) 
        else:
            guess(listedWord, word)
            
def damage(listedWord, word):
    global lives, graphicsUpdate
    print("Leider ist der Buchtabe nicht in dem Gesuchten wort! 🗡- 🗡- AUA")
    lives -= 1
    graphicsUpdate += 1
    alreadyguessd.append(letter) 
    print("Du hast noch ",lives," leben")
    guess(listedWord, word)
         
def death():
    print(hang.death)
    print("You Died")
    
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
    print("you have won")
    
def main():
    hang.startsceen()
    listedWord, word= generateWord(Wörterliste)
    ShowtextEmptyslotsGenerator(word)
    guess(listedWord, word)
    
if __name__ == "__main__":
    main()