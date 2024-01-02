import React from 'react';
import Button from '@mui/material/Button';
import { styled, useTheme } from '@mui/system';

// Create a custom styled component
const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 200,
  letterSpacing: '1px',
  padding: '13px 20px 13px',
  outline: 0,
  border: '1px solid #303030',
  color: 'white',
  cursor: 'pointer',
  position: 'relative',
  backgroundColor: 'rgba(0,0,0,0)',
  userSelect: 'none',
  WebkitUserSelect: 'none',
  touchAction: 'manipulation',
  '&:hover': {
    color: '#fff',
    '&:after': {
      top: '0px',
      left: '0px',
    },
  },
  '&:after': {
    content: '""',
    backgroundColor: '#f8c0d8',
    width: '100%',
    zIndex: -1,
    position: 'absolute',
    height: '100%',
    top: '7px',
    left: '7px',
    transition: '0.2s',
  },
}));



const CustomStyledButton = (props) => {
  const theme = useTheme();

  return (
    <StyledButton
      {...props} // Pass through any other Button props
      sx={{
        marginTop: '1rem',
        paddingTop: '0.5rem',
        backgroundColor: theme.palette.primary.main,
        borderRadius: '0',
        ':hover': {
          backgroundColor: 'rgba(70, 127, 207, 0.85)',
          boxShadow: '0 5px 15px rgba(145, 92, 182, .4)',
        },
      }}
    />
  );
};

export default CustomStyledButton;
