import React from 'react';
import { 
    Card, 
    CardContent, 
    CardHeader, 
    List, 
    ListItem, 
    ListItemIcon, 
    ListItemText, 
    Divider, 
    Typography, 
    Link,
    Box, 
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WebIcon from '@mui/icons-material/Web';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import AvatarForm from './forms/AvatarForm';
import Grid from '@mui/material/Grid2';


const NFCProfileCard = ({ data }) => {

  const { 
    name, 
    position, 
    company, 
    email, 
    phone, 
    portfolio, 
    website, 
    nfcId, 
    socialLinks 
  } = data;

  //console.log("informations de la carte",data)

  const renderLink = (icon, label, url) => (
    <ListItem>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText
        primary={label}
        secondary={
          url ? (
            <Link href={url} target="_blank" rel="noopener noreferrer" underline="hover">
              {url}
            </Link>
          ) : 'N/A'
        }
      />
    </ListItem>
  );

  return (
    <Box  sx={{width:{xs:"100%",md:"100%"}, mt: 2 }}>
      <Grid container>
         <Grid size={{xs:12,sm:12,md:4}} >
            <CardHeader
                title={name}
                subheader={`${position} à ${company}`}
                sx={{ textAlign: 'center', padding: 2 }}
            />
             <AvatarForm  card={data} />
         </Grid>

         <Grid size={{xs:12,sm:12,md:4}} >
         <List>
          <ListItem>
            <ListItemIcon>
              <PersonIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="NFC ID" secondary={nfcId || 'N/A'} />
          </ListItem>
          <Divider variant="middle" />
          <ListItem> 
            <ListItemIcon>
              <EmailIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Email" secondary={email} />
          </ListItem>
          <Divider variant="middle" />
          <ListItem>
            <ListItemIcon>
              <PhoneIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Phone" secondary={phone} />
          </ListItem>
          <Divider variant="middle" />
          <ListItem>
            <ListItemIcon>
              <WebIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Portfolio" secondary={portfolio || 'N/A'} />
          </ListItem>
          <Divider variant="middle" />
          <ListItem>
            <ListItemIcon>
              <WebIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Website" secondary={website || 'N/A'} />
          </ListItem>
        </List>
         </Grid>


      <Grid size={{xs:12,sm:12,md:4}} >
        <List>

            {socialLinks.linkedIn && renderLink(<LinkedInIcon sx={{ color: '#0077b5' }} />, 'LinkedIn', socialLinks.linkedIn)}
            {socialLinks.github && renderLink(<GitHubIcon sx={{ color: '#333' }} />, 'GitHub', socialLinks.github)}
            {socialLinks.instagram && renderLink(<InstagramIcon sx={{ color: '#E4405F' }} />, 'Instagram', socialLinks.instagram)}
            {socialLinks.telegram && renderLink(<TelegramIcon sx={{ color: '#0088cc' }} />, 'Telegram', socialLinks.telegram)}
            {socialLinks.twitter && renderLink(<TwitterIcon sx={{ color: '#1DA1F2' }} />, 'Twitter', socialLinks.twitter)}
            {socialLinks.whatsapp && renderLink(<WhatsAppIcon sx={{ color: '#25D366' }} />, 'WhatsApp', socialLinks.whatsapp)}
            
        </List>
       
      </Grid>
      </Grid>

    
    </Box>
  );
};

export default NFCProfileCard;
