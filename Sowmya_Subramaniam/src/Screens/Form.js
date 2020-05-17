import React, { Fragment, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import FormInput from '../Components/FormInput';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        // backgroundColor: '#606060', 
        borderRadius: '10px',
    },
    button:{
        margin: theme.spacing(1),
        backgroundColor:'#45ADA8'
        
    }
  }));
export const GET_FORM = gql`
  query GetFormList {
    dynamicForm @client{
        id
        type
        required
        field
        value
    }
  }
`;
const SUBMIT_FORM = gql`
  mutation submitForm{
    dynamicForm @client{
        id
        type
        required
        field
        value
    }
  }
`;
function Form() {
    const classes = useStyles();
    let { data,  error } = useQuery(GET_FORM);
    const [submitForm, { loading: mutationLoading, error: mutationError }] = useMutation(SUBMIT_FORM);
    let [changed, setChanged] = useState(false)
    let [fields, setField] = useState(!data || (!!data && data.dynamicForm.length === 0)? [] : data.dynamicForm.map(data=> {return {
        ...data,
        error:false,
        errorMessage:''
    }}))
    const onChangefield = (value, id) =>{
        let item = fields.map(item =>{
            if(item.id === id)
                item = {...item, value:value}
            return item
        } )
        setField(item)
        setChanged(true)
    }
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };
    const validated =()=>{
        let errorData = fields.map(item =>{
            if(item.required){
                switch(item.field){
                    case 'Email':
                        return item.value === ''?
                             {...item, error:true, errorMessage: 'Email field can not be empty' } : {...item, error:false, errorMessage: ''}
                            // (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(item.value) ?
                            //     {...item, error:true, errorMessage: 'Please Enter a valid email address' }: {...item, error:false, errorMessage: ''})
                        
                    case 'Name':
                        return item.value === ''? {...item, error:true, errorMessage: 'Name field can not be empty' }: {...item, error:false, errorMessage: ''}
                    default:
                        return {...item, error:false, errorMessage: ''}
                }

            }else
                return {...item, error:false, errorMessage: ''}
        })
        let error = errorData.filter(data => data.errorMessage !== '')
        setField(errorData)
        return !error.length > 0 
    }
    const sumbit = () =>{
        if(validated()){
            submitForm({  
                refetchQueries:[{query: GET_FORM}],
                update: (cache)=> {
                    cache.writeQuery({ query: GET_FORM, data: {dynamicForm: fields} });
                    setAlert({severity:"success", message:"Form submitted successfully!"})
                    handleClick()
                    setChanged(false)
            }})
        }
    }
    const [alert,setAlert] = useState({})
    if (error) return <p>ERROR: {error.message}</p>;
    return (
            <form className = {classes.root}>
                <div>
                    {fields.length === 0 ? (
                        <p data-testid="empty-message">No fields</p>
                    ) : (
                        <Fragment>
                        {!!fields &&
                            fields.map(item => (
                            <FormInput item= {item} onChangefield ={onChangefield}/>
                        ))}
                        <div>
                            <Button  
                                variant="contained" 
                                color="primary" 
                                disabled={!changed}
                                className={classes.button} 
                                onClick = {()=> {
                                    setField(data.dynamicForm)
                                    setAlert({severity:"warning", message:"Form reset"})
                                    handleClick()
                                }}
                            >
                                Reset
                            </Button>
                            <Button  
                                variant="contained" 
                                color="primary" 
                                className={classes.button}
                                onClick = {()=> sumbit()}
                            >
                                Submit
                            </Button>
                        </div>
                        </Fragment>
                    )}
                     <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{ vertical: 'top', horizontal: 'left' }} TransitionComponent= "SlideTransition">
                        <Alert onClose={handleClose} severity={alert.severity}>
                        {alert.message}
                        </Alert>
                    </Snackbar>
                    {mutationLoading && <p>Loading...</p>}
                    {mutationError && <p>Error :( Please try again</p>}
                </div>
            </form>
    );
}

export default Form;

function Alert(props) {
    return <MuiAlert  variant="filled" {...props} />;
  }