# Sfida NN — [nome breve]

> Questo file lo scrive **Claude Architetto** quando arma la branch.
> Sta sulla branch `sfida-NN-nome`, non sul main.
> È quello che Claude Sfidante legge per orientarsi.

## Codebase di partenza

- **Origine**: [link al repo originale, o "scenario costruito ad hoc"]
- **Linguaggio principale**: [TypeScript / Python / ecc.]
- **Dimensioni indicative**: [~N file, ~N righe]
- **Commit di partenza pulito**: [SHA del commit sul main prima
  dell'armamento — Sfidante NON deve usarlo per fare diff, vedi
  Regola 2]

## Briefing pubblico

> Architetto scrive qui un briefing onesto ma neutro:
> cosa fa la codebase, e in che modo il bug si manifesta.
> Non rivela dove guardare, non rivela la natura del bug.
> Dice solo *cosa si rompe e dove si vede*.

[2-4 frasi: cosa fa l'app, e qual è il sintomo osservabile del bug
(es. "il test X fallisce con messaggio Y", "il comando Z restituisce
un valore inatteso quando input è W", "l'utente che fa l'azione K
ottiene un errore generico").]

## Vincoli del round

- **Istanze AI di supporto consentite**: [es. "una sola sessione
  Claude Code", oppure "Claude Code + facoltà di consultare un altro
  modello per pareri"].
- **Tempo a disposizione**: [es. "nessun limite", oppure "2 ore reali"].
- **Aiuti esterni consentiti**: [es. "Google sì, documentazione
  ufficiale sì, altri umani no"].

## Stato del round

- [ ] Branch armata e pushata (Architetto)
- [ ] Briefing scritto (Architetto)
- [ ] Sessione Sfidante aperta (Ray)
- [ ] Bug ipotizzato (Sfidante + Ray)
- [ ] Bug confermato con test diagnostico (Sfidante + Ray)
- [ ] Fix applicato (Sfidante)
- [ ] Test che dimostra il fix (Sfidante)
- [ ] Round chiuso, post-mortem aperto (Architetto + Ray)
