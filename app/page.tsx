import { ProjectCard } from "../components/scroll/project-card";
import { ScrollSnapContainer } from "../components/scroll/scroll-snap-container";

const CARD_WIDTH_UNIT = 20; // base unit in dvw/dvh
const CARD_WIDTH = `${100 - CARD_WIDTH_UNIT}dvw`; // 90dvw
const CARD_HEIGHT = `${100 - CARD_WIDTH_UNIT * 0.5}dvh`; // 90dvh
const CARD_GAP = `${CARD_WIDTH_UNIT * 2}dvw`; // 20dvw (gap is 10*2)
const CARD_MARGIN_LEFT = `${CARD_WIDTH_UNIT * 0.5}dvw`; // 4dvw (0.4 of 10)

const projectData = [
  { client: "Acme Corp", metric: "Revenue +25%" },
  { client: "Globex", metric: "Launch Success" },
  { client: "Initech", metric: "Uptime 99.99%" },
  { client: "Umbrella", metric: "Growth 3x" },
  { client: "Wayne Enterprises", metric: "ROI 200%" },
  { client: "Stark Industries", metric: "Innovation Award" },
];

export default function ScrollPage() {
  return (
    <div className="overflow-y-auto snap-y snap-mandatory h-[100dvh]">
      <section className="snap-start h-[100dvh] flex flex-col justify-center">
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
      </section>
      <section className="snap-start h-[100dvh] flex items-center justify-center">
        <ScrollSnapContainer
          className={`gap-[${CARD_GAP}] pr-[${CARD_MARGIN_LEFT}]`}
          containerClassName="h-full w-full"
          cardWidth={CARD_WIDTH}
          cardGap={CARD_GAP}
        >
          {projectData.map(({ client, metric }, index) => (
            <ProjectCard
              key={client}
              client={client}
              metric={metric}
              backgroundColor={index % 2 === 0 ? "red" : "blue"}
              width={CARD_WIDTH}
              height={CARD_HEIGHT}
              // marginLeft={CARD_MARGIN_LEFT}
            />
          ))}
        </ScrollSnapContainer>
      </section>
      <section className="snap-start h-[100dvh] flex items-center justify-center">
        Section 3
      </section>
    </div>
  );
}
