/* -------------------------------------------------------------------------- */
/*            PROJECT CASE STUDIES (detail pages: ?project=<slug>)            */
/*  Images live in public/work/<folder>/: cover.jpg (16:10) and 1-3.jpg (4:3) */
/*  Projects without screenshots yet use a labelled placeholder instead.      */
/* -------------------------------------------------------------------------- */

export type Feature = { title: string; text: string };

export type ProjectDetail = {
  slug: string;
  /** folder in public/work/ holding cover.jpg + 1..3.jpg; null = placeholders */
  folder: string | null;
  /** mobile app: show phone mockups (see MobileMock.tsx) instead of browser frames */
  mobile?: "this-me";
  name: string;
  tags: string;
  lead: string;
  overview: string[];
  highlights: string[];
  meta: { label: string; value: string }[];
  link?: { href: string; label: string; display: string };
  features: [Feature, Feature, Feature];
};

export const projectDetails: ProjectDetail[] = [
  {
    slug: "this-me",
    folder: null,
    mobile: "this-me",
    name: "This Me",
    tags: "Product design · Inclusive App Design",
    lead: "An interactive Indonesian Sign Language (BISINDO) learning app featuring 30+ Figma interfaces, gamified camera recognition, and inclusive UX for the Deaf community.",
    overview: [
      "This Me is a learning app for Indonesian Sign Language (BISINDO), designed with the Deaf community in mind so that learning to sign feels approachable for everyone.",
      "Lessons use the phone camera to recognise hand gestures and turn practice into short, gamified challenges, supported by a design system of more than 30 Figma interfaces.",
    ],
    highlights: ["30+ Figma interfaces", "Camera gesture recognition", "Gamified lessons", "SUS score 92.5", "Silver medal"],
    meta: [
      { label: "Role", value: "UI/UX & product design" },
      { label: "Platform", value: "Mobile app" },
      { label: "Usability", value: "SUS 92.5" },
    ],
    link: { href: "https://github.com/nazaa-arch/webporto", label: "View work", display: "github.com/nazaa-arch" },
    features: [
      { title: "Animated Loading Screen", text: "Two signing hands come together to form the This Me logo, setting a warm, friendly tone before the first lesson begins." },
      { title: "Learning Home", text: "Daily progress at the top, four learning tracks for the alphabet, numbers, phrases and conversation, workplace signs below and the camera always one tap away." },
      { title: "Alphabet Lesson", text: "A video demonstration for every letter, a continue-learning card and an alphabet grid that ticks off each sign already mastered." },
    ],
  },
  {
    slug: "steamcraft-hub",
    folder: "hub",
    name: "STEAM Team Hub",
    tags: "Brand & web design · Team Research Portal",
    lead: "The official hub of a three-person multidisciplinary research team: visual identity, member profiles and a gateway to the team's projects, from the live SteamCraft platform to IoT and biotech projects still in development.",
    overview: [
      "steamcraft.online is the main domain of the STEAM research team. Under the motto Learn, Create, Impact, it introduces the team, its visual identity and every collaborative research initiative in one place.",
      "The hub connects the flagship SteamCraft platform, already live, with the team's next projects that are currently in development: an IoT marine buoy for coral-reef monitoring and an organic, biodegradable mycelium battery. It also links each member to their own portfolio.",
    ],
    highlights: ["Team visual identity", "3 member profile cards", "SteamCraft platform: live", "IoT Marine Buoy: in development", "Mycobattery: in development"],
    meta: [
      { label: "Role", value: "Project lead & lead system architect" },
      { label: "Team", value: "3 members" },
      { label: "Status", value: "Live" },
    ],
    link: { href: "https://steamcraft.online", label: "Visit the hub", display: "steamcraft.online" },
    features: [
      { title: "Research Team Members", text: "ID-card style profiles for the three team members, each with their role, division, skills and a link to their personal portfolio." },
      { title: "Team Projects Gateway", text: "Filterable project cards with each project's status: the SteamCraft platform is live, while the IoT Marine Buoy and the EcoBiosynthesis Mycobattery are still in development." },
      { title: "Research Pillars & Ecosystem", text: "Four research pillars, from scientific methodology to FAIR data and smart instrumentation, plus direct entry points to the specialist apps." },
    ],
  },
  {
    slug: "steamcraft",
    folder: "app",
    name: "SteamCraft Ecosystem",
    tags: "Product design · Research Collaboration Platform",
    lead: "A multidisciplinary research workspace for students and lecturers: five scientific checkpoints, PKM logbooks with PDF export, empirical data repositories and a five-axis STEAM competency radar.",
    overview: [
      "SteamCraft is the main hub of a multi-app research ecosystem. It gives students and lecturers one workspace to plan cross-disciplinary projects, collect empirical evidence, run controlled simulations and assemble scientific reports ready for verification.",
      "Every project moves through five scientific checkpoints with logbooks, data repositories and lecturer consultations, while a five-axis STEAM radar turns each student's work into a readable competency portfolio.",
    ],
    highlights: ["5 scientific checkpoints", "PKM logbook & PDF export", "Student & lecturer roles", "STEAM competency radar", "Hub for 6 connected apps"],
    meta: [
      { label: "Role", value: "Product design & development" },
      { label: "Platform", value: "Web app" },
      { label: "Status", value: "Live" },
    ],
    link: { href: "https://app.steamcraft.online", label: "Visit live app", display: "app.steamcraft.online" },
    features: [
      { title: "Workspace Sign-in", text: "Role-based entry for students and lecturers, with one-click demo accounts so judges and testers can explore without registering." },
      { title: "Research Dashboard", text: "An overview of active projects, checkpoint progress, collaborators and blockers, plus a four-step onboarding mission for first-time users." },
      { title: "STEAM Competency Radar", text: "An academic dossier that plots Science, Technology, Engineering, Art and Mathematics scores on a pentagon radar, next to completed projects and audit status." },
    ],
  },
  {
    slug: "sim",
    folder: "sim",
    name: "SteamSim Lab",
    tags: "Interactive simulation · Physics, Chemistry & Math",
    lead: "A virtual science studio with projectile motion under air drag, acid-base titration and a chaotic double pendulum, plus sensor-noise data export to CSV.",
    overview: [
      "SteamSim Lab is an interactive virtual science studio inside the SteamCraft ecosystem. Students adjust real physical parameters and immediately see how a system responds, instead of reading static formulas.",
      "Each experiment adds realistic sensor noise and exports its readings as CSV, so the same data can be analysed further in VeriLab AI.",
    ],
    highlights: ["Projectile with air drag", "Harmonic oscillator", "Acid-base titration", "Chaotic double pendulum", "CSV sensor-data export"],
    meta: [
      { label: "Role", value: "Lead developer & designer" },
      { label: "Platform", value: "Web app" },
      { label: "Status", value: "Live" },
    ],
    link: { href: "https://sim.steamcraft.online", label: "Open the lab", display: "sim.steamcraft.online" },
    features: [
      { title: "Projectile Motion", text: "Launch a projectile with quadratic air drag and tune speed, angle, drag, mass and sensor noise while range, peak height, flight time and impact speed update live." },
      { title: "Titration pH Curve", text: "Simulate an acid-base titration and watch the pH curve bend around the equivalence point as the titrant volume changes." },
      { title: "Chaos Pendulum", text: "A double pendulum that shows how tiny changes in the starting conditions lead to completely different paths." },
    ],
  },
  {
    slug: "maker",
    folder: "maker",
    name: "MakerCraft 3D",
    tags: "Generative art · WebGL Parametric Studio",
    lead: "A mathematical art studio that renders parametric surfaces in real time, with tunable equations, material themes and 3D-print-ready OBJ export.",
    overview: [
      "MakerCraft 3D is a generative mathematical art studio. Parametric equations become interactive 3D objects that can be rotated, zoomed and reshaped with sliders in real time.",
      "Every mesh reports its vertex and triangle count and can be exported as an OBJ file that is ready for 3D printing.",
    ],
    highlights: ["Torus knot, Möbius strip, Klein bottle", "Superformula & spherical harmonics", "Real-time GPU shading", "4 material themes", "OBJ export for 3D printing"],
    meta: [
      { label: "Role", value: "Lead developer & designer" },
      { label: "Platform", value: "Web app (WebGL)" },
      { label: "Status", value: "Live" },
    ],
    link: { href: "https://maker.steamcraft.online", label: "Open the studio", display: "maker.steamcraft.online" },
    features: [
      { title: "Torus Knot · Cyberpunk", text: "Frequency, twist, tube radius and mesh resolution sliders reshape a torus knot instantly, rendered with GPU shading." },
      { title: "Hologram Material", text: "Switch material themes to explore the same geometry with a completely different look." },
      { title: "Emerald Matrix Material", text: "Combine themes with wireframe and auto-orbit modes to present each surface like a finished art piece." },
    ],
  },
  {
    slug: "verilab",
    folder: "verilab",
    name: "VeriLab AI",
    tags: "AI research tool · Scientific Reproducibility",
    lead: "A metrology and reproducibility engine: sensor calibration with Gaussian Process Regression, paper-claim replication and Monte Carlo & Sobol sensitivity analysis.",
    overview: [
      "VeriLab AI is a verification and laboratory-integrity engine for research data. It checks whether measurements, published claims and models still hold up when they are tested again.",
      "The tool is organised into five modules, from sensor calibration to an SQLite audit trail and a differential comparator, so every check leaves a traceable record.",
    ],
    highlights: ["Gaussian Process Regression", "Paper-claim replication", "Monte Carlo & Sobol indices", "SQLite audit trail", "AI audit verdict"],
    meta: [
      { label: "Role", value: "Developer & designer" },
      { label: "Platform", value: "Web app" },
      { label: "Status", value: "Live" },
    ],
    link: { href: "https://verilab.steamcraft.online", label: "Open VeriLab", display: "verilab.steamcraft.online" },
    features: [
      { title: "Calibration & GPR", text: "Calibrate a sensor by fitting its readings with Gaussian Process Regression and a 95% confidence band." },
      { title: "Replicability Check", text: "Enter the metrics a paper reports, add the experiment script and run seeded sandbox runs to see whether the claims replicate." },
      { title: "Monte Carlo & Sobol", text: "Enter a model expression and nominal parameters, run thousands of Monte Carlo iterations and rank which inputs drive the output." },
    ],
  },
  {
    slug: "scholar",
    folder: "scholar",
    name: "PaperCraft AI",
    tags: "AI writing assistant · Academic UX",
    lead: "An academic manuscript assistant that scores IMRaD structure against Scopus Q1/Q2 targets, with section word budgets, statistics checks and an AI audit.",
    overview: [
      "PaperCraft AI helps students turn research into a publishable manuscript. It reads the draft section by section and compares it with what the target journal expects.",
      "A live readiness score, word budgets for each IMRaD section and a checklist of journal criteria show exactly what to fix before submission.",
    ],
    highlights: ["IMRaD section editor", "Scopus Q1/Q2 readiness score", "Word budget per section", "Statistics & citation checks", "AI manuscript audit"],
    meta: [
      { label: "Role", value: "Developer & designer" },
      { label: "Platform", value: "Web app" },
      { label: "Status", value: "Live" },
    ],
    link: { href: "https://scholar.steamcraft.online", label: "Open PaperCraft", display: "scholar.steamcraft.online" },
    features: [
      { title: "IMRaD Manuscript Score", text: "Write the abstract, introduction, methods, results and discussion in separate tabs while a readiness score out of 100 tracks the whole paper." },
      { title: "Statistics Check", text: "Reviews the reported statistics and highlights which results still need stronger support." },
      { title: "AI Manuscript Audit", text: "One click audits the manuscript against journal criteria and lists which requirements are already met." },
    ],
  },
  {
    slug: "geo",
    folder: "geo",
    name: "SteamGeo Intelligence",
    tags: "Data visualisation · Spatial GIS Dashboard",
    lead: "A dengue early-warning dashboard for 38 East Java regions, combining geographically weighted regression (GWR), LISA clusters and rainfall layers.",
    overview: [
      "SteamGeo Intelligence is a spatial early-warning dashboard for dengue fever (DBD) in East Java. It brings incidence, rainfall, temperature and population data for 38 regions together on one interactive map.",
      "A geographically weighted regression (GWR) model explains how each factor matters differently from place to place, and LISA clusters highlight the hotspots that need a response first.",
    ],
    highlights: ["38 East Java regions", "Choropleth incidence map", "GWR model with local R²", "LISA hotspot clusters", "Dataset export"],
    meta: [
      { label: "Role", value: "Data science & design" },
      { label: "Platform", value: "Web dashboard" },
      { label: "Status", value: "Live" },
    ],
    link: { href: "https://geo.steamcraft.online", label: "Open the map", display: "geo.steamcraft.online" },
    features: [
      { title: "Dengue Incidence Map", text: "A choropleth map of dengue incidence per 100,000 people, with a region panel showing rainfall, temperature, cases and population." },
      { title: "LISA Clusters", text: "Local spatial autocorrelation groups regions into clusters to reveal where outbreaks concentrate." },
      { title: "Rainfall Layer", text: "Switch layers to compare rainfall with incidence and see where weather and outbreaks overlap." },
    ],
  },
  {
    slug: "arena",
    folder: "arena",
    name: "SteamArena",
    tags: "Product design · Innovation Competition Platform",
    lead: "A national STEAM hackathon arena with a project leaderboard, five-axis STEAM radar scoring and structured peer review.",
    overview: [
      "SteamArena is a competitive STEAM innovation platform where student projects are presented, compared and reviewed like a national hackathon.",
      "Projects are ranked on a leaderboard, scored on a five-axis STEAM radar and improved through structured peer review.",
    ],
    highlights: ["Project leaderboard", "Five-axis STEAM radar", "Structured peer review", "Category filters", "Upvotes & reviewers"],
    meta: [
      { label: "Role", value: "Product design & development" },
      { label: "Platform", value: "Web app" },
      { label: "Status", value: "Live" },
    ],
    link: { href: "https://arena.steamcraft.online", label: "Open the arena", display: "arena.steamcraft.online" },
    features: [
      { title: "Project Leaderboard", text: "Top projects ranked by STEAM score, each with its team, category badge, axis scores and upvotes." },
      { title: "Peer-Review Scoring", text: "Reviewers rate scientific accuracy, innovation, engineering and design on clear sliders before sending their score." },
      { title: "Category Filter", text: "Filter the arena by track, such as AI & research, simulation & physics, geospatial & climate or 3D & computing." },
    ],
  },
  {
    slug: "a-kere",
    folder: null,
    name: "A-KERE",
    tags: "App design · Fintech Mobile UX",
    lead: "A streamlined personal budgeting application that cuts transaction logging steps by 50% through rapid-input flow and visual cash flow distribution.",
    overview: [
      "A-KERE is a personal budgeting app built around one idea: logging a transaction should take seconds, not minutes.",
      "A rapid-input flow and visual budget envelopes help users see where their money goes, and usability testing showed the new flow halves the time needed to log a transaction.",
    ],
    highlights: ["3-second input flow", "Budget envelopes", "Real-time cash analytics", "50% time saved"],
    meta: [
      { label: "Role", value: "UI/UX design" },
      { label: "Platform", value: "Mobile app" },
      { label: "Result", value: "50% faster logging" },
    ],
    features: [
      { title: "Fast Transaction", text: "A three-second input flow that keeps the most common entries one tap away." },
      { title: "Budget Envelopes", text: "Envelopes split income into spending categories with real-time cash analytics." },
      { title: "Usability Test", text: "Testing confirmed the redesigned flow cuts transaction logging time by 50%." },
    ],
  },
  {
    slug: "naza-cell",
    folder: null,
    name: "Naza Cell POS",
    tags: "Product design · Enterprise Retail System",
    lead: "High-efficiency cashier POS interface and multi-supplier inventory management platform handling 100+ SKUs and continuous daily financial transactions.",
    overview: [
      "Naza Cell POS is a cashier and inventory system for a phone-accessories shop, designed for speed at the counter and clarity in the back office.",
      "A keyboard-driven checkout keeps queues short, while an inventory matrix tracks more than 100 SKUs from multiple suppliers across 50-80 transactions a day.",
    ],
    highlights: ["Keyboard-driven checkout", "100+ SKU tracking", "Multi-supplier inventory", "50-80 daily transactions"],
    meta: [
      { label: "Role", value: "Product design" },
      { label: "Platform", value: "Desktop web app" },
      { label: "Scale", value: "100+ SKUs" },
    ],
    features: [
      { title: "Cashier POS", text: "A keyboard-driven checkout that lets the cashier finish a sale without reaching for the mouse." },
      { title: "Inventory Matrix", text: "Stock levels for more than 100 SKUs across suppliers in a single, scannable matrix." },
      { title: "Operations", text: "Built to handle 50-80 daily transactions with clear financial records." },
    ],
  },
];

export const findProject = (slug: string | null) =>
  slug ? projectDetails.find((p) => p.slug === slug) ?? null : null;
