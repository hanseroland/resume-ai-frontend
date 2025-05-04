import { axiosInstance } from ".";

// Obtenir tous les cv
export const GetAllResumes = async () => {
    const response = await axiosInstance("get", "/resumes");
    return response;
};

// Obtenir CV en fonction du resumeId
export const GetOneResume = async (userId) => {
    const response = await axiosInstance("get", `/resumes/${userId}`);
    return response;
};

// Obtenir tous les cv en fonction du userId
export const GetUserResumes = async (userId) => {
    const response = await axiosInstance("get", `/resumes/user/${userId}`);
    return response;
};

//créer un cv par le titre
export const CreateResume = async (values) => {
    const response = await axiosInstance("post", "/resumes/create",values);
    return response;
};

//supprimer un cvUpdateLanguages
export const DeleteResume = async (resumeId) => {
    const response = await axiosInstance("delete", `/resumes/delete-resume/${resumeId}`);
    return response;
};

//modifier les info personnelles
export const UpdatePersonalInfo = async (resumeId, values) => {
    const response = await axiosInstance("put", `/resumes/update-personal-info/${resumeId}`,values);
    return response;
};

//modifier le résumé du profil
export const UpdateSummaryInfo = async (resumeId, values) => {
    const response = await axiosInstance("put", `/resumes/update-summary-info/${resumeId}`,values);
    return response;
};

// Générer du text du CV via l'IAUpdateLanguages
export const GenerateText = async (prompt) => {
    const response = await axiosInstance("post", `/reUpdateLanguagessumes/generate-text`, { prompt });
    return response;
};

// Générer du text du CV via l'IA
export const GenerateThreeText = async (prompt) => {
    const response = await axiosInstance("post", `/resumes/generate-three-textes`, { prompt });
    return response;
};


// Générer une Expérience du CV via l'IA
export const GenerateExperienceList = async (prompt) => {
    const response = await axiosInstance("post", `/resumes/generate-experience-list`, { prompt });
    return response;
};

//modifier les expériences
export const UpdateExperiences = async (resumeId, values) => {
    const response = await axiosInstance("put", `/resumes/update-experiences-info/${resumeId}`,values);
    return response;
};

//modifier les educations
export const UpdateEducations = async (resumeId, values) => {
    const response = await axiosInstance("put", `/resumes/update-educations-info/${resumeId}`,values);
    return response;
};

//modifier les compétences
export const UpdateSkills = async (resumeId, values) => {
    const response = await axiosInstance("put", `/resumes/update-skills-info/${resumeId}`,values);
    return response;
};


//modifier les projets
export const UpdateProjects = async (resumeId, values) => {
    const response = await axiosInstance("put", `/resumes/update-projects-info/${resumeId}`,values);
    return response;
};


//modifier les certifications
export const UpdateCertifications = async (resumeId, values) => {
    const response = await axiosInstance("put", `/resumes/update-certifications-info/${resumeId}`,values);
    return response;
};

//modifier les hobbies
export const UpdateHobbies = async (resumeId, values) => {
    const response = await axiosInstance("put", `/resumes/update-hobbies-info/${resumeId}`,values);
    return response;
};

//modifier les langues
export const UpdateLanguages = async (resumeId, values) => {
    const response = await axiosInstance("put", `/resumes/update-languages-info/${resumeId}`,values);
    return response;
};