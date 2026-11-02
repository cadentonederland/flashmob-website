"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/config";

export function PlayerCount() {
  const [html, setHtml] = useState("Counting the crowd…");
  const [online, setOnline] = useState(false);

  useEffect(() => {
    if (!siteConfig.showPlayerCount) return;
    const address = siteConfig.serverAddress;
    const offline =
      "The crowd is getting ready. Add the server and be first in.";
    fetch(`https://api.mcsrvstat.us/3/${encodeURIComponent(address)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (!data.online || !data.players) {
          setHtml(offline);
          return;
        }
        const n = data.players.online || 0;
        setOnline(true);
        setHtml(
          n === 1
            ? "<b>1</b> player online. Go keep them company."
            : `<b>${n.toLocaleString("en-US")}</b> players online right now`,
        );
      })
      .catch(() => setHtml(offline));
  }, []);

  if (!siteConfig.showPlayerCount) return null;

  return (
    <p className={`live${online ? " is-online" : ""}`}>
      <span className="live-dot" aria-hidden="true" />
      <span dangerouslySetInnerHTML={{ __html: html }} />
    </p>
  );
}
