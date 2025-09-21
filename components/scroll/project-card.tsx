import Image from "next/image";

interface ProjectCardProps {
  client: string;
  metric: string;
  backgroundColor: string;
  illustrationUrl: string;
}

export function ProjectCard({
  client,
  metric,
  backgroundColor,
  illustrationUrl = "https://placehold.co/600x400",
}: ProjectCardProps) {
  return (
    <div className="flex-shrink-0 snap-center w-full h-full p-10">
      <div
        className="size-full flex flex-col justify-center items-center text-white font-semibold"
        style={{ background: backgroundColor }}
      >
        <div className="text-2xl">{client}</div>
        <div className="text-lg opacity-90">{metric}</div>
        <Image src={illustrationUrl} alt={client} width={100} height={100} />
      </div>
    </div>
  );
}
