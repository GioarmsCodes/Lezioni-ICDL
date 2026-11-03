/* =========================================================
   ICDL Lab - Contenuti del corso (12 lezioni da 90 minuti)
   Modulo 1-6: Computer Essentials | Modulo 7-12: Online Essentials

   Formati delle attivita:
   scheda      { punti: [[termine, spiegazione]], nota }
   quiz        { domande: [[testo, [corretta, errata, errata, ...], spiegazione, tema?]] }
               la prima risposta e' sempre quella corretta: l'ordine viene mescolato
   vf          { items: [[affermazione, true/false, spiegazione, tema?]] }
   abbina      { coppie: [[sinistra, destra]] }
   smista      { gruppi: [nomi], items: [[testo, indiceGruppo]] }
   ordina      { passi: [nell'ordine corretto] }
   indovinello { testo, risposte: [accettate], indizi: [], spiega }
   ========================================================= */

const TEMI = {
  // Computer Essentials
  ict:   { nome: "ICT e dispositivi", consiglio: "Ripassa la differenza tra hardware e software e i principali tipi di dispositivo (desktop, laptop, tablet, smartphone). Prova a classificare gli oggetti tecnologici che hai a casa." },
  hw:    { nome: "Componenti hardware", consiglio: "Rivedi il ruolo di CPU, RAM, memoria di massa e scheda madre. Un trucco: la CPU pensa, la RAM ricorda per poco, il disco ricorda per sempre." },
  io:    { nome: "Periferiche di input e output", consiglio: "Chiediti sempre: questo dispositivo manda dati al computer (input) o li riceve (output)? Alcuni fanno entrambe le cose, come il touchscreen." },
  so:    { nome: "Sistema operativo", consiglio: "Ricorda che il sistema operativo gestisce tutto il computer, mentre le applicazioni servono a fare un compito preciso. Elenca i sistemi operativi che conosci per PC e smartphone." },
  app:   { nome: "Applicazioni", consiglio: "Associa ogni tipo di applicazione al suo uso: elaboratore di testi per scrivere, foglio elettronico per calcolare, presentazioni per esporre, browser per navigare." },
  lic:   { nome: "Licenze software", consiglio: "Ripassa le differenze tra software proprietario, open source, freeware e shareware. La EULA e' il contratto che accetti quando installi un programma." },
  avvio: { nome: "Avvio e spegnimento", consiglio: "Rivedi la differenza tra arresta, riavvia, sospendi, disconnetti e blocca. Prima di spegnere salva sempre il lavoro e chiudi le applicazioni." },
  desk:  { nome: "Desktop e icone", consiglio: "Ripassa i tipi di icona: file, cartella, applicazione, collegamento e cestino. Il collegamento ha una freccina ed e' solo una scorciatoia." },
  fin:   { nome: "Finestre", consiglio: "Esercitati sul PC: riduci a icona, ingrandisci, ripristina, sposta e ridimensiona una finestra, poi passa da una all'altra con Alt+Tab." },
  imp:   { nome: "Impostazioni di sistema", consiglio: "Apri le Impostazioni del computer e trova dove si cambiano data e ora, volume, sfondo, lingua della tastiera e dove si disinstallano le app." },
  acc:   { nome: "Accessibilita' e cattura schermo", consiglio: "Ripassa gli strumenti di accessibilita': lente di ingrandimento, lettore dello schermo, tastiera su schermo, contrasto elevato, riconoscimento vocale." },
  file:  { nome: "File ed estensioni", consiglio: "Impara a memoria le estensioni piu' comuni: .docx testo, .xlsx foglio di calcolo, .pptx presentazione, .pdf documento, .jpg/.png immagine, .mp3 audio, .mp4 video, .zip archivio." },
  org:   { nome: "Organizzare file e cartelle", consiglio: "Ripassa le scorciatoie Ctrl+C, Ctrl+X, Ctrl+V, Ctrl+Z e F2. Ricorda la differenza tra copiare (resta anche l'originale) e spostare (l'originale sparisce)." },
  mem:   { nome: "Memorie e capacita'", consiglio: "Metti in fila le unita' di misura: bit, byte, KB, MB, GB, TB. Ogni gradino vale circa 1000 volte il precedente (per la precisione 1024)." },
  zip:   { nome: "Compressione e cestino", consiglio: "Comprimere riduce la dimensione e crea un archivio .zip; estrarre fa il contrario. Dal cestino puoi ripristinare un file, ma svuotandolo lo cancelli per sempre." },
  rete:  { nome: "Tipi di rete", consiglio: "Ripassa LAN, WLAN, VPN e Internet. Pensa a esempi reali: la rete della scuola, il Wi-Fi di casa, Internet che collega il mondo." },
  conn:  { nome: "Accesso a Internet", consiglio: "Ricorda chi e' l'ISP (il fornitore della connessione) e i tipi di collegamento: fibra, ADSL, rete mobile 4G e 5G, satellite, Wi-Fi." },
  vel:   { nome: "Velocita' e trasferimento", consiglio: "Download = ricevere dalla rete, upload = inviare alla rete. La velocita' si misura in bit al secondo: Kbps, Mbps, Gbps." },
  wifi:  { nome: "Sicurezza delle reti", consiglio: "Una rete Wi-Fi protetta chiede una password. Sulle reti pubbliche aperte evita di inserire dati importanti." },
  pwd:   { nome: "Password e protezione dei dati", consiglio: "Una password forte e' lunga, mescola maiuscole, minuscole, numeri e simboli e non contiene dati personali. Fai backup regolari dei file importanti." },
  mal:   { nome: "Malware e antivirus", consiglio: "Ripassa i tipi di malware: virus, worm, trojan, spyware, ransomware. Antivirus aggiornato e aggiornamenti del sistema sono le prime difese." },
  sal:   { nome: "Salute ed ergonomia", consiglio: "Pause frequenti, schermo all'altezza degli occhi, schiena appoggiata, buona luce senza riflessi: sono le regole per stare bene al computer." },
  amb:   { nome: "Ambiente e risparmio energetico", consiglio: "Ricorda il riciclo dei RAEE, lo spegnimento dei dispositivi inutilizzati e le impostazioni di risparmio energetico." },
  // Online Essentials
  web:   { nome: "Internet e Web", consiglio: "Internet e' la rete, il Web e' uno dei servizi che funzionano su Internet: un insieme di pagine collegate tra loro da link." },
  url:   { nome: "Indirizzi web (URL)", consiglio: "Scomponi un indirizzo: https:// e' il protocollo, www.esempio.it il dominio, .it il dominio di primo livello, /pagina il percorso." },
  brw:   { nome: "Browser e cookie", consiglio: "Ripassa cosa sono browser, cookie, cache e pop-up. Prova a trovare nelle impostazioni del tuo browser dove si cancellano cookie e cronologia." },
  sicn:  { nome: "Navigare in sicurezza", consiglio: "Prima di inserire dati controlla https e il lucchetto, l'indirizzo scritto bene e diffida di offerte troppo belle per essere vere." },
  nav:   { nome: "Navigazione e schede", consiglio: "Esercitati con le scorciatoie del browser: Ctrl+T nuova scheda, Ctrl+W chiude, F5 aggiorna, Ctrl+F cerca nella pagina." },
  seg:   { nome: "Segnalibri e cronologia", consiglio: "Salva un segnalibro con Ctrl+D e organizzalo in una cartella. Apri la cronologia con Ctrl+H e prova a cancellare una voce." },
  down:  { nome: "Download e stampa dal web", consiglio: "Ripassa dove finiscono i file scaricati (cartella Download), come si copia testo o immagine da una pagina e come si usa l'anteprima di stampa (Ctrl+P)." },
  ric:   { nome: "Motori di ricerca", consiglio: "Usa parole chiave precise, le virgolette per la frase esatta, il segno meno per escludere una parola e i filtri per immagini, notizie e data." },
  val:   { nome: "Valutare le fonti", consiglio: "Per ogni sito chiediti: chi l'ha scritto? Quando? Perche'? Confronta sempre la stessa informazione su piu' fonti affidabili." },
  cop:   { nome: "Copyright e licenze", consiglio: "Non tutto quello che trovi online e' libero: il diritto d'autore protegge testi, immagini e musica. Cerca contenuti con licenza Creative Commons e cita la fonte." },
  priv:  { nome: "Privacy e dati personali", consiglio: "Il GDPR protegge i tuoi dati personali. Hai diritto a sapere come vengono usati, a correggerli e a chiederne la cancellazione." },
  com:   { nome: "Comunita' online", consiglio: "Ripassa i tipi di comunita' online: social network, forum, chat, giochi online, wiki, blog. Ognuna ha regole e rischi diversi." },
  stru:  { nome: "Strumenti di comunicazione", consiglio: "Associa ogni strumento al suo uso: messaggistica istantanea, VoIP e videochiamate, email, SMS, podcast." },
  neti:  { nome: "Netiquette e comportamento", consiglio: "Rileggi le regole della netiquette: niente maiuscole (equivale a urlare), rispetto per gli altri, nessuna foto di altri senza il loro permesso." },
  risc:  { nome: "Rischi e protezione online", consiglio: "Imposta il profilo come privato, non condividere dati personali, blocca e segnala chi ti infastidisce e parlane sempre con un adulto di fiducia." },
  mail:  { nome: "Indirizzi e campi email", consiglio: "Ripassa i campi: A (destinatario principale), Cc (copia visibile), Ccn (copia nascosta), Oggetto. Un indirizzo ha sempre la chiocciola @." },
  alle:  { nome: "Inviare, rispondere, inoltrare", consiglio: "Rispondi scrive solo al mittente, Rispondi a tutti anche agli altri destinatari, Inoltra manda il messaggio a una persona nuova. Attenzione agli allegati sconosciuti." },
  spam:  { nome: "Spam e phishing", consiglio: "Segnali di phishing: urgenza, errori di scrittura, mittente strano, link che chiedono password. Nel dubbio non cliccare e chiedi a un adulto." },
  gest:  { nome: "Gestire la posta", consiglio: "Esercitati a creare cartelle, cercare messaggi, ordinarli per data o mittente, contrassegnarli e aggiungere contatti alla rubrica." },
  cal:   { nome: "Calendari e appuntamenti", consiglio: "Crea un evento con data, ora, luogo e promemoria, poi prova a renderlo ricorrente e a invitare un compagno." }
};

const LEZIONI = [
/* ===================== LEZIONE 1 ===================== */
{
  id: 1, modulo: "CE", icona: "chip",
  titolo: "Il computer e i dispositivi",
  sotto: "ICT, hardware, componenti e periferiche",
  obiettivi: ["Sapere cosa significa ICT", "Distinguere hardware e software", "Riconoscere CPU, RAM e memorie", "Classificare le periferiche di input e output"],
  attivita: [
    { tipo: "scheda", titolo: "Benvenuti nel mondo ICT", min: 10, punti: [
      ["ICT", "Information and Communication Technology: le tecnologie che servono a gestire e scambiare informazioni."],
      ["Servizi ICT", "Internet, telefonia mobile, app di messaggistica, videochiamate, streaming e servizi online della scuola."],
      ["Hardware", "Tutte le parti fisiche del computer, quelle che puoi toccare: schermo, tastiera, processore."],
      ["Software", "I programmi: istruzioni che dicono all'hardware cosa fare. Non si toccano."],
      ["Dispositivi", "Computer desktop, portatile (laptop), tablet, smartphone. Tutti hanno hardware e software."]
    ], nota: "Ascolta la spiegazione del prof, poi passa al primo gioco." },
    { tipo: "indovinello", titolo: "Chi sono?", min: 5, tema: "hw",
      testo: "Sono il cervello del computer: eseguo i calcoli e le istruzioni di tutti i programmi. La mia velocita' si misura in gigahertz.",
      risposte: ["cpu", "processore", "microprocessore", "unita centrale di elaborazione", "unita centrale"],
      indizi: ["Il mio nome breve e' una sigla di tre lettere.", "Mi trovi montato sulla scheda madre, spesso sotto una ventola."],
      spiega: "La CPU (processore) elabora i dati ed esegue le istruzioni. Piu' e' veloce, piu' il computer e' reattivo." },
    { tipo: "quiz", titolo: "Quiz dei dispositivi", min: 10, tema: "ict", domande: [
      ["Che cosa significa la sigla ICT?", ["Information and Communication Technology", "Internet Computer Tools", "Informatica Con Tecnologia", "International Computer Test"], "ICT indica le tecnologie dell'informazione e della comunicazione."],
      ["Quale di questi e' un esempio di hardware?", ["La tastiera", "Il browser", "Il sistema operativo", "Un videogioco"], "La tastiera si puo' toccare: e' hardware. Gli altri sono programmi, cioe' software."],
      ["Quale dispositivo e' pensato per essere portato ovunque e si usa soprattutto con il touchscreen?", ["Il tablet", "Il computer desktop", "Il server", "La stampante"], "Il tablet e' leggero, portatile e si comanda toccando lo schermo."],
      ["Quale di questi e' un servizio ICT?", ["Una videochiamata", "Un quaderno a righe", "Una calcolatrice meccanica", "Un libro stampato"], "La videochiamata usa reti e dispositivi digitali per comunicare."],
      ["Che cos'e' il software?", ["L'insieme dei programmi del computer", "La parte morbida della tastiera", "La custodia del portatile", "Il cavo di alimentazione"], "Software sono i programmi: istruzioni che fanno funzionare l'hardware."]
    ] },
    { tipo: "scheda", titolo: "Dentro il computer", min: 15, punti: [
      ["CPU (processore)", "Esegue i calcoli e le istruzioni. La velocita' si misura in GHz."],
      ["RAM", "Memoria di lavoro veloce e temporanea: quando spegni il computer si svuota (e' volatile)."],
      ["Memoria di massa", "Conserva i dati anche a computer spento: disco rigido (HDD), SSD, chiavetta USB."],
      ["Scheda madre", "La grande scheda che collega tra loro tutti i componenti."],
      ["Porte", "USB per collegare periferiche, HDMI per monitor e TV, porta di rete (Ethernet) per il cavo internet."],
      ["Periferiche", "Input: mandano dati al computer (tastiera, mouse). Output: li mostrano o li producono (monitor, stampante)."]
    ], nota: "Il prof ti mostrera' i componenti: prova a ricordare a cosa serve ciascuno." },
    { tipo: "smista", titolo: "Input o output?", min: 10, tema: "io",
      istr: "Tocca un dispositivo, poi tocca il gruppo giusto.",
      gruppi: ["Input", "Output", "Input e output"],
      items: [["Tastiera", 0], ["Mouse", 0], ["Microfono", 0], ["Webcam", 0], ["Scanner", 0],
              ["Monitor", 1], ["Stampante", 1], ["Casse audio", 1], ["Proiettore", 1],
              ["Touchscreen", 2], ["Cuffie con microfono", 2]] },
    { tipo: "abbina", titolo: "Abbina il componente", min: 10, tema: "hw",
      istr: "Tocca un componente a sinistra e poi la sua descrizione a destra.",
      coppie: [
        ["CPU", "Esegue calcoli e istruzioni"],
        ["RAM", "Memoria veloce che si svuota allo spegnimento"],
        ["SSD", "Memoria di massa veloce senza parti in movimento"],
        ["Scheda madre", "Collega tra loro tutti i componenti"],
        ["Porta HDMI", "Collega il computer a un monitor o a una TV"],
        ["Porta USB", "Collega chiavette, mouse e altre periferiche"]
      ] },
    { tipo: "vf", titolo: "Vero o falso?", min: 10, tema: "hw", items: [
      ["La RAM conserva i dati anche quando il computer e' spento.", false, "Falso: la RAM e' volatile, si svuota allo spegnimento. I dati restano nella memoria di massa."],
      ["Uno smartphone ha sia hardware sia software.", true, "Vero: ha componenti fisici (batteria, schermo, processore) e programmi (sistema operativo, app).", "ict"],
      ["La velocita' del processore si misura in gigahertz (GHz).", true, "Vero: i GHz indicano quanti miliardi di cicli al secondo esegue il processore."],
      ["Il monitor e' una periferica di input.", false, "Falso: il monitor mostra le informazioni, quindi e' una periferica di output.", "io"],
      ["Piu' RAM permette di tenere aperti piu' programmi insieme senza rallentamenti.", true, "Vero: la RAM e' lo spazio di lavoro dove girano i programmi aperti."],
      ["L'SSD e' generalmente piu' veloce del disco rigido tradizionale (HDD).", true, "Vero: l'SSD non ha parti meccaniche in movimento ed e' molto piu' rapido."]
    ] },
    { tipo: "indovinello", titolo: "Chi sono?", min: 5, tema: "hw",
      testo: "Sono la memoria di lavoro: velocissima ma smemorata. Appena spegni il computer dimentico tutto.",
      risposte: ["ram", "memoria ram", "memoria volatile", "random access memory"],
      indizi: ["Sono una sigla di tre lettere.", "Comprare un computer con piu' di me lo rende piu' fluido con tanti programmi aperti."],
      spiega: "La RAM e' la memoria di lavoro: contiene i programmi aperti ed e' volatile." },
    { tipo: "quiz", variante: "sfida", titolo: "Sfida finale", min: 15, tema: "hw", domande: [
      ["Dove vengono conservati i file quando il computer e' spento?", ["Nella memoria di massa, come l'SSD", "Nella RAM", "Nella CPU", "Nel monitor"], "Solo la memoria di massa conserva i dati senza corrente."],
      ["Quale periferica useresti per digitalizzare una foto stampata?", ["Lo scanner", "Il proiettore", "Le casse", "La stampante"], "Lo scanner trasforma un foglio in un'immagine digitale: e' un input.", "io"],
      ["Quale porta usi per collegare il computer alla TV?", ["HDMI", "Porta audio jack", "Porta di rete", "Alimentazione"], "L'HDMI trasporta video e audio verso monitor e TV."],
      ["Un touchscreen e' una periferica...", ["Di input e di output", "Solo di input", "Solo di output", "Di memoria"], "Mostra le immagini (output) e riceve il tocco (input).", "io"],
      ["Quale di questi e' software?", ["Il sistema operativo", "Il processore", "La webcam", "La scheda madre"], "Il sistema operativo e' un programma, quindi software.", "ict"],
      ["Cosa succede ai dati nella RAM se va via la corrente?", ["Si perdono", "Vengono salvati automaticamente sul cloud", "Restano per sempre", "Vengono stampati"], "La RAM e' volatile: per questo bisogna salvare spesso il lavoro."],
      ["Qual e' il compito principale della CPU?", ["Elaborare dati ed eseguire istruzioni", "Mostrare le immagini", "Conservare i file per anni", "Collegarsi al Wi-Fi"], "La CPU e' il centro di elaborazione del computer."]
    ] }
  ]
},
/* ===================== LEZIONE 2 ===================== */
{
  id: 2, modulo: "CE", icona: "apps",
  titolo: "Software, licenze e sistema operativo",
  sotto: "Programmi, app, licenze e avvio del computer",
  obiettivi: ["Capire a cosa serve il sistema operativo", "Riconoscere i tipi di applicazione", "Conoscere le licenze software", "Avviare e spegnere il computer correttamente"],
  attivita: [
    { tipo: "scheda", titolo: "Sistema operativo e applicazioni", min: 10, punti: [
      ["Sistema operativo", "Il programma principale: gestisce hardware, memoria, file e periferiche. Esempi: Windows, macOS, Linux per i PC; Android e iOS per smartphone e tablet."],
      ["Applicazioni", "Programmi per fare un compito: elaboratore di testi, foglio elettronico, presentazioni, browser, email, fotoritocco, giochi."],
      ["App mobili", "Si installano dagli store ufficiali, come Google Play o App Store."],
      ["Aggiornamenti", "Correggono errori e falle di sicurezza: vanno installati regolarmente."]
    ] },
    { tipo: "indovinello", titolo: "Chi sono?", min: 5, tema: "so",
      testo: "Sono il primo programma che parte quando accendi il computer. Gestisco file, memoria e periferiche e senza di me nessuna app funzionerebbe.",
      risposte: ["sistema operativo", "so", "os", "il sistema operativo", "operating system"],
      indizi: ["Windows e Android sono due miei esempi.", "La mia sigla e' S.O."],
      spiega: "Il sistema operativo fa da ponte tra l'hardware e le applicazioni." },
    { tipo: "smista", titolo: "Sistema operativo o applicazione?", min: 10, tema: "so",
      istr: "Smista ogni nome nel gruppo giusto.",
      gruppi: ["Sistema operativo", "Applicazione"],
      items: [["Windows", 0], ["Android", 0], ["Linux", 0], ["iOS", 0], ["macOS", 0],
              ["Elaboratore di testi", 1], ["Foglio elettronico", 1], ["Browser web", 1], ["App di messaggistica", 1], ["Programma di fotoritocco", 1]] },
    { tipo: "quiz", titolo: "A cosa serve?", min: 10, tema: "app", domande: [
      ["Devi scrivere una relazione per scuola. Quale applicazione usi?", ["Elaboratore di testi", "Foglio elettronico", "Browser", "Lettore musicale"], "L'elaboratore di testi serve a scrivere e impaginare documenti."],
      ["Devi calcolare le spese di una gita con formule e tabelle. Quale applicazione usi?", ["Foglio elettronico", "Presentazione", "Client di posta", "Fotoritocco"], "Il foglio elettronico lavora con numeri, tabelle e formule."],
      ["Devi esporre una ricerca alla classe con diapositive. Cosa usi?", ["Programma di presentazione", "Elaboratore di testi", "Antivirus", "Calendario"], "Le presentazioni servono a mostrare contenuti con diapositive."],
      ["Da dove e' piu' sicuro installare un'app sullo smartphone?", ["Dallo store ufficiale", "Da un link ricevuto in chat", "Da un sito sconosciuto", "Da un pop-up pubblicitario"], "Gli store ufficiali controllano le app e riducono il rischio di malware."],
      ["Perche' e' importante installare gli aggiornamenti?", ["Correggono errori e problemi di sicurezza", "Cambiano solo i colori", "Cancellano i file personali", "Rallentano il computer"], "Gli aggiornamenti chiudono falle che i malintenzionati potrebbero usare.", "so"]
    ] },
    { tipo: "scheda", titolo: "Le licenze del software", min: 10, punti: [
      ["EULA", "End User License Agreement: il contratto che accetti quando installi un programma. Dice cosa puoi e non puoi fare."],
      ["Software proprietario", "Il codice e' segreto e appartiene all'azienda; di solito si paga una licenza o un abbonamento."],
      ["Open source", "Il codice e' pubblico: puoi studiarlo, modificarlo e spesso usarlo gratis."],
      ["Freeware", "Gratuito, ma il codice non e' modificabile."],
      ["Shareware", "Lo provi gratis per un periodo o con funzioni limitate, poi paghi."],
      ["Codice prodotto", "Chiave per attivare una licenza acquistata."]
    ] },
    { tipo: "abbina", titolo: "Abbina la licenza", min: 10, tema: "lic",
      istr: "Collega ogni licenza alla sua descrizione.",
      coppie: [
        ["EULA", "Contratto di licenza per l'utente finale"],
        ["Open source", "Codice pubblico che si puo' modificare"],
        ["Freeware", "Gratis ma con codice chiuso"],
        ["Shareware", "Prova gratuita, poi si paga"],
        ["Proprietario", "Il codice appartiene all'azienda"],
        ["Abbonamento", "Si paga ogni mese o ogni anno per usarlo"]
      ] },
    { tipo: "ordina", titolo: "Spegnere nel modo giusto", min: 10, tema: "avvio",
      istr: "Metti i passaggi nell'ordine corretto con le frecce.",
      passi: ["Salva i documenti aperti", "Chiudi tutte le applicazioni", "Apri il menu Start", "Scegli Arresta il sistema", "Aspetta che il computer si spenga del tutto"] },
    { tipo: "vf", titolo: "Vero o falso?", min: 10, tema: "avvio", items: [
      ["Riavvia spegne il computer e lo riaccende subito dopo.", true, "Vero: il riavvio serve spesso dopo un aggiornamento."],
      ["Bloccare lo schermo chiude tutti i programmi.", false, "Falso: il blocco nasconde lo schermo con una password, ma i programmi restano aperti."],
      ["Disconnetti chiude la sessione del tuo utente ma lascia acceso il computer.", true, "Vero: un altro utente puo' poi accedere con il suo account."],
      ["Se un'app non risponde puoi chiuderla da Gestione attivita' (Ctrl+Alt+Canc).", true, "Vero: Gestione attivita' permette di terminare un programma bloccato."],
      ["Il software freeware si puo' sempre modificare liberamente.", false, "Falso: il freeware e' gratuito ma il codice e' chiuso. Modificabile e' l'open source.", "lic"],
      ["Installare un programma vuol dire accettarne la licenza.", true, "Vero: durante l'installazione accetti la EULA.", "lic"]
    ] },
    { tipo: "quiz", variante: "sfida", titolo: "Sfida finale", min: 15, tema: "so", domande: [
      ["Quale di questi e' un sistema operativo per smartphone?", ["Android", "Foglio elettronico", "Browser", "Chiavetta USB"], "Android e iOS sono i principali sistemi operativi mobili."],
      ["Un programma che puoi provare gratis per 30 giorni e poi devi pagare e'...", ["Shareware", "Open source", "Freeware", "Proprietario gratuito"], "Lo shareware si prova e poi si acquista.", "lic"],
      ["Cosa fa la modalita' Sospensione?", ["Mette il computer a riposo consumando poco, pronto a ripartire", "Cancella i file temporanei", "Disinstalla le app", "Spegne il monitor per sempre"], "La sospensione conserva il lavoro e consuma pochissima energia.", "avvio"],
      ["Quale applicazione useresti per navigare su Internet?", ["Browser", "Elaboratore di testi", "Antivirus", "Foglio elettronico"], "Il browser apre le pagine web.", "app"],
      ["Che cos'e' la EULA?", ["Il contratto di licenza che accetti installando un programma", "Un tipo di virus", "Un sistema operativo", "Una porta del computer"], "EULA significa End User License Agreement.", "lic"],
      ["Prima di spegnere il computer e' importante...", ["Salvare il lavoro", "Scollegare il mouse", "Togliere la corrente subito", "Svuotare il cestino"], "Salvare evita di perdere le modifiche.", "avvio"],
      ["Il sistema operativo serve a...", ["Gestire l'hardware e far funzionare le applicazioni", "Solo navigare online", "Solo scrivere testi", "Solo ascoltare musica"], "E' il programma che coordina tutto il computer."]
    ] }
  ]
},
/* ===================== LEZIONE 3 ===================== */
{
  id: 3, modulo: "CE", icona: "window",
  titolo: "Desktop, finestre e impostazioni",
  sotto: "Icone, finestre, personalizzazione e accessibilita'",
  obiettivi: ["Riconoscere le icone del desktop", "Gestire le finestre", "Cambiare le impostazioni principali", "Conoscere gli strumenti di accessibilita'"],
  attivita: [
    { tipo: "scheda", titolo: "Il desktop e le finestre", min: 10, punti: [
      ["Desktop", "La schermata principale dopo l'accesso, con icone, sfondo e barra delle applicazioni."],
      ["Icone", "Rappresentano file, cartelle, applicazioni, collegamenti e il cestino."],
      ["Collegamento", "Icona con una freccina: e' una scorciatoia che apre il file o il programma originale."],
      ["Barra del titolo", "La parte alta della finestra: trascinandola sposti la finestra."],
      ["Pulsanti della finestra", "Riduci a icona, Ingrandisci o Ripristina, Chiudi."],
      ["Passare tra finestre", "Clic sulla barra delle applicazioni oppure Alt+Tab."]
    ] },
    { tipo: "indovinello", titolo: "Chi sono?", min: 5, tema: "desk",
      testo: "Ho una piccola freccia nell'angolo. Non sono il file vero, ma se mi apri ti porto subito da lui. Se mi cancelli, il file originale resta al suo posto.",
      risposte: ["collegamento", "scorciatoia", "shortcut", "un collegamento", "icona di collegamento"],
      indizi: ["Inizio con la lettera C.", "In inglese mi chiamano shortcut."],
      spiega: "Il collegamento e' solo un puntatore: eliminarlo non cancella il file originale." },
    { tipo: "abbina", titolo: "Parti della finestra", min: 10, tema: "fin",
      istr: "Abbina ogni elemento alla sua funzione.",
      coppie: [
        ["Riduci a icona", "Nasconde la finestra nella barra delle applicazioni"],
        ["Ingrandisci", "Porta la finestra a schermo intero"],
        ["Ripristina", "Riporta la finestra alla dimensione precedente"],
        ["Chiudi", "Chiude la finestra e il programma"],
        ["Barra del titolo", "Si trascina per spostare la finestra"],
        ["Barra di scorrimento", "Fa vedere la parte nascosta del contenuto"]
      ] },
    { tipo: "quiz", titolo: "Desktop e finestre", min: 10, tema: "desk", domande: [
      ["Cosa succede se elimini un collegamento dal desktop?", ["Il file originale resta dov'e'", "Viene eliminato anche il file originale", "Il computer si spegne", "Si disinstalla il programma"], "Il collegamento e' solo una scorciatoia."],
      ["Quale combinazione di tasti fa passare da una finestra aperta all'altra?", ["Alt+Tab", "Ctrl+P", "Ctrl+S", "Alt+F4+Z"], "Tenendo premuto Alt e premendo Tab scorri le finestre aperte.", "fin"],
      ["Dove finiscono di solito i file eliminati dal disco del computer?", ["Nel cestino", "Nella RAM", "Nella stampante", "Sul desktop"], "Dal cestino si possono ancora ripristinare."],
      ["Come si sposta una finestra?", ["Trascinando la barra del titolo", "Premendo Chiudi", "Facendo doppio clic sullo sfondo", "Con il tasto Canc"], "Tieni premuto sulla barra del titolo e trascina.", "fin"],
      ["Quale icona rappresenta un contenitore di file?", ["La cartella", "Il collegamento", "Il cestino pieno", "L'orologio"], "La cartella serve a raggruppare file e altre cartelle."]
    ] },
    { tipo: "scheda", titolo: "Impostazioni e accessibilita'", min: 15, punti: [
      ["Impostazioni di base", "Data e ora, volume, sfondo, risoluzione dello schermo, lingua della tastiera."],
      ["App", "Dalle impostazioni si installano e disinstallano le applicazioni."],
      ["Lente di ingrandimento", "Ingrandisce una parte dello schermo."],
      ["Lettore dello schermo", "Legge ad alta voce cio' che appare sullo schermo."],
      ["Tastiera su schermo", "Permette di scrivere con il mouse o il tocco."],
      ["Contrasto elevato e riconoscimento vocale", "Colori piu' leggibili e comandi dati con la voce."],
      ["Cattura schermo", "Il tasto Stamp (Print Screen) copia l'immagine dello schermo, poi la incolli con Ctrl+V."]
    ] },
    { tipo: "smista", titolo: "Accessibilita' o personalizzazione?", min: 10, tema: "acc",
      istr: "Lo strumento aiuta chi ha difficolta' (accessibilita') o cambia solo l'aspetto e i suoni (personalizzazione)?",
      gruppi: ["Accessibilita'", "Personalizzazione"],
      items: [["Lente di ingrandimento", 0], ["Lettore dello schermo", 0], ["Tastiera su schermo", 0], ["Contrasto elevato", 0], ["Riconoscimento vocale", 0],
              ["Cambiare lo sfondo", 1], ["Scegliere il tema scuro", 1], ["Cambiare i suoni di sistema", 1], ["Spostare le icone sul desktop", 1]] },
    { tipo: "ordina", titolo: "Fotografa lo schermo", min: 10, tema: "acc",
      istr: "Metti in ordine i passaggi per salvare una cattura dello schermo.",
      passi: ["Apri la finestra che vuoi catturare", "Premi il tasto Stamp", "Apri un programma di grafica o un documento", "Incolla con Ctrl+V", "Salva il file con un nome chiaro"] },
    { tipo: "vf", titolo: "Vero o falso?", min: 5, tema: "imp", items: [
      ["Dalle impostazioni si puo' cambiare la lingua della tastiera.", true, "Vero: utile se hai bisogno di lettere di altre lingue."],
      ["Per disinstallare un programma basta cancellare la sua icona dal desktop.", false, "Falso: si cancella solo il collegamento. Per disinstallare si usano Impostazioni, App."],
      ["Il lettore dello schermo aiuta le persone con difficolta' visive.", true, "Vero: legge ad alta voce i contenuti.", "acc"],
      ["La risoluzione dello schermo indica quanti pixel vengono mostrati.", true, "Vero: piu' alta e' la risoluzione, piu' i dettagli sono nitidi."],
      ["La guida in linea (Aiuto) non esiste nei sistemi operativi moderni.", false, "Falso: sistemi e programmi hanno funzioni di aiuto, spesso con il tasto F1."]
    ] },
    { tipo: "quiz", variante: "sfida", titolo: "Sfida finale", min: 15, tema: "fin", domande: [
      ["Quale pulsante nasconde la finestra senza chiudere il programma?", ["Riduci a icona", "Chiudi", "Ingrandisci", "Cestino"], "Riduci a icona la manda nella barra delle applicazioni."],
      ["Quale strumento useresti per leggere un testo molto piccolo sullo schermo?", ["Lente di ingrandimento", "Tastiera su schermo", "Cestino", "Gestione attivita'"], "La lente ingrandisce l'area dello schermo.", "acc"],
      ["Come si cambia l'immagine di sfondo del desktop?", ["Dalle impostazioni di personalizzazione", "Dal cestino", "Dal BIOS", "Dalla stampante"], "Personalizzazione, Sfondo.", "imp"],
      ["Quale tasto copia l'immagine dell'intero schermo?", ["Stamp (Print Screen)", "Esc", "Tab", "Fine"], "Stamp copia lo schermo negli appunti.", "acc"],
      ["Un'icona con una freccina nell'angolo e'...", ["Un collegamento", "Un virus", "Un file nascosto", "Una cartella vuota"], "La freccina indica la scorciatoia.", "desk"],
      ["Dove regoli il volume e la data del computer?", ["Nelle impostazioni di sistema", "Nel cestino", "Nel browser", "Nell'elaboratore di testi"], "Sono impostazioni di sistema.", "imp"],
      ["Quale strumento permette di dare comandi parlando?", ["Riconoscimento vocale", "Lente di ingrandimento", "Contrasto elevato", "Cattura schermo"], "Il riconoscimento vocale trasforma la voce in comandi o testo.", "acc"]
    ] }
  ]
},
/* ===================== LEZIONE 4 ===================== */
{
  id: 4, modulo: "CE", icona: "folder",
  titolo: "File e cartelle",
  sotto: "Estensioni, organizzazione, memorie e compressione",
  obiettivi: ["Riconoscere i tipi di file dalle estensioni", "Copiare, spostare e rinominare", "Conoscere memorie e unita' di misura", "Comprimere ed estrarre file"],
  attivita: [
    { tipo: "scheda", titolo: "File, cartelle ed estensioni", min: 10, punti: [
      ["File", "Contiene dati: un testo, una foto, una canzone, un programma."],
      ["Cartella", "Contiene file e altre cartelle (sottocartelle) per tenerli in ordine."],
      ["Percorso", "L'indirizzo di un file, per esempio C:\\Utenti\\Luca\\Documenti\\ricerca.docx"],
      ["Estensione", "Le lettere dopo il punto nel nome: dicono che tipo di file e' e con quale programma aprirlo."],
      ["Proprieta'", "Nome, tipo, dimensione, data di modifica. Puoi ordinare i file in base a queste."],
      ["Buone abitudini", "Nomi chiari, cartelle per materia, niente file sparsi sul desktop."]
    ] },
    { tipo: "abbina", titolo: "Abbina l'estensione", min: 10, tema: "file",
      istr: "Collega ogni estensione al tipo di file.",
      coppie: [
        [".docx", "Documento di testo"],
        [".xlsx", "Foglio di calcolo"],
        [".pptx", "Presentazione"],
        [".pdf", "Documento non modificabile da stampare o condividere"],
        [".jpg", "Immagine o foto"],
        [".mp3", "File audio"],
        [".mp4", "File video"],
        [".zip", "Archivio compresso"]
      ] },
    { tipo: "indovinello", titolo: "Chi sono?", min: 5, tema: "file",
      testo: "Vivo alla fine del nome del file, subito dopo il punto. Con poche lettere dico al computer quale programma deve aprirmi.",
      risposte: ["estensione", "l'estensione", "estensione del file", "estensione file"],
      indizi: ["Esempi di me: docx, jpg, mp3.", "Inizio con la lettera E."],
      spiega: "L'estensione identifica il formato del file." },
    { tipo: "scheda", titolo: "Copia, sposta, rinomina", min: 10, punti: [
      ["Ctrl+C e Ctrl+V", "Copia e incolla: il file resta anche nel posto originale."],
      ["Ctrl+X e Ctrl+V", "Taglia e incolla: il file viene spostato."],
      ["Ctrl+Z", "Annulla l'ultima azione."],
      ["F2", "Rinomina il file selezionato."],
      ["Selezione multipla", "Ctrl+clic per scegliere file sparsi, Maiusc+clic per un gruppo consecutivo."],
      ["Ricerca", "Cerca i file per nome, tipo o data dalla casella di ricerca."]
    ] },
    { tipo: "quiz", titolo: "Organizzare i file", min: 10, tema: "org", domande: [
      ["Vuoi un file sia nella chiavetta sia nel computer. Cosa fai?", ["Lo copi", "Lo sposti", "Lo rinomini", "Lo elimini"], "Copiando, l'originale resta dov'era."],
      ["Quale tasto rinomina un file selezionato?", ["F2", "F5", "Esc", "Canc"], "F2 attiva la modifica del nome."],
      ["Ctrl+X seguito da Ctrl+V serve a...", ["Spostare un file", "Copiare un file", "Stampare un file", "Comprimere un file"], "Taglia e incolla sposta l'elemento."],
      ["Hai eliminato per errore un file. Cosa provi subito?", ["Ctrl+Z oppure lo ripristini dal cestino", "Spegni il computer", "Svuoti il cestino", "Formatti il disco"], "Annulla o ripristino dal cestino recuperano il file.", "zip"],
      ["Come selezioni tre file non vicini tra loro?", ["Tieni premuto Ctrl e fai clic su ciascuno", "Premi F2", "Fai doppio clic sullo sfondo", "Premi Esc"], "Ctrl+clic aggiunge un file alla selezione."]
    ] },
    { tipo: "ordina", titolo: "Dal piu' piccolo al piu' grande", min: 10, tema: "mem",
      istr: "Ordina le unita' di misura della memoria, dalla piu' piccola alla piu' grande.",
      passi: ["bit", "Byte", "Kilobyte (KB)", "Megabyte (MB)", "Gigabyte (GB)", "Terabyte (TB)"] },
    { tipo: "smista", titolo: "Locale o online?", min: 10, tema: "mem",
      istr: "La memoria e' sul dispositivo (locale) o su Internet (cloud)?",
      gruppi: ["Memoria locale", "Memoria online (cloud)"],
      items: [["Disco rigido interno", 0], ["SSD", 0], ["Chiavetta USB", 0], ["Disco esterno", 0], ["Scheda di memoria", 0],
              ["OneDrive", 1], ["Google Drive", 1], ["Dropbox", 1], ["iCloud", 1]] },
    { tipo: "vf", titolo: "Vero o falso?", min: 10, tema: "zip", items: [
      ["Comprimere un file ne riduce la dimensione.", true, "Vero: l'archivio .zip occupa meno spazio ed e' piu' facile da inviare."],
      ["Per usare i file di un archivio .zip di solito bisogna prima estrarli.", true, "Vero: l'estrazione ricrea i file originali."],
      ["Svuotare il cestino permette di recuperare i file piu' tardi.", false, "Falso: svuotando il cestino i file vengono eliminati definitivamente."],
      ["1 Gigabyte e' piu' grande di 1 Megabyte.", true, "Vero: 1 GB vale circa 1000 MB (1024 per la precisione).", "mem"],
      ["Un file .pdf e' un'immagine.", false, "Falso: il PDF e' un documento pensato per essere letto e stampato uguale ovunque.", "file"],
      ["La memoria cloud richiede una connessione a Internet per sincronizzare i file.", true, "Vero: i file sono salvati su server online.", "mem"]
    ] },
    { tipo: "quiz", variante: "sfida", titolo: "Sfida finale", min: 15, tema: "file", domande: [
      ["Quale file si apre con un programma di presentazione?", ["relazione.pptx", "foto.jpg", "canzone.mp3", "tabella.xlsx"], "L'estensione .pptx indica una presentazione."],
      ["Quale unita' e' la piu' grande?", ["Terabyte", "Gigabyte", "Megabyte", "Kilobyte"], "TB > GB > MB > KB.", "mem"],
      ["Vuoi spedire 20 foto in un unico file piu' leggero. Cosa fai?", ["Le comprimi in un archivio .zip", "Le rinomini", "Le stampi", "Le metti nel cestino"], "La compressione le raccoglie e riduce la dimensione.", "zip"],
      ["Cosa indica questo percorso: D:\\Scuola\\Storia\\romani.docx ?", ["Il file romani.docx nella cartella Storia, dentro Scuola, sull'unita' D", "Una pagina web", "Un programma da installare", "Un indirizzo email"], "Il percorso descrive la posizione del file, cartella per cartella.", "org"],
      ["Quale memoria e' meglio per portare i compiti da casa a scuola senza Internet?", ["Una chiavetta USB", "La RAM", "Il cloud", "La CPU"], "La chiavetta e' una memoria rimovibile.", "mem"],
      ["Come ordini i file per vedere per primi quelli modificati di recente?", ["Ordini per data di modifica", "Ordini per nome", "Li comprimi", "Li rinomini"], "L'ordinamento per data mostra i piu' recenti.", "org"],
      ["Che tipo di file e' vacanze.mp4?", ["Un video", "Un testo", "Un foglio di calcolo", "Un archivio"], ".mp4 e' un formato video."]
    ] }
  ]
},
/* ===================== LEZIONE 5 ===================== */
{
  id: 5, modulo: "CE", icona: "network",
  titolo: "Reti e connessione",
  sotto: "LAN, Internet, ISP, velocita' e Wi-Fi",
  obiettivi: ["Distinguere i tipi di rete", "Conoscere i modi di collegarsi a Internet", "Capire download, upload e velocita'", "Usare il Wi-Fi in sicurezza"],
  attivita: [
    { tipo: "scheda", titolo: "Le reti informatiche", min: 15, punti: [
      ["Rete", "Dispositivi collegati per condividere dati, stampanti e connessione."],
      ["LAN", "Rete locale: collega dispositivi vicini, come nella scuola o a casa."],
      ["WLAN", "Rete locale senza fili, cioe' il Wi-Fi."],
      ["VPN", "Rete privata virtuale: collegamento protetto e cifrato a una rete attraverso Internet."],
      ["Internet", "La rete mondiale che collega milioni di reti."],
      ["ISP", "Internet Service Provider: l'azienda che fornisce la connessione a pagamento."],
      ["Tipi di connessione", "Fibra, ADSL, rete mobile 4G e 5G, satellite, Wi-Fi."],
      ["Velocita'", "Si misura in bit al secondo: Kbps, Mbps, Gbps."]
    ] },
    { tipo: "indovinello", titolo: "Chi sono?", min: 5, tema: "conn",
      testo: "Sono l'azienda a cui la tua famiglia paga l'abbonamento per collegarsi a Internet. Senza di me, niente navigazione da casa.",
      risposte: ["isp", "provider", "internet service provider", "fornitore", "fornitore di servizi internet", "gestore"],
      indizi: ["Sono una sigla di tre lettere che finisce con P.", "In italiano mi chiamano fornitore di servizi Internet."],
      spiega: "L'ISP (Internet Service Provider) offre l'accesso a Internet." },
    { tipo: "abbina", titolo: "Abbina la rete", min: 10, tema: "rete",
      istr: "Collega ogni sigla al suo significato.",
      coppie: [
        ["LAN", "Rete locale, per esempio nel laboratorio della scuola"],
        ["WLAN", "Rete locale senza fili (Wi-Fi)"],
        ["VPN", "Collegamento privato e cifrato attraverso Internet"],
        ["Internet", "Rete mondiale di reti"],
        ["Hotspot", "Punto di accesso Wi-Fi, anche creato dallo smartphone"]
      ] },
    { tipo: "quiz", titolo: "Connessi o no?", min: 10, tema: "conn", domande: [
      ["Quale connessione e' in genere la piu' veloce per la casa?", ["Fibra ottica", "Linea telefonica con modem a 56 Kbps", "SMS", "Bluetooth"], "La fibra trasmette dati con la luce e raggiunge velocita' molto alte."],
      ["Lo smartphone si collega a Internet fuori casa usando...", ["La rete mobile 4G o 5G", "Il cavo HDMI", "La porta USB", "La stampante"], "La rete mobile del gestore telefonico."],
      ["In cosa si misura la velocita' di una connessione?", ["Mbps (megabit al secondo)", "GHz", "Megabyte di RAM", "Pixel"], "I bit al secondo indicano quanti dati passano ogni secondo.", "vel"],
      ["Una rete che collega i computer di un'unica scuola e'...", ["Una LAN", "Internet", "Un ISP", "Un browser"], "La LAN e' locale.", "rete"],
      ["Cosa permette di fare una VPN?", ["Collegarsi in modo protetto a una rete attraverso Internet", "Stampare a distanza senza rete", "Aumentare la RAM", "Caricare la batteria"], "La VPN crea un collegamento privato e cifrato.", "rete"]
    ] },
    { tipo: "smista", titolo: "Download o upload?", min: 10, tema: "vel",
      istr: "I dati arrivano a te (download) o partono da te verso la rete (upload)?",
      gruppi: ["Download", "Upload"],
      items: [["Scaricare un'app", 0], ["Ricevere un allegato e aprirlo", 0], ["Guardare un video in streaming", 0], ["Salvare un PDF dal sito della scuola", 0],
              ["Pubblicare una foto", 1], ["Caricare un compito sulla piattaforma della scuola", 1], ["Inviare un video a un amico", 1], ["Salvare un file nel cloud", 1]] },
    { tipo: "ordina", titolo: "Velocita' crescente", min: 10, tema: "vel",
      istr: "Ordina dalla velocita' piu' bassa alla piu' alta.",
      passi: ["bps (bit al secondo)", "Kbps (kilobit al secondo)", "Mbps (megabit al secondo)", "Gbps (gigabit al secondo)"] },
    { tipo: "vf", titolo: "Vero o falso?", min: 10, tema: "wifi", items: [
      ["Una rete Wi-Fi protetta richiede una password per collegarsi.", true, "Vero: la password impedisce l'accesso agli estranei."],
      ["Su una rete Wi-Fi pubblica aperta e' sicuro inserire la password della banca.", false, "Falso: le reti aperte non sono protette e altri potrebbero intercettare i dati."],
      ["Internet e la LAN sono esattamente la stessa cosa.", false, "Falso: la LAN e' locale, Internet collega reti di tutto il mondo.", "rete"],
      ["Lo smartphone puo' condividere la sua connessione creando un hotspot.", true, "Vero: altri dispositivi si collegano al suo Wi-Fi.", "rete"],
      ["Il download e' l'invio di dati dal tuo dispositivo alla rete.", false, "Falso: quello e' l'upload. Download significa ricevere.", "vel"]
    ] },
    { tipo: "quiz", variante: "sfida", titolo: "Sfida finale", min: 20, tema: "rete", domande: [
      ["Cosa significa WLAN?", ["Rete locale senza fili", "Rete mondiale", "Rete solo via cavo", "Programma antivirus"], "La W sta per wireless, senza fili."],
      ["Chi ti fornisce l'accesso a Internet?", ["L'ISP", "Il browser", "Il sistema operativo", "Il motore di ricerca"], "Internet Service Provider.", "conn"],
      ["Caricare un video su una piattaforma e'...", ["Un upload", "Un download", "Una compressione", "Una LAN"], "Upload: i dati partono da te.", "vel"],
      ["Quale velocita' e' maggiore?", ["1 Gbps", "100 Mbps", "500 Kbps", "10 Mbps"], "1 Gbps equivale a 1000 Mbps.", "vel"],
      ["Perche' proteggere il Wi-Fi di casa con una password?", ["Per impedire che estranei usino la rete o vedano i dati", "Per farlo andare piu' piano", "Per spegnere il modem", "Non serve a niente"], "Una rete protetta e' piu' sicura.", "wifi"],
      ["Quale di queste NON e' un tipo di connessione a Internet?", ["Cavo HDMI", "Fibra", "5G", "Satellite"], "L'HDMI collega monitor e TV.", "conn"],
      ["Internet e'...", ["Una rete mondiale di reti collegate", "Un singolo computer molto grande", "Un programma per scrivere", "Un tipo di stampante"], "Internet collega milioni di reti in tutto il mondo."]
    ] }
  ]
},
/* ===================== LEZIONE 6 ===================== */
{
  id: 6, modulo: "CE", icona: "shield", simulazione: true,
  titolo: "Sicurezza, salute e simulazione",
  sotto: "Password, malware, benessere digitale e test di modulo",
  obiettivi: ["Creare password forti", "Riconoscere i tipi di malware", "Lavorare al computer in modo sano", "Affrontare la simulazione d'esame Computer Essentials"],
  attivita: [
    { tipo: "scheda", titolo: "Proteggi te e i tuoi dati", min: 10, punti: [
      ["Password forte", "Almeno 12 caratteri, maiuscole, minuscole, numeri e simboli, senza nomi o date di nascita, diversa per ogni account."],
      ["Due fattori", "Oltre alla password serve un codice ricevuto sullo smartphone."],
      ["Backup", "Copia di sicurezza dei file su disco esterno o cloud, da fare regolarmente."],
      ["Malware", "Software dannoso: virus, worm, trojan, spyware, ransomware, adware."],
      ["Difese", "Antivirus aggiornato, aggiornamenti del sistema, niente allegati o programmi sconosciuti."],
      ["Salute", "Pause regolari, schermo all'altezza degli occhi, schiena appoggiata, buona luce senza riflessi."],
      ["Ambiente", "Riciclare i dispositivi come RAEE, spegnere quelli inutilizzati, usare il risparmio energetico."]
    ] },
    { tipo: "smista", titolo: "Password forte o debole?", min: 5, tema: "pwd",
      istr: "Smista ogni password.",
      gruppi: ["Forte", "Debole"],
      items: [["Gatto!Viola7Pizza", 0], ["T9#ram&Luna42", 0], ["Ci@oMondo-2026x", 0],
              ["123456", 1], ["password", 1], ["luca2013", 1], ["qwerty", 1], ["IlMioNome", 1]] },
    { tipo: "abbina", titolo: "Riconosci il malware", min: 10, tema: "mal",
      istr: "Abbina ogni malware alla sua descrizione.",
      coppie: [
        ["Virus", "Si attacca ai file e si diffonde quando vengono aperti"],
        ["Worm", "Si copia da solo da un computer all'altro attraverso la rete"],
        ["Trojan", "Sembra un programma utile ma nasconde codice dannoso"],
        ["Spyware", "Spia di nascosto cio' che fai e i tuoi dati"],
        ["Ransomware", "Blocca i file e chiede un riscatto"],
        ["Adware", "Mostra pubblicita' indesiderata"]
      ] },
    { tipo: "vf", titolo: "Benessere e ambiente", min: 10, tema: "sal", items: [
      ["E' consigliato fare brevi pause regolari quando si usa a lungo il computer.", true, "Vero: riposano occhi, schiena e mente."],
      ["Lo schermo andrebbe posizionato all'altezza degli occhi, a circa un braccio di distanza.", true, "Vero: riduce l'affaticamento di collo e vista."],
      ["Un vecchio smartphone rotto si puo' buttare nel bidone dell'indifferenziata.", false, "Falso: va portato nei punti di raccolta RAEE per essere riciclato.", "amb"],
      ["Impostare la sospensione automatica aiuta a risparmiare energia.", true, "Vero: il dispositivo consuma molto meno quando non lo usi.", "amb"],
      ["Usare la stessa password per tutti gli account e' una buona idea.", false, "Falso: se ne scoprono una, possono entrare in tutti i tuoi account.", "pwd"],
      ["Un backup e' una copia di sicurezza dei propri file.", true, "Vero: se il computer si guasta, i dati sono salvi.", "pwd"]
    ] },
    { tipo: "indovinello", titolo: "Chi sono?", min: 5, tema: "mal",
      testo: "Entro nel computer, chiudo a chiave tutte le tue foto e i tuoi documenti e poi chiedo dei soldi per restituirteli.",
      risposte: ["ransomware", "un ransomware", "ransom"],
      indizi: ["Il mio nome contiene la parola inglese ransom, che significa riscatto.", "Mi batti con un buon backup."],
      spiega: "Il ransomware cifra i file e chiede un riscatto. Il backup e' la migliore difesa." },
    { tipo: "scheda", titolo: "Pronti per la simulazione", min: 10, punti: [
      ["Come funziona", "Domande a scelta multipla su tutto il modulo Computer Essentials, dalle lezioni 1 a 6."],
      ["Soglia", "Come all'esame ICDL, per superarla serve almeno il 75% di risposte corrette."],
      ["Strategia", "Leggi tutta la domanda e tutte le risposte. Elimina prima quelle sicuramente sbagliate."],
      ["Dopo", "Il resoconto finale ti dira' su quali argomenti ripassare."]
    ], nota: "Il prof puo' fare un ripasso veloce prima di iniziare." },
    { tipo: "quiz", variante: "simulazione", titolo: "Simulazione Computer Essentials", min: 40, tema: "ict", domande: [
      ["Che cos'e' l'hardware?", ["Le parti fisiche del computer", "I programmi installati", "La connessione a Internet", "I file salvati"], "Hardware = componenti fisici.", "ict"],
      ["Quale memoria si svuota quando spegni il computer?", ["RAM", "SSD", "Disco rigido", "Chiavetta USB"], "La RAM e' volatile.", "hw"],
      ["Quale di questi dispositivi e' solo di output?", ["Stampante", "Tastiera", "Microfono", "Scanner"], "La stampante produce un risultato.", "io"],
      ["Quale di questi e' un sistema operativo?", ["Linux", "Foglio elettronico", "Browser", "Antivirus"], "Linux e' un sistema operativo.", "so"],
      ["Un software di cui puoi leggere e modificare il codice e'...", ["Open source", "Shareware", "Proprietario", "Freeware"], "Il codice e' aperto.", "lic"],
      ["Cosa fa Disconnetti?", ["Chiude la sessione dell'utente lasciando acceso il computer", "Spegne il computer", "Elimina l'account", "Stacca il Wi-Fi"], "Disconnetti esce dall'account.", "avvio"],
      ["Come passi rapidamente da una finestra all'altra?", ["Alt+Tab", "Ctrl+C", "F2", "Ctrl+Z"], "Alt+Tab scorre le finestre.", "fin"],
      ["Quale strumento di accessibilita' legge ad alta voce lo schermo?", ["Lettore dello schermo", "Lente di ingrandimento", "Contrasto elevato", "Cattura schermo"], "Utile per chi ha difficolta' visive.", "acc"],
      ["Che tipo di file e' compito.docx?", ["Documento di testo", "Immagine", "Audio", "Archivio compresso"], ".docx e' un documento di testo.", "file"],
      ["Copiare un file significa...", ["Crearne un duplicato lasciando l'originale", "Spostarlo cancellando l'originale", "Rinominarlo", "Comprimerlo"], "La copia lascia l'originale al suo posto.", "org"],
      ["Quale ordine e' corretto, dal piu' piccolo?", ["KB, MB, GB, TB", "MB, KB, TB, GB", "GB, MB, KB, TB", "TB, GB, MB, KB"], "Ogni unita' e' circa 1000 volte la precedente.", "mem"],
      ["Cosa succede quando svuoti il cestino?", ["I file vengono eliminati definitivamente", "I file tornano nelle cartelle", "I file vengono compressi", "I file vanno nel cloud"], "Svuotare il cestino cancella per sempre.", "zip"],
      ["Una rete locale senza fili si chiama...", ["WLAN", "WAN", "VPN", "ISP"], "WLAN = Wireless LAN.", "rete"],
      ["Inviare un file al cloud e' un...", ["Upload", "Download", "Backup ridotto", "Malware"], "I dati partono dal tuo dispositivo.", "vel"],
      ["Quale password e' piu' sicura?", ["V3rde!Monte#88", "giulia2012", "123456", "password"], "Lunga e con caratteri diversi.", "pwd"],
      ["Un programma che sembra utile ma nasconde codice dannoso e' un...", ["Trojan", "Backup", "Driver", "Browser"], "Come il cavallo di Troia.", "mal"],
      ["Per lavorare al computer senza affaticare la vista e' bene...", ["Fare pause regolari e avere buona luce", "Stare al buio", "Avvicinarsi molto allo schermo", "Non sbattere mai le palpebre"], "Pause e illuminazione corretta.", "sal"],
      ["Dove si portano i dispositivi elettronici da buttare?", ["Nei centri di raccolta RAEE", "Nell'umido", "Nella plastica", "Nella carta"], "I RAEE si riciclano in modo speciale.", "amb"],
      ["Cosa protegge da molti tipi di malware?", ["Un antivirus aggiornato", "Uno sfondo scuro", "Piu' icone sul desktop", "Un mouse wireless"], "L'antivirus individua e blocca il malware.", "mal"],
      ["Quale connessione usa lo smartphone quando non c'e' Wi-Fi?", ["Rete mobile 4G o 5G", "HDMI", "LAN via cavo", "Bluetooth della stampante"], "Il gestore telefonico fornisce la rete mobile.", "conn"]
    ] }
  ]
},
/* ===================== LEZIONE 7 ===================== */
{
  id: 7, modulo: "OE", icona: "globe",
  titolo: "Internet e il Web",
  sotto: "URL, browser, cookie e navigazione sicura",
  obiettivi: ["Distinguere Internet dal Web", "Leggere le parti di un URL", "Sapere cosa sono cookie, cache e pop-up", "Riconoscere un sito sicuro"],
  attivita: [
    { tipo: "scheda", titolo: "Internet, Web e indirizzi", min: 15, punti: [
      ["Internet", "La rete mondiale che collega i computer."],
      ["World Wide Web", "Uno dei servizi di Internet: milioni di pagine collegate tra loro da link (collegamenti ipertestuali)."],
      ["URL", "L'indirizzo di una pagina, per esempio https://www.scuola.it/corsi/icdl.html"],
      ["Parti dell'URL", "https = protocollo, www.scuola.it = nome di dominio, .it = dominio di primo livello, /corsi/icdl.html = percorso."],
      ["Browser", "Il programma che apre le pagine web: Chrome, Edge, Firefox, Safari."],
      ["Cookie", "Piccoli file che un sito salva nel browser per ricordare preferenze e accessi."],
      ["Cache", "Copie temporanee delle pagine per caricarle piu' in fretta."],
      ["Pop-up", "Finestre che si aprono da sole, spesso pubblicita': il browser puo' bloccarle."]
    ] },
    { tipo: "abbina", titolo: "Smonta l'indirizzo", min: 10, tema: "url",
      istr: "Indirizzo: https://www.museo.it/mostre/egitto.html. Abbina ogni pezzo al suo ruolo.",
      coppie: [
        ["https://", "Protocollo di comunicazione sicuro"],
        ["www.museo.it", "Nome di dominio del sito"],
        [".it", "Dominio di primo livello (Italia)"],
        ["/mostre/egitto.html", "Percorso della pagina nel sito"],
        [".org", "Dominio usato spesso da associazioni e organizzazioni"]
      ] },
    { tipo: "indovinello", titolo: "Chi sono?", min: 5, tema: "brw",
      testo: "Sono piccolo come un biscotto. Un sito mi salva nel tuo browser per ricordarsi di te: lingua, carrello, accesso fatto.",
      risposte: ["cookie", "cookies", "il cookie", "i cookie", "biscotto"],
      indizi: ["Il mio nome in inglese significa biscotto.", "Quando entri in un sito spesso ti chiedono di accettarmi."],
      spiega: "I cookie memorizzano informazioni di navigazione. Puoi accettarli, rifiutarli o cancellarli." },
    { tipo: "quiz", titolo: "Il Web in pratica", min: 10, tema: "web", domande: [
      ["Qual e' la differenza tra Internet e Web?", ["Internet e' la rete, il Web e' un servizio che funziona su Internet", "Sono la stessa identica cosa", "Il Web e' una rete via cavo, Internet senza fili", "Internet e' un browser"], "Anche l'email funziona su Internet, ma non e' il Web."],
      ["Che cos'e' un link (collegamento ipertestuale)?", ["Un elemento che, cliccato, porta a un'altra pagina o risorsa", "Un virus", "Un tipo di cavo", "Una password"], "I link collegano le pagine del Web."],
      ["Quale di questi e' un browser?", ["Firefox", "Windows", "Word", "Excel"], "Firefox apre le pagine web.", "brw"],
      ["Cosa fa il blocco dei pop-up?", ["Impedisce l'apertura automatica di finestre indesiderate", "Blocca tutto Internet", "Cancella i segnalibri", "Velocizza la CPU"], "Riduce pubblicita' fastidiose e rischi.", "brw"],
      ["Che cos'e' la cache del browser?", ["Copie temporanee delle pagine visitate per caricarle piu' in fretta", "L'elenco delle password", "Un tipo di cookie pubblicitario obbligatorio", "La pagina iniziale"], "La cache velocizza la navigazione.", "brw"]
    ] },
    { tipo: "scheda", titolo: "Navigare sicuri", min: 10, punti: [
      ["HTTPS e lucchetto", "La connessione e' cifrata: i dati viaggiano protetti."],
      ["Certificato digitale", "Conferma l'identita' del sito. Cliccando sul lucchetto lo puoi vedere."],
      ["Indirizzo corretto", "Controlla che sia scritto bene: siti falsi usano nomi simili."],
      ["Acquisti online", "Solo su siti affidabili, con contatti chiari, e sempre con un adulto."],
      ["Controllo genitori", "Filtri che limitano siti e tempo di utilizzo per i piu' giovani."]
    ] },
    { tipo: "smista", titolo: "Sicuro o sospetto?", min: 10, tema: "sicn",
      istr: "Questo segnale indica un sito affidabile o uno sospetto?",
      gruppi: ["Segnale di sicurezza", "Segnale sospetto"],
      items: [["Lucchetto accanto all'indirizzo", 0], ["Indirizzo che inizia con https", 0], ["Contatti e dati dell'azienda presenti", 0], ["Indirizzo scritto correttamente", 0],
              ["Pagina di pagamento con http senza lucchetto", 1], ["Pop-up: Hai vinto uno smartphone!", 1], ["Indirizzo con lettere strane: amaz0n-offerte.biz", 1], ["Prezzo troppo basso per essere vero", 1]] },
    { tipo: "vf", titolo: "Vero o falso?", min: 10, tema: "sicn", items: [
      ["Il lucchetto vicino all'indirizzo indica una connessione cifrata.", true, "Vero: i dati scambiati con il sito sono protetti."],
      ["Se un sito ha il lucchetto, tutto quello che dice e' sicuramente vero.", false, "Falso: il lucchetto protegge la connessione, non garantisce che i contenuti siano affidabili."],
      ["I cookie si possono cancellare dalle impostazioni del browser.", true, "Vero: nelle impostazioni di privacy del browser.", "brw"],
      ["Il dominio .it indica di solito siti italiani.", true, "Vero: e' il dominio di primo livello dell'Italia.", "url"],
      ["Il controllo genitori serve a limitare contenuti e tempi per i minori.", true, "Vero: e' uno strumento di protezione."]
    ] },
    { tipo: "quiz", variante: "sfida", titolo: "Sfida finale", min: 20, tema: "url", domande: [
      ["Nell'indirizzo https://www.comune.milano.it qual e' il dominio di primo livello?", [".it", "https", "www", "comune"], "E' l'ultima parte del dominio."],
      ["Cosa indica https all'inizio di un URL?", ["Una connessione protetta e cifrata", "Un sito gratuito", "Un sito per bambini", "Una pagina senza immagini"], "La S sta per secure.", "sicn"],
      ["A cosa servono i cookie?", ["A ricordare informazioni sulla tua navigazione", "A riparare il computer", "A scaricare musica", "A stampare pagine"], "Preferenze, accessi, carrello.", "brw"],
      ["Quale e' un segnale di un sito falso?", ["Indirizzo con errori o lettere al posto di numeri", "Lucchetto presente", "Pagina contatti completa", "Indirizzo ufficiale"], "Imitano nomi famosi con piccole differenze.", "sicn"],
      ["Il Web e'...", ["Un insieme di pagine collegate da link, su Internet", "Un cavo di rete", "Un sistema operativo", "Un tipo di computer"], "Il World Wide Web.", "web"],
      ["Quale parte dell'URL indica la pagina precisa dentro il sito?", ["Il percorso, dopo la barra /", "Il protocollo", "Il dominio di primo livello", "Il www"], "Il percorso porta alla pagina.", "url"],
      ["Cliccando sul lucchetto nella barra degli indirizzi puoi vedere...", ["Le informazioni sul certificato e la sicurezza del sito", "La tua password", "I file del computer", "Il volume"], "Il certificato conferma l'identita' del sito.", "sicn"]
    ] }
  ]
},
/* ===================== LEZIONE 8 ===================== */
{
  id: 8, modulo: "OE", icona: "compass",
  titolo: "Navigare con il browser",
  sotto: "Schede, segnalibri, cronologia, download e stampa",
  obiettivi: ["Usare schede e finestre", "Salvare e organizzare segnalibri", "Gestire cronologia e dati di navigazione", "Scaricare, copiare e stampare dal web"],
  attivita: [
    { tipo: "scheda", titolo: "Il browser come un pro", min: 15, punti: [
      ["Barra degli indirizzi", "Si scrive l'URL o una ricerca."],
      ["Indietro, Avanti, Aggiorna", "Per muoversi tra le pagine visitate e ricaricare la pagina (F5)."],
      ["Schede", "Piu' pagine nella stessa finestra: Ctrl+T apre, Ctrl+W chiude."],
      ["Segnalibri (Preferiti)", "Salvano le pagine utili: Ctrl+D. Si organizzano in cartelle."],
      ["Cronologia", "Elenco delle pagine visitate (Ctrl+H). Si puo' cancellare."],
      ["Navigazione in incognito", "Non salva cronologia e cookie dopo la chiusura, ma non ti rende invisibile."],
      ["Download", "I file scaricati finiscono di solito nella cartella Download."],
      ["Stampa", "Ctrl+P apre la stampa con l'anteprima e le opzioni."]
    ] },
    { tipo: "abbina", titolo: "Scorciatoie del browser", min: 10, tema: "nav",
      istr: "Abbina la scorciatoia all'azione.",
      coppie: [
        ["Ctrl+T", "Apre una nuova scheda"],
        ["Ctrl+W", "Chiude la scheda attuale"],
        ["Ctrl+D", "Salva la pagina nei segnalibri"],
        ["Ctrl+H", "Apre la cronologia"],
        ["Ctrl+P", "Stampa la pagina"],
        ["F5", "Aggiorna la pagina"],
        ["Ctrl+F", "Cerca una parola nella pagina"]
      ] },
    { tipo: "indovinello", titolo: "Chi sono?", min: 5, tema: "seg",
      testo: "Ricordo tutte le pagine che hai visitato, giorno per giorno. Se vuoi che le dimentichi, puoi cancellarmi.",
      risposte: ["cronologia", "la cronologia", "cronologia di navigazione", "history"],
      indizi: ["Mi apri con Ctrl+H.", "In inglese mi chiamano history."],
      spiega: "La cronologia elenca le pagine visitate e si puo' cancellare dalle impostazioni." },
    { tipo: "quiz", titolo: "Navigazione", min: 10, tema: "nav", domande: [
      ["Vuoi tornare alla pagina che hai visto prima. Quale pulsante usi?", ["Indietro", "Aggiorna", "Home", "Chiudi scheda"], "La freccia Indietro torna alla pagina precedente."],
      ["La pagina non si carica bene. Cosa provi per prima cosa?", ["Aggiornarla con F5", "Spegnere il monitor", "Cancellare i segnalibri", "Disinstallare il browser"], "Ricaricare spesso risolve."],
      ["Come cerchi la parola fotosintesi dentro una pagina lunga?", ["Ctrl+F", "Ctrl+T", "Ctrl+D", "Ctrl+W"], "Trova nella pagina."],
      ["Dove finiscono normalmente i file scaricati?", ["Nella cartella Download", "Nel cestino", "Nei segnalibri", "Nella cache"], "Puoi cambiare la cartella nelle impostazioni.", "down"],
      ["Come vedi come verra' la pagina prima di stamparla?", ["Con l'anteprima di stampa", "Con la cronologia", "Con i cookie", "Con Ctrl+H"], "L'anteprima mostra il risultato finale.", "down"]
    ] },
    { tipo: "ordina", titolo: "Salva un segnalibro", min: 10, tema: "seg",
      istr: "Ordina i passaggi per salvare una pagina in una cartella di segnalibri.",
      passi: ["Apri la pagina che vuoi salvare", "Fai clic sulla stella nella barra degli indirizzi", "Scrivi un nome chiaro per il segnalibro", "Scegli la cartella Scuola", "Conferma con Fine"] },
    { tipo: "smista", titolo: "Navigazione in incognito", min: 10, tema: "seg",
      istr: "Dopo aver chiuso la finestra in incognito, questa cosa resta salvata o no?",
      gruppi: ["Non viene salvato", "Resta salvato"],
      items: [["Cronologia delle pagine", 0], ["Cookie della sessione", 0], ["Dati inseriti nei moduli", 0],
              ["File scaricati", 1], ["Segnalibri creati", 1], ["Quello che il sito o la rete della scuola registrano", 1]] },
    { tipo: "vf", titolo: "Vero o falso?", min: 10, tema: "down", items: [
      ["Si puo' copiare un testo da una pagina web e incollarlo in un documento.", true, "Vero: selezioni, Ctrl+C e Ctrl+V. Ricordati di citare la fonte."],
      ["Un'immagine trovata online si puo' sempre usare liberamente.", false, "Falso: molte immagini sono protette da diritto d'autore."],
      ["La navigazione in incognito ti rende invisibile alla scuola e al gestore della rete.", false, "Falso: chi gestisce la rete puo' comunque vedere il traffico.", "seg"],
      ["La pagina iniziale del browser si puo' cambiare dalle impostazioni.", true, "Vero: scegli il sito che si apre all'avvio.", "nav"],
      ["I segnalibri si possono organizzare in cartelle.", true, "Vero: per esempio una cartella per ogni materia.", "seg"]
    ] },
    { tipo: "quiz", variante: "sfida", titolo: "Sfida finale", min: 20, tema: "seg", domande: [
      ["Quale scorciatoia salva la pagina nei preferiti?", ["Ctrl+D", "Ctrl+P", "Ctrl+H", "Ctrl+F"], "Ctrl+D aggiunge la pagina ai segnalibri."],
      ["Cosa fa Ctrl+W?", ["Chiude la scheda attuale", "Apre una nuova finestra", "Stampa", "Aggiorna"], "Chiude la scheda attiva.", "nav"],
      ["Vuoi cancellare le tracce delle pagine visitate. Cosa elimini?", ["La cronologia", "I download", "Il desktop", "Il sistema operativo"], "Cancellare la cronologia rimuove l'elenco delle visite."],
      ["Come salvi un'immagine da una pagina web?", ["Clic destro sull'immagine, Salva immagine con nome", "Doppio clic sulla barra del titolo", "Premi F5", "Chiudi la scheda"], "Il menu del tasto destro offre il salvataggio.", "down"],
      ["La navigazione in incognito...", ["Non salva la cronologia dopo la chiusura", "Rende impossibile scaricare file", "Blocca tutti i virus", "Nasconde la tua attivita' a tutti"], "Protegge solo sul dispositivo che usi."],
      ["Vuoi tenere aperte tre pagine nella stessa finestra. Cosa usi?", ["Le schede", "I cookie", "La cache", "Il cestino"], "Ogni scheda contiene una pagina.", "nav"],
      ["Con Ctrl+P puoi anche scegliere di stampare...", ["Solo alcune pagine", "Solo i cookie", "Solo i segnalibri", "Solo la cronologia"], "Le opzioni di stampa permettono di scegliere le pagine.", "down"]
    ] }
  ]
},
/* ===================== LEZIONE 9 ===================== */
{
  id: 9, modulo: "OE", icona: "search",
  titolo: "Cercare e valutare le informazioni",
  sotto: "Motori di ricerca, fonti affidabili, copyright e privacy",
  obiettivi: ["Fare ricerche precise", "Valutare se una fonte e' affidabile", "Rispettare il diritto d'autore", "Conoscere i diritti sulla privacy"],
  attivita: [
    { tipo: "scheda", titolo: "Cercare bene", min: 10, punti: [
      ["Motore di ricerca", "Trova pagine sul web a partire da parole chiave."],
      ["Parole chiave", "Poche parole precise funzionano meglio di una frase lunga."],
      ["Virgolette", "\"sistema solare\" cerca esattamente quella frase."],
      ["Segno meno", "giaguaro -auto esclude i risultati con la parola auto."],
      ["Filtri", "Immagini, video, notizie, data, lingua, tipo di file."],
      ["Risultati sponsorizzati", "Sono pubblicita': compaiono spesso in cima."],
      ["Altre fonti", "Enciclopedie online, dizionari, siti istituzionali e della scuola."]
    ] },
    { tipo: "abbina", titolo: "Ricerca da detective", min: 10, tema: "ric",
      istr: "Cosa scrivi o usi per ottenere il risultato?",
      coppie: [
        ["\"guerra di Troia\"", "Pagine con esattamente quella frase"],
        ["pesca -frutta", "Pagine su pesca escludendo la frutta"],
        ["Filtro Immagini", "Solo fotografie e disegni"],
        ["Filtro Notizie", "Articoli di giornale recenti"],
        ["Filtro per data", "Risultati dell'ultimo mese o anno"],
        ["Ricerca avanzata", "Piu' criteri insieme: lingua, tipo di file, sito"]
      ] },
    { tipo: "quiz", titolo: "Cercare online", min: 10, tema: "ric", domande: [
      ["Quale ricerca e' piu' efficace per una ricerca sui vulcani italiani?", ["vulcani attivi Italia", "dimmi per favore tutto sui vulcani che ci sono", "vulcani", "Italia"], "Parole chiave precise danno risultati migliori."],
      ["I primi risultati con la scritta Sponsorizzato sono...", ["Pubblicita'", "Sempre i piu' affidabili", "Siti della scuola", "Virus"], "Le aziende pagano per comparire in alto."],
      ["Cosa fa il segno meno davanti a una parola?", ["Esclude quella parola dai risultati", "La rende piu' importante", "Cerca solo immagini", "Traduce la parola"], "Utile per eliminare significati che non ti servono."],
      ["Dove trovi la definizione precisa di una parola?", ["In un dizionario online", "In un pop-up", "Nella cronologia", "Nel cestino"], "Dizionari ed enciclopedie sono fonti di riferimento."],
      ["A cosa servono i filtri dei risultati?", ["A restringere la ricerca per tipo, data o lingua", "A cancellare la cronologia", "A bloccare i cookie", "A stampare"], "I filtri rendono la ricerca piu' mirata."]
    ] },
    { tipo: "scheda", titolo: "Fidarsi o no? E di chi e'?", min: 15, punti: [
      ["Chi lo ha scritto?", "Un autore o un ente riconoscibile e' piu' affidabile di un testo anonimo."],
      ["Quando?", "Controlla la data di pubblicazione o di aggiornamento."],
      ["Perche'?", "Lo scopo e' informare, vendere o convincere?"],
      ["Confronta", "Cerca la stessa informazione su piu' fonti affidabili."],
      ["Copyright", "Il diritto d'autore protegge testi, foto, musica e video, anche se sono online."],
      ["Creative Commons", "Licenze che permettono di usare un'opera a certe condizioni, per esempio citando l'autore."],
      ["Privacy", "Il GDPR protegge i dati personali: hai diritto di accesso, rettifica e cancellazione."]
    ] },
    { tipo: "smista", titolo: "Fonte affidabile?", min: 10, tema: "val",
      istr: "Questa caratteristica rende la fonte piu' affidabile o da verificare?",
      gruppi: ["Piu' affidabile", "Da verificare"],
      items: [["Autore e competenze indicati", 0], ["Data di aggiornamento recente", 0], ["Sito di un ente o universita'", 0], ["Cita le sue fonti", 0],
              ["Nessun autore e nessuna data", 1], ["Titolo urlato TUTTO IN MAIUSCOLO", 1], ["Pagina piena di pubblicita' aggressive", 1], ["La notizia appare in un solo sito", 1]] },
    { tipo: "indovinello", titolo: "Chi sono?", min: 5, tema: "cop",
      testo: "Proteggo chi crea: scrittori, fotografi, musicisti. Se usi le loro opere senza permesso, mi stai violando.",
      risposte: ["copyright", "diritto d'autore", "diritto di autore", "il copyright", "il diritto d'autore", "diritto dautore"],
      indizi: ["Spesso mi indicano con una C dentro un cerchio.", "In italiano mi chiamano diritto d'..."],
      spiega: "Il copyright (diritto d'autore) protegge le opere creative." },
    { tipo: "ordina", titolo: "Verifica una notizia", min: 10, tema: "val",
      istr: "Hai visto una notizia incredibile. Metti in ordine cosa fare.",
      passi: ["Leggi tutto l'articolo, non solo il titolo", "Controlla autore e data", "Cerca la stessa notizia su altre fonti affidabili", "Valuta se il sito e' serio", "Decidi se condividerla"] },
    { tipo: "vf", variante: "sfida", titolo: "Sfida finale: vero o falso", min: 20, tema: "cop", items: [
      ["Se una foto e' su Internet, posso usarla dove voglio senza chiedere.", false, "Falso: e' comunque protetta dal diritto d'autore."],
      ["Citare la fonte e' importante quando usi informazioni trovate online.", true, "Vero: riconosci il lavoro dell'autore e permetti di verificare."],
      ["Le licenze Creative Commons permettono l'uso a certe condizioni.", true, "Vero: per esempio citando l'autore o senza usi commerciali."],
      ["Il GDPR e' la legge europea che protegge i dati personali.", true, "Vero: regolamento europeo sulla protezione dei dati.", "priv"],
      ["Puoi chiedere a un servizio online di cancellare i tuoi dati personali.", true, "Vero: e' il diritto alla cancellazione.", "priv"],
      ["Una notizia condivisa da molte persone e' per forza vera.", false, "Falso: anche le notizie false si diffondono velocemente.", "val"],
      ["I risultati sponsorizzati sono pubblicita'.", true, "Vero: sono a pagamento.", "ric"],
      ["Una pagina senza autore e senza data e' piu' affidabile di un sito istituzionale.", false, "Falso: autore e data sono segnali di affidabilita'.", "val"]
    ] }
  ]
},
/* ===================== LEZIONE 10 ===================== */
{
  id: 10, modulo: "OE", icona: "chat",
  titolo: "Comunicare online",
  sotto: "Comunita' online, strumenti, netiquette e rischi",
  obiettivi: ["Conoscere le comunita' online", "Scegliere lo strumento di comunicazione giusto", "Applicare la netiquette", "Proteggersi da rischi e cyberbullismo"],
  attivita: [
    { tipo: "scheda", titolo: "Le comunita' online", min: 10, punti: [
      ["Comunita' online", "Gruppi di persone che comunicano su Internet: social network, forum, chat, giochi online, wiki, blog."],
      ["Messaggistica istantanea", "Messaggi in tempo reale, anche con foto, audio e gruppi."],
      ["VoIP", "Voice over IP: chiamate e videochiamate attraverso Internet."],
      ["Email", "Messaggi piu' formali, con oggetto e allegati."],
      ["Blog e podcast", "Diario online di articoli e trasmissioni audio da ascoltare."],
      ["Wiki", "Sito scritto e corretto insieme da tante persone."]
    ] },
    { tipo: "abbina", titolo: "Abbina lo strumento", min: 10, tema: "stru",
      istr: "Collega ogni strumento al suo uso.",
      coppie: [
        ["VoIP", "Chiamate e videochiamate via Internet"],
        ["Messaggistica istantanea", "Messaggi in tempo reale in chat o gruppi"],
        ["Forum", "Discussioni su un tema divise per argomento"],
        ["Blog", "Articoli pubblicati da un autore, come un diario online"],
        ["Wiki", "Pagine scritte e modificate da piu' persone insieme"],
        ["Podcast", "Episodi audio da ascoltare quando vuoi"]
      ] },
    { tipo: "indovinello", titolo: "Chi sono?", min: 5, tema: "neti",
      testo: "Sono il galateo di Internet: le regole di buona educazione da rispettare quando scrivi online.",
      risposte: ["netiquette", "la netiquette", "netiquete", "netiqette", "netiketta"],
      indizi: ["Il mio nome unisce net (rete) ed etiquette (galateo).", "Inizio con NET."],
      spiega: "La netiquette sono le regole di comportamento corretto in rete." },
    { tipo: "quiz", titolo: "Comunicare bene", min: 10, tema: "neti", domande: [
      ["Scrivere un messaggio TUTTO IN MAIUSCOLO online equivale a...", ["Urlare", "Essere gentili", "Essere piu' chiari", "Scrivere in corsivo"], "Le maiuscole vengono lette come grida."],
      ["Puoi pubblicare la foto di un compagno?", ["Solo se lui e' d'accordo", "Si', sempre", "Solo se la foto e' bella", "Solo di sera"], "Serve il consenso della persona ritratta."],
      ["Quale strumento e' piu' adatto per scrivere a un professore?", ["Un'email con oggetto chiaro e linguaggio corretto", "Un vocale di 5 minuti", "Un commento su un social", "Un messaggio pieno di abbreviazioni"], "L'email e' adatta alle comunicazioni formali.", "stru"],
      ["In Italia, per iscriversi da soli a un social network serve avere almeno...", ["14 anni", "10 anni", "8 anni", "Non c'e' nessun limite"], "Sotto i 14 anni serve il consenso dei genitori.", "risc"],
      ["Un sito dove tanti utenti scrivono e correggono insieme le voci e'...", ["Un wiki", "Un podcast", "Un antivirus", "Un SMS"], "Wikipedia e' l'esempio piu' famoso.", "com"]
    ] },
    { tipo: "scheda", titolo: "Stare al sicuro online", min: 15, punti: [
      ["Profilo privato", "Imposta la privacy in modo che solo gli amici vedano cio' che pubblichi."],
      ["Dati personali", "Non condividere indirizzo, scuola, numero di telefono, password."],
      ["Sconosciuti", "Chi conosci solo online potrebbe non essere chi dice di essere."],
      ["Cyberbullismo", "Offese, prese in giro o esclusioni online: non e' mai colpa tua."],
      ["Cosa fare", "Non rispondere, salva le prove, blocca, segnala alla piattaforma e parlane con un adulto di fiducia."],
      ["Furto d'identita'", "Qualcuno usa i tuoi dati fingendo di essere te: proteggi password e informazioni."]
    ] },
    { tipo: "smista", titolo: "Giusto o sbagliato?", min: 10, tema: "risc",
      istr: "Questo comportamento online e' corretto o scorretto?",
      gruppi: ["Corretto", "Scorretto"],
      items: [["Impostare il profilo come privato", 0], ["Bloccare e segnalare chi offende", 0], ["Chiedere il permesso prima di pubblicare una foto di gruppo", 0], ["Parlare con un adulto di un messaggio strano", 0],
              ["Accettare l'amicizia di chiunque", 1], ["Pubblicare il proprio indirizzo di casa", 1], ["Condividere la password con un amico", 1], ["Incontrare da soli una persona conosciuta solo online", 1]] },
    { tipo: "vf", titolo: "Vero o falso?", min: 10, tema: "risc", items: [
      ["Il cyberbullismo e' un problema da tenere per se'.", false, "Falso: parlarne con un adulto di fiducia e' il primo passo per risolverlo."],
      ["Salvare uno screenshot dei messaggi offensivi puo' essere utile come prova.", true, "Vero: aiuta a segnalare quanto accaduto."],
      ["Una persona conosciuta online e' sempre chi dice di essere.", false, "Falso: online e' facile fingere un'identita'."],
      ["Le videochiamate su Internet sono un esempio di VoIP.", true, "Vero: la voce viaggia attraverso Internet.", "stru"],
      ["I social network permettono di regolare chi vede i tuoi contenuti.", true, "Vero: nelle impostazioni di privacy.", "com"]
    ] },
    { tipo: "quiz", variante: "sfida", titolo: "Sfida finale", min: 20, tema: "risc", domande: [
      ["Un utente sconosciuto ti chiede foto e il tuo indirizzo. Cosa fai?", ["Non rispondo, lo blocco e ne parlo con un adulto", "Gli mando tutto", "Gli do solo l'indirizzo", "Gli chiedo i suoi dati"], "Mai condividere dati personali con sconosciuti."],
      ["Cosa significa VoIP?", ["Chiamate vocali attraverso Internet", "Virus online", "Video in alta risoluzione", "Un tipo di password"], "Voice over Internet Protocol.", "stru"],
      ["Quale di queste e' una regola della netiquette?", ["Rispettare le opinioni degli altri anche quando non sei d'accordo", "Scrivere tutto in maiuscolo", "Insultare chi sbaglia", "Inviare catene a tutti"], "Il rispetto viene prima di tutto.", "neti"],
      ["Un forum e'...", ["Uno spazio di discussione organizzato per argomenti", "Un programma di grafica", "Un tipo di cavo", "Un antivirus"], "Gli utenti pubblicano domande e risposte.", "com"],
      ["Perche' rendere privato il profilo social?", ["Per far vedere i contenuti solo alle persone scelte", "Per avere piu' follower", "Per pagare meno", "Per velocizzare il telefono"], "Riduci i rischi limitando il pubblico."],
      ["Ricevi messaggi offensivi ogni giorno. Qual e' la scelta migliore?", ["Salvare le prove, bloccare, segnalare e parlarne con un adulto", "Rispondere con offese", "Cancellare l'account senza dire niente", "Ignorare e non dirlo a nessuno per mesi"], "Chiedere aiuto e' la cosa piu' forte da fare."],
      ["Qual e' il miglior strumento per un messaggio formale con allegato?", ["L'email", "Una storia sui social", "Un commento", "Un podcast"], "L'email gestisce oggetto e allegati.", "stru"]
    ] }
  ]
},
/* ===================== LEZIONE 11 ===================== */
{
  id: 11, modulo: "OE", icona: "mail",
  titolo: "La posta elettronica",
  sotto: "Indirizzi, campi, allegati, spam e phishing",
  obiettivi: ["Leggere un indirizzo email", "Usare correttamente A, Cc e Ccn", "Rispondere, inoltrare, allegare", "Riconoscere spam e phishing"],
  attivita: [
    { tipo: "scheda", titolo: "Anatomia di un'email", min: 15, punti: [
      ["Indirizzo", "nome@dominio.it: la chiocciola @ separa il nome dell'utente dal dominio."],
      ["A", "Il destinatario principale."],
      ["Cc", "Copia carbone: altri destinatari, visibili a tutti."],
      ["Ccn", "Copia carbone nascosta: destinatari che gli altri non vedono."],
      ["Oggetto", "Breve titolo che riassume il messaggio."],
      ["Allegati", "File aggiunti all'email: attenzione a dimensione e provenienza."],
      ["Rispondi, Rispondi a tutti, Inoltra", "Rispondi solo al mittente, a tutti i destinatari, oppure mandi il messaggio a una nuova persona."],
      ["Firma", "Testo automatico a fine messaggio con nome e informazioni."]
    ] },
    { tipo: "abbina", titolo: "Abbina il campo", min: 10, tema: "mail",
      istr: "Collega ogni elemento alla sua funzione.",
      coppie: [
        ["A", "Destinatario principale"],
        ["Cc", "Destinatari in copia, visibili a tutti"],
        ["Ccn", "Destinatari in copia nascosta"],
        ["Oggetto", "Titolo breve del messaggio"],
        ["@", "Separa il nome utente dal dominio"],
        ["Firma", "Testo automatico a fine messaggio"]
      ] },
    { tipo: "indovinello", titolo: "Chi sono?", min: 5, tema: "spam",
      testo: "Sono un'email trappola. Fingo di essere la tua banca o il tuo gioco preferito e ti chiedo di cliccare per inserire la password.",
      risposte: ["phishing", "il phishing", "fishing", "email di phishing", "truffa phishing"],
      indizi: ["Il mio nome ricorda la pesca in inglese.", "Inizio con PH."],
      spiega: "Il phishing cerca di rubare dati fingendo di essere un mittente affidabile." },
    { tipo: "quiz", titolo: "Usare la posta", min: 10, tema: "alle", domande: [
      ["Quale indirizzo email e' scritto correttamente?", ["giulia.rossi@scuola.it", "giulia.rossi.scuola.it", "giulia rossi@scuola", "@giulia.rossi"], "Serve un nome, la chiocciola e un dominio.", "mail"],
      ["Vuoi inviare lo stesso messaggio a 30 genitori senza mostrare gli indirizzi agli altri. Usi...", ["Ccn", "Cc", "A per tutti", "Oggetto"], "La copia nascosta protegge la privacy degli indirizzi.", "mail"],
      ["Ricevi un'email e vuoi mandarla a un amico che non era tra i destinatari. Usi...", ["Inoltra", "Rispondi", "Rispondi a tutti", "Elimina"], "Inoltra invia il messaggio a nuovi destinatari."],
      ["Quale allegato e' piu' rischioso da aprire se arriva da uno sconosciuto?", ["premio.exe", "foto_gita.jpg dalla prof", "orario.pdf dalla segreteria", "compiti.docx da un compagno che conosci"], "I file eseguibili possono installare malware."],
      ["Cosa fa Rispondi a tutti?", ["Risponde al mittente e a tutti gli altri destinatari", "Risponde solo al mittente", "Inoltra a tutta la rubrica", "Elimina il messaggio"], "Usalo solo quando la risposta interessa tutti."]
    ] },
    { tipo: "smista", titolo: "Normale o phishing?", min: 10, tema: "spam",
      istr: "Questo segnale fa pensare a un'email normale o a un tentativo di phishing?",
      gruppi: ["Email normale", "Possibile phishing"],
      items: [["Mittente che conosci con indirizzo corretto", 0], ["Comunicazione attesa, come l'orario dalla scuola", 0], ["Nessuna richiesta di password", 0],
              ["Urgente! Il tuo account sara' chiuso entro un'ora", 1], ["Link che porta a un indirizzo strano", 1], ["Errori di grammatica e saluto generico", 1], ["Richiesta di inserire la password", 1], ["Hai vinto un premio, clicca qui", 1]] },
    { tipo: "ordina", titolo: "Invia un'email con allegato", min: 10, tema: "alle",
      istr: "Ordina i passaggi.",
      passi: ["Fai clic su Nuovo messaggio", "Scrivi l'indirizzo del destinatario nel campo A", "Scrivi l'oggetto e il testo", "Allega il file con la graffetta", "Rileggi e fai clic su Invia"] },
    { tipo: "vf", titolo: "Gestire la posta", min: 10, tema: "gest", items: [
      ["I messaggi si possono organizzare in cartelle.", true, "Vero: per esempio una cartella per ogni materia."],
      ["Lo spam e' posta indesiderata, spesso pubblicitaria.", true, "Vero: va eliminato o segnalato come spam.", "spam"],
      ["Gli allegati possono avere qualsiasi dimensione senza limiti.", false, "Falso: i servizi di posta hanno un limite di dimensione per gli allegati.", "alle"],
      ["Nella rubrica si salvano i contatti per ritrovarli facilmente.", true, "Vero: puoi anche creare gruppi di contatti."],
      ["Si possono cercare i messaggi per mittente o per parola dell'oggetto.", true, "Vero: la ricerca e' utile quando hai tante email."],
      ["La risposta automatica serve a dire che sei assente quando qualcuno ti scrive.", true, "Vero: si imposta per esempio durante le vacanze."]
    ] },
    { tipo: "quiz", variante: "sfida", titolo: "Sfida finale", min: 20, tema: "spam", domande: [
      ["La tua banca non ti chiederebbe mai via email...", ["La password del conto", "Di leggere le novita'", "Di controllare l'app ufficiale", "Niente"], "Nessun servizio serio chiede password per email."],
      ["Cosa significa Cc?", ["Copia carbone: destinatari in copia visibili", "Copia cancellata", "Contatto chiuso", "Cartella condivisa"], "Gli altri vedono chi e' in copia.", "mail"],
      ["Cosa devi fare con un'email di phishing?", ["Non cliccare, segnalarla e cancellarla", "Rispondere con i tuoi dati", "Inoltrarla agli amici", "Aprire l'allegato per curiosita'"], "Segnalare aiuta a proteggere anche gli altri."],
      ["Che cos'e' lo spam?", ["Posta indesiderata inviata in massa", "Un allegato sicuro", "La rubrica", "La firma"], "Spesso pubblicita' o truffe."],
      ["Quale e' un buon oggetto per un'email alla prof?", ["Consegna ricerca di storia - Luca Bianchi 2B", "ciao", "URGENTE!!!", "(nessun oggetto)"], "Chiaro e descrittivo.", "mail"],
      ["Come trovi velocemente le email ricevute da Marta?", ["Cerco Marta nella casella di ricerca", "Le leggo tutte", "Svuoto il cestino", "Creo un nuovo account"], "La ricerca filtra per mittente.", "gest"],
      ["Prima di inviare un'email e' bene...", ["Rileggere testo, destinatari e allegati", "Scrivere tutto in maiuscolo", "Mettere tutti in Cc", "Togliere l'oggetto"], "Evita errori e allegati dimenticati.", "alle"]
    ] }
  ]
},
/* ===================== LEZIONE 12 ===================== */
{
  id: 12, modulo: "OE", icona: "calendar", simulazione: true,
  titolo: "Calendari e simulazione finale",
  sotto: "Appuntamenti online e test di modulo Online Essentials",
  obiettivi: ["Creare e gestire eventi nel calendario", "Ripassare tutto Online Essentials", "Affrontare la simulazione d'esame"],
  attivita: [
    { tipo: "scheda", titolo: "Il calendario online", min: 10, punti: [
      ["Evento", "Un appuntamento con titolo, data, ora di inizio e fine, luogo."],
      ["Promemoria", "Un avviso che ti ricorda l'evento in anticipo."],
      ["Ricorrenza", "Un evento che si ripete: ogni settimana, ogni mese."],
      ["Invitati", "Puoi invitare altre persone, che possono accettare o rifiutare."],
      ["Calendario condiviso", "Piu' persone vedono gli stessi eventi, per esempio la classe."]
    ] },
    { tipo: "quiz", titolo: "Organizza la settimana", min: 10, tema: "cal", domande: [
      ["Hai allenamento ogni martedi'. Come lo imposti nel calendario?", ["Creo un evento ricorrente settimanale", "Creo 52 eventi a mano", "Lo scrivo nell'oggetto di un'email", "Uso la cronologia"], "La ricorrenza ripete l'evento automaticamente."],
      ["Vuoi che il telefono ti avvisi 30 minuti prima della verifica. Cosa aggiungi?", ["Un promemoria", "Un allegato", "Un segnalibro", "Un cookie"], "Il promemoria invia una notifica."],
      ["Un compagno ti invita a un evento. Cosa puoi fare?", ["Accettare, rifiutare o rispondere forse", "Solo accettare", "Solo cancellarlo dal suo calendario", "Niente"], "Il calendario gestisce la risposta all'invito."],
      ["Quali informazioni servono per creare un evento?", ["Titolo, data e ora", "Solo la password", "L'URL del browser", "L'estensione del file"], "Puoi aggiungere anche luogo e descrizione."]
    ] },
    { tipo: "abbina", titolo: "Ripasso lampo", min: 10, tema: "web",
      istr: "Collega ogni termine di Online Essentials alla sua definizione.",
      coppie: [
        ["URL", "Indirizzo di una pagina web"],
        ["Cookie", "File salvato dal sito nel browser"],
        ["Segnalibro", "Pagina salvata per ritrovarla"],
        ["Phishing", "Email truffa che ruba dati"],
        ["Netiquette", "Regole di buona educazione online"],
        ["Ccn", "Copia nascosta in un'email"]
      ] },
    { tipo: "scheda", titolo: "Pronti per la simulazione", min: 5, punti: [
      ["Contenuti", "Domande su tutte le lezioni da 7 a 12."],
      ["Soglia", "Serve almeno il 75% per superare la prova, come all'esame ICDL."],
      ["Consiglio", "Se una domanda ti blocca, rileggila con calma: spesso la risposta corretta e' la piu' precisa."]
    ] },
    { tipo: "quiz", variante: "simulazione", titolo: "Simulazione Online Essentials", min: 55, tema: "web", domande: [
      ["Il World Wide Web e'...", ["Un servizio di Internet fatto di pagine collegate", "Un sinonimo di computer", "Un programma di posta", "Un tipo di cavo"], "Il Web funziona su Internet.", "web"],
      ["In https://www.biblioteca.it/libri qual e' il nome di dominio?", ["www.biblioteca.it", "https", "/libri", "libri.it"], "Il dominio identifica il sito.", "url"],
      ["I cookie sono...", ["Piccoli file che i siti salvano nel browser", "Virus pericolosi", "Pagine web", "Programmi di posta"], "Ricordano preferenze e accessi.", "brw"],
      ["Il lucchetto nella barra degli indirizzi indica...", ["Una connessione cifrata", "Un sito gratuito", "Un sito senza pubblicita'", "Che tutte le informazioni sono vere"], "Protegge la connessione, non i contenuti.", "sicn"],
      ["Quale scorciatoia apre una nuova scheda?", ["Ctrl+T", "Ctrl+W", "Ctrl+H", "Ctrl+P"], "T come tab.", "nav"],
      ["Come si salva una pagina tra i preferiti?", ["Ctrl+D o clic sulla stella", "F5", "Ctrl+W", "Ctrl+F"], "Il segnalibro permette di ritrovarla.", "seg"],
      ["Dove si trovano di solito i file scaricati?", ["Nella cartella Download", "Nel cestino", "Nella cronologia", "Nella cache"], "E' la cartella predefinita.", "down"],
      ["Quale ricerca trova esattamente la frase Rinascimento italiano?", ["\"Rinascimento italiano\"", "Rinascimento -italiano", "Rinascimento OR", "-Rinascimento italiano"], "Le virgolette cercano la frase esatta.", "ric"],
      ["Quale caratteristica rende una fonte piu' affidabile?", ["Autore e data indicati", "Titoli in maiuscolo", "Molti pop-up", "Nessuna fonte citata"], "Trasparenza su chi e quando.", "val"],
      ["Un'immagine trovata su Internet...", ["Puo' essere protetta da copyright", "E' sempre libera", "Non ha mai un autore", "Si puo' vendere senza problemi"], "Il diritto d'autore vale anche online.", "cop"],
      ["Il GDPR...", ["Protegge i dati personali delle persone nell'Unione Europea", "E' un tipo di browser", "E' un antivirus", "E' un social network"], "Regolamento europeo sulla privacy.", "priv"],
      ["Un sito dove gli utenti discutono per argomenti e'...", ["Un forum", "Un URL", "Un cookie", "Un allegato"], "Le discussioni sono divise in sezioni.", "com"],
      ["Le videochiamate via Internet usano la tecnologia...", ["VoIP", "HDMI", "USB", "PDF"], "Voice over IP.", "stru"],
      ["Scrivere in maiuscolo online significa...", ["Urlare", "Ringraziare", "Scusarsi", "Fare una domanda"], "E' contrario alla netiquette.", "neti"],
      ["Se un compagno subisce cyberbullismo e' giusto...", ["Sostenerlo e avvisare un adulto", "Ridere insieme agli altri", "Condividere i messaggi offensivi", "Non fare niente"], "Chi vede puo' aiutare.", "risc"],
      ["Per nascondere gli indirizzi dei destinatari si usa il campo...", ["Ccn", "Cc", "A", "Oggetto"], "Copia carbone nascosta.", "mail"],
      ["Inoltra serve a...", ["Mandare un'email ricevuta a un'altra persona", "Rispondere al mittente", "Cancellare l'email", "Spostarla nello spam"], "Il messaggio viene inviato a nuovi destinatari.", "alle"],
      ["Un'email che dice: Clicca subito o il tuo account verra' chiuso! e' probabilmente...", ["Phishing", "Una newsletter della scuola", "Una risposta automatica", "Un invito al calendario"], "L'urgenza e' un segnale tipico di truffa.", "spam"],
      ["Per ritrovare le email di un mittente si usa...", ["La ricerca della casella di posta", "Il cestino", "La firma", "Il campo Ccn"], "La ricerca filtra velocemente.", "gest"],
      ["Per ripetere un evento ogni settimana si imposta...", ["La ricorrenza", "Il promemoria", "L'allegato", "La firma"], "La ricorrenza crea le ripetizioni.", "cal"]
    ] }
  ]
}
];
