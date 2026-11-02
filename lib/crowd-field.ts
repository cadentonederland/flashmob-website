/** FLASHMOB crowd field: rounded squares forming the logo bolt. Ported from the brand kit. */

export const BOLT = [
  "....#####",
  "...#####.",
  "...####..",
  "..####...",
  ".########",
  "..######.",
  "....####.",
  "...####..",
  "...###...",
  "..###....",
  "..##.....",
  ".##......",
  ".#.......",
];

export const BOLT_W = 9;
export const BOLT_H = BOLT.length;

const ACCENTS: Record<string, string> = {
  "2,4": "#3D8BFF",
  "5,6": "#B9A6FF",
  "4,8": "#F4F2FF",
  "6,1": "#3D8BFF",
  "3,3": "#FF4D8D",
};
const ODD: [number, number] = [8, 0];
const DIM = ["#B9A6FF", "#B9A6FF", "#B9A6FF", "#3D8BFF", "#FF4D8D", "#F4F2FF"];
const LILAC = "#B9A6FF";

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  if (ctx.roundRect) {
    ctx.roundRect(x, y, w, h, r);
    return;
  }
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

type Cell = {
  x: number;
  y: number;
  lit: boolean;
  color: string;
  a: number;
  dx?: number;
  dy?: number;
  empty?: boolean;
  phase?: number;
  speed?: number;
  echo?: number;
};

export type CrowdOptions = {
  cell: number | ((w: number, h: number) => number);
  seed?: number;
  empty?: number;
  strength?: number;
  falloff?: number;
  echoTrail?: boolean;
  bolt?: (field: CrowdField) => { col: number; row: number } | null;
};

export class CrowdField {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  o: Required<Omit<CrowdOptions, "bolt" | "cell">> & CrowdOptions;
  cells: Cell[] = [];
  visible = true;
  pointer: { x: number; y: number } | null = null;
  raf = 0;
  last = 0;
  W = 0;
  H = 0;
  cell = 32;
  cols = 0;
  rows = 0;
  private reducedMotion: MediaQueryList;
  private ro?: ResizeObserver;
  private io?: IntersectionObserver;

  constructor(canvas: HTMLCanvasElement, o: CrowdOptions) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("2d context unavailable");
    this.ctx = ctx;
    this.o = {
      seed: 42,
      empty: 0.36,
      strength: 1,
      falloff: 14,
      echoTrail: false,
      ...o,
    };
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    this.resize = this.resize.bind(this);
    this.frame = this.frame.bind(this);

    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas);
    this.io = new IntersectionObserver(([e]) => {
      this.visible = e.isIntersecting;
      if (this.visible) this.start();
    });
    this.io.observe(canvas);

    if (this.o.echoTrail) {
      const host = canvas.parentElement;
      host?.addEventListener(
        "pointermove",
        (e) => {
          const r = canvas.getBoundingClientRect();
          this.pointer = { x: e.clientX - r.left, y: e.clientY - r.top };
        },
        { passive: true },
      );
      host?.addEventListener("pointerleave", () => {
        this.pointer = null;
      });
    }

    this.reducedMotion.addEventListener?.("change", () => {
      this.draw(0);
      this.start();
    });
    this.resize();
  }

  get animated() {
    return !this.reducedMotion.matches;
  }

  destroy() {
    cancelAnimationFrame(this.raf);
    this.ro?.disconnect();
    this.io?.disconnect();
  }

  resize() {
    const W = this.canvas.clientWidth;
    const H = this.canvas.clientHeight;
    if (!W || !H) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.round(W * dpr);
    this.canvas.height = Math.round(H * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.W = W;
    this.H = H;

    const cell =
      typeof this.o.cell === "function" ? this.o.cell(W, H) : this.o.cell;
    this.cell = cell;
    this.cols = Math.ceil(W / cell) + 1;
    this.rows = Math.ceil(H / cell) + 1;
    const bolt = this.o.bolt ? this.o.bolt(this) : null;
    this.build(bolt);
    this.draw(performance.now());
    this.start();
  }

  build(bolt: { col: number; row: number } | null) {
    const rand = rng(this.o.seed ?? 42);
    const cells: Cell[] = [];
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const bx = bolt ? x - bolt.col : -99;
        const by = bolt ? y - bolt.row : -99;
        const inBolt =
          by >= 0 &&
          by < BOLT_H &&
          bx >= 0 &&
          bx < BOLT_W &&
          BOLT[by][bx] === "#";
        if (inBolt) {
          const odd = bx === ODD[0] && by === ODD[1];
          cells.push({
            x,
            y,
            lit: true,
            dx: odd ? 0.45 : 0,
            dy: odd ? -0.45 : 0,
            color: odd ? "#FF4D8D" : ACCENTS[`${bx},${by}`] || "#FFC93C",
            a: 1,
          });
          continue;
        }
        const d = bolt
          ? Math.hypot(bx - 4, by - 6) / (this.o.falloff ?? 14)
          : 1;
        const p = rand();
        const color = DIM[Math.floor(rand() * DIM.length)];
        const base =
          (0.05 + rand() * 0.13) *
          Math.min(1, 0.45 + d * 0.6) *
          (this.o.strength ?? 1);
        cells.push({
          x,
          y,
          lit: false,
          color,
          empty: p < (this.o.empty ?? 0.36),
          a: base,
          phase: rand() * Math.PI * 2,
          speed: 0.4 + rand() * 1.1,
          echo: 0,
        });
      }
    }
    this.cells = cells;
  }

  start() {
    if (!this.animated || !this.visible || this.raf) return;
    this.raf = requestAnimationFrame(this.frame);
  }

  frame = (t: number) => {
    this.raf = 0;
    if (!this.visible || !this.animated) return;
    if (t - this.last > 32) {
      const dt = Math.min(0.1, (t - this.last) / 1000);
      this.last = t;
      this.update(dt);
      this.draw(t);
    }
    this.raf = requestAnimationFrame(this.frame);
  };

  update(dt: number) {
    const p = this.pointer;
    const c = this.cell;
    for (const cell of this.cells) {
      if (cell.lit) continue;
      if ((cell.echo ?? 0) > 0) cell.echo = Math.max(0, (cell.echo ?? 0) - dt * 0.9);
    }
    if (!p) return;
    const cx = Math.floor(p.x / c);
    const cy = Math.floor(p.y / c);
    for (let y = cy - 1; y <= cy + 1; y++) {
      for (let x = cx - 1; x <= cx + 1; x++) {
        if (x < 0 || y < 0 || x >= this.cols || y >= this.rows) continue;
        const cell = this.cells[y * this.cols + x];
        if (cell.lit) continue;
        const dist = Math.hypot(x + 0.5 - p.x / c, y + 0.5 - p.y / c);
        const v = Math.max(0, 1 - dist / 1.6);
        if (v > (cell.echo ?? 0)) cell.echo = v;
      }
    }
  }

  draw(t: number) {
    const { ctx, cell: c } = this;
    if (!c) return;
    const gap = c * 0.16;
    const s = c - gap;
    const r = s * 0.22;
    const time = t / 1000;
    const move = this.animated;
    ctx.clearRect(0, 0, this.W, this.H);

    for (const cell of this.cells) {
      let a: number;
      let color = cell.color;
      if (cell.lit) {
        a = 1;
      } else {
        const twinkle = move
          ? 0.7 + 0.3 * Math.sin(time * (cell.speed ?? 1) + (cell.phase ?? 0))
          : 1;
        a = cell.empty ? 0 : cell.a * twinkle;
        if ((cell.echo ?? 0) > 0) {
          const ea = (cell.echo ?? 0) * 0.5;
          if (ea > a) {
            a = ea;
            color = LILAC;
          }
        }
      }
      if (a <= 0.004) continue;
      ctx.globalAlpha = a;
      ctx.fillStyle = color;
      ctx.beginPath();
      roundRect(
        ctx,
        (cell.x + (cell.dx || 0)) * c + gap / 2,
        (cell.y + (cell.dy || 0)) * c + gap / 2,
        s,
        s,
        r,
      );
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
}
