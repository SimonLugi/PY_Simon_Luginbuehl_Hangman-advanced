document.addEventListener('DOMContentLoaded', main);

//const hang = require('hang.js');

var lives = 0, graphicsUpdate = 0, out = "", showtext = [""], alreadyguessLetter = [""], letter = "",listedWord = [""],wortlänge= 0;

function main(){
    reset()
    document.getElementById('lives').innerHTML = lives
    document.getElementById('User-Output').innerHTML = 'Willkommen zu HANGMAN Bitte wähle den Spielmodus aus.\n M für Multiplayer S für Singelplayer'
    let inpex = document.getElementById('input').value.toUpperCase();
    inpex = inpex.toUpperCase()
    gmsel.style.display = "block"
    interact.style.display = "none"
    playagaindiv.style.display = "none"
}
function reset(){
    lives=6;
    graphicsUpdate= 0
    showtext=[""]
    alreadyguessLetter=[""]
    listedWord = [""]
    letter = ""
    out = ""
}
function playagain(){
    interact.style.display = "none"
    playagaindiv.style.display = "true"
}
function generateWord(Wörterliste ){
    const rnum = Math.floor(Math.random() * 96);
    console.log(rnum);
    word = Wörterliste.splice(rnum, 1)[0].toUpperCase();
    listedWord = word.split('');
    wortlänge = word.length
    console.log(listedWord);
    console.log(word);
    console.log("wort länge ist:",wortlänge)
    return listedWord, word, wortlänge;
}
function ShowtextEmptyslotsGenerator(wortlänge){
    showtext = [];
    for(var i=0;i<wortlänge.length;i++){
        showtext.push("_");
    }   
    for (var i=0;i<wortlänge.length;i++){
        le = showtext.slice(0)
        out = out + le + " "
        console.log(out)
    }
    document.getElementById('User-Output').innerHTML = 'Word:' + out;
    console.log("Generatted empty word",showtext,"wortlänge",wortlänge.length,"Output:",out)
    return showtext;
}
function wait4Guess(){
    interact.style.display = "block"
    document.getElementById('User-Output').innerHTML = 'Gib bitte den Buchstaben den du raten möchtest ein'
    document.getElementById('input').value = ""
}
function sendGuess(){
    guessLetter(listedWord, word)
}
function guessLetter(listedWord, word){
    console.log(listedWord, "out of guessletter")
    if (showtext.join('') === word){
        win()
    }else if (lives === 0){
        death()
    }else{
        let letter = document.getElementById('input').value.toUpperCase();
        if (alreadyguessLetter.includes(letter)) {
            document.getElementById('User-Output').innerHTML = 'Letter:',letter,'already guess'
            wait4Guess();
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
            posinlist = listedWord.index(letter);
            lettertoshowfound = listedWord.splice(posinlist);
            listedWord.insert(posinlist,"/");
            showtext[posinlist]= lettertoshowfound;
            console.log(letter);
            alreadyguessLetter.splice(letter); 
            console.log(alreadyguessLetter);
        }   
    }
}
function damage(listedWord, word){
    document.getElementById('User-Output').innerHTML = 'Leider ist der Buchtabe oder das Wort kein Bestantteil des Wortes! 🗡- 🗡- AUA'
    lives -= 1
    graphicsUpdate += 1
    console.log(letter);
    alreadyguessLetter.splice(letter); 
    console.log(alreadyguessLetter);
    document.getElementById('lives').innerHTML = lives
}
function death(){
    document.getElementById('User-Output').innerHTML = 'You Died'
    playagain()
    playagaindiv.style.display = "block"
}
function graphics(graphicsUpdate, showtext){
    var dys = showtext.slice()
    for (let i = 0; i < showtext.length; i++){
        var le = dys.splice(0)
        var out = out + le + " "
    }
    document.getElementById('User-Output').innerHTML = 'Word:',out;
}
function win(){
    playagain()
    playagaindiv.style.display = "block"
}
function singelplayer(){
    gmsel.style.display = "none"
    var listedWord, word= generateWord(Wörterliste)
    ShowtextEmptyslotsGenerator(word)
    wait4Guess()
}
function doubleplayer(){
    gmsel.style.display = "none"
    document.getElementById('User-Output').innerHTML = 'Gib das wort ein das dein mitspieler erraten soll:'
    let inword = document.getElementById('input').value.toUpperCase();
    let word = inword.toUpperCase()
    listedWord = word
    ShowtextEmptyslotsGenerator(word)
    wait4Guess()
}

function close() {
    openedWindow.close();
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





