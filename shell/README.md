# Shell workspace notes (monorepo + SvelteKit)

This repo is a pnpm workspace containing:

- **`shell/`**: the **only SvelteKit app**. Owns routing (`/alpha`, `/beta`, …), Tailwind build, Vite config, and SSR.
- **`apps/feature-*`**: **feature packages** that export Svelte components (not standalone SvelteKit apps). The shell renders them inside routes.
- **`packages/*`**: shared libraries:
  - `@acme/ui`: shared UI components + theme CSS
  - `@acme/state`: shared state (Svelte 5 runes)

The shell compiles workspace packages as _source_ during dev/build (so you can edit them without publishing/building).

## Dependency rules (what goes where)

Think “**who imports it?**”:

- **`dependencies`**: imported by the package’s shipped code/CSS at runtime or during the consumer build.
  - Example: `@acme/ui` imports `clsx`, `tailwind-merge`, `tailwind-variants`, and `tw-animate-css` → those belong in `@acme/ui` **`dependencies`**.
- **`devDependencies`**: used only to develop/build/test _that package itself_.
  - Example: `shell` owns build tooling (`@sveltejs/kit`, `vite`, `tailwindcss`, `@tailwindcss/vite`, eslint, prettier, etc.).
- **`peerDependencies`**: “host provides this singleton.”
  - Example: libraries that use Svelte types/runes set `peerDependencies.svelte` (the app supplies the actual Svelte version).

## Tailwind (v4) + where imports belong

### The rule

**Only the app (`shell/`) should `@import "tailwindcss"`**.

Why: with pnpm, dependencies are isolated per package. If a workspace package (like `@acme/ui`) contains `@import "tailwindcss"`, Tailwind/Vite will try to resolve `tailwindcss` relative to that package’s directory, which can fail (and/or create duplicate Tailwind roots and ordering issues).

### The intended flow

- `shell/src/lib/app.css` is the **single Tailwind entrypoint**:

```1:3:shell/src/lib/app.css
@import "tailwindcss";
@import "@acme/ui/default.css";
```

- `@acme/ui/default.css` contains **theme tokens + layers**, and can import _its own CSS dependencies_:
  - `tw-animate-css` is a CSS package consumed by the UI theme, so it lives in `@acme/ui` and is imported there.

This matches shadcn-svelte’s Tailwind v4 approach, but adapted for a pnpm monorepo: the app owns the Tailwind root import, while the UI package owns its theme CSS and any CSS deps it imports. See the shadcn-svelte manual installation guide for the canonical theme structure ([docs](https://shadcn-svelte.com/docs/installation/manual)).

## Svelte aliases (`$lib`) in workspace packages

### The rule

**Do not use `$lib` inside `packages/*` or `apps/*`**.

`$lib` is a SvelteKit alias that only exists in the `shell/` app (configured by SvelteKit). When you import code from workspace packages, those packages do not automatically inherit the shell’s aliases.

### Practical guidance (shadcn components)

shadcn-svelte templates often generate imports like:

- `import { cn } from "$lib/utils";`

In `@acme/ui`, replace these with **relative imports within the UI package**, e.g.:

- `import { cn } from "../../../utils";`

(This is why newly added shadcn components may need a quick manual edit after generation.)

If we ever want aliases inside `@acme/ui`, we’d need a dedicated build step for `@acme/ui` (or a shared Vite alias config) — but the “no aliases in packages” rule is simplest and least surprising.

## How SvelteKit compiles workspace packages

- The shell’s dev/build pipeline (Vite + SvelteKit) compiles `.svelte` and `.ts` files from `apps/*` and `packages/*` because they’re imported by the shell.
- `shell/svelte.config.js` includes `kit.vite.ssr.noExternal` for our workspace packages so SSR bundles them instead of treating them as prebuilt external deps.
- If you see “Cannot find module … types” in the editor for a workspace package, ensure the package exports types (e.g. `@acme/state` has `types` + `exports.types`).

## pnpm commands you’ll actually use

### Running the app (from repo root)

- **Dev**: `pnpm run dev` (delegates to `pnpm -C shell dev`)
- **Typecheck**: `pnpm -C shell check`
- **Build**: `pnpm -C shell build`

### Filtering by package

pnpm filter works by package name:

- Only shell:
  - `pnpm -F shell dev`
  - `pnpm -F shell check`
- Only UI:
  - `pnpm -F @acme/ui <command>`
- Only feature alpha:
  - `pnpm -F @acme/feature-alpha <command>`

### Run a script across the workspace (with logs)

Useful flags:

- `-r` / `--recursive`: run in all workspace packages that have the script
- `--stream`: stream prefixed logs from each package
- `--filter ...`: narrow the set

Examples:

- Run `check` everywhere it exists:
  - `pnpm -r --stream check`
- Run only packages under `packages/`:
  - `pnpm -r --stream --filter "./packages/**" <script>`

### Installing deps in the right place

- Add a dependency to **UI**:
  - `pnpm -F @acme/ui add <dep>`
- Add a dev dependency to **shell**:
  - `pnpm -F shell add -D <dep>`

If a dependency is imported by `@acme/ui` source, it must be in `@acme/ui` **`dependencies`** (even if it doesn’t run “in production” directly). This avoids “works in dev, fails in prod/pruned install” problems.
