import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useFetch } from "../../hooks/useFetch";

const CreateProjectPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const apiFetch = useFetch();

  const createProject = async (data) => {
    try {
      setLoading(true);

      const response = await apiFetch("/projects", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response?.validationErrors) {
        response.validationErrors.forEach((validationError) => {
          setError(validationError.path, {
            message: validationError.msg,
          });
        });
        return;
      }

      toast.success("Projet créé avec succès");
      navigate("/admin");
    } catch (error) {
      setErr(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center text-gray-400">
        Création du projet...
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
          <h1 className="text-4xl font-bold">Créer un projet</h1>
          <p className="text-gray-400 mt-2">
            Ajoute un nouveau projet à ton portfolio
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(createProject)} className="space-y-6">
          {/* TITLE */}
          <div>
            <label className="text-sm text-gray-400">Titre</label>
            <input
              className="
                w-full mt-2 p-3
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
                  message: "Min 2 caractères",
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
                w-full mt-2 p-3
                rounded-xl
                bg-[#111827]
                border border-gray-800
                focus:border-blue-500
                outline-none
              "
              {...register("description", {
                maxLength: {
                  value: 2000,
                  message: "Max 2000 caractères",
                },
              })}
            />
            {errors.description && (
              <p className="text-red-400 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* TECH STACK */}
          <div>
            <label className="text-sm text-gray-400">Stack</label>
            <input
              className="
                w-full mt-2 p-3
                rounded-xl
                bg-[#111827]
                border border-gray-800
                focus:border-blue-500
                outline-none
              "
              {...register("tech_stack")}
            />
          </div>

          {/* URLS */}
          {["github_url", "demo_url", "image_url"].map((field) => (
            <div key={field}>
              <label className="text-sm text-gray-400">{field}</label>
              <input
                className="
                  w-full mt-2 p-3
                  rounded-xl
                  bg-[#111827]
                  border border-gray-800
                  focus:border-blue-500
                  outline-none
                "
                {...register(field, {
                  validate: (value) =>
                    !value || value.startsWith("https://") || "URL invalide",
                })}
              />
              {errors[field] && (
                <p className="text-red-400 text-sm mt-1">
                  {errors[field].message}
                </p>
              )}
            </div>
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
            Créer le projet
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateProjectPage;
