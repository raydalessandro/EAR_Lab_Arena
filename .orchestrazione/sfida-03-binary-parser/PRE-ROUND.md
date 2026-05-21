# Pre-round — Sfida 03

> Si compila **prima** di aprire la sessione Sfidante. Vive in
> `.orchestrazione/sfida-03-binary-parser/PRE-ROUND.md`, fuori dalla vista di
> Sfidante.
>
> Non è un modulo burocratico: è una griglia di pensiero che il libro
> *Dal Campo alla Terra* identifica come pratica utile per
> orchestratori che lavorano senza scrivere codice. Sentiti libero di
> saltare un campo se non ti dice niente in questo round, ma prova
> almeno a chiederti se si applica.

## Il sintomo, in 2 frasi

> Il problema come te lo racconteresti se dovessi dirlo a un collega in
> ascensore. Niente parole tecniche se non necessarie.

[…]

## Cosa NON so

> L'inventario onesto delle cose che non hai chiaro all'inizio.
> Il libro suggerisce: "se l'AI smettesse di funzionare adesso, cosa
> non riusciresti a fare a mano?" Qui è declinato sul singolo round:
> cosa stai delegando alla cieca, e cosa stai delegando con consapevolezza.

- [Cose che non so del dominio]
- [Cose che non so della codebase]
- [Cose che non so del bug stesso]
- [Cose che sto delegando ciecamente all'AI e che mi accorgerei subito
  se mi mentisse?]

## Decisioni chiuse del round

> Vincoli che l'AI Sfidante NON deve poter rinegoziare durante il flow.
> Cose che NON sono in discussione. Esempi tipici:

- [Es. "il fix deve passare la suite di test esistente"]
- [Es. "non rifare il design del modulo, solo bug fix"]
- [Es. "niente nuove dipendenze esterne"]
- [Es. "stay-within-the-module — qualunque diff fuori da questa cartella
  va respinto"]

## Blast radius previsto

> Quanto del codice del modulo Ray si aspetta che il fix tocchi. Una
> stima onesta. Se sospetto un cambio di 1-3 righe in un file, lo dico.
> Se temo un refactor di 50 righe in 4 file, lo dico.
>
> Funzione di stop: se durante il round l'AI vuole fare modifiche molto
> più grosse di quanto previsto, è segnale che qualcosa è andato fuori
> rotta — fermarsi e riformulare.

[Stima: N righe, M file. Tipo di modifica: aggiunta / sostituzione /
refactor.]

## Primo prompt scritto prima di lanciarlo

> Il libro raccomanda di **non improvvisare** il primo prompt. Scriverlo
> qui, leggerlo una volta, poi copiarlo nella sessione Sfidante. Spesso
> il solo atto di scriverlo fuori contesto chiarisce.

```text
[Il prompt che lancerai a Sfidante. Stile bug report realistico,
zero menzioni di "sfida" / "palestra" / "Architetto".]
```

## Criterio osservabile di "fatto"

> Cosa deve essere VERO al termine del round perché tu dichiari
> vittoria? Una frase, concreta, verificabile da Ray senza leggere
> codice.

[Es. "Quando esegui `npm test` il test diagnostico che dimostra il bug
passa, e tutti i test esistenti continuano a passare."]
