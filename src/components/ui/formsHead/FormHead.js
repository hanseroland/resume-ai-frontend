import React from 'react'
import { Box, Typography } from '@mui/material'

function FormHead({title, description}) {


    return (
    <Box>
           <Box
            sx={{
                maxWidth: 800,
                mx: "auto",
                p:1,
                border: "1px solid #e0e0e0",
                borderRadius: 4,
                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#ffffff",
                
              }}
           >
                {/* Titre du formulaire */}
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="textPrimary"
                    gutterBottom
                    fontSize={15}
                >
                    {title}
                </Typography>
                <Typography
                    variant="body1"
                    color="textSecondary"
                    fontSize={12}
                >
                    {description}
                </Typography>
           </Box>

    </Box>
  )
}

export default FormHead