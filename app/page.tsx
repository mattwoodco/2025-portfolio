import {
  BlueNoteRecordsLogo,
  DentsuLogo,
  FMGlobalLogo,
  JPMorganLogo,
  NBCUniversalLogo,
} from "../components/company-logos";
import { HorizScrollSnapContainer } from "../components/scroll/horiz-scroll-snap-container";
import { ProjectCard } from "../components/scroll/project-card";
import { VerticalScrollSnapContainer } from "../components/scroll/vertical-scroll-snap-container";
import { Badge } from "../components/ui/badge";

const projectData = [
  { client: "Acme Corp", metric: "Revenue +25%" },
  { client: "Globex", metric: "Launch Success" },
  { client: "Initech", metric: "Uptime 99.99%" },
  { client: "Umbrella", metric: "Growth 3x" },
  { client: "Wayne Enterprises", metric: "ROI 200%" },
  { client: "Stark Industries", metric: "Innovation Award" },
];

const companies = [
  {
    name: "JPMorgan",
    Logo: JPMorganLogo,
    className: "h-6 md:h-10 w-auto text-white relative top-0.5",
  },
  {
    name: "NBCUniversal",
    Logo: NBCUniversalLogo,
    className: "h-3 md:h-5 w-auto text-white",
  },
  {
    name: "FMGlobal",
    Logo: FMGlobalLogo,
    className: "h-3 md:h-5 w-auto text-white",
  },
  {
    name: "Dentsu",
    Logo: DentsuLogo,
    className: "h-3 md:h-5 w-auto text-white",
  },
  {
    name: "Blue Note Records",
    Logo: BlueNoteRecordsLogo,
    className: "h-4 md:h-6 w-auto text-white",
  },
];

export default function ScrollPage() {
  const sections = [
    {
      title: "Welcome",
      id: "welcome",
      children: (
        <div className="mx-auto max-w-6xl space-y-16 text-left md:space-y-24 px-4">
          {/* Hero Title and Subtitle */}
          <div className="space-y-0">
            <h1 className="text-6xl text-white leading-none tracking-tightest md:text-9xl font-serif">
              Matt Wood
            </h1>
            <p className="md:-mt-3 text-gray-400 font-mono text-sm md:pl-3 md:text-lg">
              Design Engineer, Austin, TX
            </p>
          </div>

          {/* Company Logos */}
          <div className="-mt-6 flex flex-wrap gap-3 md:gap-4">
            {companies.map((company, index) => (
              <Badge
                key={company.name}
                className="flex h-20 items-center gap-1 border-0 px-5 py-4 text-white backdrop-blur-sm transition-all duration-500 hover:bg-white/20 max-sm:h-10 md:gap-3 md:px-10 md:py-4 rounded-full"
                style={{
                  backgroundColor: `rgba(255, 255, 255, ${0.12 - index * 0.02})`,
                }}
              >
                <div className="flex flex-shrink-0">
                  <company.Logo className={company.className} />
                </div>
                <span className="sr-only">{company.name}</span>
              </Badge>
            ))}
          </div>
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
