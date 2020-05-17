import React from 'react';
import {Phone, Drafts} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root:{
        paddingRight: theme.spacing(5),
        display: 'flex', 
        flex:1, 
        flexDirection:'column',
        alignItems:'flex-end',
        justifyContent: 'center',
        textAlign:'center'
    },
    contact:{
        display: 'flex', 
        justifyContent: 'center'
    }
  }));
export default function Footer(){
    const classes = useStyles()
    return(
        <footer className = "App-footer">
            <div className = {classes.root}>
                <p>Sowmya Subramaiam</p>
                {/* <div className = {classes.contact}><Phone /> +91-9036896034</div> */}
                <div className = {classes.contact}><Drafts /><a href="mailto:sowmya.subbu8@gmail.com" style={{textDecoration:'none', color:'white'}}>  sowmya.subbu8@gmail.com</a></div>
            </div>
        </footer>
    );
}