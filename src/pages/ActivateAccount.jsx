import { useEffect, useRef, useState } from "react";
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
import { useMutation } from "@tanstack/react-query";

const ActivateAccount = () => {

    const { token } = useParams();
    const [success, setSuccess] = useState(false)
    //console.log("Token =>",token)
    const navigate = useNavigate();
    const hasAttempted = useRef(false); // Pour éviter le double appel StrictMode



    const { mutate, isPending, isSuccess, isError, error, data } = useMutation({
        mutationFn: () => activateUserAccount(token),
        onSuccess: (data) => {
            console.log("✅ Mutation réussie côté UI !", data);
            setSuccess(true)
        },
        onError: (err) => {
            console.error("❌ Mutation échouée côté UI !", err);
        },
        onSettled: () => {
            console.log("🏁 Mutation terminée (succès ou erreur)");
        }
    });

    useEffect(() => {
        // On ne lance l'activation que si on a un token et qu'on ne l'a pas déjà fait
        if (token && !hasAttempted.current) {
            hasAttempted.current = true;
            mutate();
        }
    }, [token, mutate]);


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
                    {/* ÉTAT : SUCCÈS (Priorité maximale) */}
                    {success ? (
                        <>
                            <CheckCircleOutlineIcon sx={{ fontSize: 60, color: "green", mb: 2 }} />
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
                    ) : isError ? (
                        /* ÉTAT : ERREUR */
                        <>
                            <ErrorOutlineIcon sx={{ fontSize: 60, color: "red", mb: 2 }} />
                            <Typography variant="body1" sx={{ mb: 3 }}>
                                {error?.response?.data?.message || "Le lien d'activation est invalide ou a expiré."}
                            </Typography>
                            <Button
                                variant="outlined"
                                onClick={() => navigate("/")}
                                sx={{ borderRadius: "2rem", textTransform: "none", px: 4 }}
                            >
                                Retour à l'accueil
                            </Button>
                        </>
                    ) : (
                        /* ÉTAT : CHARGEMENT (Par défaut) */
                        <>
                            <CircularProgress sx={{ mb: 2 }} />
                            <Typography variant="h6">
                                Activation de votre compte...
                            </Typography>
                        </>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default ActivateAccount;
