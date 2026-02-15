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

// Obtenir tous les cv en fonction du userId
export const GetLatestUserResumes = async (userId) => {
    const response = await axiosInstance("get", `/resumes/user/${userId}/latest`);
    return response;
};

//créer un cv par le titre
export const CreateResume = async (values) => {
    const response = await axiosInstance("post", "/resumes/create", values);
    return response;
};

//supprimer un cvUpdateLanguages
export const DeleteResume = async (resumeId) => {
    const response = await axiosInstance("delete", `/resumes/delete-resume/${resumeId}`);
    return response;
};

//modifier les info personnelles
export const UpdatePersonalInfo = async (resumeId, values) => {
    const response = await axiosInstance("put", `/resumes/update-personal-info/${resumeId}`, values);
    return response;
};

//modifier le résumé du profil
export const UpdateSummaryInfo = async (resumeId, values) => {
    const response = await axiosInstance("put", `/resumes/update-summary-info/${resumeId}`, values);
    return response;
};


/*************************** */
/*Routes avec l'API de OpenAI*
/
/***************************/

// Générer du text du CV via OPENAI
export const GenerateText = async (prompt) => {
    const response = await axiosInstance("post", `/resumes/openai-generate-text`, { prompt });
    return response;
};

// Générer du text du CV via OPENAI
export const GenerateThreeText = async (prompt) => {
    const response = await axiosInstance("post", `/resumes/openai-generate-three-textes`, { prompt });
    return response;
};


// Générer une Expérience du CV via OPENAI
export const GenerateExperienceList = async (prompt) => {
    const response = await axiosInstance("post", `/resumes/openai-generate-experience-list`, { prompt });
    return response;
};

/** FIN API de OPENAI ******/


/*************************** */
/*Routes avec l'API de GEMINI*
/
/***************************/

// Générer du text du CV via GEMINI
export const GenerateGeminiText = async (prompt) => {
    const response = await axiosInstance("post", `/resumes/gemini-generate-text`, { prompt });
    return response;
};

// Générer du text du CV via GEMINI
export const GenerateThreeGeminiText = async (prompt) => {
    const response = await axiosInstance("post", `/resumes/gemini-generate-three-textes`, { prompt });
    return response;
};


// Générer une Expérience du CV via GEMINI
export const GenerateGeminiExperienceList = async (prompt) => {
    const response = await axiosInstance("post", `/resumes/gemini-generate-experience-list`, { prompt });
    return response;
};

/** FIN API de GEMINI ******/



//modifier les expériences
export const UpdateExperiences = async (resumeId, values) => {
    const response = await axiosInstance("put", `/resumes/update-experiences-info/${resumeId}`, values);
    return response;
};

//modifier les educations
export const UpdateEducations = async (resumeId, values) => {
    const response = await axiosInstance("put", `/resumes/update-educations-info/${resumeId}`, values);
    return response;
};

//modifier les compétences
export const UpdateSkills = async (resumeId, values) => {
    const response = await axiosInstance("put", `/resumes/update-skills-info/${resumeId}`, values);
    return response;
};


//modifier les projets
export const UpdateProjects = async (resumeId, values) => {
    const response = await axiosInstance("put", `/resumes/update-projects-info/${resumeId}`, values);
    return response;
};


//modifier les certifications
export const UpdateCertifications = async (resumeId, values) => {
    const response = await axiosInstance("put", `/resumes/update-certifications-info/${resumeId}`, values);
    return response;
};

//modifier les hobbies
export const UpdateHobbies = async (resumeId, values) => {
    const response = await axiosInstance("put", `/resumes/update-hobbies-info/${resumeId}`, values);
    return response;
};

//modifier les langues
export const UpdateLanguages = async (resumeId, values) => {
    const response = await axiosInstance("put", `/resumes/update-languages-info/${resumeId}`, values);
    return response;
};