import { useId, useState } from 'react';

const DEFAULT_HIGHLIGHTS = [
	{ label: 'Stay', value: 'Banyan Tree Veya' },
	{ label: 'Dinner', value: 'Fauna' },
	{ label: 'Dinner', value: 'Deckman’s' },
];

const VIEWS = [
	{ id: 'summary', label: 'Summary' },
	{ id: 'itinerary', label: 'Itinerary' },
];

export default function ItineraryViewer({
	title = 'Valle de Guadalupe',
	dates = 'October 2026',
	summary = 'A few days in Baja California’s wine country: a stay at Banyan Tree Veya and dinners at Fauna and Deckman’s.',
	highlights = DEFAULT_HIGHLIGHTS,
	pdfUrl,
	pdfFileName = 'valle-de-guadalupe-itinerary.pdf',
}) {
	const [view, setView] = useState('summary');
	const baseId = useId();

	// Arrow/Home/End keys move between tabs (WAI-ARIA tabs pattern). Enter and Space
	// activate a tab natively because each tab is a <button>.
	function handleKeyDown(event) {
		const index = VIEWS.findIndex((v) => v.id === view);
		let next;
		if (event.key === 'ArrowRight') next = VIEWS[(index + 1) % VIEWS.length];
		else if (event.key === 'ArrowLeft') next = VIEWS[(index - 1 + VIEWS.length) % VIEWS.length];
		else if (event.key === 'Home') next = VIEWS[0];
		else if (event.key === 'End') next = VIEWS[VIEWS.length - 1];
		else return;
		event.preventDefault();
		setView(next.id);
		document.getElementById(`${baseId}-tab-${next.id}`)?.focus();
	}

	return (
		<div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40">
			<div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 px-5 py-4 sm:px-6">
				<div>
					<p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">{dates}</p>
					<h3 className="mt-1 text-base font-semibold text-zinc-100">{title}</h3>
				</div>

				<div
					role="tablist"
					aria-label="Trip details"
					className="inline-flex rounded-lg border border-zinc-800 bg-zinc-950 p-1"
					onKeyDown={handleKeyDown}
				>
					{VIEWS.map(({ id, label }) => {
						const selected = view === id;
						return (
							<button
								key={id}
								id={`${baseId}-tab-${id}`}
								type="button"
								role="tab"
								aria-selected={selected}
								aria-controls={`${baseId}-panel-${id}`}
								tabIndex={selected ? 0 : -1}
								onClick={() => setView(id)}
								className={[
									'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
									'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400',
									selected ? 'bg-zinc-800 text-zinc-50' : 'text-zinc-400 hover:text-zinc-100',
								].join(' ')}
							>
								{label}
							</button>
						);
					})}
				</div>
			</div>

			{/* Both panels stay in the DOM so each tab's aria-controls always resolves. */}
			<div
				id={`${baseId}-panel-summary`}
				role="tabpanel"
				aria-labelledby={`${baseId}-tab-summary`}
				hidden={view !== 'summary'}
				tabIndex={0}
				className="px-5 py-6 sm:px-6 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-zinc-400"
			>
					<p className="max-w-prose text-sm leading-relaxed text-zinc-400">{summary}</p>
					<dl className="mt-6 grid gap-3 sm:grid-cols-3">
						{highlights.map(({ label, value }) => (
							<div key={value} className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3">
								<dt className="text-xs uppercase tracking-wider text-zinc-500">{label}</dt>
								<dd className="mt-1 text-sm font-medium text-zinc-100">{value}</dd>
							</div>
						))}
					</dl>
			</div>
			<div
				id={`${baseId}-panel-itinerary`}
				role="tabpanel"
				aria-labelledby={`${baseId}-tab-itinerary`}
				hidden={view !== 'itinerary'}
				tabIndex={0}
				className={[
					// `flex` would override the hidden attribute, so apply it only when visible.
					view === 'itinerary' ? 'flex' : 'hidden',
					'flex-col items-start gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6',
					'focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-zinc-400',
				].join(' ')}
			>
					<div>
						<p className="text-sm font-medium text-zinc-100">Full itinerary (PDF)</p>
						<p className="mt-1 text-sm text-zinc-500">
							Day-by-day schedule, reservations, and drive times.
						</p>
					</div>
					{pdfUrl ? (
						<a
							href={pdfUrl}
							download={pdfFileName}
							className="inline-flex shrink-0 items-center gap-2 rounded-md bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
						>
							<svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="size-4">
								<path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.69L6.28 8.47a.75.75 0 0 0-1.06 1.06l4.25 4.25a.75.75 0 0 0 1.06 0l4.25-4.25a.75.75 0 1 0-1.06-1.06l-2.97 2.97V2.75Z" />
								<path d="M3.5 13.75a.75.75 0 0 0-1.5 0v1.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-1.5a.75.75 0 0 0-1.5 0v1.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-1.5Z" />
							</svg>
							Download PDF
						</a>
					) : (
						<p className="text-sm text-zinc-500">Itinerary coming soon.</p>
					)}
			</div>
		</div>
	);
}
