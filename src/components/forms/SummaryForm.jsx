import React, { useContext, useState } from 'react';
import { ResumeInfoContext } from '../../context/ResumeInfoContext';
import {
    Box,
    TextField,
    Button,
    Typography,
    CircularProgress,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import FormHead from '../ui/formsHead/FormHead';
import Grid from "@mui/material/Grid2";
import { GenerateThreeGeminiText } from '../../api/resumes';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import SelectionDialog from '../ui/dialogs/SelectionDialog';
import ResumeList from '../ui/list/ResumeList';
import { useResumes } from '../../hooks/useResumes';
import { useAuth } from '../../context/authContext';

function SummaryForm({ enableNext, resumeId }) {
    const { resumeData, setResumeData } = useContext(ResumeInfoContext);
    const { user } = useAuth(); // On a besoin du userId pour le hook useResumes
    
    // Utilisation de ton hook centralisé
    const { updateSummary, isUpdatingSummary } = useResumes(user?._id);

    const [isGeneratingIA, setIsGeneratingIA] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [generatedSummaries, setGeneratedSummaries] = useState([]);

    const validationSchema = Yup.object({
        summary: Yup.string().required("Le résumé est requis pour continuer"),
    });

    // Mise à jour locale (Preview) et validation du bouton "Suivant"
    const handleChange = (e, setFieldValue) => {
        const { name, value } = e.target;
        setFieldValue(name, value);
        setResumeData((prev) => ({ ...prev, [name]: value }));
        enableNext(value.trim().length > 10); // Active "Suivant" si assez de texte
    };

    // Gestion de la sauvegarde via React Query
    const handleSubmit = (values) => {
        updateSummary({ 
            resumeId: resumeId, 
            values: values 
        }, {
            onSuccess: () => {
                alert("Résumé enregistré avec succès !");
                enableNext(true);
            }
        });
    };

    // Appel à l'IA Gemini
    const handleGenerateThreeSubmit = async () => {
        setIsGeneratingIA(true);
        try {
            const jobTitle = resumeData?.personalInfo?.jobTitle || resumeData?.title;
            const prompt = `Génère 3 résumés professionnels percutants (max 300 caractères) pour un profil : ${jobTitle}.`;

            const response = await GenerateThreeGeminiText(prompt);

            if (response?.success && response?.data?.summaries) {
                setGeneratedSummaries(response.data.summaries);
                setOpenDialog(true);
            } else {
                alert("L'IA n'a pas pu générer de texte. Vérifiez votre connexion.");
            }
        } catch (error) {
            console.error("Erreur IA:", error);
        } finally {
            setIsGeneratingIA(false);
        }
    };

    const handleSelectSummary = (summary, setFieldValue) => {
        setFieldValue("summary", summary);
        setResumeData((prev) => ({ ...prev, summary }));
        setOpenDialog(false);
        enableNext(true);
    };

    return (
        <Box>
            <FormHead
                title="Résumé"
                description="Présentez votre parcours de manière concise pour capter l'attention des recruteurs."
            />

            <Box sx={{ maxWidth: 800, mx: "auto", p: 4, mt: 2, border: "1px solid #e0e0e0", borderRadius: 4, bgcolor: 'white' }}>
                {resumeData ? (
                    <Formik
                        enableReinitialize
                        initialValues={{ summary: resumeData?.summary || "" }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched, setFieldValue, values }) => (
                            <Form>
                                <Box mb={2} display="flex" justifyContent="flex-end">
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        disabled={isGeneratingIA}
                                        startIcon={isGeneratingIA ? <CircularProgress size={20} /> : <AutoFixHighIcon />}
                                        onClick={handleGenerateThreeSubmit}
                                        sx={{ textTransform: 'none', borderRadius: '20px' }}
                                    >
                                        {isGeneratingIA ? "Génération..." : "Inspirations IA"}
                                    </Button>
                                </Box>

                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 12 }}>
                                        <Field
                                            as={TextField}
                                            fullWidth
                                            name="summary"
                                            label="Résumé professionnel"
                                            multiline
                                            rows={8}
                                            onChange={(e) => handleChange(e, setFieldValue)}
                                            error={touched.summary && Boolean(errors.summary)}
                                            helperText={touched.summary && errors.summary}
                                            placeholder="Ex: Développeur Fullstack passionné par les solutions SaaS..."
                                        />
                                    </Grid>

                                    <SelectionDialog
                                        open={openDialog}
                                        onClose={() => setOpenDialog(false)}
                                    >
                                        <ResumeList
                                            textes={generatedSummaries}
                                            onSelect={(summary) => handleSelectSummary(summary, setFieldValue)}
                                        />
                                    </SelectionDialog>
                                </Grid>

                                <Box mt={3} display="flex" justifyContent="flex-end">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={isUpdatingSummary || !values.summary}
                                        sx={{ px: 4, textTransform: 'none' }}
                                    >
                                        {isUpdatingSummary ? <CircularProgress size={24} color="inherit" /> : "Enregistrer"}
                                    </Button>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                ) : (
                    <Box display="flex" justifyContent="center" p={5}>
                        <CircularProgress />
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default SummaryForm;