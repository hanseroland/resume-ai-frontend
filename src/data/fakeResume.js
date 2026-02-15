export const fakeResume = {
    userId: "64a5cdef5a3f4a0012abc123", // Un faux ObjectId
    title: "Développeur Full Stack",
    personalInfo: {
      fullName: "John Doe",
      jobTitle: "Développeur Web",
      address: "123, Rue de la Paix, Paris, France",
      phone: "33612345678",
      email: "johndoe@example.com",
    },
    summary: "Développeur Full Stack expérimenté avec 5 ans d'expérience en conception et développement d'applications web performantes et sécurisées. Passionné par les technologies modernes et le travail en équipe.",
    experiences: [
      {
        jobTitle: "Développeur Frontend",
        companyName: "Tech Innovators",
        city: "Paris",
        country: "France",
        startDate: new Date("2019-01-01"),
        endDate: new Date("2021-06-01"),
        description: "Développement d'interfaces utilisateur réactives avec ReactJS et intégration avec des API REST.",
      },
      {
        jobTitle: "Développeur Full Stack",
        companyName: "Creative Solutions",
        city: "Lyon",
        country: "France",
        startDate: new Date("2021-07-01"),
        endDate: new Date("2023-12-01"),
        description: "Conception et développement d'applications web full-stack en utilisant Node.js et MongoDB.",
      },
    ],
    skills: ["JavaScript", "React", "Node.jsx", "MongoDB", "TypeScript", "Docker", "Git"],
    educations: [
      {
        degree: "Master en Informatique",
        schoolName: "Université Paris-Sorbonne",
        city: "Paris",
        country: "France",
        startDate: new Date("2015-09-01"),
        endDate: new Date("2018-06-30"),
      },
      {
        degree: "Licence en Informatique",
        schoolName: "Université Lyon 1",
        city: "Lyon",
        country: "France",
        startDate: new Date("2012-09-01"),
        endDate: new Date("2015-06-30"),
      },
    ],
    hobbies: ["Lecture", "Voyage", "Jeux vidéo", "Photographie"],
    certifications: [
      {
        title: "Certification React",
        issuingOrganization: "Coursera",
        dateIssued: new Date("2020-11-01"),
        description: "Maîtrise avancée de React pour le développement d'applications web modernes.",
      },
      {
        title: "AWS Certified Solutions Architect",
        issuingOrganization: "Amazon Web Services",
        dateIssued: new Date("2022-05-01"),
        description: "Certification des compétences en conception et déploiement d'applications évolutives sur AWS.",
      },
    ],
    projects: [
      {
        title: "Gestionnaire de tâches collaboratif",
        description: "Application web permettant aux équipes de collaborer efficacement en organisant leurs tâches et projets.",
        technologies: ["React", "Node.jsx", "MongoDB", "GraphQL"],
        link: "https://github.com/johndoe/task-manager",
      },
      {
        title: "E-commerce moderne",
        description: "Plateforme e-commerce développée avec React et intégration Stripe pour les paiements.",
        technologies: ["React", "Redux", "Stripe API"],
        link: "https://github.com/johndoe/e-commerce-platform",
      },
    ],
  };
  
  