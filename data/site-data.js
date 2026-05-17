window.siteData = {
  sectionOrder: ["about", "publications", "experience", "awards"],

  profile: {
    kicker: "Academic Homepage",
    name: "Jiaqi Wu",
    title: "Senior Undergraduate, Department of Computer Science and Technology, Tsinghua University",
    portrait: "assets/profile.jpg",
    intro:
      "I am an undergraduate student in the Department of Computer Science and Technology at Tsinghua University. I will join [Prof. Kun Xu](https://cg.cs.tsinghua.edu.cn/people/~kun/)'s group as a PhD student. My research interests include Computer Graphics and Computer Vision, with a particular focus on Monte Carlo PDE solvers.",
    links: [
      { label: "Email", href: "mailto:wujiaqi22@mails.tsinghua.edu.cn" },
      { label: "GitHub", href: "https://github.com/jiaoplusjuan" },
      { label: "CV", href: "resume_engilish.pdf" },
    ],
  },

  publications: [
    {
      title: "Gradient Domain Reconstruction for Monte Carlo PDE Solvers",
      authors: [
        { name: "Jiaqi Wu", highlight: true, href: "https://jiaoplusjuan.github.io" },
        { name: "Xuejun Hu" },
        { name: "Shuang Zhao", href: "https://shuangz.com" },
        { name: "Kun Xu", href: "https://cg.cs.tsinghua.edu.cn/people/~kun/" },
      ],
      venue: "ACM Transactions on Graphics (SIGGRAPH 2026)",
      //venueNote: "SIGGRAPH 2026 Technical Papers Honorable Mention Award",
      image: "assets/sig2026wu.jpg",
      links: [
        { label: "PDF", href: "paper/Gradient-Domain-Reconstruction-for-Monte-Carlo-PDE-Solvers" },
        { label: "Code", href: "" },
      ],
    },
    {
      title: "Generalized Spherical Harmonics Products using Spherical Grids",
      authors: [
        { name: "Di An" },
        { name: "Jiaqi Wu", highlight: true, href: "https://github.com/jiaoplusjuan" },
        { name: "Bowen Xu" },
        { name: "Lingqi Yan", href: "https://sites.cs.ucsb.edu/~lingqi/" },
        { name: "Kun Xu", href: "https://cg.cs.tsinghua.edu.cn/people/~kun/" },
      ],
      venue: "ACM Transactions on Graphics (SIGGRAPH 2026)",
      image: "assets/sig2026an.png",
      links: [
        { label: "PDF", href: "" },
        { label: "Code", href: "" },
      ],
    },
    {
      title: "Adding Regional Control for Continuous Remeshing via Attention Flows",
      authors: [
        { name: "Jiaqi Wu", highlight: true, href: "https://github.com/jiaoplusjuan" },
        { name: "Kun Xu", href: "https://cg.cs.tsinghua.edu.cn/people/~kun/" },
      ],
      venue: "SIGGRAPH 2025 Poster",
      image: "assets/sig2025.png",
      links: [
        { label: "PDF", href: "https://dl.acm.org/doi/epdf/10.1145/3721250.3743017" },
      ],
    },
    // {
    //   title: "SkinRig: Skinning-Prior-Guided Skeleton Binding for Human Meshes",
    //   authors: [
    //     { name: "Jiaqi Wu", highlight: true, note: "*" },
    //     { name: "Wanxi Dong", note: "*" },
    //     { name: "Yixin Jin" },
    //     { name: "Kun Xu" },
    //   ],
    //   venue: "Under review",
    //   image: "",
    //   links: [
    //     { label: "PDF", href: "" },
    //     { label: "Code", href: "" },
    //   ],
    // },
  ],

  experience: {
    title: "Research Experience",
    items: [
      {
        date: "Mar. 2026 – current",
        text: "Research Intern, meshy.",
      },
      {
        date: "Jun. 2025 – Aug. 2025",
        text: "Research Intern, Huawei, focus on sparse volumetric voxel rasterization and 3D Gaussian Splatting.",
      },
      // {
      //   date: "Aug. 2024 – Jun. 2025",
      //   text: "Developer, Huawei HarmonyOS Pipeline AI Rendering Project.",
      // },
      {
        date: "Mar. 2024 – Oct. 2024",
        text: "Research Intern, Tencent IEG, focus on inverse rendering.",
      },
    ],
  },

  awards: {
    title: "Selected Awards & Recognition",
    items: [
      {
        date: "May 2025",
        text:
          "First Prize, The 5th Jittor AI Algorithm Challenge, Human Skeleton Generation Track.",
      },
      {
        date: "May 2025",
        text: "Highest-level funding, Beijing Natural Science Foundation Undergraduate Research Program.",
      },
      {
        date: "Apr. 2025",
        text: "Third Prize, Information Technology Track, 43rd Tsinghua Challenge Cup.",
      },
      {
        date: "Sep. 2024; Sep. 2025",
        text: "National Scholarship.",
      },
      {
        date: "Jun. 2023; May 2024",
        text: "Tang Zhongying Moral Education Scholarship.",
      },
      {
        date: "Sep. 2023",
        text:
          "Tsinghua University Comprehensive Scholarship: Friends of Tsinghua – PetroChina Scholarship.",
      },
    ],
  },
};
