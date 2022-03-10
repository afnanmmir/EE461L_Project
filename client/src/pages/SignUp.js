import React, { useState } from 'react';
import { Box, Grid, makeStyles, Modal } from '@mui/material'; 
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Container } from '@mui/material';
import httpClient from '../httpClient';
import { useAuthContext } from '../Authentication';
import { useNavigate } from 'react-router-dom';
import { AuthClass } from '../Authentication';
import { Typography } from '@mui/material'

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
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [modalVal, setModalVal] = useState('');
    const[showModal, setShowModal] = useState(false);
    const auth = useAuthContext();
    const navigate = useNavigate();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }; //From React docs

    const handleOpen = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    // const registerUser = async () =>{
    //     try{
    //         const resp = await httpClient.post("//localhost:5000/register",{
    //             firstName,
    //             lastName,
    //             email,
    //             password
    //         });
    //     }catch(error){
    //         alert("Invalid Credentials");
    //     }
    // }
    const emailRegEx = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";


    return(
        <div>
            <Box height= "100vh" flex="1" display="flex" justifyContent="center" alignItems= "center"  >
                <Grid container direction={"column"} spacing={0.75}  align = "center" justify = "center" alignItems = "center">
                    <h2>Sign Up</h2>
                    <Grid item>
                        <Grid container direction={"row"} spacing={0.5} alignItems="center" flexDirection="row">
                            <Grid item>
                                <TextField 
                                label = "First Name" 
                                variant = "filled"
                                placeholder="First Name"
                                required
                                value = {firstName}
                                onChange={e => setFirstName(e.target.value)}
                                style={{width:150}}
                                />
                            </Grid>
                            <Grid item>
                                <TextField 
                                label = "Last Name" 
                                variant = "filled"
                                placeholder="Last Name"
                                required
                                value = {lastName}
                                onChange={e=> setLastName(e.target.value)}
                                style={{width:150}}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <TextField 
                            label = "Email" 
                            variant = "filled"
                            type = "email"
                            placeholder="example@gmail.com"
                            required
                            value = {email}
                            onChange={e=> setEmail(e.target.value)}
                            style={{width:300}}
                            error={!email.match(emailRegEx)}
                            helperText={!email.match(emailRegEx) ? 'Enter a valid email address': ''}
                            />
                    </Grid>
                    <Grid item>
                        <TextField 
                        label = "Password" 
                        variant = "filled"
                        required
                        type = "password"
                        value = {password}
                        onChange = {e => setPassword(e.target.value)}
                        style={{width:300}}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                        label = "Confirm Password"
                        variant='filled'
                        required
                        type="password"
                        value={confirmedPassword}
                        onChange = {e => setConfirmedPassword(e.target.value)}
                        style = {{width:300}}
                        error={password !== confirmedPassword}
                        helperText={confirmedPassword !== password ? 'Does not match current password' : ''}
                        />
                    </Grid>
                    <Grid item>  
                        <Button variant="contained" color="primary" type='submit' onClick={() =>{
                            if(password=== ''||confirmedPassword===''||
                                firstName===''||lastName===''|| email === ''){
                                setModalVal('Please make sure you have filled out all fields.');
                            setShowModal(true);
                            }else if(password !== confirmedPassword){
                                setModalVal('Password does not match confirmed password.');
                                setShowModal(true);
                            }else if(!email.match(emailRegEx)){
                                setModalVal('Please enter a valid email.');
                                setShowModal(true);
                            }else{
                                if(auth.registerUser(firstName, lastName, email, password)){
                                    navigate('../home')
                                }
                            }
                            console.log(auth.registerUser(firstName, lastName, email, password));
                        }}>
                            Sign Up
                        </Button>
                    </Grid>
                </Grid>
                
            </Box>
            <Modal
                    open={showModal}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" align='center'>
                            Error!
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }} align='center'>
                            {modalVal}
                        </Typography>
                    </Box>
            </Modal>
            </div>
    );
};

export default SignUpComponent;