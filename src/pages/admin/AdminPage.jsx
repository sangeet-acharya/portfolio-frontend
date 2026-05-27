import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { toast } from "sonner";

const AdminPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const apiFetch = useFetch();

  const handleDelete = async (projectId, projectTitle) => {
    const isConfirmed = window.confirm(
      "Supprimer le projet : " + projectTitle + " ?",
    );

    if (isConfirmed) {
      try {
        await apiFetch("/projects/" + projectId, {
          method: "DELETE",
        });

        toast.success("Projet supprimé");

        setProjects((prev) =>
          prev.filter((project) => project.id !== projectId),
        );
      } catch (error) {
        toast.error(error.message);
        setError(error.message);
      }
    }
  };

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
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center text-gray-400">
        Chargement du dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center text-red-400">
        Erreur : {error}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0F19] text-white">
      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>

          <p className="text-gray-400">Gestion de tes projets</p>

          <Link
            to="/admin/projects/new"
            className="
              inline-block
              mt-6
              bg-blue-500
              hover:bg-blue-400
              px-5
              py-3
              rounded-xl
              transition
              hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]
            "
          >
            + Créer un projet
          </Link>
        </div>

        {/* LIST */}
        <div className="space-y-4">
          {projects.length === 0 && (
            <div className="text-gray-500">Aucun projet trouvé.</div>
          )}

          {projects.map((project) => (
            <div
              key={project.id}
              className="
                flex
                items-center
                justify-between
                bg-[#111827]
                border border-gray-800
                rounded-2xl
                p-5
              "
            >
              {/* INFO */}
              <div>
                <h2 className="text-lg font-semibold">{project.title}</h2>

                <p className="text-gray-400 text-sm">ID: {project.id}</p>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    navigate("/admin/projects/" + project.id + "/edit")
                  }
                  className="
                    px-4 py-2
                    rounded-xl
                    bg-gray-800
                    hover:bg-gray-700
                    transition
                  "
                >
                  Modifier
                </button>

                <button
                  onClick={() => handleDelete(project.id, project.title)}
                  className="
                    px-4 py-2
                    rounded-xl
                    bg-red-500/10
                    text-red-400
                    hover:bg-red-500/20
                    transition
                  "
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default AdminPage;
