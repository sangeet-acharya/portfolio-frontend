import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

const ProjectDetailPage = () => {
  const { id } = useParams();

  const apiFetch = useFetch();

  const [project, setProject] = useState();
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

  if (loading) return <p>Chargement en cours</p>;
  if (error) return <p>{"Erreur en cours : " + error}</p>;
  return (
    <>
      <div>ProjectPageDetails</div>
      <p>{id}</p>
    </>
  );
};

export default ProjectDetailPage;
