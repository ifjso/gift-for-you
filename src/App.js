import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import GiftSystem from './components/GiftSystem';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#90caf9'
    },
    background: {
      default: '#121212'
    }
  }
});

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <GiftSystem />
    </MuiThemeProvider>
  );
};

export default App;
