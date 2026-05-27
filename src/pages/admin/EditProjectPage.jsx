import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const EditProjectPage = () => {
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const { id } = useParams();
  const apiFetch = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await apiFetch("/projects/" + id);

        reset({
          title: data.title,
          description: data.description,
          tech_stack: data.tech_stack,
          github_url: data.github_url,
          demo_url: data.demo_url,
          image_url: data.image_url,
        });
      } catch (error) {
        setErr(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, []);

  const updateProject = async (data) => {
    try {
      const result = await apiFetch("/projects/" + id, {
        method: "PUT",
        body: JSON.stringify(data),
      });

      if (result?.validationErrors) {
        result.validationErrors.forEach((validationError) => {
          setError(validationError.path, {
            message: validationError.msg,
          });
        });
        return;
      }

      toast.success("Projet mis à jour !");
      navigate("/admin");
    } catch (error) {
      setErr(error.message);
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center text-gray-400">
        Chargement du projet...
      </div>
    );
  }

  if (err) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center text-red-400">
        Erreur : {err}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0F19] text-white">
      <div className="max-w-3xl mx-auto px-6 py-24">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Modifier le projet</h1>
          <p className="text-gray-400 mt-2">ID: {id}</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(updateProject)} className="space-y-6">
          {/* TITLE */}
          <div>
            <label className="text-sm text-gray-400">Titre</label>
            <input
              type="text"
              className="
                w-full
                mt-2
                p-3
                rounded-xl
                bg-[#111827]
                border border-gray-800
                focus:border-blue-500
                outline-none
              "
              {...register("title", {
                required: "Titre requis",
                minLength: {
                  value: 2,
                  message: "Minimum 2 caractères",
                },
                maxLength: {
                  value: 150,
                  message: "Max 150 caractères",
                },
              })}
            />
            {errors.title && (
              <p className="text-red-400 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm text-gray-400">Description</label>
            <textarea
              rows="5"
              className="
                w-full
                mt-2
                p-3
                rounded-xl
                bg-[#111827]
                border border-gray-800
                focus:border-blue-500
                outline-none
              "
              {...register("description")}
            />
            {errors.description && (
              <p className="text-red-400 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* STACK */}
          <input
            placeholder="Tech stack"
            className="
              w-full
              p-3
              rounded-xl
              bg-[#111827]
              border border-gray-800
              focus:border-blue-500
              outline-none
            "
            {...register("tech_stack")}
          />

          {/* URLS */}
          {["github_url", "demo_url", "image_url"].map((field) => (
            <input
              key={field}
              placeholder={field}
              className="
                w-full
                p-3
                rounded-xl
                bg-[#111827]
                border border-gray-800
                focus:border-blue-500
                outline-none
              "
              {...register(field)}
            />
          ))}

          {/* BUTTON */}
          <button
            type="submit"
            className="
              w-full
              bg-blue-500
              hover:bg-blue-400
              py-3
              rounded-xl
              font-medium
              transition
              hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]
            "
          >
            Mettre à jour
          </button>
        </form>
      </div>
    </main>
  );
};

export default EditProjectPage;
