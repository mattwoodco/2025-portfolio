import HomePageClient from "@/components/home/home-page-client";
import { getAllProjectSummaries } from "@/lib/projects";

export default async function Page() {
  const projects = await getAllProjectSummaries();
  return <HomePageClient projects={projects} />;
}
