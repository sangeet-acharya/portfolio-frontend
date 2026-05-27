import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch.js";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext.js";
import { motion } from "framer-motion";

const LoginPage = () => {
  const navigate = useNavigate();
  const apiFetch = useFetch();
  const { login } = useContext(AuthContext);

  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const onSubmit = async (formData) => {
    try {
      setApiError("");

      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      login(data.token);
      navigate("/admin");
    } catch (error) {
      setApiError(error.message);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0B0F19] text-white px-6">
      {/* BACKGROUND GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-blue-500/10 blur-[140px] rounded-full top-10 right-10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
          w-full max-w-md
          bg-[#111827]
          border border-gray-800
          rounded-3xl
          p-10
          shadow-xl
        "
      >
        <h1 className="text-3xl font-bold mb-2">Welcome back</h1>

        <p className="text-gray-400 mb-6">Sign in to access your dashboard</p>

        {/* ERROR API */}
        {apiError && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg mb-4">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="
                w-full mt-1
                bg-gray-900
                border border-gray-800
                rounded-xl
                px-4 py-3
                outline-none
                focus:border-blue-500
                transition
              "
              {...register("email", {
                required: "Email requis",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Email invalide",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-400">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="
                w-full mt-1
                bg-gray-900
                border border-gray-800
                rounded-xl
                px-4 py-3
                outline-none
                focus:border-blue-500
                transition
              "
              {...register("password", {
                required: "Mot de passe requis",
              })}
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

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
              hover:shadow-[0_0_25px_rgba(59,130,246,0.35)]
            "
          >
            Sign in
          </button>
        </form>
      </motion.div>
    </main>
  );
};

export default LoginPage;
