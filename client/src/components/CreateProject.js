import React, { useEffect, useState } from "react";
import { AppBar, Box, Grid, Modal, Paper, Toolbar } from '@mui/material'; 
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Container } from '@mui/material';
// import httpClient from '../httpClient';
// import { useAuthContext } from '../Authentication';
import { useNavigate } from 'react-router-dom';
// import { AuthClass } from '../Authentication';
import { Typography } from '@mui/material'
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
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projectFunds, setProjectFunds] = useState("");

    const handleSubmit = () => {
        if(projectName === "" || projectDescription === "" || projectFunds ===""){
            alert("Please fill out all fields,")
        }else{
            let newProject = {
                name: projectName,
                description: projectDescription,
                funds: projectFunds
            };
            console.log("made it here");
            props.addProjects(props.projects.concat(newProject));
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
                    if(projectName === "" || projectDescription === "" || projectFunds ===""){
                        alert("Please fill out all fields,")
                     }else{
                    let newProject = {
                        name: projectName,
                        creator: props.user,
                        description: projectDescription,
                        funds: projectFunds,
                        users: [props.user],
                        HWSets: []
                    };
                    console.log("made it here");
                    props.addProjects(props.projects.concat(newProject));
                    }}}>
            Create New Project</Button>
            </Grid>
        </Grid>
    </Paper>
  )
}

export default CreateProject