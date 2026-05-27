import React from "react";
import { Link } from "react-router-dom";

export const ProjectCard = ({ project }) => {
  return (
    <article
      className="
        bg-[#111827]
        border border-gray-800
        rounded-3xl
        overflow-hidden
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-blue-500/40
        hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]
      "
    >
      {/* IMAGE */}
      {project.image_url && (
        <div className="overflow-hidden">
          <img
            src={project.image_url}
            alt={project.title}
            loading="lazy"
            className="
              w-full
              h-56
              object-cover
              transition-transform
              duration-500
              hover:scale-105
            "
          />
        </div>
      )}

      {/* CONTENT */}
      <div className="p-6">
        {/* TITLE */}
        <h2 className="text-xl font-bold text-white mb-3">{project.title}</h2>

        {/* DESCRIPTION */}
        <p className="text-gray-400 text-sm mb-5 leading-relaxed">
          {project.description}
        </p>

        {/* TECH STACK */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech_stack?.split(",").map((tech, index) => (
            <span
              key={index}
              className="
                text-xs
                px-3
                py-1
                rounded-full
                bg-gray-800
                text-gray-300
              "
            >
              {tech.trim()}
            </span>
          ))}
        </div>

        {/* LINKS */}
        <div className="flex flex-col gap-2 mb-6 text-sm">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-gray-400
                hover:text-blue-400
                transition-colors
              "
            >
              GitHub → {project.github_url}
            </a>
          )}

          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-gray-400
                hover:text-blue-400
                transition-colors
              "
            >
              Demo → {project.demo_url}
            </a>
          )}
        </div>

        {/* BUTTON */}
        <Link
          to={`/projects/${project.id}`}
          className="
            inline-block
            text-blue-400
            hover:text-blue-300
            font-medium
            transition-colors
          "
        >
          Voir plus →
        </Link>
      </div>
    </article>
  );
};
