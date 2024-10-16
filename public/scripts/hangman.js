var input = document.getElementById("input");
//const hang = require('hang.js');

let lives, graphicsUpdate, out, showtext, alreadyguessLetter, letter;

function reset(){
    lives=6;
    graphicsUpdate= 0
    showtext=[]
    out = ""
    alreadyguessLetter=[]
}
function playagain(){
    document.getElementById('User-Output').innerHTML = 'Wilst du nochmals Spielen Ja/Nein';
    let inx = document.getElementById('input').toUpperCase();
    if (inx === "Ja"){
        main()
    } else if (inx === "Nein"){
        exit(0)
    } else {
        document.getElementById('User-Output').innerHTML = 'Invalider input versuche es erneut!'
        playagain()
    }
}
function generateWord(Wörterliste ){
    const rnum = Math.floor(Math.random() * 96);
    console.log(rnum);
    const word = Wörterliste.splice(rnum, 1)[0].toUpperCase();
    const listedWord = word.split('');
    return[listedWord, word];
}
function ShowtextEmptyslotsGenerator(word){
    showtext = Array(word.length).fill("_")
}
function guess(listedWord, word){
    if (showtext.join('') === word){
        win()
    }
    else if (lives === 0){
        death()
    }
    graphics(graphicsUpdate, showtext)
    //sel = input("Was wilst du raten? W für Wort / B für Buchstabe{") // Für überkorrekte spieler 
    var sel = "B"
    var sel = sel.toUpperCase()
    if (sel === "B"){
        guessLetter(listedWord, word)
    }else if (sel === "W"){
        guessWord(listedWord, word)
    }else{
        document.getElementById('User-Output').innerHTML = 'Invalider input versuche es erneut!'
        guess(listedWord,word)        
    }
}
function guessWord(listedWord, word){
    if (showtext.join('') === word){
        win()
    }else if (lives === 0){
        death()
    }else{
        document.getElementById('User-Output').innerHTML = 'Gib bitte das Wort ein das du raten möchtest ein:';
        var wordguess = input("Gib bitte das Wort ein das du raten möchtest ein");
        var wordguess = wordguess.toUpperCase();
        var letter = "/"
        var wordtest = word.toUpperCase();
        if (wordguess === wordtest){
            win()
        }else if (wordguess != wordtest){
            damage(listedWord,word)
        }
    }
}
function guessLetter(listedWord, word){
    if (showtext.join('') === word){
        win()
    }else if (lives === 0){
        death()
    }else{
        document.getElementById('User-Output').innerHTML = 'Gib bitte den Buchstaben den du raten möchtest ein'
        let letter = document.getElementById('input');
        letter = letter.toUpperCase()
        if (letter in alreadyguessLetter) {
            document.getElementById('User-Output').innerHTML = 'Letter:',letter,'already guess'
            alreadyguessLetter.append(letter) 
            guess(listedWord, word) 
        }else if (list(letter) === list(word)){
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
    document.getElementById('User-Output').innerHTML = 'Leider ist der Buchtabe oder das Wort kein Bestantteil des Wortes! 🗡- 🗡- AUA'
    lives -= 1
    graphicsUpdate += 1
    alreadyguessLetter.append(letter) 
    document.getElementById('lives').innerHTML = lives
    guess(listedWord, word)
}
function death(){
    //print(hang.death)
    document.getElementById('User-Output').innerHTML = 'You Died'
    //print(hang.dragon)
    time.sleep(1)
    print(chr(27) + "[2J")
    playagain()
}
function graphics(graphicsUpdate, showtext){
    //print(hang.man[graphicsUpdate])
    var dys = showtext.slice()
    out = " "
    for (let i = 0; i < showtext.length; i++){
        le = dys.splice(0)
        out = out + le + " "
    }
    document.getElementById('User-Output').innerHTML = 'Word:',out;
}
function win(){
    //print(hang.win)
    for (_ in range(0,20)){
        time.sleep(0.125)
    }  
    playagain()
}
function singelplayer(){
    gmsel.style.display = "none"
    var listedWord, word= generateWord(Wörterliste)
    ShowtextEmptyslotsGenerator(word)
    guess(listedWord, word)
}
function doubleplayer(){
    gmsel.style.display = "none"
    document.getElementById('User-Output').innerHTML = 'Gib das wort ein das dein mitspieler erraten soll:'
    let inword = document.getElementById('input').value;
    let word = inword.toUpperCase()
    listedWord = word
    ShowtextEmptyslotsGenerator(word)
    guess(listedWord, word)
}
function main(){
    reset()
    document.getElementById('lives').innerHTML = lives
    document.getElementById('User-Output').innerHTML = 'Willkommen zu HANGMAN Bitte wähle den Spielmodus aus.\n M für Multiplayer S für Singelplayer'
    let inpex = document.getElementById('input').value;
    inpex = inpex.toUpperCase()
    gmsel.style.display = "block"
}
document.addEventListener('DOMContentLoaded', main);


const Wörterliste = [
    "Algorithmus",
    "API",
    "Cloud",
    "Daten",
    "Debugging",
    "Frontend",
    "Backend",
    "Server",
    "Datenbank",
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
    "Repository",
    "SSH",
    "VPN",
    "Load",
    "Balancer",
    "CI",
    "Docker",
    "Kubernetes",
    "SQL",
    "NoSQL",
    "Firewall",
    "DNS",
    "HTTP",
    "HTTPS",
    "JSON",
    "XML",
    "Gateway",
    "HTTP Proxy",
    "SSL",
    "TLS",
    "IPv4",
    "IPv6",
    "LAN",
    "WAN",
    "VLAN",
    "IPsec",
    "Gateway",
    "Switch",
    "Router",
    "Token",
    "Zertifikat",
    "Authentifizierung",
    "Autorisierung",
    "OAuth",
    "Sitzung",
    "Cookie",
    "Websocket",
    "Nginx",
    "Apache",
    "BGP",
    "NAT",
    "Subnetz",
    "CIDR",
    "Lastverteilung",
    "Backup",
    "Wiederherstellung",
    "RAID",
    "SSD",
    "HDD",
    "Bandbreite",
    "Durchsatz",
    "Latenz",
    "Ping",
    "Traceroute",
    "QoS",
    "DNSSEC",
    "CDN",
    "Cache",
    "Trefferquote",
    "DDoS",
    "Spoofing",
    "Phishing",
    "Malware",
    "Ransomware",
    "Virus",
    "Trojaner",
    "Wurm",
    "Botnetz",
    "Honeypot",
    "SIEM",
    "IDS",
    "IPS",
    "SOC",
    "Penetrationstest",
    "Schwachstelle",
    "Exploit",
    "Patch"
]





