# OpenFigma brand sources

- `mark.svg` is the OpenFigma "Fi" master: a geometric F and i in brand teal (`#167C76`) on a transparent canvas.
- `mark-micro.svg` renders at 16px with bolder strokes and the same proportions.
- Both use the `0 0 256 256` viewBox. `data-part="body"` marks the artwork that derived dark and monochrome variants recolor.
- Edit these SVGs, not generated files. Platform backgrounds and padding live in `tools/generate/brand/src/config.ts`.

## Generation

```sh
bun run generate:icons --target web --force
```
