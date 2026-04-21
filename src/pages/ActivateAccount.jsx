import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Button,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { activateUserAccount } from "../api/auth";
import { useQuery } from "@tanstack/react-query";

const ActivateAccount = () => {

    const { token } = useParams();
    const navigate = useNavigate();

    // On utilise useQuery car l'action est automatique au montage
    const { isLoading, isSuccess, isError, error, data } = useQuery({
        queryKey: ['activateAccount', token],
        queryFn: () => activateUserAccount(token),
        enabled: !!token, // Ne s'exécute que si le token existe
        retry: false,     // On ne veut pas réessayer si le lien est mort
        staleTime: 0,     // L'activation est une action unique
    });


    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
            }}
        >
            <Card
                sx={{
                    maxWidth: 450,
                    width: "100%",
                    borderRadius: "2rem",
                    boxShadow: 3,
                    textAlign: "center",
                    p: 3,
                }}
            >
                <CardContent>

                    {/* ÉTAT : CHARGEMENT */}
                    {isLoading && (
                        <>
                            <CircularProgress sx={{ mb: 2 }} />
                            <Typography variant="h6">
                                Activation de votre compte...
                            </Typography>
                        </>
                    )}

                    {/* ÉTAT : SUCCÈS */}
                    {isSuccess && (
                        <>
                            <CheckCircleOutlineIcon
                                sx={{ fontSize: 60, color: "green", mb: 2 }}
                            />
                            <Typography variant="h6" gutterBottom>
                                Compte activé 🎉
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3 }}>
                                {data?.message || "Votre compte est désormais actif."}
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={() => navigate("/connexion")}
                                sx={{ textTransform: "none", px: 4, borderRadius: "2rem" }}
                            >
                                Se connecter
                            </Button>
                        </>
                    )}

                    {/* ÉTAT : ERREUR */}
                    {(isError || !token) && (
                        <>
                            <ErrorOutlineIcon
                                sx={{ fontSize: 60, color: "red", mb: 2 }}
                            />
                            <Typography variant="h6" gutterBottom>
                                Activation impossible
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3 }}>
                                {error?.message || "Le lien d'activation est invalide ou a expiré."}
                            </Typography>
                            <Button
                                variant="outlined"
                                onClick={() => navigate("/")}
                                sx={{ borderRadius: "2rem", textTransform: "none", px: 4 }}
                            >
                                Retour à l'accueil
                            </Button>
                        </>
                    )}

                </CardContent>
            </Card>
        </Box>
    );
};

export default ActivateAccount;
