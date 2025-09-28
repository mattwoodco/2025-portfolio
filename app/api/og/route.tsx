import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Matt Wood";
    const subtitle = searchParams.get("subtitle") || "Design Engineer";
    const description =
      searchParams.get("description") || "Based in Austin, TX";

    return new ImageResponse(
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Inter",
          position: "relative",
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.1,
            background: `
                radial-gradient(circle at 25% 25%, #3b82f6 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, #8b5cf6 0%, transparent 50%)
              `,
          }}
        />

        {/* Content Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            color: "white",
            padding: "80px",
            maxWidth: "1000px",
          }}
        >
          {/* Main Title */}
          <div
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              marginBottom: "20px",
              background: "linear-gradient(90deg, #ffffff 0%, #e2e8f0 100%)",
              backgroundClip: "text",
              color: "transparent",
              textAlign: "center",
            }}
          >
            {title}
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: "36px",
              marginBottom: "30px",
              color: "#94a3b8",
              fontWeight: "600",
            }}
          >
            {subtitle}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: "24px",
              color: "#cbd5e1",
              marginBottom: "40px",
            }}
          >
            {description}
          </div>

          {/* Tech Badge */}
          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {["React", "TypeScript", "Design Systems"].map((tech) => (
              <div
                key={tech}
                style={{
                  background: "rgba(59, 130, 246, 0.2)",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "18px",
                  color: "#93c5fd",
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (error) {
    console.error("OG Image generation failed:", error);
    return new Response("Failed to generate image", { status: 500 });
  }
}
