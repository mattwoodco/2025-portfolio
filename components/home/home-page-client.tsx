"use client";

import { motion } from "framer-motion";
import {
  BlueNoteRecordsLogo,
  DentsuLogo,
  FMGlobalLogo,
  JPMorganLogo,
  NBCUniversalLogo,
} from "@/components/home/company-logos";
import {
  EmailIcon,
  GitHubIcon,
  LinkedInIcon,
  XIcon,
} from "@/components/home/connect-icons";
import { HorizScrollSnapContainer } from "@/components/scroll/horiz-scroll-snap-container";
import { ProjectCard } from "@/components/scroll/project-card";
import { VerticalScrollSnapContainer } from "@/components/scroll/vertical-scroll-snap-container";
import { Badge } from "@/components/ui/badge";
import type { ProjectSummary } from "@/lib/projects";

// Animation variants (shared across sections)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.645, 0.045, 0.355, 1.0] as [number, number, number, number],
    },
  },
};

const badgeContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.645, 0.045, 0.355, 1.0] as [number, number, number, number],
    },
  },
};

type LogoCompany = {
  name: string;
  Logo: React.ComponentType<{ className?: string }>;
  className: string;
};

type WelcomeSectionProps = {
  companies: LogoCompany[];
};

function LogoBadges({ companies }: { companies: LogoCompany[] }) {
  return (
    <motion.div
      className="-mt-6 flex flex-wrap gap-3 md:gap-4"
      variants={badgeContainerVariants}
    >
      {companies.map((company, index) => (
        <motion.div key={company.name} variants={badgeVariants}>
          <Badge
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
        </motion.div>
      ))}
    </motion.div>
  );
}

function WelcomeSection({ companies }: WelcomeSectionProps) {
  return (
    <motion.div
      className="mx-auto max-w-6xl space-y-16 text-left md:space-y-24 px-[10vw] lg:px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="space-y-0">
        <motion.h1
          className="text-[10vh] text-white leading-none tracking-tightest lg:text-9xl font-serif"
          variants={itemVariants}
        >
          Matt Wood
        </motion.h1>
        <motion.p
          className="md:-mt-3 text-gray-400 font-mono text-sm md:pl-3 md:text-lg"
          variants={itemVariants}
        >
          Design Engineer | Austin TX
        </motion.p>
      </div>

      <LogoBadges companies={companies} />
    </motion.div>
  );
}

function ProjectsSection({ projects }: { projects: ProjectSummary[] }) {
  return (
    <HorizScrollSnapContainer containerClassName="h-full w-full">
      {projects.map((p, index) => (
        <ProjectCard
          key={p.slug}
          title={p.title}
          description={p.description}
          client={p.client}
          category={p.category}
          date={p.date}
          tags={p.tags}
          metric={p.metric}
          illustrationUrl={p.illustrationUrl || "https://placehold.co/600x400"}
          tabletIllustrationUrl={p.tabletIllustrationUrl}
          mobileIllustrationUrl={p.mobileIllustrationUrl}
          className="shadow-lg"
          style={{
            backgroundColor: [
              "#77606d", // 0
              "#bc6875", // 1
              "#f27a57", // 2
              "#ffa600", // 3
            ][index % 4],
          }}
          animationDelay={0.15}
        />
      ))}
    </HorizScrollSnapContainer>
  );
}

function ContactSection() {
  return (
    <div className="mx-auto max-w-6xl space-y-16 text-left px-[10vw] lg:px-4">
      <div className="space-y-0">
        <h1 className="text-[10vh] text-white leading-none tracking-tightest lg:text-9xl font-serif">
          Let's Connect
        </h1>
        <p className="md:-mt-3 text-gray-400 font-mono text-sm md:pl-3 md:text-lg">
          I'm always excited to work on new projects
        </p>
      </div>
      <div className="space-y-8">
        <div className="space-y-4 w-fit">
          <a
            href="https://www.linkedin.com/messaging/compose/?recipient=mattwoodco"
            className="flex items-center gap-4 text-white group transition-colors w-fit"
          >
            <span className="text-lg">LinkedIn</span>
            <span className="group-hover:underline text-gray-400">
              linkedin.com/in/mattwoodco
            </span>
          </a>
          <a
            href="mailto:hello@mattwood.co?subject=Hello%20from%20mattwood.co&body=Hi%20Matt,%0A%0AI%20found%20your%20portfolio%20and%20would%20love%20to%20connect!%0A%0A"
            className="flex items-center gap-4 text-white group transition-colors w-fit"
          >
            <span className="text-lg">Email</span>
            <span className="group-hover:underline text-gray-400">
              hello@mattwood.co
            </span>
          </a>
        </div>
        <div className="flex items-center gap-6 pt-4 md:hidden">
          <a
            href="https://linkedin.com/in/mattwoodco"
            className="transition-colors text-white hover:text-gray-300"
            aria-label="LinkedIn"
          >
            <LinkedInIcon className="h-6 w-6" />
          </a>
          <a
            href="mailto:hello@mattwood.co?subject=Hello%20from%20mattwood.co&body=Hi%20Matt,%0A%0AI%20found%20your%20portfolio%20and%20would%20love%20to%20connect!%0A%0A"
            className="transition-colors text-white hover:text-gray-300"
            aria-label="Email"
          >
            <EmailIcon className="h-6 w-6" />
          </a>
          <a
            href="https://twitter.com/mattwoodco"
            className="transition-colors text-white hover:text-gray-300"
            aria-label="Twitter"
          >
            <XIcon className="h-6 w-6" />
          </a>
          <a
            href="https://github.com/mattwoodco"
            className="transition-colors text-white hover:text-gray-300"
            aria-label="GitHub"
          >
            <GitHubIcon className="h-6 w-6" />
          </a>
        </div>
      </div>
    </div>
  );
}

type Props = {
  projects: ProjectSummary[];
};

export default function HomePageClient({ projects }: Props) {
  const logoCompanies: LogoCompany[] = [
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

  const sections = [
    {
      title: "Welcome",
      id: "welcome",
      foregroundColor: "#ffffff",
      children: <WelcomeSection companies={logoCompanies} />,
    },
    {
      title: "Projects",
      id: "projects",
      foregroundColor: "#ffffff",
      children: <ProjectsSection projects={projects} />,
    },
    {
      title: "Contact",
      id: "contact",
      foregroundColor: "#ffffff",
      children: <ContactSection />,
    },
  ];

  return <VerticalScrollSnapContainer sections={sections} />;
}
