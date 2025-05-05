import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Email, Phone, LocationOn } from "@mui/icons-material";
import Grid from '@mui/material/Grid2';


const PersonalDetailPreview = ({resumeData,cvColor}) => {
  if (!resumeData) return null;

  return (
    <Card elevation={0} sx={{maxWidth: 800, mx: "auto" }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          {/* User Details */}
          <Grid>
            <Typography fontSize={15} variant="h5" component="div" fontWeight="bold">
              {resumeData.personalInfo?.fullName}
            </Typography>
            <Typography fontSize={12} variant="subtitle1" color="text.secondary">
              {resumeData.personalInfo?.jobTitle}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={1} mt={1}>
          {/* Address */}
          <Grid  size={{xs:6}} display="flex" alignItems="center">
            <LocationOn fontSize="small"  sx={{ mr: 1, color:`${cvColor}` }} />
            <Typography fontSize={12} variant="body2" color="text.secondary">
              {resumeData.personalInfo?.address}
            </Typography>
          </Grid>

          {/* Phone */}
          <Grid size={{xs:3}}  display="flex" alignItems="center">
            <Phone fontSize="small"  sx={{ mr: 1, color:`${cvColor}`  }} />
            <Typography fontSize={12} variant="body2" color="text.secondary">
              {resumeData.personalInfo?.phone}
            </Typography>
          </Grid>

          {/* Email */}
          <Grid size={{xs:3}} display="flex" alignItems="center">
            <Email fontSize="small"  sx={{ mr: 1, color:`${cvColor}`  }} />
            <Typography fontSize={12} variant="body2" color="text.secondary">
              {resumeData.personalInfo?.email}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PersonalDetailPreview;

