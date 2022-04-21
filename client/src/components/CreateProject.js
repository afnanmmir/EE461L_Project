/**
 * React component to render the form to allow users to create projects
 */
import React, { useEffect, useState } from "react";
import { AppBar, Box, Grid, Modal, Paper, Toolbar, Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@material-ui/icons/Close'; 
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Container } from '@mui/material';
// import httpClient from '../httpClient';
// import { useAuthContext } from '../Authentication';
import { useNavigate } from 'react-router-dom';
// import { AuthClass } from '../Authentication';
import { Typography } from '@mui/material'
import { useAuthContext } from '../Authentication';
import api from "../httpClient"
// import { makeStyles } from "@mui/styles"

// const useStyles = makeStyles(theme =>({
//     paper: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center'
//     }
// }));

const CreateProject = (props) => {
    // const classes = useStyles();
    const [projectName, setProjectName] = useState(""); // state that keeps track of the project name inputted
    const [projectDescription, setProjectDescription] = useState(""); // state that keeps track of the project description inputted
    const [projectFunds, setProjectFunds] = useState(""); // state that keeps track of the project funds inputted
    const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false); // state that keeps track of whether the success snackbar is showing
    const [showErrorSnackbar, setShowErrorSnackbar] = useState(false); // state that keeps track of whether the error snackbar is showing
    const [successMessage, setSuccessMessage] = useState(""); // state that keeps track the success message showing in the snackbar
    const [errorMessage, setErrorMessage] = useState(""); // state the keeps track of the error message showing in the snackbar

    const auth = useAuthContext(); // context object to keep track of current logged in user information
    const success = "Project Created!"

    /**
     * function used to close the success snackbar
     */
    const handleSuccessSnackbarClose = () => {
        setShowSuccessSnackbar(false);
    }

    /**
     * function used to close the error snackbar
     */
    const handleErrorSnackbarClose = () => {
        setShowErrorSnackbar(false);
    }

    /**
     * Function to handle the submission of the creation of a project. Checks for valid inputs, then
     * sends the request to the backend and waits for response from backend. If success message
     * detected, page rerenders
     */
    const handleSubmit = () => {
        if(projectName === "" || projectDescription === "" || projectFunds ===""){
            console.log("IM IN HERE")
            setErrorMessage("Please fill out all fields in order to create the project.")
            setShowErrorSnackbar(true);
        }else{
            let newProject = {
                name: projectName,
                creator: props.user,
                description: projectDescription,
                funds: projectFunds,
                users: [props.user],
                hw_sets: []
            };
            api().post("/projects/",newProject).then((response) => {
                console.log(response.data.success)
                if(response.data.success){
                    props.getAllProjects();
                    setSuccessMessage(success);
                    setShowSuccessSnackbar(true);
                }

            }).catch((e) => {
                setErrorMessage("Error in creating project, make sure the name you provided is unique.");
                setShowErrorSnackbar(true)
            });
            
            // props.addProjects(props.projects.concat(newProject));

        }
    }
  return (
    <Paper 
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
        <Grid container direction={"column"} spacing={1} alignContent="center" flexGrow={2}>
            <Grid item>
                <Typography variant="h5" fontWeight="bold">Create New Project</Typography> 
            </Grid>
            <Grid item>
                <TextField 
                label = "Project Name" 
                variant = "filled"
                placeholder="Project Name"
                required
                value = {projectName}
                onChange={e => setProjectName(e.target.value)} 
                />
            </Grid>
            <Grid item>
                <TextField 
                label = "Project Description" 
                variant = "filled"
                placeholder="Project Description"
                required
                value = {projectDescription}
                onChange={e => setProjectDescription(e.target.value)}
                />
            </Grid>
            <Grid item>
                <TextField 
                label = "Project Funds" 
                variant = "filled"
                placeholder="Project Name"
                required
                value = {projectFunds}
                onChange={e => setProjectFunds(e.target.value)}
                />
            </Grid>
            <Grid item>
                <Button onClick={() => {
                    handleSubmit();
                }}>
                    Create New Project
                </Button>
            </Grid>
        </Grid>
        <Snackbar
        anchorOrigin={{
            vertical:'bottom',
            horizontal:'left'
        }}
        open={showSuccessSnackbar}
        autoHideDuration={5000}
        onClose={() => handleSuccessSnackbarClose()}
        message={successMessage}
        action={
            <React.Fragment>
                <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => handleSuccessSnackbarClose()}>
                    <CloseIcon fontSize="small"/>
                </IconButton>
            </React.Fragment>
        }
        >

        </Snackbar>
        <Snackbar
        anchorOrigin={{
            vertical:'bottom',
            horizontal:'left'
        }}
        open={showErrorSnackbar}
        autoHideDuration={5000}
        onClose={() => handleErrorSnackbarClose()}
        message={errorMessage}
        action={
            <React.Fragment>
                <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => handleErrorSnackbarClose()}>
                    <CloseIcon fontSize="small"/>
                </IconButton>
            </React.Fragment>
        }
        >

        </Snackbar>
    </Paper>
  )
}

export default CreateProject