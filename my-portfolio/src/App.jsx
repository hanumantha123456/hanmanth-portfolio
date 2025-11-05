import React, { useEffect, useMemo, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ExternalLink,
  Code2,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Sun,
  Moon,
} from "lucide-react";
import { motion } from "framer-motion";

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
  { id: "resume", label: "Resume" },
];

const Section = ({ id, children }) => (
  <motion.section
    id={id}
    className="scroll-mt-24 py-20"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    {children}
  </motion.section>
);

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

const Card = ({ children }) => (
  <motion.div
    whileHover={{ y: -6, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 180, damping: 14 }}
    className="rounded-2xl border border-zinc-200 bg-white/70 p-6 shadow-lg backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/70"
  >
    {children}
  </motion.div>
);

const Tag = ({ children }) => (
  <span
    className="
      px-3 py-1 text-xs font-medium rounded-full
      bg-gradient-to-r from-zinc-900 to-zinc-700
      text-white shadow-sm
      hover:shadow-md hover:brightness-110
      transition-all duration-200
    "
  >
    {children}
  </span>
);



const useDarkMode = () => {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);
  return { dark, setDark };
};

const useTilt = () => {
  useEffect(() => {
    const card = document.querySelector(".tilt-card");
    if (!card) return;

    const strength = 20;

    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      card.style.transform = `rotateY(${x / strength}deg) rotateX(${-y / strength}deg)`;
    };

    const reset = () => {
      card.style.transform = `rotateY(0deg) rotateX(0deg)`;
    };

    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", reset);

    return () => {
      card.removeEventListener("mousemove", handleMove);
      card.removeEventListener("mouseleave", reset);
    };
  }, []);
};

export default function Portfolio() {
  useTilt();


  const { dark, setDark } = useDarkMode();
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        }),
      { threshold: 0.5 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Magnetic button effect
  useEffect(() => {
    const buttons = document.querySelectorAll(".magnetic");
    buttons.forEach((btn) => {
      const strength = 0.15;
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });
  }, []);

  const intro = useMemo(
    () => ({
      name: "Hanumantharaya",
      tagline: "Software Engineer | Web Developer",
      summary:
        "I am a Software Developer skilled in designing and building efficient, user-focused applications. I enjoy solving real problems, improving code quality, and collaborating with teams to deliver meaningful features. My goal is to grow as a full-stack engineer and contribute to products that make a difference.",
      email: "hraya0204@gmail.com",
      phone: "+91 89049 15708",
      github: "https://github.com/hanumantha123456",
      linkedin: "https://www.linkedin.com/in/hanumantharaya-contactMe",
      resumeUrl: "/resume.pdf",
      location: "Bengaluru, India",
    }),
    []
  );

  const skills = useMemo(
    () => [
      { title: "Frontend", items: ["HTML", "CSS", "JavaScript", "React.js", "Bootstrap"] },
      { title: "Backend", items: ["Node.js", "Express.js", "PHP", "Django", "REST APIs"] },
      { title: "Databases", items: ["MySQL", "MongoDB", "SQL"] },
      { title: "Programming", items: ["Java", "Python"] },
      { title: "Core CS", items: ["OOPS", "DBMS", "Operating Systems", "Computer Networks"] },
      { title: "Tools & Soft Skills", items: ["Git", "GitHub", "Leadership", "Teamwork", "Problem Solving", "Collaboration"] },
    ],
    []
  );

  const experience = useMemo(
    () => [
      {
        role: "Web Development Intern",
        company: "AYUD SOFTWARE",
        location: "Virtual (Raichur)",
        period: "Mar 2023 – Jun 2023",
        bullets: [
          "Designed and developed an e-learning platform to enhance engagement and streamline content delivery.",
          "Worked across HTML, CSS, Bootstrap, JavaScript, Python (Django), SQL, and Git/GitHub.",
        ],
      },
    ],
    []
  );

  const projects = useMemo(
    () => [
      {
        name: "Healthcare Emergency Assistance System",
        stack: ["Java", "Spring Boot", "Spring Security", "MySQL", "JWT", "React"],
        desc:
          "Fullstack Project: Built a responsive healthcare dashboard with hospital search, appointment booking, emergency workflows, and role-based UI screens integrated via REST APIs.",
        links: [
      { label: "Live", href: "https://your-live-site-link.com" },
      { label: "GitHub", href: "https://github.com/your-repo" }
    ]
      
        },
      {
        name: "Civic Voice – Civic Problem Reporting Platform",
        stack: ["HTML", "CSS", "JavaScript", "Bootstrap", "PHP", "SQL", "Google Maps API"],
        desc:
          "Users can register civic complaints with location tracking, backed by scalable data management and dashboards.",
          links: [
      { label: "Live", href: "https://your-live-site-link.com" },
      { label: "GitHub", href: "https://github.com/hanumantha123456/CivicVoice" }
    ]
      },
      {
        name: "Personal Portfolio Website",
        stack: ["React.js", "Tailwind CSS", "JavaScript"],
        desc: "Modern and responsive portfolio website highlighting my projects, skills, and professional background.",
        links: [
      { label: "Live", href: "https://hanumantharaya-portfolio.netlify.app/" },
      { label: "GitHub", href: "https://github.com/hanumantha123456/Hanmanth-portfolio" }
    ]
      },
    ],
    []
  );

  const education = useMemo(
    () => [
      { school: "New Horizon College of Engineering, Bengaluru", degree: "B.E. in Information Science and Engineering", period: "2022 – 2026 (Pursuing)", meta: "CGPA: 7.49" },
      { school: "Government Polytechnic, Raichur", degree: "Diploma in Computer Science", period: "2020 – 2023", meta: "CGPA: 8.45" },
      { school: "Karnataka Public School, Matamari", degree: "SSLC (KSEEB)", period: "2019 – 2020", meta: "Percentage: 86.24%" },
    ],
    []
  );

  const spring = { type: "spring", damping: 20, stiffness: 200 };

  return (
    <div className="min-h-screen bg-white text-zinc-900 antialiased transition-colors dark:bg-zinc-950 dark:text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-zinc-200 backdrop-blur dark:border-zinc-800">
        <Container className="flex items-center justify-between py-3">
          <a href="#home" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
              <span className="text-sm font-bold">HN</span>
            </div>
            <span className="text-sm font-semibold tracking-wide">Hanumantharaya</span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
            <a
  key={n.id}
  href={`#${n.id}`}
  className={`
    group relative px-3 py-2 text-sm font-medium transition-all
    ${active === n.id
      ? "text-white bg-zinc-900 dark:bg-white dark:text-zinc-900 rounded-full"
      : "text-zinc-600 dark:text-zinc-400 hover:text-white dark:hover:text-white hover:bg-zinc-800/40 dark:hover:bg-white/10 rounded-full"
    }
  `}
>
  {n.label}
  <span
    className={`
      pointer-events-none absolute left-1/2 top-[115%] h-[2px] w-0 bg-zinc-900 dark:bg-white transition-all duration-300 ease-out
      group-hover:left-0 group-hover:w-full
      ${active === n.id ? "left-0 w-full" : ""}
    `}
  />
</a>


            ))}
          </nav>

          <button
            onClick={() => setDark((d) => !d)}
            className="rounded-full border border-zinc-200 p-2 hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </Container>
      </header>

      {/* Hero */}
      <Section id="home">
        <Container>
          <div className="grid items-center gap-8 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={spring}>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{intro.name}</h1>
              <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-300">{intro.tagline}</p>
              <p className="mt-6 max-w-2xl text-zinc-700 dark:text-zinc-300">{intro.summary}</p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href={intro.github} target="_blank" rel="noreferrer" className="magnetic inline-flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm transition-all hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900">
                  <Github size={16} /> GitHub
                </a>
                <a href={intro.linkedin} target="_blank" rel="noreferrer" className="magnetic inline-flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm transition-all hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900">
                  <Linkedin size={16} /> LinkedIn
                </a>
                <a href={`mailto:${intro.email}`} className="magnetic inline-flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm transition-all hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900">
                  <Mail size={16} /> Email
                </a>
                <a href={intro.resumeUrl} className="magnetic inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-sm text-white transition-all hover:opacity-90 dark:bg-white dark:text-zinc-900">
                  <Download size={16} /> Resume
                </a>
              </div>
            </motion.div>

            <motion.div
  initial={{ opacity: 0, scale: 0.92 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={spring}
  className="mx-auto relative flex flex-col items-center"
>
  {/* Floating Blob Glow */}
  <motion.div
    className="absolute h-56 w-56 rounded-full bg-gradient-to-r from-purple-500/40 to-blue-400/40 blur-[90px] -z-10"
    animate={{
      scale: [1, 1.25, 1],
      opacity: [0.5, 0.95, 0.5],
      x: [-15, 15, -15],
      y: [-10, 10, -10]
    }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
  />

  {/* Profile Image */}
  <div className="relative h-56 w-56 rounded-3xl overflow-hidden border border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.12)] backdrop-blur-2xl">
  <img
    src="/me.jpg"
    alt="Profile"
    className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-105"
  />
</div>



  <p className="mt-3 text-center text-sm text-zinc-500 dark:text-zinc-400">
    {intro.location}
  </p>
</motion.div>

          </div>
        </Container>
      </Section>

      {/* About */}
      <Section id="about">
        <Container>
          <div className="mb-6 flex items-center gap-2">
            <Code2 className="text-zinc-400" size={18} />
            <h2 className="text-xl font-semibold">About</h2>
          </div>
          <Card>
            <p className="text-zinc-700 dark:text-zinc-300">
              I focus on building efficient and user-friendly web applications with clean and maintainable code. I enjoy collaborating with teams, improving performance, and learning quickly by working on real features. My goal is to contribute as a full-stack developer and grow into a reliable software engineer.
            </p>
          </Card>
        </Container>
      </Section>

      {/* Skills */}
      <Section id="skills">
        <Container>
          <div className="mb-6 flex items-center gap-2">
            <FolderGit2 className="text-zinc-400" size={18} />
            <h2 className="text-xl font-semibold">Skills</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((group) => (
              <Card key={group.title}>
                <h3 className="mb-3 text-sm font-semibold tracking-wide text-zinc-500 dark:text-zinc-400">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <Tag key={skill}>{skill}</Tag>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Projects */}
<Section id="projects">
  <Container>
    <div className="mb-6 flex items-center gap-2">
      <FolderGit2 className="text-zinc-400" size={18} />
      <h2 className="text-xl font-semibold">Projects</h2>
    </div>

    <div className="grid gap-4 md:grid-cols-2">
      {projects.map((project) => (
        <Card key={project.name}>
          <h3 className="text-lg font-semibold">{project.name}</h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{project.desc}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>

          {/* ✅ Show Live/GitHub buttons only if links exist */}
          {project.links?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-3">
              {project.links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-purple-600 hover:underline dark:text-purple-400"
                >
                  <ExternalLink size={14} /> {link.label}
                </a>
              ))}
            </div>
          )}
        </Card>
      ))}
    </div>
  </Container>
</Section>


      {/* Experience */}
      <Section id="experience">
        <Container>
          <div className="mb-6 flex items-center gap-2">
            <Briefcase className="text-zinc-400" size={18} />
            <h2 className="text-xl font-semibold">Experience</h2>
          </div>
          <div className="space-y-4">
            {experience.map((job, i) => (
              <Card key={i}>
                <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                  <div>
                    <h3 className="text-base font-semibold">
                      {job.role} · {job.company}
                    </h3>
                    <p className="text-sm text-zinc-500">{job.location}</p>
                  </div>
                  <div className="text-sm text-zinc-500">{job.period}</div>
                </div>
                <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                  {job.bullets.map((point, j) => (
                    <li key={j}>{point}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Education */}
      <Section id="education">
        <Container>
          <div className="mb-6 flex items-center gap-2">
            <GraduationCap className="text-zinc-400" size={18} />
            <h2 className="text-xl font-semibold">Education</h2>
          </div>
          <div className="space-y-4">
            {education.map((item, i) => (
              <Card key={i}>
                <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                  <div>
                    <h3 className="text-base font-semibold">{item.school}</h3>
                    <p className="text-sm text-zinc-500">{item.degree}</p>
                  </div>
                  <div className="text-right text-sm text-zinc-500">
                    <p>{item.period}</p>
                    <p>{item.meta}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Contact */}
      <Section id="contact">
        <Container>
          <div className="mb-6 flex items-center gap-2">
            <Mail className="text-zinc-400" size={18} />
            <h2 className="text-xl font-semibold">Contact</h2>
          </div>
          <Card>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-zinc-500">Open to roles and collaborations</p>
                <h3 className="text-lg font-semibold">Let’s build something valuable</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={`mailto:${intro.email}`} className="magnetic inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-sm text-white transition-all hover:opacity-90 dark:bg-white dark:text-zinc-900">
                  <Mail size={16} /> Email Me
                </a>
                <a href={intro.linkedin} target="_blank" rel="noreferrer" className="magnetic inline-flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm transition-all hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900">
                  <Linkedin size={16} /> Connect
                </a>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      {/* Resume */}
      <Section id="resume">
        <Container>
          <div className="mb-6 flex items-center gap-2">
            <Download className="text-zinc-400" size={18} />
            <h2 className="text-xl font-semibold">Resume</h2>
          </div>
          <Card>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              View or download my resume below.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={intro.resumeUrl} className="magnetic inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-sm text-white transition-all hover:opacity-90 dark:bg-white dark:text-zinc-900">
                <Download size={16} /> Download Resume
              </a>
            </div>
          </Card>
        </Container>
      </Section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-10 text-sm text-zinc-500 dark:border-zinc-800">
        <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p>© {new Date().getFullYear()} {intro.name}. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a href={intro.github} target="_blank" rel="noreferrer" className="hover:underline inline-flex items-center gap-2">
              <Github size={16} /> GitHub
            </a>
            <a href={intro.linkedin} target="_blank" rel="noreferrer" className="hover:underline inline-flex items-center gap-2">
              <Linkedin size={16} /> LinkedIn
            </a>
            <a href={`mailto:${intro.email}`} className="hover:underline inline-flex items-center gap-2">
              <Mail size={16} /> Email
            </a>
          </div>
        </Container>
      </footer>
    </div>
  );
}
