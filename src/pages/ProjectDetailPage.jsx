import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const ProjectDetailPage = () => {
  const { id } = useParams();
  const apiFetch = useFetch();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await apiFetch(`/projects/${id}`);
        setProject(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] text-gray-400">
        Chargement du projet...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] text-red-400">
        Erreur : {error}
      </div>
    );
  }

  if (!project) return null;

  return (
    <main className="bg-[#0B0F19] text-white min-h-screen">
      {/* HERO */}
      <section className="relative">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <p className="text-blue-400 mb-3">Project</p>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {project.title}
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed mb-10">
              {project.description}
            </p>

            {/* IMAGE */}
            {project.image_url && (
              <div className="rounded-3xl overflow-hidden border border-gray-800 mb-10">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full object-cover"
                />
              </div>
            )}

            {/* TECH STACK */}
            <div className="flex flex-wrap gap-3 mb-10">
              {project.tech_stack?.split(",").map((tech, i) => (
                <span
                  key={i}
                  className="
                    bg-gray-800
                    px-4 py-2
                    rounded-full
                    text-sm
                    text-gray-300
                  "
                >
                  {tech.trim()}
                </span>
              ))}
            </div>

            {/* LINKS */}
            <div className="flex gap-4 flex-wrap">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    bg-gray-800
                    hover:bg-gray-700
                    px-5 py-3
                    rounded-xl
                    transition
                  "
                >
                  GitHub
                </a>
              )}

              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    bg-blue-500
                    hover:bg-blue-400
                    px-5 py-3
                    rounded-xl
                    transition
                    hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]
                  "
                >
                  Live Demo
                </a>
              )}

              <Link
                to="/projects"
                className="
                  border border-gray-700
                  hover:border-blue-500
                  px-5 py-3
                  rounded-xl
                  transition
                  text-gray-300
                "
              >
                ← Back to Projects
              </Link>
            </div>
          </motion.div>
        </div>

        {/* GLOW */}
        <div
          className="
          absolute top-0 right-0
          w-[500px] h-[500px]
          bg-blue-500/10
          blur-[140px]
          rounded-full
        "
        />
      </section>
    </main>
  );
};

export default ProjectDetailPage;
