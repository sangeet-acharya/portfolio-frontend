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
      "Voulez-vous supprimer ce projet " + projectTitle + " ?",
    );

    if (isConfirmed) {
      try {
        await apiFetch("/projects/" + projectId, {
          method: "DELETE",
        });
        toast.success("Projet supprimé");
        setProjects(projects.filter((project) => project.id !== projectId));
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

  if (loading) return <p>"Chargement en cours"</p>;
  if (error) return <p>{"Erreur en cours : " + error}</p>;

  return (
    <div>
      <h1>Dashboard ADMIN : Liste de mes projets</h1>
      <Link to={"/admin/projects/new"}>Créer un Projet</Link>

      {projects.map((project) => (
        <div key={project.id}>
          <h2>
            {project.title} avec id {project.id}
          </h2>

          <button
            onClick={() => navigate("/admin/projects/" + project.id + "/edit")}
          >
            Modifier
          </button>

          <button onClick={() => handleDelete(project.id, project.title)}>
            Supprimer
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminPage;
