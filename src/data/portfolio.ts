export const profile = {
  name: "Divesh Jadhav",
  first: "Divesh",
  role: "Software Development Engineer",
  location: "Nashik · Maharashtra, India",
  email: "diveshjadhav72@gmail.com",
  phone: "+91 97638 52589",
  linkedin: "https://linkedin.com/in/diveshjadhav8766",
  github: "https://github.com/DiveshJ8766",
  resume: "https://drive.google.com/file/d/1J5T7d0PWS-Sd9xdbgL92MpXlkQtXktRU/view?usp=sharing",
  summary:
    "Software Development Engineer with 3+ years of experience building and delivering scalable, production-grade products across complex business domains. I take ownership of initiatives, translate messy requirements into reliable software, and drive projects from first sketch to shipped.",
  roles: ["Frontend Architect", "React.js Engineer", "Design-System Builder", "Performance Nerd"],
}

export const stats = [
  { value: 3, suffix: "+", label: "Years shipping production React" },
  { value: 3, suffix: "", label: "Companies & enterprise clients" },
  { value: 70, suffix: "%", label: "Faster initial page load" },
  { value: 9.32, suffix: "", label: "B.E. SGPA", decimals: 2 },
]

export type Experience = {
  id: string
  company: string
  client?: string
  role: string
  period: string
  current?: boolean
  blurb: string
  points: string[]
  metrics: { value: string; label: string }[]
  stack: string[]
}

export const experience: Experience[] = [
  {
    id: "zoca",
    company: "Zoca AI",
    role: "Software Development Engineer",
    period: "Apr 2026 — Present",
    current: true,
    blurb:
      "Building ZocaWeb from scratch — owning frontend architecture, the design system, payments and release quality.",
    points: [
      "Built the ZocaWeb application from scratch in React.js, owning frontend architecture, the design system, and release quality.",
      "Authored custom Claude AI skills for the Zoca design system, design patterns, FTUX and PR review — so generated code follows team conventions.",
      "Integrated Stripe Terminal S710 and Bluetooth card readers into an end-to-end checkout with in-person card and Tap to Pay.",
      "Shipped a waitlist that lets clients join instantly and providers fill open calendar slots.",
      "Built a form builder for client intake forms (allergies & more) and reusable service templates.",
    ],
    metrics: [
      { value: "40%", label: "faster feature dev with AI skills" },
      { value: "35%", label: "more bookings via waitlist" },
      { value: "80%", label: "fewer idle appointment slots" },
    ],
    stack: ["React.js", "TypeScript", "Stripe Terminal", "Design System", "Claude AI"],
  },
  {
    id: "cvl",
    company: "Remiges",
    client: "CVL KRA",
    role: "Application Engineer",
    period: "Sep 2025 — Mar 2026",
    blurb:
      "Led the frontend for a team of 4 — architecture, code quality and end-to-end delivery for a KYC registration platform.",
    points: [
      "Led frontend development for a team of 4 engineers, owning architecture, code quality and feature delivery in React.js.",
      "Designed and implemented role-based access control (RBAC) across the entire application.",
      "Built reusable form components and integrated Apache Superset analytics dashboards.",
      "Cut initial page load time by 70% with lazy loading and code splitting.",
    ],
    metrics: [
      { value: "70%", label: "faster initial load" },
      { value: "4", label: "engineers led" },
      { value: "RBAC", label: "app-wide permissions" },
    ],
    stack: ["React.js", "RBAC", "Apache Superset", "Code Splitting"],
  },
  {
    id: "bse",
    company: "Remiges",
    client: "BSE — Bombay Stock Exchange",
    role: "Application Engineer",
    period: "Jul 2023 — Aug 2025",
    blurb:
      "Engineered high-throughput trading dashboards and a reusable component library for India's oldest stock exchange.",
    points: [
      "Engineered reusable React.js + TypeScript components and dynamic forms with React Hook Form.",
      "Reduced API calls by 60% and bundle size by 30% through lazy loading, code splitting and caching.",
      "Implemented Web Workers, Service Workers and virtualized infinite scroll for smooth, freeze-free UIs.",
      "Built real-time stock KPI dashboards with Chart.js across 5+ modules, meeting WCAG 2.1 AA.",
      "Increased unit test coverage by 40% with Jest and React Testing Library.",
    ],
    metrics: [
      { value: "60%", label: "fewer API calls" },
      { value: "80%", label: "fewer UI freezes" },
      { value: "40%", label: "more test coverage" },
    ],
    stack: ["React.js", "TypeScript", "React Hook Form", "Chart.js", "Web Workers", "Jest", "RTL"],
  },
]

export const impact = [
  { value: 40, suffix: "%", label: "Less feature dev time", note: "Custom Claude AI skills @ Zoca" },
  { value: 35, suffix: "%", label: "More bookings", note: "Waitlist feature @ Zoca" },
  { value: 70, suffix: "%", label: "Faster page load", note: "Code splitting @ CVL KRA" },
  { value: 80, suffix: "%", label: "Fewer UI freezes", note: "Web Workers @ BSE" },
]

export const skillGroups = {
  Languages: ["JavaScript (ES6+)", "TypeScript", "C++", "HTML5", "CSS3"],
  Frameworks: ["React.js", "Redux", "TanStack Query", "React Hook Form", "Node.js", "Express.js", "Tailwind CSS", "Bootstrap", "Chart.js", "Puppeteer"],
  Architecture: ["Frontend Architecture", "Design Systems", "Reusable Components", "RBAC", "REST APIs"],
  Performance: ["Lazy Loading", "Code Splitting", "Caching", "Web Workers", "Service Workers", "Virtualized Lists"],
  Quality: ["Jest", "React Testing Library", "WCAG 2.1 AA"],
  Tools: ["Git", "GitHub", "Cursor", "Lovable", "Postman", "Stripe Terminal", "Apache Superset", "Cloudinary", "IPFS", "MetaMask"],
} as const

export const marquee = [
  "React.js", "TypeScript", "Tailwind CSS", "Redux", "TanStack Query", "Node.js", "Express.js",
  "React Hook Form", "Chart.js", "Jest", "Stripe Terminal", "Web Workers", "Design Systems", "WCAG 2.1 AA",
]

export type Project = {
  kind: "Professional" | "Personal"
  mock: "checkout" | "chart" | "chain" | "course"
  title: string
  tag: string
  year: string
  description: string
  points: string[]
  stack: string[]
  gradient: string
  link?: string
}

export const projects: Project[] = [
  {
    kind: "Professional",
    mock: "checkout",
    title: "ZocaWeb Checkout",
    tag: "Zoca AI · In-person payments",
    year: "2026",
    description:
      "An end-to-end checkout for salons and spas — Stripe Terminal S710 and Bluetooth readers, Tap to Pay, and a single-tap customer experience.",
    points: [
      "Stripe Terminal S710 + Bluetooth card reader integration with in-person card and Tap to Pay.",
      "Waitlist that fills open calendar slots — +35% bookings, 80% fewer idle slots.",
      "Form builder for client intake forms and reusable service templates — 80% less manual form work.",
    ],
    stack: ["React.js", "TypeScript", "Stripe Terminal", "Design System"],
    gradient: "from-[oklch(0.72_0.17_45)] via-[oklch(0.78_0.15_60)] to-[oklch(0.86_0.12_80)]",
  },
  {
    kind: "Professional",
    mock: "chart",
    title: "BSE Market Dashboards",
    tag: "Remiges · Bombay Stock Exchange",
    year: "2023 — 25",
    description:
      "Real-time stock KPI dashboards across 5+ modules, engineered for speed with workers, virtualization and aggressive caching.",
    points: [
      "Chart.js KPI dashboards meeting WCAG 2.1 AA accessibility standards.",
      "Web Workers + Service Workers + virtualized infinite scroll — 40% faster loads, 80% fewer freezes.",
      "60% fewer API calls and 30% smaller bundle via lazy loading, code splitting and caching.",
    ],
    stack: ["React.js", "TypeScript", "Chart.js", "Web Workers", "Jest"],
    gradient: "from-[oklch(0.25_0.02_260)] via-[oklch(0.35_0.06_250)] to-[oklch(0.55_0.12_220)]",
  },
  {
    kind: "Personal",
    mock: "chain",
    title: "CertChain",
    tag: "Blockchain Certificate Verification",
    year: "2023",
    description:
      "A decentralized platform that makes academic certificates tamper-proof using Ethereum smart contracts and IPFS.",
    points: [
      "Solidity smart contracts on an Ethereum testnet — tamper-proof storage of 100+ certificates.",
      "MetaMask authentication for issuers and verifiers.",
      "Automated certificate issuance with Email.js — 80% less manual effort.",
    ],
    stack: ["React.js", "Solidity", "IPFS", "Ethereum", "Tailwind CSS"],
    gradient: "from-[oklch(0.35_0.1_300)] via-[oklch(0.5_0.15_290)] to-[oklch(0.7_0.14_320)]",
    link: "https://github.com/DiveshJ8766",
  },
  {
    kind: "Personal",
    mock: "course",
    title: "StudyNotion",
    tag: "EdTech Platform · TechSpark",
    year: "2023",
    description:
      "A full-stack MERN learning platform with a course marketplace, payments and dedicated instructor dashboards.",
    points: [
      "JWT authentication with role-based student & instructor dashboards.",
      "Razorpay payments and Cloudinary media storage.",
      "Deployed on Vercel + Render with MongoDB Atlas.",
    ],
    stack: ["MongoDB", "Express.js", "React.js", "Node.js"],
    gradient: "from-[oklch(0.4_0.08_160)] via-[oklch(0.55_0.12_165)] to-[oklch(0.78_0.13_130)]",
    link: "https://github.com/DiveshJ8766",
  },
]

export const services = [
  { title: "Frontend Architecture", text: "Scalable React codebases, folder conventions, state strategy and release quality you can trust." },
  { title: "Design Systems", text: "Reusable, accessible component libraries that keep product teams fast and consistent." },
  { title: "Performance", text: "Code splitting, caching, workers and virtualization — making heavy apps feel instant." },
  { title: "Payments & Integrations", text: "Stripe Terminal, Razorpay, analytics dashboards and third-party SDKs, end to end." },
]

export const education = [
  {
    degree: "B.E. in Information Technology",
    school: "Sandip Institute of Technology & Research Centre, Nashik",
    period: "2020 — 2023",
    score: "SGPA 9.32",
  },
  {
    degree: "Diploma in Computer Technology",
    school: "Government Polytechnic Nashik",
    period: "2018 — 2020",
    score: "79.06%",
  },
]
