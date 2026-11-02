"use client";

import { useMemo } from "react";

const COLORS: Record<string, string> = {
  y: "#FFC93C",
  p: "#FF4D8D",
  b: "#3D8BFF",
  l: "#B9A6FF",
  w: "#F4F2FF",
};

type Cell = { x: number; y: number; c: string; a?: number };

function fromRows(
  rowsArr: string[],
  dx = 0,
  dy = 0,
  alpha = 1,
  override?: string,
): Cell[] {
  const out: Cell[] = [];
  rowsArr.forEach((row, y) =>
    [...row].forEach((ch, x) => {
      if (ch === ".") return;
      out.push({ x: x + dx, y: y + dy, c: override || ch, a: alpha });
    }),
  );
  return out;
}

function pixelSvg(cells: Cell[], cols: number, rows: number, pad = 0.6) {
  const gap = 0.16;
  const s = 1 - gap;
  const r = s * 0.22;
  const rects = cells
    .map(
      ({ x, y, c, a = 1 }) =>
        `<rect x="${(x + gap / 2).toFixed(2)}" y="${(y + gap / 2).toFixed(2)}" width="${s}" height="${s}" rx="${r.toFixed(3)}" fill="${COLORS[c] || c}" fill-opacity="${a}"/>`,
    )
    .join("");
  return `<svg viewBox="${-pad} ${-pad} ${cols + pad * 2} ${rows + pad * 2}" xmlns="http://www.w3.org/2000/svg">${rects}</svg>`;
}

const FIGURE = [".y.", "yyy", ".y.", "y.y"];
const BIG_FIGURE = [
  "..yy..",
  "..yy..",
  "yyyyyy",
  "..yy..",
  "..yy..",
  ".y..y.",
  ".y..y.",
];

const art: Record<string, () => string> = {
  crowd: () =>
    pixelSvg(fromRows(["yy.yyyby", "yyyl.yyy", "y.yyyyyw", "yyyyby.y"]), 8, 4),
  odd() {
    const crowd = fromRows(["lllllll", "lllllll", "lllllll"], 0, 0, 0.28);
    crowd.splice(6, 1);
    crowd.push({ x: 6.45, y: -0.45, c: "p", a: 1 });
    return pixelSvg(crowd, 7, 3, 1);
  },
  echo: () =>
    pixelSvg(
      [
        ...fromRows(FIGURE, 0, 0, 0.28, "l"),
        ...fromRows(FIGURE, 3.5, 0, 0.6, "l"),
        ...fromRows(FIGURE, 7, 0, 1),
      ],
      10,
      4,
    ),
  "echo-large": () =>
    pixelSvg(
      [
        ...fromRows(BIG_FIGURE, 0, 0, 0.28, "l"),
        ...fromRows(BIG_FIGURE, 4, 0, 0.6, "l"),
        ...fromRows(BIG_FIGURE, 8, 0, 1),
      ],
      14,
      7,
    ),
};

type Props = { kind: keyof typeof art; className?: string };

export function PixelArt({ kind, className = "idea-art" }: Props) {
  const svg = useMemo(() => art[kind]?.() ?? "", [kind]);
  return (
    <div
      className={className}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
