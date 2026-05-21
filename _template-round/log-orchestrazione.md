# Log di orchestrazione — Sfida NN

> Questo file si scrive **mentre** il round è in corso, sulla branch
> `sfida-NN-nome`. È il diario delle mosse di Ray nel dialogo con
> Claude Sfidante. È la sorgente di verità più preziosa di tutto
> l'esercizio: qui si vede come si orchestra una mente artificiale
> in tempo reale.
>
> Lo scrive Sfidante sotto dettatura di Ray, oppure Ray a mano.

## Setup della sessione

- **Istanza Sfidante**: [es. "Claude Code in finestra dedicata,
  modello Claude Opus 4.7"]
- **Strumenti disponibili a Sfidante**: [es. "bash, str_replace,
  create_file, view, web_search disabilitato"]
- **Stato iniziale del repo passato a Sfidante**: branch
  `sfida-NN-nome` in checkout, nessuna istruzione di confronto
  col main.

## Strategia iniziale di Ray

> Prima del primo prompt a Sfidante, Ray scrive qui la sua strategia.
> Anche se è "non ho strategia, vediamo dove ci porta il briefing".
> Una sola frase, onesta. Serve per confronto a fine round.

[…]

## Cronologia delle mosse

> Una "mossa" è un round di prompt+risposta significativo.
> Non serve trascrivere ogni messaggio: si cattura solo le mosse
> dove Ray **prende una decisione** (cosa chiedere, dove guardare,
> a quale ipotesi credere, quando cambiare pista).

### Mossa 1

- **Cosa ho chiesto a Sfidante**: [riassunto in 1-2 frasi del prompt]
- **Cosa ha risposto Sfidante**: [riassunto della risposta — ipotesi
  formulate, file aperti, test scritti, modifiche proposte]
- **Cosa ho pensato io**: [il ragionamento di Ray — convinto?
  scettico? perché?]
- **Cosa ho fatto dopo**: [la prossima azione decisa]

### Mossa 2

[…]

## Punti di svolta

> Momenti dove la sfida è cambiata. Esempi:
> - "Ho realizzato che Sfidante stava cercando nel posto sbagliato"
> - "Sfidante mi ha proposto un'ipotesi che ho deciso di seguire,
>    contro il mio istinto"
> - "Ho dovuto fermare Sfidante che voleva fare git checkout main"
> - "Mi sono accorto di un pattern di codice che torna in più file
>    e ho chiesto a Sfidante di confrontarli"

[Lista in punti, in ordine cronologico]

## Esito

- [ ] Bug trovato
- [ ] Fix applicato
- [ ] Test passa
- [ ] Mi sono arreso

**Tempo reale impiegato**: [ore/minuti effettivi al lavoro,
escludendo pause]

**Numero di prompt significativi a Sfidante**: [stima approssimativa]

**Cambi di istanza Sfidante durante il round**: [se Ray ha aperto
una nuova istanza in mezzo al round, lo segna qui e ne spiega il
perché]
