import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site-config";

/* ------------------------------------------------------------------ */
/* Dynamic OG Image Template                                           */
/* ------------------------------------------------------------------ */
/* Used by opengraph-image.tsx files in each route segment.            */
/* Generates branded 1200x630 PNG images with:                         */
/*  - Brand name + logo mark                                           */
/*  - Page title                                                       */
/*  - Page subtitle/description                                        */
/*  - License badge                                                    */
/*  - Brand color gradient background                                   */
/* ------------------------------------------------------------------ */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export interface OgImageProps {
  title: string;
  subtitle?: string;
  /** Optional: show a category badge (e.g. "Services", "Blog") */
  category?: string;
}

export function renderOgImage({ title, subtitle, category }: OgImageProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #1a2b3c 0%, #2d4a5f 50%, #1a2b3c 100%)",
          padding: "60px 70px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Decorative accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "8px",
            height: "100%",
            background: "linear-gradient(180deg, #d4a056 0%, #c4924a 100%)",
          }}
        />

        {/* Top: brand + category */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Logo mark */}
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #d4a056, #c4924a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
                fontWeight: 700,
                color: "#1a2b3c",
              }}
            >
              R
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: "24px", fontWeight: 700, color: "#ffffff" }}>
                Red&apos;s RRC
              </div>
              <div style={{ fontSize: "14px", color: "#8a9ba8" }}>
                Residential &amp; Restaurant Construction
              </div>
            </div>
          </div>
          {category && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 20px",
                borderRadius: "999px",
                background: "rgba(212, 160, 86, 0.15)",
                border: "1px solid rgba(212, 160, 86, 0.3)",
                fontSize: "16px",
                fontWeight: 600,
                color: "#d4a056",
              }}
            >
              {category}
            </div>
          )}
        </div>

        {/* Middle: title + subtitle */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", flex: 1, justifyContent: "center" }}>
          <div
            style={{
              fontSize: title.length > 40 ? "44px" : "56px",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.15,
              maxWidth: "1000px",
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                fontSize: "24px",
                color: "#a8b8c4",
                lineHeight: 1.4,
                maxWidth: "900px",
              }}
            >
              {subtitle.length > 120 ? subtitle.slice(0, 120) + "…" : subtitle}
            </div>
          )}
        </div>

        {/* Bottom: license + tagline */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                fontSize: "15px",
                color: "#a8b8c4",
              }}
            >
              {SITE.license}
            </div>
            <div
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                fontSize: "15px",
                color: "#a8b8c4",
              }}
            >
              {SITE.certification}
            </div>
          </div>
          <div style={{ fontSize: "15px", color: "#6a7a88", fontStyle: "italic" }}>
            {SITE.tagline}
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
    },
  );
}
