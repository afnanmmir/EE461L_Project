import React, { useEffect, useState } from "react";
import { AppBar, Box, Grid, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar } from '@mui/material'; 
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Container } from '@mui/material';
// import httpClient from '../httpClient';
// import { useAuthContext } from '../Authentication';
import { useNavigate } from 'react-router-dom';
// import { AuthClass } from '../Authentication';
import { Typography } from '@mui/material'
import { Create, Delete } from "@material-ui/icons";
// import { makeStyles } from "@mui/styles"


const ProjectTable = (props) => {
    const handleButtonDisable = ({ creator })=>{

    };
    const isMember = (project) => {
        return true;
    }

    const onOpenProject = (project) => {
        console.log("BUTTON PRESSED");
    }

    const deleteProjectHandler = (project) =>{
        props.deleteProject(project);
    }
    
    console.log(props.projects);

    return (
      <Paper sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
      }}>
          <Typography variant="h3" fontWeight="bold">Projects</Typography>
          <TableContainer component={Paper}>
              <Table aria-label="table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Project Name</TableCell>
                        <TableCell align="center">Project Description</TableCell>
                        <TableCell align="center">Project Creator</TableCell>
                        <TableCell align="center">Funds</TableCell>
                        <TableCell align="center">Open Project</TableCell>
                        <TableCell align="center">Delete Project</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.projects.map(project =>(
                        <TableRow key={project.name}>
                            <TableCell component='th' scope="row" align="center">
                                {project.name}
                            </TableCell>
                            <TableCell align="center">{project.description}</TableCell>
                            <TableCell align="center">{project.creator}</TableCell>
                            <TableCell align="center">{project.funds}</TableCell>
                            <TableCell align="center">
                                <Button
                                color="primary"
                                onClick={() => props.openProject(project)}
                                >Open Project</Button>
                            </TableCell>
                            <TableCell align="center">
                                <Button
                                startIcon={<Delete/>}
                                color="error"
                                disabled={!isMember(project)}
                                onClick={()=> deleteProjectHandler(project)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
              </Table>
          </TableContainer>
      </Paper>
  )
}

export default ProjectTable