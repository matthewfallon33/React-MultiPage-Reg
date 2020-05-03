import React from 'react';
import { Typography, AppBar } from '@material-ui/core';

const Header = (props) => {

  return(
    <AppBar>
    <Typography variant="h6" style={{textAlign: 'center'}}>
    {props.text}
    </Typography>
  </AppBar>

  );

}

export default Header;
