interface ResponsiveImage {
	src: string;
	width: number;
	type: string;
}

declare module '*.svg' {
	export const src: string;
	export const type: string;
	export const width: number;
	export const height: number;
	export function toString(): string;
}

declare module '*.png' {
	export const src: string;
	export const type: string;
	export const width: number;
	export const height: number;
	export const placeholder: string | undefined;
	export const responsive_images: ResponsiveImage[] | undefined;
	export function toString(): string;
}

declare module '*.webp' {
	export const src: string;
	export const type: string;
	export const width: number;
	export const height: number;
	export const placeholder: string | undefined;
	export const responsive_images: ResponsiveImage[] | undefined;
	export function toString(): string;
}

declare module '*.jpg' {
	export const src: string;
	export const type: string;
	export const width: number;
	export const height: number;
	export const placeholder: string | undefined;
	export const responsive_images: ResponsiveImage[] | undefined;
	export function toString(): string;
}
