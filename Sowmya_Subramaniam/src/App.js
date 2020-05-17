import React from 'react';
import './App.css';
import Form from './Screens/Form';
import Footer from './Components/Footer';
import { makeStyles } from '@material-ui/core/styles';
import {EmailTwoTone, PhoneTwoTone} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor:'#594F4F',
    display: 'flex', 
    flex:1, 
    color:'white', 
    justifyContent:'flex-end',
    alignItems:'center',
    paddingRight: theme.spacing(5),
  },
}));


function App() {
  const classes = useStyles()
  return (
    <div className="App">
      <div className = {classes.root}>
      <PhoneTwoTone  fontSize="large"/>
        <EmailTwoTone  fontSize="large"/>
        <p style ={{padding:'2px'}}>CONTACT US!</p></div>
      <header className="App-header">
        <Form />
      </header>
      <Footer />
    </div>
  );
}

export default App;
