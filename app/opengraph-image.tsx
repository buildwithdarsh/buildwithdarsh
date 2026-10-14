import { ImageResponse } from "next/og";
import { hero, site } from "@/lib/content";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Fetch just the glyphs we need from Google Fonts; fall back to the default font if offline. */
async function loadKalam(text: string): Promise<ArrayBuffer | null> {
  "use cache";
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Kalam:wght@700&text=${encodeURIComponent(text)}`,
    ).then((res) => res.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    return url ? await fetch(url).then((res) => res.arrayBuffer()) : null;
  } catch {
    return null;
  }
}

const ink = "#1a1a1a";

export default async function OpengraphImage() {
  const headline = `${hero.titleBefore}${hero.titleHighlight}${hero.titleAfter}`;
  const kalam = await loadKalam(`${headline}${site.brand}/ ${site.section}${site.domain}build.mdx`);
  const display = kalam ? "Kalam" : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f1ead6",
          padding: 48,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: "#fbf8ef",
            border: `4px solid ${ink}`,
            borderRadius: 18,
            boxShadow: `10px 12px 0 rgba(26,26,26,0.7)`,
            overflow: "hidden",
          }}
        >
          {/* window title bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "16px 22px",
              background: "#f0e8d2",
              borderTop: "8px solid #e9b949",
              borderBottom: `4px dashed ${ink}`,
            }}
          >
            {["#e9b949", "#5c9ead", "#f47c5c"].map((c) => (
              <div
                key={c}
                style={{ width: 22, height: 22, borderRadius: 999, background: c, border: `3px solid ${ink}` }}
              />
            ))}
            <div style={{ display: "flex", marginLeft: "auto", fontSize: 26, fontFamily: display, color: ink }}>
              build.mdx
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, padding: "44px 56px" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                fontFamily: display,
                fontSize: 84,
                fontWeight: 700,
                lineHeight: 1.08,
                color: ink,
              }}
            >
              <span>{hero.titleBefore}&nbsp;</span>
              <span style={{ color: "#c4502e", borderBottom: "6px solid #f47c5c" }}>{hero.titleHighlight}</span>
              <span>&nbsp;{hero.titleAfter.trim()}</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 30 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, fontFamily: display, fontWeight: 700 }}>
                <span>{site.brand}</span>
                <span style={{ fontSize: 22, color: "#c4502e" }}>/ {site.section}</span>
              </div>
              <span style={{ color: "#6e665b", fontSize: 24 }}>{site.domain}</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: kalam ? [{ name: "Kalam", data: kalam, weight: 700, style: "normal" }] : [],
    },
  );
}
