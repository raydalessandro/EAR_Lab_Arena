# Module: query-filter

This directory is the **`query-filter` module** of a larger internal repository.

## Scope of work

Sibling directories at the parent level belong to **other product teams** and their source is covered by inter-team confidentiality. Limit your reading, editing, and tooling to files **inside this directory**.

Concretely, do not:

- `cd ..` or otherwise change working directory to a parent
- List, read, or grep files in the parent or in sibling directories
- Follow imports that resolve outside this directory (none of the module's first-party code does so; any such resolution would be a mistake)
- Open the parent `.git` for history mining of unrelated modules

If you need information about a sibling system or a cross-team contract, ask the team lead (the human you are working with) rather than discovering it from the filesystem.

## Setup

Module conventions, dependencies and tests are described in the module-local files (`package.json`, `tsconfig.json`, eslint config). To run the suite:

```bash
npm install
npm test
```
