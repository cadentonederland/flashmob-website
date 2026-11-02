"use client";

import { useEffect, useRef } from "react";
import { BOLT_H, BOLT_W, CrowdField, type CrowdOptions } from "@/lib/crowd-field";

type Variant = "hero" | "page" | "mega";

const presets: Record<Variant, Omit<CrowdOptions, "bolt">> = {
  hero: {
    cell: (W) => (W < 700 ? 26 : W < 1200 ? 32 : 38),
    seed: 7,
    echoTrail: true,
  },
  page: {
    cell: (W) => (W < 700 ? 24 : 32),
    seed: 11,
    echoTrail: true,
  },
  mega: {
    cell: (W) => (W < 700 ? 22 : 28),
    seed: 21,
    empty: 0.18,
    strength: 1.15,
    echoTrail: true,
  },
};

type Props = {
  variant?: Variant;
  className?: string;
  /** When set, lights the logo bolt to the right of this element if there is room. */
  boltBesideId?: string;
  seed?: number;
};

export function CrowdCanvas({
  variant = "page",
  className = "crowd",
  boltBesideId,
  seed,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const base = { ...presets[variant], seed: seed ?? presets[variant].seed };
    if (reduced) base.echoTrail = false;

    const field = new CrowdField(canvas, {
      ...base,
      bolt: boltBesideId
        ? (f) => {
            const title = document.getElementById(boltBesideId);
            if (!title) return null;
            const range = document.createRange();
            range.selectNodeContents(title);
            const canvasBox = f.canvas.getBoundingClientRect();
            const textRight = range.getBoundingClientRect().right - canvasBox.left;
            const minCol = Math.ceil(textRight / f.cell) + 2;
            const maxCol = f.cols - BOLT_W - 3;
            if (maxCol < minCol || f.rows < BOLT_H + 4) return null;
            const col = Math.round((minCol + maxCol) / 2);
            const row = Math.max(2, Math.round((f.H / f.cell - BOLT_H) / 2));
            return { col, row };
          }
        : undefined,
    });

    document.fonts?.ready.then(() => field.resize());
    return () => field.destroy();
  }, [variant, boltBesideId, seed]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
