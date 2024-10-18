document.addEventListener('DOMContentLoaded', main);

//const hang = require('hang.js');

let lives = 0, graphicsUpdate = 0, out = "", showtext = [""], alreadyguessLetter = [""], letter = "",listedWord = [""];

function main(){
    reset()
    document.getElementById('lives').innerHTML = lives
    document.getElementById('User-Output').innerHTML = 'Willkommen zu HANGMAN Bitte wähle den Spielmodus aus.\n M für Multiplayer S für Singelplayer'
    let inpex = document.getElementById('input').value.toUpperCase();
    inpex = inpex.toUpperCase()
    gmsel.style.display = "block"
    interact.style.display = "none"
}



function reset(){
    lives=6;
    graphicsUpdate= 0
    showtext=[]
    alreadyguessLetter=[]
    listedWord = []
    letter = ""
    out = ""
}
function playagain(){
    document.getElementById('User-Output').innerHTML = 'Wilst du nochmals Spielen Ja/Nein';
    let inx = document.getElementById('input').value.toUpperCase();
    interact.style.display = "none"
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
    console.log(listedWord);
    console.log(word);
    return[listedWord, word];
}
function ShowtextEmptyslotsGenerator(word){
    showtext = Array(word.length).fill("_")
}
function guessLetter(listedWord, word){
    interact.style.display = "block"
    if (showtext.join('') === word){
        win()
    }else if (lives === 0){
        death()
    }else{
        document.getElementById('User-Output').innerHTML = 'Gib bitte den Buchstaben den du raten möchtest ein'
        let letter = document.getElementById('input').value.toUpperCase();
        console.log(letter);
        if (alreadyguessLetter.includes(letter)) {
            document.getElementById('User-Output').innerHTML = 'Letter:',letter,'already guess'
            alreadyguessLetter.push(letter); 
            guessLetter(listedWord, word);
        }else if (letter === word){
            win()
        }else if (listedWord.includes(letter)){
            MultipleLetterVerificationMecanism(letter, listedWord, word, showtext)
        }else if (!listedWord.includes(letter)){
            damage(listedWord,word)
        }
    }
}
function MultipleLetterVerificationMecanism(letter,listedWord,word,showtext){
    for (let i = 0; i < word.length; i++){
        if (letter in listedWord){
            posinlist = listedWord.index(letter)
            lettertoshowfound = listedWord.splice(posinlist)
            listedWord.insert(posinlist,"/")
            showtext[posinlist]= lettertoshowfound
            alreadyguessLetter.push(letter); 
        }else{
            guessLetter(listedWord, word)
        }     
    }
}
function damage(listedWord, word){
    document.getElementById('User-Output').innerHTML = 'Leider ist der Buchtabe oder das Wort kein Bestantteil des Wortes! 🗡- 🗡- AUA'
    lives -= 1
    graphicsUpdate += 1
    alreadyguessLetter.push(letter); 
    document.getElementById('lives').innerHTML = lives
    guessLetter(listedWord, word)
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
    for (let i = 0; i < 20; i++){
        time.sleep(0.125)
    }  
    playagain()
}
function singelplayer(){
    gmsel.style.display = "none"
    var listedWord, word= generateWord(Wörterliste)
    ShowtextEmptyslotsGenerator(word)
    guessLetter(listedWord, word)
}
function doubleplayer(){
    gmsel.style.display = "none"
    document.getElementById('User-Output').innerHTML = 'Gib das wort ein das dein mitspieler erraten soll:'
    let inword = document.getElementById('input').value.toUpperCase();
    let word = inword.toUpperCase()
    listedWord = word
    ShowtextEmptyslotsGenerator(word)
    guessLetter(listedWord, word)
}



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





