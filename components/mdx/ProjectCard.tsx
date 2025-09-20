import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  client?: string;
  href: string;
}

export default function ProjectCard({
  title,
  description,
  imageUrl,
  client,
  href,
}: ProjectCardProps) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg dark:hover:shadow-gray-900/50 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 group bg-white dark:bg-gray-900">
      {imageUrl && (
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
      )}

      <div className="p-6">
        {client && (
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wider">
            {client}
          </p>
        )}

        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {description}
        </p>

        <Link
          href={href}
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
        >
          View Project
          <span className="ml-1 group-hover:translate-x-1 transition-transform">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
