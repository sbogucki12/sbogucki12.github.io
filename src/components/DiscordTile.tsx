// Discord community tile for the homepage bento grid.
//
// Rendered without a `client:*` directive, so Astro outputs static HTML and ships
// no JavaScript (keeps the CSP free of 'unsafe-inline').
//
// The surface/hover classes mirror `tile`, `pad`, `interactive`, and `arrow` in
// src/pages/index.astro. Keep them in sync if the shared treatment changes.

const tile =
	'group relative isolate flex flex-col overflow-hidden rounded-2xl border'; // border color set per-tile below
const pad = 'p-6 sm:p-7';
const interactive = [
	'transition duration-300 ease-out',
	'hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.8)]',
	'motion-reduce:transition-none',
	// Top-edge sheen, tinted blurple for this tile.
	'before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:-z-10 before:h-px',
	'before:bg-gradient-to-r before:from-transparent before:via-[#5865F2]/70 before:to-transparent',
	'before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100',
	'hover:-translate-y-0.5 motion-reduce:hover:translate-y-0',
	'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7983F5]',
].join(' ');
const arrow =
	'inline-block transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none';
const eyebrow = 'text-xs font-medium uppercase tracking-[0.2em]';

// Official Discord "Clyde" mark.
function DiscordLogo({ className }: { className?: string }) {
	return (
		<svg aria-hidden="true" viewBox="0 0 127.14 96.36" fill="currentColor" className={className}>
			<path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
		</svg>
	);
}

interface Props {
	inviteUrl: string;
	className?: string;
}

export default function DiscordTile({ inviteUrl, className = '' }: Props) {
	return (
		<a
			href={inviteUrl}
			target="_blank"
			rel="noopener noreferrer"
			className={[
				tile,
				pad,
				interactive,
				'gap-6 border-[#5865F2]/25 bg-gradient-to-br from-[#5865F2]/15 via-zinc-900 to-zinc-950 hover:border-[#5865F2]/60',
				'md:flex-row md:items-center md:gap-8',
				className,
			].join(' ')}
		>
			{/* Soft blurple glow that brightens on hover. */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -right-20 -top-24 -z-10 size-64 rounded-full bg-[#5865F2]/20 opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"
			/>

			{/* Logo badge */}
			<div
				aria-hidden="true"
				className="flex size-14 shrink-0 bg-[#5865F2] items-center justify-center rounded-2xl text-white shadow-[0_12px_30px_-10px_rgba(88,101,242,0.8)] ring-1 ring-white/10 transition-transform duration-500 ease-out group-hover:-rotate-3 group-hover:scale-105 motion-reduce:transition-none sm:size-16"
			>
				<DiscordLogo className="h-7 w-auto sm:h-8" />
			</div>

			{/* Copy */}
			<div className="min-w-0 flex-1">
				<p className={`${eyebrow} text-[#A5ACF8]`}>Community</p>
				<h2 className="mt-3 text-2xl font-semibold tracking-tight text-balance text-zinc-50">
					Join the BOGOODSKI Community.
				</h2>
				<p className="mt-2 text-sm leading-relaxed text-pretty text-zinc-400 sm:text-base">
					Connect over code, cadence, and progressive house.
				</p>
			</div>

			{/* CTA */}
			<div className="shrink-0">
				<span
					className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#5865F2] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-10px_rgba(88,101,242,0.7)] transition-[filter] duration-300 group-hover:brightness-110 md:w-auto"
				>
					<DiscordLogo className="h-3.5 w-auto" />
					Join on Discord <span aria-hidden="true" className={arrow}>↗</span>
				</span>
			</div>
			<span className="sr-only">(opens in a new tab)</span>
		</a>
	);
}
