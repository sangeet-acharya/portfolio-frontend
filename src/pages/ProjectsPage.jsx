import { useEffect, useState } from "react";
import { ProjectCard } from "../components/ProjectCard";
import { useFetch } from "../hooks/useFetch";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiFetch = useFetch();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await apiFetch("/projects");
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] text-white">
        <p className="text-gray-400">Chargement des projets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] text-red-400">
        <p>Erreur : {error}</p>
      </div>
    );
  }

  return (
    <main className="bg-[#0B0F19] text-white min-h-screen overflow-hidden">
      {/* HERO HEADER */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-6 py-28">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-blue-400 font-medium mb-4">Portfolio</p>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">My Projects</h1>

            <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
              A selection of my work — from frontend interfaces to fullstack
              applications, built with modern technologies and clean
              architecture.
            </p>
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

      {/* GRID SECTION */}
      <section className="pb-28 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default ProjectsPage;
