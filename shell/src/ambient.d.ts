declare module 'pluralize';
// shadcn-svelte sometimes generates absolute-ish imports like "src/lib/utils.js".
// In this monorepo, those utilities live in @acme/ui, and runtime resolution is handled via Vite alias.
// This shim ensures TypeScript/svelte-check can type-check without editing generated component files.
declare module 'src/lib/utils' {
	export function cn(...inputs: unknown[]): string;
	export type WithElementRef<T, E extends HTMLElement = HTMLElement> = T & { ref?: E | null };
	export type WithoutChildren<T> = Omit<T, 'children'>;
	export type WithoutChild<T> = Omit<T, 'child'>;
	export type WithoutChildrenOrChild<T> = Omit<T, 'children' | 'child'>;
}

declare module 'src/lib/utils.js' {
	export function cn(...inputs: unknown[]): string;
	export type WithElementRef<T, E extends HTMLElement = HTMLElement> = T & { ref?: E | null };
	export type WithoutChildren<T> = Omit<T, 'children'>;
	export type WithoutChild<T> = Omit<T, 'child'>;
	export type WithoutChildrenOrChild<T> = Omit<T, 'children' | 'child'>;
}

