export const CONTENT = {
  navbar: {
    logo: {
      part1: "CONCRETE",
      part2: "MLS",
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
      projects: "600+ Projects",
      licensed: "Licensed & Insured",
      experience: "15 Years Experience",
      rating: "5-Star",
    },
    headline: {
      part1: "CONCRETE WORK.",
      part2: "BUILT TO LAST.",
    },
    subheadline:
      "Driveways, foundations, slabs, retaining walls, and decorative concrete — done by licensed professionals. Get your free estimate instantly, no calls, no waiting.",
    primaryCta: "Get My Free Estimate →",
    secondaryCta: "View Our Projects",
  },
  trustBar: [
    "Licensed & Insured",
    "Free Estimates",
    "5-Star Google Rated",
    "Locally Owned & Operated",
    "15+ Years in Business",
  ],
  services: {
    label: "What We Pour",
    title: "Our Services",
    subtitle:
      "Specialists in residential and commercial concrete — from simple slabs to large-scale structural work.",
    items: [
      {
        id: "driveways",
        title: "Driveways & Parking",
        query: "concrete driveway residential",
        seed: "svc-roof",
        description:
          "Custom concrete driveways and parking areas for homes and businesses. Smooth finish, stamped, or exposed aggregate — built for heavy use and long life.",
      },
      {
        id: "foundations",
        title: "Foundations & Slabs",
        query: "concrete foundation slab construction",
        seed: "svc-newcon",
        description:
          "Residential and commercial foundations, garage slabs, and equipment pads. Properly graded, reinforced, and poured to code every time.",
      },
      {
        id: "retaining",
        title: "Retaining Walls & Flatwork",
        query: "concrete retaining wall masonry",
        seed: "svc-concrete",
        description:
          "Retaining walls, patios, walkways, curbs, and decorative flatwork. We handle any scope — from a backyard patio to a full commercial lot.",
      },
    ],
    learnMore: "Learn More",
  },
  howItWorks: {
    label: "Simple Process",
    title: "How It Works",
    subtitle: "No phone tags, no waiting. Get your concrete estimate in 3 simple steps.",
    steps: [
      {
        number: "01",
        title: "Tell us about your project",
        description: "Select the type of concrete work, approximate area, and your location. Takes less than 2 minutes.",
      },
      {
        number: "02",
        title: "Get your instant estimate",
        description: "We calculate a realistic price range based on your project specs, mix requirements, and typical local labor rates.",
      },
      {
        number: "03",
        title: "We'll follow up",
        description: "A Concrete MLS crew member will reach out within 24 hours to confirm details and schedule a site visit.",
      },
    ]
  },
  portfolio: {
    label: "Recent Work",
    title: "Our Projects",
    subtitle: "A sample of concrete projects completed across the area.",
    projects: [
      {
        id: "port-1",
        title: "Residential Driveway — 1,800 sq ft Stamped Concrete",
        badge: "Driveway · Dallas, TX",
        year: "Completed 2024",
        query: "stamped concrete driveway residential",
        seed: "port-1",
      },
      {
        id: "port-2",
        title: "Commercial Foundation Slab — 12,000 sq ft",
        badge: "Foundation · Austin, TX",
        year: "Completed 2024",
        query: "concrete foundation slab commercial",
        seed: "port-2",
      },
      {
        id: "port-3",
        title: "Retaining Wall & Patio — 320 linear ft",
        badge: "Retaining Wall · San Antonio, TX",
        year: "Completed 2023",
        query: "concrete retaining wall patio finished",
        seed: "port-3",
      },
    ]
  },
  testimonials: {
    label: "Client Reviews",
    title: "What Our Clients Say",
    subtitle: "Real feedback from homeowners and property managers who trusted Concrete MLS.",
    items: [
      {
        name: "Michael R.",
        location: "Houston, TX",
        project: "Driveway",
        quote: "They poured our entire driveway in one day. The stamped finish looks incredible — better than the neighbors'. No surprises on price.",
      },
      {
        name: "Sandra T.",
        location: "Austin, TX",
        project: "Foundation Slab",
        quote: "Professional crew, perfectly level slab, done on schedule. Concrete MLS is the only company I'll call for this kind of work going forward.",
      },
      {
        name: "James L.",
        location: "Dallas, TX",
        project: "Retaining Wall",
        quote: "They solved a drainage problem we'd had for years. The retaining wall is solid, looks great, and they cleaned the site spotless when done.",
      },
    ]
  },
  whyUs: {
    label: "Why We're Different",
    title: "Why Concrete MLS",
    badgeTitle: "15+ Years",
    badgeSubtitle: "Pouring concrete right",
    points: [
      {
        id: "licensed",
        title: "Licensed & Fully Insured",
        desc: "Every pour is covered. You're protected from day one.",
      },
      {
        id: "pricing",
        title: "Transparent Pricing",
        desc: "No hidden fees, no surprises. What we quote is what you pay.",
      },
      {
        id: "experts",
        title: "Concrete Specialists",
        desc: "We do one thing and do it right. 15 years focused exclusively on concrete means better results on every job.",
      },
      {
        id: "turnaround",
        title: "Fast Turnaround",
        desc: "Most projects start within 2 weeks of contract signing. We don't leave you waiting.",
      },
    ]
  },
  ctaBanner: {
    title: "READY TO POUR?",
    subtitle: "Get your free concrete estimate in 2 minutes. No calls, no commitment.",
    button: "Get My Free Estimate →",
  },
  footer: {
    brand: {
      part1: "CONCRETE",
      part2: "MLS",
      description: "Licensed and insured concrete specialists. Driveways, foundations, retaining walls, and flatwork — poured right the first time.",
    },
    navLabel: "Navigation",
    contactLabel: "Contact",
    contact: {
      phone: "(555) 000-0000",
      email: "info@concretemls.com",
      location: "Houston, TX (serving all of Texas)",
    },
    copyright: "© 2024 Concrete MLS. All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    disclaimer: "Estimates are based on typical market rates. Final pricing subject to site inspection and material costs.",
  },
  quoteBot: {
    intro: {
      label: "Free Estimate",
      title: "Get Your Free Concrete Estimate",
      subtitle: "Answer a few quick questions and we'll give you a price range based on your project — no calls, no commitment.",
      cardTitle: "Ready for your estimate?",
      cardSubtitle: "Takes less than 2 minutes.",
      button: "Start My Free Quote"
    },
    questions: {
      progressPrefix: "Question",
      progressSeparator: "of",
      skipButton: "Skip",
      continueButton: "Continue"
    },
    result: {
      badge: "Your Estimate",
      costFactorsLabel: "Key cost factors",
      callCTA: "Call to Confirm",
      emailCTA: "Get Detailed Quote by Email",
      formTitle: "Send me the full quote breakdown",
      formPlaceholder: "Your email address",
      formButton: "Send",
      successMessage: "✓  We'll reach out within 24 hours with your detailed quote.",
      disclaimer: "This is a reference estimate based on typical market rates. Final pricing depends on a site inspection and may vary based on concrete mix, reinforcement, site conditions, and scope of work.",
      startOverText: "Start over →",
    },
    errorMsg: "Something went wrong. Please try again.",
    /* ─── Static pricing table ──────────────────────────────────────────
       Keys mirror the projectType options and size options in the question
       tree below. The component reads these directly — no API call needed.
    ─────────────────────────────────────────────────────────────────── */
    pricing: {
      "Driveway / Parking": {
        ranges: {
          "Small (under 500 sq ft)":   { low: 2500,  high: 5500  },
          "Medium (500–1,500 sq ft)":  { low: 5500,  high: 13000 },
          "Large (1,500+ sq ft)":      { low: 13000, high: 32000 },
        },
        finishMultipliers: {
          "Standard broom finish":  1.0,
          "Stamped concrete":       1.55,
          "Exposed aggregate":      1.30,
          "Not sure":               1.0,
        },
        breakdown: [
          "Concrete mix grade and thickness (4\" vs 6\")",
          "Site excavation, grading, and base preparation",
          "Finish type — stamped and decorative add significant cost",
          "Rebar or wire mesh reinforcement",
          "Expansion joints and edge forming",
        ],
        summaries: {
          "Small (under 500 sq ft)":  "Typical for a single-car driveway apron or small parking pad.",
          "Medium (500–1,500 sq ft)": "Covers a standard residential driveway or small commercial parking area.",
          "Large (1,500+ sq ft)":     "Suitable for large residential driveways, multi-vehicle pads, or commercial parking.",
        },
      },
      "Foundation / Slab": {
        ranges: {
          "Under 1,000 sq ft":    { low: 4500,  high: 9500   },
          "1,000–3,000 sq ft":    { low: 9500,  high: 24000  },
          "3,000–8,000 sq ft":    { low: 24000, high: 60000  },
          "8,000+ sq ft":         { low: 60000, high: 130000 },
        },
        breakdown: [
          "Soil prep, grading, and compaction",
          "Vapor barrier and insulation layer",
          "Rebar or post-tension cable layout",
          "Concrete mix design and pour volume",
          "Curing time and finishing treatment",
        ],
        summaries: {
          "Under 1,000 sq ft":  "Typical for a garage slab, workshop, or small addition.",
          "1,000–3,000 sq ft":  "Covers most single-family residential foundations.",
          "3,000–8,000 sq ft":  "Typical for large homes, light commercial, or multi-unit foundations.",
          "8,000+ sq ft":       "Large commercial slab or multi-structure development.",
        },
      },
      "Retaining Wall": {
        ranges: {
          "Short (under 50 linear ft)":  { low: 3000,  high: 9000  },
          "Medium (50–150 linear ft)":   { low: 9000,  high: 28000 },
          "Long (150+ linear ft)":       { low: 28000, high: 70000 },
        },
        breakdown: [
          "Wall height — taller walls require deeper footings and more material",
          "Drainage aggregate and drainage pipe behind the wall",
          "Footing depth and reinforcement",
          "Concrete block (CMU) vs. poured concrete cost difference",
          "Backfill and compaction after installation",
        ],
        summaries: {
          "Short (under 50 linear ft)":  "Common for residential yard grading or small slope correction.",
          "Medium (50–150 linear ft)":   "Typical for property-line walls, terracing, or commercial lot edges.",
          "Long (150+ linear ft)":       "Large-scale grading, embankment stabilization, or commercial projects.",
        },
      },
      "Patio / Walkway": {
        ranges: {
          "Small (under 300 sq ft)":  { low: 1500, high: 4500  },
          "Medium (300–800 sq ft)":   { low: 4500, high: 11000 },
          "Large (800+ sq ft)":       { low: 11000, high: 27000 },
        },
        finishMultipliers: {
          "Standard broom finish":  1.0,
          "Stamped / decorative":   1.45,
          "Exposed aggregate":      1.25,
          "Colored concrete":       1.20,
          "Not sure":               1.0,
        },
        breakdown: [
          "Base preparation and compaction",
          "Concrete thickness — patios typically 4\", entry walks 3.5\"",
          "Finish and texture type",
          "Integral color or surface stain (if applicable)",
          "Edge detailing and control joints",
        ],
        summaries: {
          "Small (under 300 sq ft)":  "Ideal for a small patio, front entry, or garden path.",
          "Medium (300–800 sq ft)":   "Typical backyard patio, side walkway, or pool surround.",
          "Large (800+ sq ft)":       "Large outdoor entertainment area, commercial walkway, or courtyard.",
        },
      },
      "Other": {
        ranges: {
          "Small (under 500 sq ft)":   { low: 1500,  high: 5500  },
          "Medium (500–1,500 sq ft)":  { low: 5500,  high: 16000 },
          "Large (1,500+ sq ft)":      { low: 16000, high: 45000 },
        },
        breakdown: [
          "Project type and complexity",
          "Volume of concrete required",
          "Site access and preparation",
          "Forming and finishing requirements",
          "Location and local labor rates",
        ],
        summaries: {
          "Small (under 500 sq ft)":   "Small custom concrete scope.",
          "Medium (500–1,500 sq ft)":  "Mid-size custom or specialty concrete project.",
          "Large (1,500+ sq ft)":      "Large custom concrete scope — site visit recommended.",
        },
      },
    },
    baseQuestions: [
      {
        key: "projectType",
        text: "What type of concrete work are you looking to get done?",
        options: ["Driveway / Parking", "Foundation / Slab", "Retaining Wall", "Patio / Walkway", "Other"],
        type: "choice",
      },
    ],
    adaptiveQuestions: {
      "Driveway / Parking": [
        {
          key: "finish",
          text: "What finish are you looking for?",
          options: ["Standard broom finish", "Stamped concrete", "Exposed aggregate", "Not sure"],
          type: "choice",
        },
        {
          key: "size",
          text: "Approximate size of the driveway or parking area?",
          options: ["Small (under 500 sq ft)", "Medium (500–1,500 sq ft)", "Large (1,500+ sq ft)"],
          type: "choice",
        },
        {
          key: "condition",
          text: "Is this a new pour or a replacement?",
          options: ["New pour", "Replacing existing concrete", "Expanding existing driveway"],
          type: "choice",
        },
      ],
      "Foundation / Slab": [
        {
          key: "slabType",
          text: "What type of slab or foundation?",
          options: ["Residential foundation", "Garage slab", "Commercial slab", "Equipment / utility pad"],
          type: "choice",
        },
        {
          key: "size",
          text: "Approximate square footage?",
          options: ["Under 1,000 sq ft", "1,000–3,000 sq ft", "3,000–8,000 sq ft", "8,000+ sq ft"],
          type: "choice",
        },
        {
          key: "reinforcement",
          text: "Do you need rebar or post-tension reinforcement?",
          options: ["Yes — rebar", "Yes — post-tension", "Not sure / need recommendation", "No reinforcement"],
          type: "choice",
        },
      ],
      "Retaining Wall": [
        {
          key: "wallType",
          text: "What type of retaining wall?",
          options: ["Poured concrete", "Concrete block / CMU", "Not sure"],
          type: "choice",
        },
        {
          key: "size",
          text: "Approximate length and height of the wall?",
          options: ["Short (under 50 linear ft)", "Medium (50–150 linear ft)", "Long (150+ linear ft)"],
          type: "choice",
        },
        {
          key: "drainage",
          text: "Do you need drainage work behind the wall?",
          options: ["Yes", "No", "Not sure"],
          type: "choice",
        },
      ],
      "Patio / Walkway": [
        {
          key: "finish",
          text: "What finish do you want?",
          options: ["Standard broom finish", "Stamped / decorative", "Exposed aggregate", "Colored concrete", "Not sure"],
          type: "choice",
        },
        {
          key: "size",
          text: "Approximate area?",
          options: ["Small (under 300 sq ft)", "Medium (300–800 sq ft)", "Large (800+ sq ft)"],
          type: "choice",
        },
      ],
      "Other": [
        {
          key: "otherDescription",
          text: "Describe the concrete work briefly.",
          placeholder: "e.g. curb and gutter along 200 ft of parking lot",
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
        placeholder: "Optional — soil conditions, access issues, special requirements",
        type: "text-optional",
      },
    ]
  }
};
