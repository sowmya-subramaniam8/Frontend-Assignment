import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import {EmailTwoTone, AccountCircleTwoTone, PhoneAndroidTwoTone, CakeTwoTone} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
      color: 'white'
    },
    inputIcon :{
        backgroundColor: '#547980'
    }
  },
}));

export default function FormInput({item, onChangefield}) {
    const classes = useStyles();
    const inputAdorn = (value)=>{
        switch(value){
            case 'Email':
                return <EmailTwoTone style = {{color:'#9DE0AD'}}  fontSize="large"/>
            case 'Name':
                return <AccountCircleTwoTone style = {{color:'#9DE0AD'}}  fontSize="large" />
            case 'Phone Number':
                return <PhoneAndroidTwoTone style = {{color:'#9DE0AD'}}  fontSize="large"/>
            case 'Birthday':
                return <CakeTwoTone style = {{color:'#9DE0AD'}} fontSize="large" />
            default:
                return
        }
    }
    return (
        <div className = {classes.root}>
            <TextField
                required = {item.required}
                id={item.id}
                label={item.field}
                type = {item.type}
                variant="outlined"
                value = {item.value}
                onChange = {text=>{
                        onChangefield(text.target.value, item.id)
                    }}
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start" >
                        {inputAdorn(item.field)}
                    </InputAdornment>
                    ),
                }}
                maxLength = {item.type === 'number'? 15:60 }
                error = {item.error}
                helperText={item.errorMessage}
            />
        </div>
    );
}
