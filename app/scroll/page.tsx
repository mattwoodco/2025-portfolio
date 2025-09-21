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
        <div className="flex overflow-x-auto snap-x snap-mandatory w-full gap-[20dvw]">
          {[
            { client: "foo", metric: "bar" },
            { client: "foo", metric: "bar" },
            { client: "foo", metric: "bar" },
            { client: "foo", metric: "bar" },
            { client: "foo", metric: "bar" },
            { client: "foo", metric: "bar" },
          ].map(({ client, metric }, index) => (
            <div
              className="w-[90dvw] h-[90dvh] flex-shrink-0 snap-center ml-[5dvw]"
              key={`${client}-${index}`}
            >
              <div
                className="size-full"
                style={{ background: `${index % 2 === 0 ? "red" : "blue"}` }}
              >
                <div>{client}</div>
                <div>{metric}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="snap-start h-[100dvh] flex items-center justify-center">
        Section 3
      </section>
    </div>
  );
}
