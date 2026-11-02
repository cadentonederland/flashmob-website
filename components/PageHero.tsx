import type { ReactNode } from "react";
import Link from "next/link";
import { CrowdCanvas } from "./CrowdCanvas";

type Props = {
  title: ReactNode;
  lede: string;
  crumb: string;
  variant?: "page" | "mega";
  actions?: ReactNode;
  titleClassName?: string;
  titleId?: string;
};

export function PageHero({
  title,
  lede,
  crumb,
  variant = "page",
  actions,
  titleClassName = "display display--xl",
  titleId = "page-title",
}: Props) {
  return (
    <section className="page-hero" aria-labelledby={titleId}>
      <CrowdCanvas variant={variant} />
      <div className="wrap page-hero-inner">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{crumb}</span>
        </nav>
        <h1 id={titleId} className={titleClassName}>
          {title}
        </h1>
        <p className="lede">{lede}</p>
        {actions ? <div className="hero-actions">{actions}</div> : null}
      </div>
    </section>
  );
}
