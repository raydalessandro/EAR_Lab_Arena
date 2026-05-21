# Stima Architetto — Sfida NN — [nome modulo]

> Scritto da Claude Architetto **prima** del push della sfida.
> Vive in `.architetto/sfida-NN-modulo-stima-architetto.md`, privato.
> Ray NON apre fino a chiusura del round.
>
> Predizione falsificabile sul comportamento di un **orchestratore-tipo**:
> qualcuno che non legge codice, lavora con un'AI dev, ha esperienza
> media di orchestrazione (non Ray specifico, anche se Ray è il primo
> punto-dati che raccogliamo).

## Classe del bug

> Categoria nella tassonomia per orchestratori (vedi `BUG-TAXONOMY.md`).
> Se la classe non esiste ancora, proponila come "candidata" e descrivi
> cosa la caratterizza.

- **Classe**: [nome — es. "exhaustiveness check su tipo enumerato di dominio"]
- **Status nella tassonomia**: [esistente / candidata-nuova]
- **Caratteristica che la definisce dal punto di vista orchestratore**:
  [una frase su cosa rende difficile dirigere un'AI su questo tipo di bug]

## Difficoltà attesa

- **Scala**: [1-5]
  - 1 = warm-up · 2 = facile · 3 = medio · 4 = tosto · 5 = limite
- **Perché questo valore**: [una frase]

## Tempo atteso

- **Range orario**: [es. "30-90 minuti" / "2-4 ore" / "una giornata"]
- **Punto di rottura previsto**: [oltre quante ore l'orchestratore tipo
  rischia di arrendersi?]

## Catena di ragionamento prevista

> La sequenza di mosse che un orchestratore-tipo dovrebbe fare per
> arrivare al fix. Numerala. Più è specifica più è falsificabile.

1. [Mossa 1]
2. [Mossa 2]
3. […]

## Rabbit hole probabili

> Dove Architetto pensa che l'orchestratore-tipo si potrebbe perdere.
> Non vaghi ("forse confusione"), specifici ("guarderà nel file X
> perché il messaggio d'errore lo punta lì, mentre il bug è in Y").

- [Rabbit hole 1]
- [Rabbit hole 2]

## Prediction esplicita

> Una o due affermazioni concrete che si potranno verificare a fine
> round. Devono essere FALSIFICABILI.

- **P1**: [Affermazione concreta verificabile]
- **P2**: [Altra affermazione concreta verificabile]

## Note operative per Architetto futuro

> Se questo è un round di calibrazione iniziale, segnala dubbi sulla
> stima. Onestà > finta sicurezza. La stima sbagliata è una voce di
> dati anche più preziosa di quella giusta.

[…]
