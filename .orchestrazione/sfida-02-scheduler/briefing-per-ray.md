# Briefing per Ray — Sfida 02 — scheduler

> Riservato a Ray. Lo Sfidante non lo legge.
>
> Da questo file Ray costruisce il prompt iniziale stile bug report da
> dare a Sfidante quando apre la sessione con `cwd` in
> `sfida-02-scheduler/`.

## Caso reale di partenza

- Vedi `.architetto/sfida-02-scheduler-postmortem-key.md` per repo
  upstream, issue/PR, SHA. (Ray non aprire fino a round chiuso.)
- Linguaggio: TypeScript su runtime **Deno**.
- Dimensioni: ~6 file `.ts` src (~2.350 righe), ~13 file test (~4.280 righe).
- Setup dalla sottocartella: `deno test --allow-read` (richiede Deno
  installato).

## Cosa fa il modulo

Libreria di scheduling cron in TypeScript puro, zero dipendenze. Espone
una classe `Cron(pattern: string)` con metodi come `nextRun(from?: Date)`
che, dato un pattern cron stringa, calcola la prossima esecuzione di un
task.

Il dialetto cron supportato è "esteso" rispetto al POSIX: oltre ai 5-6
campi standard, ammette notazioni avanzate (modificatori speciali sul
day-of-month e sul day-of-week). I commenti dentro il modulo dichiarano
quali caratteri sono leciti in ciascun campo.

## Sintomo da raccontare a Sfidante

Esempio di prompt iniziale:

> "Lavoriamo su questo modulo `scheduler`. Ho ricevuto segnalazione da
> un team interno: certi job partono molto più spesso del previsto. Il
> caso che mi hanno passato è un pattern che dovrebbe matchare una
> singola occorrenza al mese sul giorno della settimana — invece matcha
> tutte le occorrenze di quel giorno. I pattern 'standard' (numerici,
> `*`, range, step) funzionano. Il bug emerge con le notazioni avanzate
> documentate nei commenti del parser del pattern. Riproduci, capisci
> quale pattern triggera il problema, sistema. Stai dentro al modulo."

Pattern concreto che riproduce il bug (puoi darlo a Sfidante se chiede
un esempio, o farglielo trovare da sé):

```ts
import { Cron } from "../src/croner.ts"; // path interno al modulo

const job = new Cron("0 0 * * FRIL");
let d = new Date("2026-01-01T00:00:00Z");
for (let i = 0; i < 5; i++) {
  const nr = job.nextRun(d);
  if (!nr) break;
  console.log(nr);
  d = new Date(nr.getTime() + 1000);
}
// Atteso: solo l'ultimo venerdì di mesi consecutivi.
// Osservato: ogni venerdì del mese.
```

**Suggerimento di orchestrazione**: Sfidante può essere indirizzato a
guardare prima la regex dei caratteri ammessi per ciascun campo (la
trova nei commenti del file di parsing del pattern). Lì scopre che `L`
è ammesso come carattere lecito sul day-of-week. Da lì può chiedersi
"come viene gestito?", e cercare i punti dove il parser lo estrae.

## Adattamenti dichiarati (non sono il bug)

- `deno.json` ripulito di `name` (era `@hexagon/croner`), rinominato
  `sfida-02-codebase`.
- File `README.md`, `AGENTS.md`, `SECURITY.md`, `.github/`, `docs/`,
  `build/`, logo `croner.png` rimossi.
- Header copyright MIT nei file source intatti (rispetto licenza). Il
  nome dell'autore nell'header non è una pista lecita: se Sfidante lo
  cerca online, fermalo.

## Vincoli del round

- Istanze AI di supporto: una sola sessione Sfidante. Deno installato è
  prerequisito tecnico.
- Tempo: nessun limite formale.
- Aiuti esterni: spec cron POSIX/Quartz/esterne sì (utile per capire
  cosa "dovrebbe" fare un pattern); ricerca del fix originale online no.

## Stato del round

- [x] Sottocartella armata e pushata sul main (Architetto)
- [x] Briefing per Ray scritto (Architetto)
- [x] Chiave del bug scritta in `.architetto/` (Architetto)
- [ ] Sessione Sfidante aperta con cwd nella sottocartella (Ray)
- [ ] Bug ipotizzato (Sfidante + Ray)
- [ ] Bug confermato con test diagnostico (Sfidante + Ray)
- [ ] Fix applicato (Sfidante)
- [ ] Test che dimostra il fix (Sfidante)
- [ ] Round chiuso, post-mortem aperto (Architetto + Ray)
