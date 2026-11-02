import type { ReactNode } from "react";
import { CrowdCanvas } from "@/components/CrowdCanvas";

type Props = {
  title: ReactNode;
  lede: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthShell({ title, lede, children, footer }: Props) {
  return (
    <section className="auth-page">
      <CrowdCanvas variant="page" seed={33} />
      <div className="wrap auth-wrap">
        <div className="auth-card">
          <h1 className="display display--md auth-title">{title}</h1>
          <p className="auth-lede">{lede}</p>
          {children}
          {footer ? <div className="auth-footer">{footer}</div> : null}
        </div>
      </div>
    </section>
  );
}
