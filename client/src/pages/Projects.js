import React, { useEffect, useState } from "react";
import { AppBar, Box, Dialog, DialogContent, Grid, Input, makeStyles, Menu, MenuItem, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Snackbar, IconButton } from '@mui/material'; 
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Container } from '@mui/material';
import CloseIcon from '@material-ui/icons/Close'; 
// import httpClient from '../httpClient';
// import { useAuthContext } from '../Authentication';
import { useNavigate } from 'react-router-dom';
import { AuthClass, useAuthContext } from '../Authentication';
import { Typography } from '@mui/material'
import CreateProject from "../components/CreateProject";
import ProjectTable from "../components/ProjectTable";
import api from "../httpClient";
import HardwareSetsTable from "../components/HardwareSetsTable";
import CreateHardware from "../components/CreateHardware";

const Projects = () => {
    const [allProjects, setAllProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [numProjects, setNumProjects] = useState(0);
    // const [projectName, setProjectName] = useState('');
    // const [projectDescription, setProjectDescription] = useState('');
    // const [projectFunds, setProjectFunds] = useState(0);
    const [hwSet, setHwSet] = useState("");
    const [checkoutQty, setCheckoutQty] = useState('');
    const [showDialog, setShowDialog] = useState(false);
    const [allHWSets, setAllHWSets] = useState([]);
    const [projectID, setProjectID] = useState('');
    const[showDeleteMessage, setShowDeleteMessage] = useState(false);
    const [showJoinSuccess, setShowJoinSuccess] = useState(false);
    const [showJoinFail, setShowJoinFail] = useState(false)
    const [joinFailMessage, setJoinFailMessage] = useState('');
    
    

    const handleOpenDialog = () => setShowDialog(true);
    const handleCloseDialog = () => setShowDialog(false);

    const navigate = useNavigate();
    const auth = useAuthContext();
    const deleteProjectMessage = "Project successfully deleted.";
    const errorDeleteProjectMessage = "Error in deleting project";
    const joinSuccessMessage = "Joined project successfully";
    


    const getUserProjects = () => {
        console.log(auth.user)
        let userEmail = {
            user: auth.user
        }
        console.log(userEmail)
        api().get("/projects/" + auth.user).then((response) => {
            setAllProjects(response.data.projects);
            console.log(response.data.projects)
        }).catch((e)=>{
            console.log(e);
        });
    }

    const getHardwareSets = () => {
        api().get("/hardware/").then((hardwares) => {
            setAllHWSets(hardwares.data.hardwares)
            console.log(hardwares.data)
        }).catch((e) => {
            console.log(e);
        })
    }

    const handleCheckout = (qty) => {
        console.log("Hello")
        api().put("/projects/checkout/"+ selectedProject._id,{
            HWSetName: hwSet,
            amount: qty
        }).then((response) => {
            getUserProjects();
            getHardwareSets();
        }).catch((e) => {
            console.log(e);
        })
    }

    const handleCheckin = (qty) => {
        api().put("/projects/checkin/"+ selectedProject._id,{
            HWSetName: hwSet,
            amount: qty
        }).then((response) => {
            getUserProjects();
            getHardwareSets();
        }).catch((e) => {
            console.log(e);
        })
    }

    const handleJoin = (projectID, user) => {
        if(projectID !== ''){
            api().put("/projects/members/"+ projectID,{
                add_or_remove: "add",
                user_email: user
            }).then((response) => {
                getUserProjects();
                setShowJoinSuccess(true);
            }).catch((e) => {
                console.log(e.response);
                if(e.response.status === 404){
                    setJoinFailMessage("Error. Project not found.");
                }else{
                    setJoinFailMessage("Error. You have already joined this project.");
                }
                setShowJoinFail(true);
            })
        }
    }

    // const d

    const userEmail = auth.user;
    // const userFirstName = "Afnan";
    // const userLastName = "Mir";
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
        let id = project._id;
        api().delete("/projects/" + id).then((response) => {
            getUserProjects();
            setShowDeleteMessage(true);
        }).catch((e) => {
            console.log(e);
        })
    }

    const handleDeleteMessageClose = () => {
        setShowDeleteMessage(false);
    }

    const handleJoinSuccessClose = () => {
        setShowJoinSuccess(false);
    }

    const handleJoinFailClose = () => {
        setShowJoinFail(false);
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
                            {selectedProject.hw_sets.map(HWSet => (
                                <TableRow>
                                    <TableCell align="center">
                                        {HWSet.name}
                                    </TableCell>
                                    <TableCell align="center">
                                        {HWSet.qty}
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
    useEffect(() => {
        getUserProjects();
        getHardwareSets();
        console.log(`all hw sets: ${allProjects}`)
      }, [auth.user]);

    useEffect(() => {
        if(allProjects.length !== 0 && selectedProject !== null){
            allProjects.forEach((element) => {
                if(element._id === selectedProject._id){
                    setSelectedProject(element);
                    console.log("Found project")
                }
            })
        }
    },[allProjects])

    useEffect(() => {
        
    })

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="relative">
                    <Toolbar>
                        <Typography variant="h6" component="div" align="left" sx={{ flexGrow:1 }}>
                            Welcome {`${userEmail}`}
                        </Typography>
                        <Button color="inherit">Projects</Button>
                        <Button color="inherit" href="../datasets">DataSets</Button>
                        <Button color="inherit" onClick={() => {auth.logOutUser(); navigate('/')}}>Logout</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box>
                <Grid container direction={"row"} spacing={2}>
                <Grid item xs={4}>
                    <CreateProject projects={allProjects} getAllProjects={getUserProjects} user={userEmail}/>
                    <Paper
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <Grid container direction={"column"} spacing={1} alignContent="center" flexGrow={2}>
                            <Grid item>
                                <Typography variant="h5" fontWeight="bold">Join Project</Typography>
                            </Grid>
                                <Grid item>
                                    <TextField 
                                    label = "Project ID" 
                                    variant = "filled"
                                    placeholder="Project ID"
                                    required
                                    value = {projectID}
                                    onChange={e => setProjectID(e.target.value)}
                                    />
                                </Grid>
                                <Grid item>
                                    <Button
                                    onClick={() => {
                                        handleJoin(projectID,auth.user);
                                    }}>
                                        Join Project
                                    </Button>
                                </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={8} style={{textAlign: "center"}}>
                    <Box>
                        {allProjects.length <=0 ? (<Typography>No Projects have been made yet.</Typography>) : (<ProjectTable projects={allProjects} openProject={openProject} deleteProject={deleteProject}/>)}
                    </Box>
                </Grid>
            </Grid>
            <Grid container direction={"row"} spacing={2}>
                <Grid item xs={4}>
                    <CreateHardware getAllHardware={getHardwareSets}/>
                </Grid>
                <Grid item xs={8} style={{textAlign: "center"}}>
                    {allHWSets.length <= 0 ? null : <HardwareSetsTable hwSets={allHWSets}/>}
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
                    <Typography variant="h6" align="center">
                        {selectedProject.project_name} created by: {selectedProject.creator}
                    </Typography>
                </AppBar>
                <DialogContent>
                    <Typography align="center">
                            {selectedProject.description}
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
                                            value={hwSet}
                                            onChange={e => {setHwSet(e.target.value);}}
                                            >
                                                {allHWSets.map((option) => (
                                                    <MenuItem
                                                    key={option.HWSetName}
                                                    value={option.HWSetName}
                                                    >
                                                        {option.HWSetName}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Input
                                            type="number"
                                            placeholder="1"
                                            aria-label="Quantity"
                                            value={checkoutQty}
                                            onChange={e => {if(e.target.value < 0){
                                                e.target.value = 0;
                                            }setCheckoutQty(e.target.value);}}
                                            >
                                            </Input>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button
                                            onClick={() => {handleCheckin(checkoutQty)}}>
                                                Check In
                                            </Button>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button
                                            type="submit"
                                            onClick={() => {handleCheckout(checkoutQty)}}>
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
            <Snackbar
                anchorOrigin={{
                    vertical:'bottom',
                    horizontal:'left'
                }}
                open={showDeleteMessage}
                autoHideDuration={5000}
                onClose={() => handleDeleteMessageClose()}
                message={deleteProjectMessage}
                action={
                    <React.Fragment>
                        <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={() => handleDeleteMessageClose()}>
                            <CloseIcon fontSize="small"/>
                        </IconButton>
                    </React.Fragment>
                }
                />
                <Snackbar
                anchorOrigin={{
                    vertical:'bottom',
                    horizontal:'left'
                }}
                open={showJoinSuccess}
                autoHideDuration={5000}
                onClose={() => handleJoinSuccessClose()}
                message={joinSuccessMessage}
                action={
                    <React.Fragment>
                        <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={() => handleJoinSuccessClose()}>
                            <CloseIcon fontSize="small"/>
                        </IconButton>
                    </React.Fragment>
                }
                />
                <Snackbar
                anchorOrigin={{
                    vertical:'bottom',
                    horizontal:'left'
                }}
                open={showJoinFail}
                autoHideDuration={5000}
                onClose={() => handleJoinFailClose()}
                message={joinFailMessage}
                action={
                    <React.Fragment>
                        <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={() => handleJoinFailClose()}>
                            <CloseIcon fontSize="small"/>
                        </IconButton>
                    </React.Fragment>
                }
                />
        </div>
    )
}

export default Projects