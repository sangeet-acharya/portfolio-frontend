import { useForm } from "react-hook-form";
import { useFetch } from "../hooks/useFetch";
import { toast } from "sonner";
import { useState } from "react";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const apiFetch = useFetch();

  const sendMessage = async (data) => {
    try {
      setLoading(true);
      const result = await apiFetch("/contact", {
        method: "POST",
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

      toast.success(result.message);
      reset();
    } catch (error) {
      setErr(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div
          className="
            bg-[#111827]
            border border-gray-800
            rounded-3xl
            p-8 md:p-12
            shadow-2xl
          "
        >
          <div className="mb-10">
            <h2 className="text-4xl font-bold text-white mb-3">Contact Me</h2>

            <p className="text-gray-400">
              Let’s build something modern together.
            </p>
          </div>

          <form onSubmit={handleSubmit(sendMessage)} className="space-y-6">
            {/* NAME */}
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm text-gray-300"
              >
                Your Name
              </label>

              <input
                type="text"
                id="name"
                placeholder="John Doe"
                className="
                  w-full
                  bg-[#0B0F19]
                  border border-gray-700
                  rounded-xl
                  px-4 py-3
                  text-white
                  outline-none
                  transition-all
                  duration-300
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/20
                "
                {...register("name", {
                  required: "Le champ nom est requis",
                  minLength: {
                    value: 2,
                    message: "Min 2",
                  },
                })}
              />

              {errors.name && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm text-gray-300"
              >
                Your Email
              </label>

              <input
                type="email"
                id="email"
                placeholder="john@example.com"
                className="
                  w-full
                  bg-[#0B0F19]
                  border border-gray-700
                  rounded-xl
                  px-4 py-3
                  text-white
                  outline-none
                  transition-all
                  duration-300
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/20
                "
                {...register("email", {
                  required: "Le champ email est requis",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Le format de l'email saisi n'est pas conforme",
                  },
                })}
              />

              {errors.email && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>
            {/* SUBJECT */}
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-sm text-gray-300"
              >
                Subject
              </label>

              <input
                type="text"
                id="subject"
                placeholder="summary"
                className="
                w-full 
                bg-[#0B0F19] 
                border border-gray-700 
                rounded-xl 
                px-4 py-3 
                text-white 
                outline-none 
                transition-all duration-300 
                focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                {...register("subject", {
                  required: "Le champ subject est requis",
                  minLength: {
                    value: 3,
                    message: "Min 3",
                  },
                })}
              />

              {errors.subject && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.subject.message}
                </p>
              )}
            </div>
            {/* MESSAGE */}
            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm text-gray-300"
              >
                Message
              </label>

              <textarea
                id="message"
                rows="6"
                placeholder="Tell me about your project..."
                className="
                  w-full
                  bg-[#0B0F19]
                  border border-gray-700
                  rounded-xl
                  px-4 py-3
                  text-white
                  outline-none
                  resize-none
                  transition-all
                  duration-300
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/20
                "
                {...register("message", {
                  required: "Le champ message est requis",
                  minLength: {
                    value: 10,
                    message: "Min 10",
                  },
                })}
              />

              {errors.message && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* ERROR */}
            {err && <p className="text-red-400">{err}</p>}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-blue-500
                hover:bg-blue-400
                text-white
                font-medium
                py-4
                rounded-xl
                transition-all
                duration-300
                hover:shadow-[0_0_30px_rgba(59,130,246,0.35)]
                disabled:opacity-50
              "
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
