"use client";

import type { ReactNode, AnchorHTMLAttributes } from "react";
import { useToast } from "./ToastProvider";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

export function DiscordLink({ children, onClick, ...rest }: Props) {
  const { discordUrl, say } = useToast();

  return (
    <a
      {...rest}
      href={discordUrl || "#"}
      target={discordUrl ? "_blank" : undefined}
      rel={discordUrl ? "noopener" : undefined}
      onClick={(e) => {
        onClick?.(e);
        if (!discordUrl) {
          e.preventDefault();
          say("The Discord opens soon. The server is already up.");
        }
      }}
    >
      {children}
    </a>
  );
}
