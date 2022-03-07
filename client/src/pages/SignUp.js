import React, { useState } from 'react';
import { makeStyles } from '@mui/material'; 
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Container } from '@mui/material';
import httpClient from '../httpClient';

// const useStyles = makeStyles(theme => ({
//     root: {
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'center',
//       alignItems: 'center',
//       padding: theme.spacing(2),
  
//       '& .MuiTextField-root': {
//         margin: theme.spacing(1),
//         width: '300px',
//       },
//       '& .MuiButtonBase-root': {
//         margin: theme.spacing(2),
//       },
//     },
//   }));


function SignUpComponent(props){
    // const classes = useStyles()
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = async () =>{
        try{
            const resp = await httpClient.post("//localhost:5000/register",{
                firstName,
                lastName,
                email,
                password
            });
        }catch(error){
            alert("Invalid Credentials");
        }
    }

    return(
        <div>
            <h2> Sign Up </h2>
            <Container maxWidth="sm" align="center">
            <form>
               <TextField 
               label = "First Name" 
               variant = "filled"
               placeholder="First Name"
               required
               value = {firstName}
               onChange={e => setFirstName(e.target.value)}
               />
               <TextField 
               label = "Last Name" 
               variant = "filled"
               placeholder="Last Name"
               required
               value = {lastName}
               onChange={e=> setLastName(e.target.value)}
               />
               <TextField 
               label = "Email" 
               variant = "filled"
               type = "email"
               placeholder="example@gmail.com"
               required
               value = {email}
               onChange={e=> setEmail(e.target.value)}
               />
               <TextField 
               label = "Password" 
               variant = "filled"
               required
               type = "password"
               value = {password}
               onChange = {e => setPassword(e.target.value)}
               />
            </form>
            </Container>
            <div>
                <Button variant="contained" color="primary">
                    Sign Up
                </Button>
            </div>
        </div>
    );
};

export default SignUpComponent;