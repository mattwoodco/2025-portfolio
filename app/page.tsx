import { HorizScrollSnapContainer } from "../components/scroll/horiz-scroll-snap-container";
import { ProjectCard } from "../components/scroll/project-card";
import { VerticalScrollSnapContainer } from "../components/scroll/vertical-scroll-snap-container";

const projectData = [
  { client: "Acme Corp", metric: "Revenue +25%" },
  { client: "Globex", metric: "Launch Success" },
  { client: "Initech", metric: "Uptime 99.99%" },
  { client: "Umbrella", metric: "Growth 3x" },
  { client: "Wayne Enterprises", metric: "ROI 200%" },
  { client: "Stark Industries", metric: "Innovation Award" },
];

export default function ScrollPage() {
  const sections = [
    {
      title: "Welcome",
      id: "welcome",
      children: (
        <div className="flex flex-col justify-center">
          <h1>
            <div>Matt Wood</div>
            <div>Design Engineer, Austin, TX</div>
          </h1>
          <ul className="flex gap-2">
            <h2 className="sr-only">Clients</h2>
            {["jpmorgan", "nbc", "fmglobal", "dentsu", "bluenote"].map(
              (company) => (
                <li key={company}>{company}</li>
              ),
            )}
          </ul>
        </div>
      ),
    },
    {
      title: "Projects",
      id: "projects",
      children: (
        <HorizScrollSnapContainer containerClassName="h-full w-full">
          {projectData.map(({ client, metric }, index) => (
            <ProjectCard
              key={client}
              client={client}
              metric={metric}
              backgroundColor={index % 2 === 0 ? "red" : "blue"}
              illustrationUrl="https://placehold.co/600x400"
            />
          ))}
        </HorizScrollSnapContainer>
      ),
    },
    {
      title: "Contact",
      id: "contact",
      children: <div>Section 3</div>,
    },
  ];

  return <VerticalScrollSnapContainer sections={sections} />;
}
