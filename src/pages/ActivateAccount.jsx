import { useEffect, useState } from "react";
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

const ActivateAccount = () => {

    const { token } = useParams();
    const navigate = useNavigate();

    const [status, setStatus] = useState("loading"); // loading | success | error
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!token) return;

        const activateAccount = async () => {
            try {
                const res = await activateUserAccount(token);

                setStatus("success");
                setMessage(res.message || "Compte activé avec succès.");
            } catch (error) {
                setStatus("error");
                setMessage(
                    error.response?.data?.message ||
                    "Lien invalide ou expiré."
                );
            }
        };

        activateAccount();
    }, [token]);

    const handleLoginRedirect = () => {
        navigate("/connexion");
    };

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

                    {status === "loading" && (
                        <>
                            <CircularProgress sx={{ mb: 2 }} />
                            <Typography variant="h6">
                                Activation de votre compte...
                            </Typography>
                        </>
                    )}

                    {status === "success" && (
                        <>
                            <CheckCircleOutlineIcon
                                sx={{ fontSize: 60, color: "green", mb: 2 }}
                            />
                            <Typography variant="h6" gutterBottom>
                                Compte activé 🎉
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3 }}>
                                {message}
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={handleLoginRedirect}
                                sx={{
                                    textTransform: "none",
                                    px: 4,
                                }}
                            >
                                Se connecter
                            </Button>
                        </>
                    )}

                    {status === "error" && (
                        <>
                            <ErrorOutlineIcon
                                sx={{ fontSize: 60, color: "red", mb: 2 }}
                            />
                            <Typography variant="h6" gutterBottom>
                                Activation impossible
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3 }}>
                                {message}
                            </Typography>
                            <Button
                                variant="outlined"
                                onClick={() => navigate("/")}
                                sx={{
                                    borderRadius: "2rem",
                                    textTransform: "none",
                                    px: 4,
                                }}
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
