export const CONTENT = {
  navbar: {
    logo: {
      part1: "BUILD",
      part2: "RIGHT",
    },
    links: [
      { label: "Services", href: "#services" },
      { label: "Projects", href: "#portfolio" },
      { label: "About", href: "#why-us" },
      { label: "Contact", href: "#footer" },
    ],
    cta: "Get Free Quote",
  },
  hero: {
    heroImage: "/Hero.jpg",
    stats: {
      projects: "500+ Projects",
      licensed: "Licensed & Insured",
      experience: "12 Years Experience",
      rating: "5-Star",
    },
    headline: {
      part1: "BUILT RIGHT.",
      part2: "QUOTED IN MINUTES.",
    },
    subheadline:
      "Roofing, new construction, and concrete work done by licensed professionals. Get your free estimate instantly — no calls, no waiting.",
    primaryCta: "Get My Free Estimate →",
    secondaryCta: "View Our Projects",
  },
  trustBar: [
    "Licensed & Insured",
    "Free Estimates",
    "5-Star Google Rated",
    "Locally Owned & Operated",
    "12+ Years in Business",
  ],
  services: {
    label: "What We Build",
    title: "Our Services",
    subtitle:
      "Licensed, insured, and experienced in all aspects of residential and commercial construction.",
    items: [
      {
        id: "roofing",
        title: "Roofing",
        query: "roofing shingles repair",
        seed: "svc-roof",
        description:
          "Residential and commercial roofing repairs, full replacements, and inspections. We work with all materials including shingle, metal, and flat roofs.",
      },
      {
        id: "construction",
        title: "New Construction",
        query: "new home construction foundation",
        seed: "svc-newcon",
        description:
          "Ground-up builds for residential and light commercial properties. From foundation to finish, we manage the full project.",
      },
      {
        id: "concrete",
        title: "Concrete & Masonry",
        query: "concrete driveway masonry",
        seed: "svc-concrete",
        description: "Driveways, foundations, retaining walls, and decorative concrete work. Built to last.",
      },
    ],
    learnMore: "Learn More",
  },
  howItWorks: {
    label: "Simple Process",
    title: "How It Works",
    subtitle: "No phone tags, no waiting. Get your estimate in 3 simple steps.",
    steps: [
      {
        number: "01",
        title: "Answer a few questions",
        description: "Tell us about your project: type, size, and location. Takes less than 2 minutes.",
      },
      {
        number: "02",
        title: "Get your instant estimate",
        description: "Our AI generates a realistic price range based on your project details and local market rates.",
      },
      {
        number: "03",
        title: "We'll follow up",
        description: "One of our team members will reach out within 24 hours to confirm details and schedule a site visit.",
      },
    ]
  },
  portfolio: {
    label: "Recent Work",
    title: "Our Projects",
    subtitle: "A sample of completed projects across Texas.",
    projects: [
      {
        id: "port-1",
        title: "Full Roof Replacement — 2,400 sq ft",
        badge: "Roofing · Dallas, TX",
        year: "Completed 2023",
        query: "completed roofing project house",
        seed: "port-1",
      },
      {
        id: "port-2",
        title: "New Construction Build — 3BR Family Home",
        badge: "New Construction · Austin, TX",
        year: "Completed 2023",
        query: "new house construction complete",
        seed: "port-2",
      },
      {
        id: "port-3",
        title: "Commercial Concrete Driveway — 8,000 sq ft",
        badge: "Concrete & Masonry · San Antonio, TX",
        year: "Completed 2024",
        query: "concrete driveway finished",
        seed: "port-3",
      },
    ]
  },
  testimonials: {
    label: "Client Reviews",
    title: "What Our Clients Say",
    subtitle: "Real feedback from homeowners and property managers across Texas.",
    items: [
      {
        name: "Michael R.",
        location: "Houston, TX",
        project: "Roofing",
        quote: "They replaced our entire roof in two days. The quote I got online matched exactly what we paid. No surprises.",
      },
      {
        name: "Sandra T.",
        location: "Austin, TX",
        project: "New Construction",
        quote: "Professional from start to finish. The new build came in on time and on budget. I'd hire them again without hesitation.",
      },
      {
        name: "James L.",
        location: "Dallas, TX",
        project: "Concrete & Masonry",
        quote: "Best concrete work I've seen. Our driveway looks incredible and they cleaned up after themselves. Very happy.",
      },
    ]
  },
  whyUs: {
    label: "Why We're Different",
    title: "Why BuildRight",
    badgeTitle: "12+ Years",
    badgeSubtitle: "Serving the area",
    points: [
      {
        id: "licensed",
        title: "Licensed & Fully Insured",
        desc: "Every project is covered. You're protected from day one.",
      },
      {
        id: "pricing",
        title: "Transparent Pricing",
        desc: "No hidden fees, no surprises. What we quote is what you pay.",
      },
      {
        id: "experts",
        title: "Local Experts",
        desc: "We've worked in this market for over 12 years. We know the codes, climate, and contractors.",
      },
      {
        id: "turnaround",
        title: "Fast Turnaround",
        desc: "Most projects start within 2 weeks of contract signing.",
      },
    ]
  },
  ctaBanner: {
    title: "READY TO GET STARTED?",
    subtitle: "Get your free estimate in 2 minutes. No calls, no commitment.",
    button: "Get My Free Estimate →",
  },
  footer: {
    brand: {
      part1: "BUILD",
      part2: "RIGHT",
      description: "Licensed and insured construction professionals serving Texas. Roofing, new builds, and concrete work done right.",
    },
    navLabel: "Navigation",
    contactLabel: "Contact",
    contact: {
      phone: "(555) 000-0000",
      email: "info@buildright.co",
      location: "Houston, TX (serving all of Texas)",
    },
    copyright: "© 2024 BuildRight Construction. All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    disclaimer: "Estimates generated by AI are approximate. Final pricing subject to site inspection.",
  },
  quoteBot: {
    intro: {
      label: "Instant Estimate",
      title: "Get Your Free Estimate",
      subtitle: "Answer a few quick questions and get an AI-powered price range — no commitment, no spam.",
      cardTitle: "Ready for your estimate?",
      cardSubtitle: "Takes less than 2 minutes. Powered by AI — no generic ranges.",
      button: "Start My Free Quote"
    },
    questions: {
      progressPrefix: "Question",
      progressSeparator: "of",
      skipButton: "Skip",
      continueButton: "Continue"
    },
    loading: {
      title: "Generating your estimate...",
      subtitle: "Analyzing market rates, materials, and labor costs for your area",
    },
    result: {
      badge: "Your AI-Powered Estimate",
      costFactorsLabel: "Key cost factors",
      callCTA: "Call to Confirm",
      emailCTA: "Get Detailed Quote by Email",
      formTitle: "Send me the full quote breakdown",
      formPlaceholder: "Your email address",
      formButton: "Send",
      successMessage: "✓  We'll reach out within 24 hours with your detailed quote.",
      disclaimer: "This is an AI-generated estimate. Final pricing depends on a site inspection and may vary based on material costs, site conditions, and scope of work.",
      startOverText: "Start over →",
      followUp: {
        title: "Have questions about your estimate?",
        inputPlaceholder: "Ask anything about your estimate...",
        defaultReply: "I'm not sure, but feel free to call us for more details.",
        errorReply: "Sorry, I had trouble responding. Please call us for more details."
      }
    },
    errorMsg: "Something went wrong. Please try again.",
    baseQuestions: [
      {
        key: "projectType",
        text: "What type of project are you looking to get done?",
        options: ["Roofing", "New Construction", "Concrete & Masonry", "Repair", "Other"],
        type: "choice",
      },
    ],
    adaptiveQuestions: {
      "Roofing": [
        {
          key: "roofType",
          text: "What type of roof do you have?",
          options: ["Asphalt shingles", "Metal roof", "Flat / TPO", "Tile", "Not sure"],
          type: "choice",
        },
        {
          key: "size",
          text: "Approximate size of the roof?",
          options: ["Small (under 1,000 sq ft)", "Medium (1,000–2,500 sq ft)", "Large (2,500+ sq ft)"],
          type: "choice",
        },
        {
          key: "roofIssue",
          text: "What's the main issue?",
          options: ["Full replacement", "Leak repair", "Storm damage", "Inspection only"],
          type: "choice",
        },
      ],
      "New Construction": [
        {
          key: "constructionType",
          text: "What are you building?",
          options: ["Single-family home", "Addition / extension", "Commercial building", "Accessory structure (garage, barn)"],
          type: "choice",
        },
        {
          key: "size",
          text: "Approximate square footage?",
          options: ["Under 1,000 sq ft", "1,000–2,500 sq ft", "2,500–5,000 sq ft", "5,000+ sq ft"],
          type: "choice",
        },
        {
          key: "constructionPhase",
          text: "How far along is the planning?",
          options: ["Just an idea", "Have blueprints", "Permits in process", "Ready to break ground"],
          type: "choice",
        },
      ],
      "Concrete & Masonry": [
        {
          key: "concreteType",
          text: "What kind of concrete or masonry work?",
          options: ["Driveway / parking", "Foundation / slab", "Retaining wall", "Patio / walkway", "Block wall"],
          type: "choice",
        },
        {
          key: "size",
          text: "Approximate size of the area?",
          options: ["Small (under 500 sq ft)", "Medium (500–1,500 sq ft)", "Large (1,500+ sq ft)"],
          type: "choice",
        },
      ],
      "Repair": [
        {
          key: "repairType",
          text: "What needs repairing?",
          options: ["Roof / ceiling", "Foundation / structure", "Concrete / driveway", "Siding / exterior", "Other"],
          type: "choice",
        },
        {
          key: "size",
          text: "How extensive is the damage?",
          options: ["Minor (cosmetic)", "Moderate (functional)", "Severe (structural)"],
          type: "choice",
        },
      ],
      "Other": [
        {
          key: "otherDescription",
          text: "Describe the project briefly.",
          placeholder: "e.g. demolish old shed and pour a new pad",
          type: "text",
        },
        {
          key: "size",
          text: "Approximate size of the project?",
          options: ["Small (under 500 sq ft)", "Medium (500–1,500 sq ft)", "Large (1,500+ sq ft)"],
          type: "choice",
        },
      ],
    },
    sharedTailQuestions: [
      {
        key: "timeline",
        text: "What's your timeline?",
        options: ["ASAP", "Within 1 month", "1–3 months", "Just planning"],
        type: "choice",
      },
      {
        key: "location",
        text: "Where is the property located?",
        placeholder: "e.g. Houston, TX",
        type: "text",
      },
      {
        key: "notes",
        text: "Any additional details you'd like us to know?",
        placeholder: "Optional — describe your project",
        type: "text-optional",
      },
    ]
  }
};
