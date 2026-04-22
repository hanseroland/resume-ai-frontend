 import { apiClient } from "./fetchApi";


 /*********************
 * ROUTES STATISTIQUES
 *********************/

// compter tous les CV
export const CountAllResume =  () => 
      apiClient('/resumes/stats/count-all', {method:'GET'});
    


// compter tous les CV par mois
export const CountAllResumeByMonthly =  () => 
      apiClient('/resumes/stats/monthly', {method:'GET'});
    



// compter tous les CV par mois
export const CountAllResumeByWeeklyActivity =  () => 
      apiClient('/resumes/stats/weekly-activity', {method:'GET'});
    


// calculer la performance hebdomadaire (augmentation ou diminution en %)
export const CountAllResumeByWeeklyPerformance =  () => 
      apiClient('/resumes/stats/weekly-performance', {method:'GET'});
    


 /************************
 * ROUTES LIEES AUX USERS
 *************************/

// Obtenir tous les cv en fonction du userId
export const GetUserResumes =  (userId) => 
      apiClient(`/resumes/user/${userId}`, {method:'GET'});
    

// Obtenir tous les cv en fonction du userId
export const GetLatestUserResumes =  (userId) => 
      apiClient(`/resumes/user/${userId}/latest`, {method:'GET'});
    


// compter le nombre de CV d'un utilisateur
export const CountUserResume =  (userId) => 
      apiClient(`/resumes/user/${userId}/count`, {method:'GET'});
    


/********************************
 * CRUD
 *******************************/

// Obtenir tous les cv
export const GetAllResumes =  () =>  apiClient('/resumes', {method:'GET'});

//créer un cv par le titre
export const CreateResume =  (values) => apiClient("/resumes/", {method:'POST', body:values});
    

// Obtenir CV en fonction du resumeId
export const GetOneResume =  (resumeId) => apiClient(`/resumes/${resumeId}`, {method:'GET'});
    

//supprimer un cvUpdateLanguages
export const DeleteResume =  (resumeId) => apiClient(`/resumes/${resumeId}`, {method:'DELETE'});
    


/***********************************
 * 
 * ROUTES AI (Génération de contenu)
 *
 **********************************/

// Générer du text du CV via OPENAI
export const GenerateText =  (prompt) => 
      apiClient('/resumes/openai-generate-text', {method:'POST', body:prompt });
    

// Générer du text du CV via OPENAI
export const GenerateThreeText =  (prompt) => 
      apiClient('/resumes/openai-generate-three-textes', {method:'POST', body:prompt });
    


// Générer une Expérience du CV via OPENAI
export const GenerateExperienceList =  (prompt) => 
      apiClient('/resumes/openai-generate-experience-list', {method:'POST', body: prompt });
    

// Générer du text du CV via GEMINI
export const GenerateGeminiText =  (prompt) => 
      apiClient('/resumes/gemini-generate-text', {method:'POST', body:prompt });
    

// Générer du text du CV via GEMINI
export const GenerateThreeGeminiText =  (prompt) => 
      apiClient('/resumes/gemini-generate-three-textes', { method:'POST', body:prompt });
    


// Générer une Expérience du CV via GEMINI
export const GenerateGeminiExperienceList =  (prompt) => 
      apiClient('/resumes/gemini-generate-experience-list', { method:'POST', body:prompt });
    


/********************************************
 * MISES À JOUR PARTIELLES (Sections du CV)
 *******************************************/


//modifier les info personnelles
export const UpdatePersonalInfo =  (resumeId, values) => 
      apiClient(`/resumes/${resumeId}/personal-info`, { method:'PUT', body:values});
    

//modifier le résumé du profil
export const UpdateSummaryInfo =  (resumeId, values) => 
      apiClient(`/resumes/${resumeId}/summary`, { method:'PUT', body:values});
    


//modifier les expériences
export const UpdateExperiences =  (resumeId, values) => 
      apiClient(`/resumes/${resumeId}/experiences`, { method:'PUT', body:values});
    

//modifier les educations
export const UpdateEducations =  (resumeId, values) => 
      apiClient(`/resumes/${resumeId}/educations`, { method:'PUT', body:values});
    

//modifier les compétences
export const UpdateSkills =  (resumeId, values) => 
      apiClient(`/resumes/${resumeId}/skills`, { method:'PUT', body:values});
    


//modifier les projets
export const UpdateProjects =  (resumeId, values) => 
      apiClient(`/resumes/${resumeId}/projects`, { method:'PUT', body:values});
    


//modifier les certifications
export const UpdateCertifications =  (resumeId, values) => 
      apiClient(`/resumes/${resumeId}/certifications`, { method:'PUT', body:values});
    


//modifier les hobbies
export const UpdateHobbies =  (resumeId, values) => 
      apiClient(`/resumes/${resumeId}/hobbies`, { method:'PUT', body:values});
    

//modifier les langues
export const UpdateLanguages =  (resumeId, values) => 
      apiClient(`/resumes/${resumeId}/languages`, { method:'PUT', body:values});
    

