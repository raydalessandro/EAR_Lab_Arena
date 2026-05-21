# Post-mortem — Sfida 01

> Si scrive **dopo** la chiusura del round, in
> `.orchestrazione/sfida-01-query-filter/POST-MORTEM.md`. Tre voci distinte:
> Architetto, Ray, sintesi condivisa. Si vede chi dice cosa.

---

## Esito ufficiale

- **Vincitore**: [Ray / Architetto / pareggio / invalido]
- **Tempo reale**: [ore]
- **Numero di mosse di Ray con Sfidante**: [N]
- **Verdetto sulla Regola 3**: [il bug era inferibile dall'interno
  della sottocartella armata? sì / no, perché]

---

## Il bug, rivelato — _scrive Claude Architetto_

> Solo qui si rivela cosa era stato nascosto. Mai prima.

### Dove era il bug

[File, riga, modifica esatta. Diff o snippet inline.]

### Cosa faceva il codice rotto vs il codice sano

[Descrizione del comportamento divergente, con un esempio
osservabile.]

### Categoria del bug

[Quale dei tipi noti di fallimento da orchestrazione era?
Ambiguità di scope / stato vuoto / concorrenza / confine fra moduli /
drift di contesto / contratto rotto / migration / RLS / altro nuovo
da nominare?]

### La strategia di Architetto

[Il ragionamento nel costruire il bug: quali camuffamenti, quali
distrazioni, quali ipotesi su come Ray e Sfidante avrebbero
cercato. Quale "trappola attenzionale" ha teso.]

### Cosa Architetto pensava sarebbe successo

[Una previsione esplicita: "credevo che Sfidante avrebbe guardato
prima nel modulo X, e non in Y dove era il vero bug". Da confrontare
con la prospettiva di Ray sotto.]

---

## Cosa è successo dal mio lato — _scrive Ray_

### La prima ora con Sfidante

[Cosa hai pensato all'inizio, dove hai chiesto a Sfidante di guardare,
perché. Quali ipotesi avete formulato insieme.]

### Il punto di svolta

[Il momento in cui qualcosa è cambiato — in meglio o in peggio.
L'ipotesi che ha sbloccato tutto, oppure il vicolo cieco che ti ha
costretto a tornare indietro.]

### Cosa ti ha confuso

[Le piste false, gli errori di interpretazione di Sfidante, le cose
che Sfidante ti ha detto e che ti hanno sviato (o aiutato). Le mosse
di Sfidante che ora, col senno di poi, riconosci come "rumore".]

### Cosa hai capito alla fine

[La realizzazione, quando è arrivata. Se è arrivata. Anche se
è arrivata solo dopo la rivelazione di Architetto: vale lo stesso.]

### Una mossa che rifaresti, e una che cambieresti

[Una mossa con Sfidante che ha funzionato bene e rifaresti.
Una che, col senno di poi, faresti diversamente.]

---

## Lezione condivisa — _scrivono Architetto e Ray insieme_

### Pattern che emerge

[Cosa questo round insegna su un tipo di fallimento ricorrente.
Una frase, due al massimo.]

### Per il libro

[Quale capitolo del libro 3 può ospitare questo round? Quale
paragrafo, quale box, quale esempio?]

### Per le regole dell'arena

[Questo round ha rivelato un buco nelle regole? Una nuova categoria
da introdurre in REGOLE.md? Una clausola da chiarire?
Una nuova mossa lecita o vietata da nominare?]

### Per la pratica di orchestrazione

[Cosa Ray farà diversamente la prossima volta che orchestra un'AI
per debuggare codice? Una mossa concreta, non un proposito vago.]

### Una previsione di Architetto, verificata o smentita

[La sezione "Cosa Architetto pensava sarebbe successo" sopra:
era corretta? Sfidante ha davvero guardato dove Architetto prevedeva,
o ha sorpreso?]
