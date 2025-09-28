interface ProjectSchemaProps {
  project: {
    title?: string
    description?: string
    client: string
    tags?: string[]
    metric?: string
    url?: string
    slug?: string
  }
}

export function ProjectSchema({ project }: ProjectSchemaProps) {
  const title = project.title || project.client
  const description = project.description || `${title} project by Matt Wood`

  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    description,
    creator: {
      '@type': 'Person',
      name: 'Matt Wood',
      url: 'https://mattwood.co',
    },
    about: project.tags || [],
    dateCreated: new Date().toISOString().split('T')[0],
    url: project.url || (project.slug ? `https://mattwood.co/projects/${project.slug}` : `https://mattwood.co/projects/${encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'))}`),
    ...(project.client && {
      sponsor: {
        '@type': 'Organization',
        name: project.client,
      },
    }),
    ...(project.metric && {
      award: project.metric,
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(projectSchema).replace(/</g, '\\u003c'),
      }}
    />
  )
}