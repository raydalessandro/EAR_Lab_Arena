# AGENTI.md — Il contratto delle due istanze di Claude Code

> Questo file dichiara i ruoli delle due istanze di Claude Code
> coinvolte in un round di sfida. Ogni istanza deve leggere questo
> file all'inizio di ogni sessione, prima di toccare il repo.

## Ruoli

Un round di `ear-lab-arena` coinvolge **tre attori**:

1. **Ray** — l'orchestratore umano, giudice di gara e osservatore.
   Non scrive codice, non lancia comandi git. Apre due finestre di
   Claude Code, scrive prompt in italiano, osserva, decide quando
   il round si chiude.

2. **Claude Architetto** — l'istanza che introduce il bug.
   Lavora in un **ambiente isolato**: clona la codebase originale,
   la modifica, e pusha solo lo stato finale come singolo commit
   sulla branch armata.

3. **Claude Sfidante** — l'istanza che cerca di risolvere il bug.
   Lavora in checkout della branch armata di `ear-lab-arena`,
   senza accesso al main, senza storico significativo.

**Le due istanze non comunicano fra loro.** Tutto passa attraverso
Ray e attraverso lo stato del repo.

## Il principio dell'ambiente isolato

Questo è il principio tecnico che rende la sfida onesta:

**Architetto non ha mai un checkout di `ear-lab-arena` durante la
fase di armamento.** Architetto lavora su una copia separata della
codebase, nella sua directory di lavoro. Solo quando il bug è pronto,
pusha lo stato finale su una nuova branch dell'arena, come singolo
commit.

Conseguenza: la storia git della branch armata è **sterile**. Sfidante
può fare `git log`, `git blame`, `git diff HEAD~1` quanto vuole —
non trova niente. Lo storico delle modifiche di Architetto non esiste
sulla branch.

Questo libera le regole dall'obbligo di proibire `git log` a Sfidante.
Sfidante può usare git liberamente: semplicemente non c'è niente da
scoprire.

## Cosa fa Claude Architetto

All'inizio di un round, Ray scrive a Claude Architetto:

> "Apro la sfida NN. La codebase è [scelta]. Procedi."

Claude Architetto allora:

### Fase 1 — Pulizia del main

1. Fa checkout del main di `ear-lab-arena`.
2. Cancella i file della codebase del round precedente (se ce ne sono),
   lasciando solo `README.md`, `REGOLE.md`, `ALBO.md`, `AGENTI.md`,
   `.gitignore`, e `_template-round/`.
3. Clona la codebase pulita del round NN dentro il main.
4. Fa commit `chore(sfida-NN): codebase pulita`.
5. Pusha sul main.

### Fase 2 — Armamento in ambiente isolato

6. Esce dal checkout di `ear-lab-arena`.
7. In una **directory di lavoro separata**, clona di nuovo la codebase
   originale (la stessa pulita, ma da fonte indipendente).
8. Introduce il bug. Una o più modifiche, in uno o più file, secondo
   la sua strategia.
9. Verifica che il bug sia inferibile dalla branch armata sola (test
   mentale della Regola 3).
10. Compila `INIZIO.md` con il briefing pubblico (senza rivelare il bug).
11. Mette `INIZIO.md` insieme al codice modificato.

### Fase 3 — Push della branch armata

12. Torna nel checkout di `ear-lab-arena`.
13. Crea la branch `sfida-NN-nome-breve` dal main.
14. Sostituisce il contenuto della branch con lo stato finale prodotto
    in Fase 2 (codebase modificata + `INIZIO.md`).
15. Fa **un solo commit** sulla branch: `scenario(sfida-NN): codebase
    armata`.
16. Pusha la branch.

### Fase 4 — Comunicazione a Ray

17. Aggiorna `ALBO.md` sul main con la riga della sfida in corso
    (esito: "in corso").
18. Conferma a Ray: "Sfida NN pronta. Branch `sfida-NN-nome`.
    Briefing pubblico in `INIZIO.md`."

**Cosa Claude Architetto NON fa, mai:**

- Non rivela il bug a Ray in chat durante il round.
- Non lascia indizi nel messaggio di commit oltre allo standard.
- Non fa commit intermedi sulla branch armata (deve essere un singolo
  commit, sennò la storia rivela qualcosa).
- Non scrive in `POST-MORTEM.md` finché il round non è chiuso.
- Non risponde a domande tipo "in che file hai messo il bug?".
  Risponde solo: "vedrai nel post-mortem, a round chiuso".

## Cosa fa Claude Sfidante

All'inizio di un round, Ray apre una **nuova istanza** di Claude Code
(non la stessa di Architetto) e scrive:

> "Lavora sulla branch `sfida-NN-nome` del repo ear-lab-arena.
> Leggi `INIZIO.md`. C'è un bug. Aiutami a trovarlo e fixarlo."

Idealmente Ray, prima di passare il controllo a Sfidante, fa un clone
del repo con `git clone --single-branch --branch sfida-NN-nome [url]`,
così Sfidante non ha nemmeno il riferimento al main nel suo checkout
locale. Questa è una protezione strutturale opzionale.

Claude Sfidante allora:

1. Si trova in checkout della branch armata.
2. Legge `INIZIO.md` per avere il briefing pubblico.
3. Esplora la codebase, propone ipotesi, scrive test diagnostici,
   fa indagine.
4. Può creare quante **branch di lavoro** vuole, a partire dalla
   branch armata, per testare ipotesi senza sporcare il codice
   principale.
5. Quando trova il bug, propone il fix a Ray.
6. Su approvazione di Ray, applica il fix sulla branch armata
   (`sfida-NN-nome`), scrive un test che dimostra il fix, fa commit
   e push.
7. Aggiorna `log-orchestrazione.md` nella branch armata con le mosse
   significative dettate da Ray.

**Cosa Claude Sfidante NON deve fare:**

- `git checkout main`.
- `git diff main`.
- `git log main`, `git show main`, o letture di contenuto del main.
- Aprire `/compare/main...sfida-NN` su GitHub.
- Chiedere a Ray "posso vedere com'era il file prima?".

Sfidante **può fare liberamente**:

- Tutti i `git log`, `git blame`, `git diff HEAD~1` che vuole sulla
  branch armata. Non troverà niente perché lo storico è sterile
  (vedi "Principio dell'ambiente isolato").
- Domande a Ray sul briefing.
- Proporre più ipotesi e chiedere a Ray quale verificare per prima.
- Scrivere test diagnostici per restringere il problema.
- Dichiarare resa, se dopo un numero di tentativi concordato con Ray
  non trova il bug.

## La chiusura del round

Quando il round si chiude (vittoria, sconfitta o pareggio):

1. Ray torna su Claude Architetto e dice: "Round NN chiuso.
   Esito: [Ray ha trovato / Ray si è arreso / pareggio].
   Scriviamo il post-mortem."
2. Claude Architetto:
   - Fa checkout della branch `sfida-NN-nome`.
   - Crea `POST-MORTEM.md` dalla sua prospettiva (rivela il bug,
     spiega la strategia di armamento, dichiara se la sua previsione
     iniziale si è verificata).
   - Aggiorna `ALBO.md` sul main con l'esito definitivo.
3. Ray completa il `POST-MORTEM.md` con la sua prospettiva (può farlo
   in sessione con Architetto, o in sessione separata con un'istanza
   di Claude Code in modalità "scriba").
4. Ultimo commit sulla branch: `docs(sfida-NN): post-mortem`.
5. La branch resta lì, in archivio. **Non si merga mai sul main.**
6. Per il prossimo round, si riparte dalla Fase 1 di "Cosa fa Claude
   Architetto", che ripulisce il main e ci carica la nuova codebase.

## Onestà strutturale

Le due istanze di Claude Code condividono il modello sottostante.
Architetto e Sfidante sono "fratelli" che non si parlano. Il fatto
che condividano la stessa formazione di base **non è imbroglio**:
è esattamente la realtà del mestiere di Ray. Quando lavorerà in
produzione, orchestrerà istanze di Claude per costruire codice e
istanze di Claude per debuggarlo. La sfida riflette il suo lavoro
reale, non un setup artificiale.

Quello che misuriamo non è "quanto Claude batte Claude". È:
**quanto la coppia Ray+Sfidante riesce a contrastare Architetto**.
Il delta è Ray. Quel delta è ciò che cresce.
