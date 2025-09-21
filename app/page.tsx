"use client";

import { motion } from "framer-motion";
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
        delayChildren: 0.5,
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

  const sections = [
    {
      title: "Welcome",
      id: "welcome",
      children: (
        <motion.div
          className="mx-auto max-w-6xl space-y-16 text-left md:space-y-24 px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Title and Subtitle */}
          <div className="space-y-0">
            <motion.h1
              className="text-6xl text-white leading-none tracking-tightest md:text-9xl font-serif"
              variants={itemVariants}
            >
              Matt Wood
            </motion.h1>
            <motion.p
              className="md:-mt-3 text-gray-400 font-mono text-sm md:pl-3 md:text-lg"
              variants={itemVariants}
            >
              Product Designer & Engineer | Austin TX
            </motion.p>
          </div>

          {/* Company Logos */}
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
        </motion.div>
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
              animationDelay={0.15}
            />
          ))}
        </HorizScrollSnapContainer>
      ),
    },
    {
      title: "Contact",
      id: "contact",
      children: (
        <div className="mx-auto max-w-6xl space-y-16 text-left px-4">
          <div className="space-y-1">
            <h2 className="text-5xl text-white font-serif md:text-7xl">
              Let's Connect
            </h2>
            <p className="text-gray-400 text-lg md:text-xl">
              I'm always excited to work on new projects
            </p>
          </div>
          <div className="space-y-4">
            <a
              href="https://www.linkedin.com/messaging/compose/?recipient=mattwoodco"
              className="flex items-center gap-4 text-white group transition-colors"
            >
              <span className="text-lg">LinkedIn</span>

              <span className="group-hover:underline text-gray-400">
                linkedin.com/in/mattwoodco
              </span>
            </a>
            <a
              href="mailto:hello@mattwood.co?subject=Hello%20from%20mattwood.co&body=Hi%20Matt,%0A%0AI%20found%20your%20portfolio%20and%20would%20love%20to%20connect!%0A%0A"
              className="flex items-center gap-4 text-white group transition-colors"
            >
              <span className="text-lg">Email</span>
              <span className="group-hover:underline text-gray-400">
                hello@mattwood.co
              </span>
            </a>
          </div>
        </div>
      ),
    },
  ];

  return <VerticalScrollSnapContainer sections={sections} />;
}
