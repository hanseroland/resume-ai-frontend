import { useEffect, useState } from 'react'
import { Download, Share } from '@mui/icons-material'
import { Box, Button, CircularProgress, Container, Typography } from '@mui/material'
import ResumePreview from '../components/ui/preview/ResumePreview'
import { useParams } from 'react-router-dom';
import { GetOneResume } from '../api/resumes';
import { ResumeStyleContext } from '../context/ResumeStyleContext';
import { ResumeInfoContext } from '../context/ResumeInfoContext';

function ResumeView() {

    const params = useParams();
    const [resumeData, setResumeData] = useState();
    const [loading, setLoading] = useState(true);
    const [cvColor, setCvColor] = useState("#000");

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const response = await GetOneResume(params?.resumeId);
                setResumeData(response.data || {});
            } catch (err) {
                console.error("Erreur lors du chargement du CV :", err);
            } finally {
                setLoading(false);
            }
        };

        if (params?.resumeId) fetchResume();
    }, [params?.resumeId]);


    const DownloadResume = () => {
        // Logic to download the resume as PDF
        window.print();
    }


    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
                @media print {
                #resume-header {
                    display: none !important;
                }

                #app-bar {
                    display: none !important;
                }

                #side-bar {
                    display: none !important;
                }

                @page {
                size: auto;
                margin: 0mm;

                }
                
                body {
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                    margin: 0;
                    box-shadow: none;
                }
                }
  `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (


        <ResumeStyleContext.Provider value={{ cvColor, setCvColor }}>
            <ResumeInfoContext.Provider value={{ resumeData, setResumeData }}>
                <Container
                    maxWidth="lg"
                >

                    {loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                            <CircularProgress />
                        </Box>
                    ) : (
                        <>
                            {/*header*/}
                            <Box
                                id="resume-header"
                                sx={{
                                    display: 'flex',
                                    flexDirection: { lg: 'row', xs: 'column' },
                                    justifyContent: { lg: 'space-between', xs: 'center' },
                                    alignItems: 'center',
                                    gap: 2,
                                    my: 2,
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontSize: { lg: 30, xs: 15 },
                                    }}
                                >
                                    Congrats your resume it's finished
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: 2,
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        startIcon={<Download />}
                                        size="medium"
                                        sx={{ textTransform: 'none' }}
                                        onClick={DownloadResume}
                                    >
                                        Download
                                    </Button>
                                    <Button
                                        variant="contained"
                                        startIcon={<Share />}
                                        size="medium"
                                        sx={{ textTransform: 'none' }}
                                    >
                                        Share
                                    </Button>
                                </Box>
                            </Box>

                            {/*resume preview*/}
                            <Box
                                id="resume-preview"
                                sx={{
                                    width: '100%',
                                    minHeight: '297mm',
                                    margin: 'auto',
                                    backgroundColor: '#fff',
                                    padding: '5mm',
                                    boxSizing: 'border-box',
                                    '@media (max-width: 600px)': {
                                        width: '100%',
                                        height: 'auto',
                                        padding: '5mm',
                                    },
                                }}
                            >
                                <ResumePreview />
                            </Box>
                        </>
                    )}

                </Container>
            </ResumeInfoContext.Provider>
        </ResumeStyleContext.Provider>

    )
}

export default ResumeView