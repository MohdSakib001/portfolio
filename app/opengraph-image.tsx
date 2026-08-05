import { ImageResponse } from "next/og";

import { HOST } from "@/data/constants";
import { METRICS } from "@/data/profile";

export const runtime = "edge";

/** Domain shown on the card, without the protocol. */
const DISPLAY_HOST = HOST.replace(/^https?:\/\//, "");

const STATS = [
  { value: METRICS.usersShort, label: "Users Served" },
  { value: METRICS.processed, label: "GMV Shipped" },
  { value: METRICS.lighthouse, label: "Lighthouse" },
  { value: METRICS.products, label: "Production Systems" },
];

export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

export default function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    backgroundColor: "#ffffff",
                    padding: "64px",
                    fontFamily: "sans-serif",
                }}
            >
                {/* TOP ROW */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <span
                        style={{
                            fontSize: "14px",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            opacity: 0.4,
                            color: "#000",
                        }}
                    >
                        {DISPLAY_HOST}
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div
                            style={{
                                width: "8px",
                                height: "8px",
                                borderRadius: "50%",
                                backgroundColor: "#22c55e",
                            }}
                        />
                        <span style={{ fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.6, color: "#000" }}>
                            Available
                        </span>
                    </div>
                </div>

                {/* MAIN NAME */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
                    <span
                        style={{
                            fontSize: "120px",
                            fontWeight: 700,
                            letterSpacing: "-0.06em",
                            lineHeight: 0.9,
                            color: "#000",
                        }}
                    >
                        MOHD
                    </span>
                    <span
                        style={{
                            fontSize: "120px",
                            fontWeight: 700,
                            letterSpacing: "-0.06em",
                            lineHeight: 0.9,
                            color: "#000",
                        }}
                    >
                        SAKIB
                    </span>
                    <span
                        style={{
                            fontSize: "16px",
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            opacity: 0.4,
                            marginTop: "16px",
                            color: "#000",
                        }}
                    >
                        Senior Full Stack &amp; React Native Developer
                    </span>
                </div>

                {/* BOTTOM STATS ROW */}
                <div style={{ display: "flex", gap: "40px" }}>
                    {STATS.map((stat) => (
                        <div key={stat.label} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                            <span style={{ fontSize: "28px", fontWeight: 600, color: "#000", letterSpacing: "-0.03em" }}>
                                {stat.value}
                            </span>
                            <span style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.4, color: "#000" }}>
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        ),
        { ...size }
    );
}
