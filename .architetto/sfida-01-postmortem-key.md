# Sfida 01 — query-filter — chiave del post-mortem

## Caso reale di partenza

- Repo upstream: `gajus/liqe`
- Issue: https://github.com/gajus/liqe/issues/26 ("Expected left to be defined error on boolean expressions")
- PR del fix: https://github.com/gajus/liqe/pull/27
- SHA pre-fix (= stato della codebase armata): `111b640`
- SHA del fix in `main` upstream: `be00757` (autori: MartinMa, gajus)

## Il bug

**File**: `codebase/src/internalFilter.ts`
**Funzione**: `internalFilter` (lo switch sui tipi di nodo AST)

Lo switch gestisce i tipi `Tag`, `LogicalExpression`, `UnaryOperator`. Mancava il branch per `ParenthesizedExpression`. Quando il `parse()` produceva un AST contenente `ParenthesizedExpression` (cioè ogni volta che la query usava parentesi per raggruppare), `internalFilter` cadeva nel ramo di default e tentava di accedere a `expression.left` su un nodo che non ha quel campo, lanciando l'errore `Expected left to be defined`.

## Il fix

Aggiungere un branch all'inizio della funzione che, se il nodo è `ParenthesizedExpression`, fa una chiamata ricorsiva su `ast.expression`:

```ts
if (ast.type === 'ParenthesizedExpression') {
  return internalFilter(ast.expression, data, scope);
}
```

(Vedere il diff originale alla PR per la forma esatta.)

## Catena di ragionamento attesa dal candidato

1. Riprodurre il sintomo: `filter(parse('(a:b) OR c:d'), data)` → lancia errore.
2. Capire la pipeline: `filter()` → `internalFilter()` (e che `parse()` produce un AST corretto, verificabile a parte).
3. Notare che il messaggio "Expected left to be defined" è emesso da `internalFilter.ts` ma il problema non è "left è undefined" — è che il NODO non è del tipo che `left` ce l'ha.
4. Studiare i tipi possibili di nodo AST (in `src/types.ts`) e confrontare con i case gestiti in `internalFilter`.
5. Realizzare che `ParenthesizedExpression` è dichiarato come tipo ma mai gestito.

## Skill esercitata in Ray

"Quando il messaggio d'errore punta a una location, non greppare il messaggio: chiedi all'AI di mappare lo spazio dei tipi che il codice si aspetta vs. quelli che riceve."
