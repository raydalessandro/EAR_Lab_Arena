# Sfida 02 — scheduler — chiave del post-mortem

## Caso reale di partenza

- Repo upstream: `Hexagon/croner`
- PR del fix: https://github.com/Hexagon/croner/pull/306 ("Fix L modifier bug and document W modifier edge cases")
- SHA pre-fix (= stato della codebase armata): `17343df863a711dcce75ed7eb239ab2d7fc473f7` (branch `dev`)
- SHA del fix in upstream: `6505085` (merge commit della PR #306). Commit specifico: `8fb5277`. Mergiato il 2025-11-15.

## Il bug

**File**: `sfida-02-scheduler/src/pattern.ts`
**Funzione**: `extractNth(conf: string, type: string)` (intorno alla riga 477 nel pre-fix)

La funzione era responsabile di estrarre il modificatore "nth weekday" dal campo day-of-week. Gestiva correttamente il formato esteso `#L` (es. `5#L`) ma non riconosceva la forma shorthand della stessa spec: la `L` come **suffisso diretto** sul giorno (es. `FRIL`, `5L`, `MONL`).

Il regex permesso per il day-of-week field (`/[^/*0-9,\-#L]+/` alla riga 320 del pre-fix) ammetteva la `L` come carattere lecito, ma quando il parsing arrivava a `extractNth`, niente la estraeva. Il risultato è che `FRIL` veniva passato a valle come se fosse "il nome di un giorno" — e il matcher la rigettava o la consumava parzialmente, producendo uno stato interno per cui ogni occorrenza del giorno della settimana matchava.

## Il fix

Aggiungere un branch in `extractNth` che gestisce il caso "L come suffisso senza #":

```ts
} else if (rest.toUpperCase().endsWith("L")) {
  if (type !== "dayOfWeek") {
    throw new Error("CronPattern: L modifier only allowed in day-of-week field (use L alone for day-of-month)");
  }
  nth = "L";
  rest = rest.slice(0, -1);
}
```

(Vedere diff originale alla PR per la forma esatta.)

## Catena di ragionamento attesa dal candidato

1. Riprodurre il sintomo: serve costruire un esempio. La codebase non lo dichiara nel briefing, ma i commenti in `src/pattern.ts:319-320` dichiarano quali modifier sono leciti per ogni field. Pattern di prova: `0 0 * * FRIL` o `0 0 * * 5L`.
2. Confrontare l'output di `nextRun()` ripetuto con quello atteso (ultimo venerdì del mese vs. tutti i venerdì).
3. Tracciare la pipeline di parsing: `new Cron(pattern)` → `CronPattern` constructor → `parsePart` → `extractNth`.
4. Realizzare che `extractNth` gestisce solo `#` ma non `L` standalone, mentre la regex precedente la permette.
5. Aggiungere il branch mancante.

## Skill esercitata in Ray

"Quando il sintomo è 'qualcosa non viene riconosciuto', cerca asimmetrie tra ciò che il pre-validator (regex/lexer) ammette e ciò che lo step successivo della pipeline gestisce. È un classico drift di specifica."
