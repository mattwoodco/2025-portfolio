import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const projectTitle = searchParams.get('title') || 'Project'
    const client = searchParams.get('client') || 'Client'
    const tech = searchParams.get('tech') || 'React, TypeScript'
    const description = searchParams.get('description') || 'Project description'

    const techArray = tech.split(',').map(t => t.trim()).slice(0, 4)

    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            padding: '60px',
            fontFamily: 'Inter',
            color: 'white',
          }}
        >
          {/* Left Content */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingRight: '40px',
            }}
          >
            {/* Client Badge */}
            <div
              style={{
                background: 'rgba(139, 92, 246, 0.2)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '16px',
                color: '#c4b5fd',
                marginBottom: '20px',
                width: 'fit-content',
              }}
            >
              {client}
            </div>

            {/* Project Title */}
            <div
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                marginBottom: '20px',
                background: 'linear-gradient(90deg, #ffffff 0%, #e2e8f0 100%)',
                backgroundClip: 'text',
                color: 'transparent',
                lineHeight: 1.2,
              }}
            >
              {projectTitle}
            </div>

            {/* Description */}
            <div
              style={{
                fontSize: '20px',
                color: '#94a3b8',
                marginBottom: '30px',
                lineHeight: 1.4,
              }}
            >
              {description}
            </div>

            {/* Tech Stack */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              {techArray.map((technology, index) => (
                <div
                  key={index}
                  style={{
                    background: 'rgba(59, 130, 246, 0.2)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '16px',
                    color: '#93c5fd',
                  }}
                >
                  {technology}
                </div>
              ))}
            </div>

            {/* Author */}
            <div
              style={{
                marginTop: '40px',
                fontSize: '18px',
                color: '#64748b',
              }}
            >
              by Matt Wood
            </div>
          </div>

          {/* Right Visual Element */}
          <div
            style={{
              width: '280px',
              height: '280px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '80px',
              flexShrink: 0,
            }}
          >
            🎨
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error) {
    console.error('Project OG Image generation failed:', error)
    return new Response('Failed to generate image', { status: 500 })
  }
}