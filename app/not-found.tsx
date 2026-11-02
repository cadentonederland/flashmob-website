import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="wrap">
        <p className="eyebrow">404</p>
        <h1 className="display display--xl">
          That page
          <br />
          left the <span className="hl">lobby</span>
        </h1>
        <p className="lede">
          You&apos;re in the audience now. Pick a portal and get back in.
        </p>
        <div className="hero-actions" style={{ justifyContent: "center" }}>
          <Link className="btn btn--primary" href="/">
            Back home
          </Link>
          <Link className="btn btn--ghost" href="/mega-shows">
            Mega Shows
          </Link>
        </div>
      </div>
    </div>
  );
}
