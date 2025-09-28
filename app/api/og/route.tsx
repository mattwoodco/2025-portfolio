import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

// Font loading functions
async function getInterFont() {
  const response = await fetch(
    new URL(
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap",
    ),
  );
  const css = await response.text();
  const fontUrl = css.match(
    /url\((https:\/\/fonts\.gstatic\.com\/s\/[^)]+)\)/,
  )?.[1];

  if (fontUrl) {
    const fontResponse = await fetch(fontUrl);
    return fontResponse.arrayBuffer();
  }
  return null;
}

async function getGoudyFont(baseUrl: string) {
  try {
    const response = await fetch(
      new URL("/fonts/GoudyStM-webfont.woff", baseUrl),
    );
    return response.arrayBuffer();
  } catch {
    return null;
  }
}

async function getAvatar(baseUrl: string) {
  try {
    const response = await fetch(new URL("/avatar.jpg", baseUrl));
    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    return `data:image/jpeg;base64,${base64}`;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log("🔍 OG Route: Starting request processing");

    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Matt Wood";
    const subtitle =
      searchParams.get("subtitle") || "Design Engineer | Austin, TX";
    const description = searchParams.get("description") || "";

    console.log("🔍 OG Route: Parsed params", { title, subtitle, description });

    // Load fonts and avatar with detailed logging
    const baseUrl = new URL(request.url).origin;
    console.log("🔍 OG Route: Base URL", baseUrl);

    console.log("🔍 OG Route: Starting font/avatar loading");
    let interFont: ArrayBuffer | null;
    let goudyFont: ArrayBuffer | null;
    let avatar: string | null;

    try {
      interFont = await getInterFont();
      console.log(
        "🔍 OG Route: Inter font result",
        interFont ? "SUCCESS" : "NULL",
      );
    } catch (error) {
      console.error("❌ OG Route: Inter font error", error);
      interFont = null;
    }

    try {
      goudyFont = await getGoudyFont(baseUrl);
      console.log(
        "🔍 OG Route: Goudy font result",
        goudyFont ? "SUCCESS" : "NULL",
      );
    } catch (error) {
      console.error("❌ OG Route: Goudy font error", error);
      goudyFont = null;
    }

    try {
      avatar = await getAvatar(baseUrl);
      console.log("🔍 OG Route: Avatar result", avatar ? "SUCCESS" : "NULL");
    } catch (error) {
      console.error("❌ OG Route: Avatar error", error);
      avatar = null;
    }

    console.log("🔍 OG Route: All resources loaded, creating ImageResponse");

    // Build fonts array with logging
    const fontsArray = [];
    console.log("🔍 OG Route: Building fonts array");

    if (interFont) {
      console.log("🔍 OG Route: Adding Inter font to array");
      fontsArray.push(
        {
          name: "Inter",
          data: interFont,
          style: "normal" as const,
          weight: 400 as const,
        },
        {
          name: "Inter",
          data: interFont,
          style: "normal" as const,
          weight: 600 as const,
        },
        {
          name: "Inter",
          data: interFont,
          style: "normal" as const,
          weight: 700 as const,
        },
      );
    }

    if (goudyFont) {
      console.log("🔍 OG Route: Adding Goudy font to array");
      fontsArray.push({
        name: "Goudy Old Style",
        data: goudyFont,
        style: "normal" as const,
        weight: 400 as const,
      });
    }

    console.log("🔍 OG Route: Final fonts array length:", fontsArray.length);

    return new ImageResponse(
      <div
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(59, 130, 246, 0.3), black), radial-gradient(ellipse 80% 80% at 80% 50%, rgba(59, 130, 246, 0.15), transparent), radial-gradient(ellipse 80% 80% at 20% 80%, rgba(99, 102, 241, 0.15), transparent)",
          backgroundColor: "black",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: '"Inter", sans-serif',
          position: "relative",
        }}
      >
        {/* Content Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            textAlign: "left",
            color: "white",
            padding: "80px 20px",
            maxWidth: "1000px",
          }}
        >
          {/* Avatar */}
          {avatar && (
            <img
              src={avatar}
              alt="Avatar"
              style={{
                width: "240px",
                height: "240px",
                borderRadius: "50%",
                marginBottom: "30px",
                border: "4px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              }}
            />
          )}

          {/* Main Title */}
          <div
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              marginBottom: "20px",
              background: "linear-gradient(90deg, #ffffff 0%, #e2e8f0 100%)",
              backgroundClip: "text",
              color: "transparent",
              textAlign: "left",
            }}
          >
            {title}
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: "32px",
              marginBottom: "30px",
              color: "#94a3b8",
              fontWeight: "600",
            }}
          >
            {subtitle}
          </div>

          {/* Description */}
          {description && (
            <div
              style={{
                fontSize: "32px",
                color: "#cbd5e1",
                marginBottom: "40px",
              }}
            >
              {description}
            </div>
          )}

          {/* Tech Badge */}
          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
              justifyContent: "flex-start",
            }}
          >
            {["AI Native", "UX/UI Design", "Data Visualization", "React"].map(
              (tech) => (
                <div
                  key={tech}
                  style={{
                    background: "rgba(59, 130, 246, 0.2)",
                    padding: "12px 16px",
                    borderRadius: "999px",
                    fontSize: "24px",
                    color: "#93c5fd",
                  }}
                >
                  {tech}
                </div>
              ),
            )}
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: fontsArray,
      },
    );
  } catch (error: unknown) {
    console.error("❌ OG Route: Unexpected error", error);
    return new Response("Failed to generate image", { status: 500 });
  }
}
