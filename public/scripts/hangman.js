document.addEventListener('DOMContentLoaded', () => {
    const mainInstance = new Main();
    window.mainInstance = mainInstance; 
});

//const hang = require('hang.js');

var lives = 6, graphicsUpdate = 0, out = "", showtext = [""], alreadyguessLetter = [""], letter = "",listedWord = [""],wortlänge= 0,word="";

class Main{
    reset(){
        lives=6;
        graphicsUpdate= 0
        showtext=[""]
        alreadyguessLetter=[""]
        listedWord = [""]
        letter = ""
        out = ""
        word = ""
        interact.style.display = "none"
    }
    playagain(){
        playagaindiv.style.display = "block"
    }
    generateWord(Wörterliste ){
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
    ShowtextEmptyslotsGenerator(wortlänge){
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
    wait4Guess(){
        interact.style.display = "block"
        document.getElementById('User-Output').innerHTML = 'Gib bitte den Buchstaben den du raten möchtest ein'
        document.getElementById('input').value = ""
        console.log(lives ,"Leben")
    }
    sendGuess(){
        this.guessLetter(listedWord, word)
    }
    guessLetter(listedWord, word){
        console.log(listedWord, "out of guessletter")
        if (showtext.join('') === word){
            this.win()
        }else if (lives === 0){
            this.death()
        }else{
            let letter = document.getElementById('input').value.toUpperCase();
            if (alreadyguessLetter.includes(letter)) {
                document.getElementById('User-Output').innerHTML = 'Letter:',letter,'already guess'
                this.wait4Guess();
            }else if (letter === word){
                this.win()
            }else if (listedWord.includes(letter)){
                this.MultipleLetterVerificationMecanism(letter, listedWord, word, showtext)
            }else if (!listedWord.includes(letter)){
                this.damage(listedWord,word)
            }
        }
    }
    MultipleLetterVerificationMecanism(letter,listedWord,word,showtext){
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
    damage(listedWord, word){
        document.getElementById('User-Output').innerHTML = 'Leider ist der Buchtabe oder das Wort kein Bestantteil des Wortes! 🗡- 🗡- AUA'
        lives -= 1
        graphicsUpdate += 1
        console.log(letter);
        alreadyguessLetter.splice(letter); 
        console.log(alreadyguessLetter);
        document.getElementById('lives').innerHTML = lives;
    }
    death(){
        document.getElementById('User-Output').innerHTML = 'You Died'
        this.playagain()
        playagaindiv.style.display = "block"
    }
    graphics(graphicsUpdate, showtext){
        var dys = showtext.slice()
        for (let i = 0; i < showtext.length; i++){
            var le = dys.splice(0)
            var out = out + le + " "
        }
        document.getElementById('User-Output').innerHTML = 'Word:',out;
        document.getElementById('lives').innerHTML = lives;
    }
    win(){
        this.playagain()
        playagaindiv.style.display = "block"
        interact.style.display = "none"
    }
    singelplayer(){
        this.startsequenc();
    }
    startsequenc(){
        gmsel.style.display = "none"
        interact.style.display = "block"
        document.getElementById('lives').innerHTML = lives;
        var listedWord, word= this.generateWord(Wörterliste)
        this.ShowtextEmptyslotsGenerator(word)
        this.wait4Guess()
    }
    doubleplayer(){
        document.getElementById('User-Output').innerHTML = 'Gib das wort ein das dein mitspieler erraten soll:'
        let inword = document.getElementById('input').value.toUpperCase();
        let word = inword.toUpperCase()
        this.startsequenc();
    }
    close() {
        openedWindow.close();
    }
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





