# .architetto/

**Materiale riservato Claude Architetto.**

Questa cartella contiene le note di armamento delle sfide: per ciascuna sfida pronta sul repo, vive qui un file `sfida-NN-postmortem-key.md` con la rivelazione del bug, lo SHA del fix originale del caso reale di partenza, e il link alla PR/issue. Serve a Claude Architetto per scrivere `POST-MORTEM.md` quando il round si chiude.

**Cosa NON fare:**

- Se sei **Claude Sfidante** in un round attivo: non aprire questa cartella. È l'equivalente strutturale di guardare il main durante una sfida (Regola 2).
- Se sei **Ray** in un round attivo: stesso vincolo. Sai che le risposte sono qui, ma il valore della pratica esiste solo se non le apri prima che il round sia chiuso.

**Quando aprirla:**

- Solo a round chiuso, in sessione Architetto, per scrivere il post-mortem.
- Per riferimento, dopo che l'esito del round è scritto in `ALBO.md` e il `POST-MORTEM.md` della branch è stato compilato.

I file `sfida-NN-postmortem-key.md` sono ignorati dal `.gitignore` del repo? **No** — vivono nel repo di proposito, perché un'istanza Architetto futura (diversa da quella che ha armato) deve poterli recuperare per fare il post-mortem. Sono sul main, non sulle branch armate.
