# CrossPawn Prayer Voice + Scripture Engine

This is a local browser app that combines:

- A spoken prayer loop with text-to-speech output.
- A scripture search engine with local import support for large Bible JSON corpora.

## Prayer Module

- Speaks the outward prayer first.
- Recites the Lord's Prayer twice in each cycle.
- Speaks: "I say these things in the name of Jesus Christ Amen." after each cycle.
- Repeats indefinitely until Stop is pressed.
- On Stop, it speaks the same closing line once.

## Bible Research Module

- Library Loader for importing JSON files (the book->chapter->verse shape used by your Bible dataset).
- Collection and book filters.
- Search box for concept questions and phrase queries.
- Sin type / penalty lookup mode.
- Mini local LLM mode (retrieval + lightweight synthesis from loaded texts).
- Hardcoded no-future-prediction policy.
- Deep chapter report with target size in KB (default 120KB).
- Per-book and corpus summaries.
- Two-book comparison with justice-vs-forgiveness weighting.
- Manual annotations and text-to-speech playback for results.
- Community annotations with username max 35 chars and annotation max 2400 chars.

## Run

1. Website mode: double-click [Run-CrossPawn-Website.cmd](Run-CrossPawn-Website.cmd).
2. Default mode shortcut: double-click [Run-CrossPawn-App.cmd](Run-CrossPawn-App.cmd) (calls website mode).
3. Desktop EXE mode (already built): run [Run-CrossPawn-Desktop.cmd](Run-CrossPawn-Desktop.cmd).
4. The packaged EXE is at [dist-packager/CrossPawn-win32-x64/CrossPawn.exe](dist-packager/CrossPawn-win32-x64/CrossPawn.exe).
5. Use Start Prayer / Stop for the voice loop.
6. Use Library Loader to import your JSON scripture files.
7. Or click `Load Integrated Library` to load all pre-copied JSON files from the local `library` folder in one step.
8. For `scriptures-json-master` manual mode, load these first:
	- `old-testament.json`
	- `new-testament.json`
	- `book-of-mormon.json`
	- `doctrine-and-covenants.json`
	- `pearl-of-great-price.json`
9. Use the engine section to run search, mini LLM, summaries, and comparison.

## Notes

- Browsers usually require user interaction before speech playback.
- If you do not hear voice output, verify browser audio permissions and system output devices.
- A starter corpus is included for immediate use; import your full corpus for full lookup scale.
- Importer supports these JSON shapes: `books[]` chapter/verse format, reference map format, and flat verses format.
- Integrated mode reads `library/manifest.json` and attempts all JSON files, automatically skipping non-scripture shapes.
- If you later want a true .exe package, this project can be wrapped with a desktop shell (for example Electron) in a separate packaging step.
