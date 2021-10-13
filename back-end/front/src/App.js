import './App.css';
import Shortener from './Components/Shortener'
import { Grid } from '@material-ui/core';

function App() {
  return (  
    <Grid className="App" container direction='column' justify='center' alignItems='center'>
      <Shortener />
    </Grid>
  );
}

export default App;
