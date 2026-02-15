import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const SimpleLayout = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.default',
        p: 2,
      }}
    >
      <Outlet />
    </Box>);
};

export default SimpleLayout;   