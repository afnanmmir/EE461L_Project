import React, { useEffect, useState } from "react";
import { AppBar, Box, Dialog, DialogContent, Grid, Input, makeStyles, Menu, MenuItem, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar } from '@mui/material'; 
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Container } from '@mui/material';
// import httpClient from '../httpClient';
// import { useAuthContext } from '../Authentication';
import { useNavigate } from 'react-router-dom';
// import { AuthClass } from '../Authentication';
import { Typography } from '@mui/material'
import CreateProject from "../components/CreateProject";
import ProjectTable from "../components/ProjectTable";

const Projects = () => {
    const [allProjects, setAllProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [numProjects, setNumProjects] = useState(0);
    // const [projectName, setProjectName] = useState('');
    // const [projectDescription, setProjectDescription] = useState('');
    // const [projectFunds, setProjectFunds] = useState(0);
    const [hwSet, setHwSet] = useState('');
    const [checkoutQty, setCheckoutQty] = useState('');
    const [showDialog, setShowDialog] = useState(false);

    const handleOpenDialog = () => setShowDialog(true);
    const handleCloseDialog = () => setShowDialog(false);

    const navigate = useNavigate();

    const userEmail = "afnan@gmail.com";
    const userFirstName = "Afnan";
    const userLastName = "Mir";
    const hardwareSets = [
        {
            _id: 1,
            name: "HWSet1",
            qty: 100,
            checkedOut: 0
        },
        {
            _id: 2,
            name: "HWSet2",
            qty: 200,
            checkedOut: 0
        },
        {
            _id: 3,
            name: "HWSet3",
            qty: 150,
            checkedOut: 10
        }
    ]

    const openProject = (project) => {
        setSelectedProject(project);
        setShowDialog(true);
    }

    const deleteProject = (project) => {
        let newProjects = [];
        for (let index = 0; index < allProjects.length; index++) {
            if(allProjects[index].name !== project.name){
                newProjects.push(allProjects[index]);
            }
        }
        setAllProjects(newProjects)
    }

    const renderHWSetsTable = () =>{
        return(
            <Paper>
                <TableContainer component={Paper}>
                    <Table aria-label="table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">
                                    <Typography>
                                        Hardware Set Name
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography>
                                        Amount Checked Out
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {selectedProject.HWSets.map(HWSet => (
                                <TableRow>
                                    <TableCell align="center">
                                        {HWSet.name}
                                    </TableCell>
                                    <TableCell align="center">
                                        {HWSet.checkedOut}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        ) 
    }

    const renderUserTable = () =>{
        return (
            <Paper>
                <TableContainer component={Paper}>
                    <Table aria-label="table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">
                                    User
                                </TableCell>
                                <TableCell align="center">
                                    Creator?
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {selectedProject.users.map(user => (
                                <TableRow>
                                    <TableCell align="center">
                                        <Typography>{user}</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        {user === selectedProject.creator ? (<Typography>Yes</Typography>) : <Typography> No </Typography>}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        )
    }

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="relative">
                    <Toolbar>
                        <Typography variant="h6" component="div" align="left" sx={{ flexGrow:1 }}>
                            Welcome {`${userFirstName} ${userLastName}`}
                        </Typography>
                        <Button color="inherit">Projects</Button>
                        <Button color="inherit" href="../datasets">DataSets</Button>
                        <Button color="inherit">Logout</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box>
                <Grid container direction={"row"} spacing={2}>
                    <Grid item xs={4}>
                        <CreateProject projects={allProjects} addProjects={setAllProjects} user={userEmail}/>
                    </Grid>
                    <Grid item xs={8} style={{textAlign: "center"}}>
                        <Box>
                            {allProjects.length <=0 ? (<Typography>No Projects have been made yet.</Typography>) : (<ProjectTable projects={allProjects} openProject={openProject} deleteProject={deleteProject}/>)}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            {showDialog === true ? (
            <Dialog
                open={showDialog}
                onClose={handleCloseDialog}
                maxWidth='lg'
                fullWidth
                aria-labelledby="project-dialog-title"
            >
                <AppBar
                    position="relative"
                    style={{
                        alignItems: 'center'
                    }}
                >
                    <Typography align="center">
                        Opened Project: Afnan Mir
                    </Typography>
                </AppBar>
                <DialogContent>
                    <Typography align="center">
                            This is the description of the project that has just been opened. This is just a placeholder for now.
                    </Typography>
                    <Typography variant="h4" align="center">Hardware Sets</Typography>
                    {renderHWSetsTable()}
                </DialogContent>
                <DialogContent>
                    <Typography variant="h4" align="center">Users</Typography>
                    {renderUserTable()}
                </DialogContent>
                <DialogContent>
                    <Typography variant="h4" align="center">
                        Hardware Set Manager
                    </Typography>
                    <Paper>
                        <TableContainer component={Paper}>
                            <Table aria-label='table'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">
                                            Hardware Set
                                        </TableCell>
                                        <TableCell align="center">
                                            Amount
                                        </TableCell>
                                        <TableCell align="center">
                                            Check-in
                                        </TableCell>
                                        <TableCell align="center">
                                            Check-out
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">
                                            <TextField
                                            select
                                            fullWidth={true}
                                            onChange={e => {setHwSet(e.target.value);}}
                                            >
                                                {hardwareSets.map((option) => (
                                                    <MenuItem
                                                    key={option._id}
                                                    value={option._id}
                                                    >
                                                        {option.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Input
                                            type="number"
                                            placeholder="1"
                                            aria-label="Quantity"
                                            onChange={e => {setCheckoutQty(e.target.value);}}
                                            >
                                            </Input>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button>
                                                Check In
                                            </Button>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button>
                                                Check Out
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </TableContainer>
                    </Paper>
                </DialogContent>
            </Dialog>
            ) : null}
        </div>
    )
}

export default Projects