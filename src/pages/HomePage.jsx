import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ContactForm from "../components/ContactForm";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const HomePage = () => {
  return (
    <main className="bg-[#0B0F19] text-white min-h-screen overflow-hidden">
      {/* HERO */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-6 py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-blue-400 font-medium mb-4">
              Fullstack Developer
            </p>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Building modern{" "}
              <span className="text-blue-500">web experiences</span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl mb-8">
              I design and develop scalable, fast and modern web applications
              with clean UI and premium UX.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/projects"
                className="
                  bg-blue-500
                  hover:bg-blue-400
                  px-6 py-3
                  rounded-xl
                  font-medium
                  transition
                  hover:shadow-[0_0_30px_rgba(59,130,246,0.35)]
                "
              >
                View Projects
              </Link>

              <a
                href="#contact"
                className="
                  border border-gray-700
                  hover:border-blue-500
                  px-6 py-3
                  rounded-xl
                  text-gray-300
                  transition
                "
              >
                Contact Me
              </a>
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

      {/* ABOUT */}
      <section className="py-28 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-5xl mx-auto"
        >
          <p className="text-blue-400 mb-3">About</p>

          <h2 className="text-4xl font-bold mb-6">
            I build digital products that feel alive
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed">
            I specialize in modern web development using React, Tailwind,
            Node.js. My focus is on performance, UX and clean architecture.
          </p>
        </motion.div>
      </section>

      {/* SKILLS */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-4xl font-bold mb-12"
          >
            Tech Stack
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Frontend",
                items: ["React", "Tailwind", "TypeScript"],
              },
              {
                title: "Backend",
                items: ["Node.js", "Express"],
              },
              {
                title: "Database",
                items: ["MySQL", "MariaDB", "Prisma"],
              },
            ].map((block, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: i * 0.1 }}
                className="
                  bg-[#111827]
                  border border-gray-800
                  rounded-3xl
                  p-8
                  hover:border-blue-500/40
                  transition
                "
              >
                <h3 className="text-xl font-semibold mb-4">{block.title}</h3>

                <div className="flex flex-wrap gap-3">
                  {block.items.map((tech) => (
                    <span
                      key={tech}
                      className="bg-gray-800 px-4 py-2 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK CTA */}
      <section className="py-28 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="
            max-w-5xl mx-auto
            bg-[#111827]
            border border-gray-800
            rounded-3xl
            p-12
            text-center
          "
        >
          <h2 className="text-4xl font-bold mb-6">Want to see my work?</h2>

          <p className="text-gray-400 mb-8">
            Explore my projects built with modern technologies and clean UI.
          </p>

          <Link
            to="/projects"
            className="
              bg-blue-500
              hover:bg-blue-400
              px-8 py-4
              rounded-xl
              font-medium
              transition
              hover:shadow-[0_0_30px_rgba(59,130,246,0.35)]
              inline-block
            "
          >
            View All Projects
          </Link>
        </motion.div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-28 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-10">
            Let’s work together
          </h2>

          <ContactForm />
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-800 py-10">
        <div className="max-w-7xl mx-auto px-6 flex justify-between text-gray-500">
          <p>© 2026 Portfolio</p>

          <div className="flex gap-6">
            <a href="#">GitHub</a>
            <a href="#">LinkedIn</a>
            <a href="#">Twitter</a>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default HomePage;
