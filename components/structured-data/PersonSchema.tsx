export function PersonSchema() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Matt Wood",
    jobTitle: "Design Engineer",
    description:
      "Product Designer & Engineer based in Austin, TX, specializing in design systems and user experience.",
    url: "https://mattwood.co",
    sameAs: [
      "https://linkedin.com/in/mattwoodco",
      "https://github.com/mattwoodco",
      "https://twitter.com/mattwoodco",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Austin",
      addressRegion: "TX",
      addressCountry: "US",
    },
    knowsAbout: [
      "Design Systems",
      "User Experience Design",
      "React",
      "TypeScript",
      "Product Design",
      "Frontend Development",
      "Design Engineering",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    alumniOf: [
      {
        "@type": "Organization",
        name: "JPMorgan Chase",
      },
      {
        "@type": "Organization",
        name: "NBC Universal",
      },
      {
        "@type": "Organization",
        name: "FM Global",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires dangerouslySetInnerHTML and is safely escaped
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
