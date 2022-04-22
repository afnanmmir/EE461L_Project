/**
 * Component that renders the complete projects page
 */
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
    // state that keeps track of all the projects from the database
    const [allProjects, setAllProjects] = useState([]);
    // state that keeps track of the current selected project by the user
    const [selectedProject, setSelectedProject] = useState(null);
    const [numProjects, setNumProjects] = useState(0);
    // const [projectName, setProjectName] = useState('');
    // const [projectDescription, setProjectDescription] = useState('');
    // const [projectFunds, setProjectFunds] = useState(0);

    // state that keeps track of the current selected hardware set in the selected project pop up
    const [hwSet, setHwSet] = useState("");
    // state that keeps track of the amount selected in the check in/out field in selected project pop up
    const [checkoutQty, setCheckoutQty] = useState('');
    // state that jeeps track of whether the selected project pop up is showing or now
    const [showDialog, setShowDialog] = useState(false);
    // state that keeps track of all the hardware sets from the database.
    const [allHWSets, setAllHWSets] = useState([]);
    // state that keeps track of the input in the project ID field.
    const [projectID, setProjectID] = useState('');
    // state that keeps track of whether the deleted project message is shown or not
    const[showDeleteMessage, setShowDeleteMessage] = useState(false);
    // state that keeps track of whether the joined project message is shown or not
    const [showJoinSuccess, setShowJoinSuccess] = useState(false);
    // state that keeps track of whether the failed to join project message is shown or not
    const [showJoinFail, setShowJoinFail] = useState(false)
    // state that keeps track of the failed to join message
    const [joinFailMessage, setJoinFailMessage] = useState('');
    
    

    const handleOpenDialog = () => setShowDialog(true);
    // function that jandles closing the selected project pop up
    const handleCloseDialog = () => setShowDialog(false);

    // allows the component to navigate to other pages
    const navigate = useNavigate();
    // Allows component to use the current user information
    const auth = useAuthContext();
    const deleteProjectMessage = "Project successfully deleted.";
    const errorDeleteProjectMessage = "Error in deleting project";
    const joinSuccessMessage = "Joined project successfully";
    

    /**
     * Function that gets all the projects for which the current user is a member of
     */
    const getUserProjects = () => {
        console.log(auth.user)
        let userEmail = {
            user: auth.user
        }
        console.log(userEmail);
        // get request
        api().get("/projects/" + auth.user).then((response) => {
            setAllProjects(response.data.projects);
            console.log(response.data.projects)
        }).catch((e)=>{
            console.log(e);
        });
    }

    /**
     * Function that gets all the hardware sets from the database
     */
    const getHardwareSets = () => {
        // get request
        api().get("/hardware/").then((hardwares) => {
            setAllHWSets(hardwares.data.hardwares)
            console.log(hardwares.data)
        }).catch((e) => {
            console.log(e);
        })
    }

    /**
     * handles the checkout of hardware for the current selected project
     * @param {int} qty 
     */
    const handleCheckout = (qty) => {
        console.log("Hello")
        // put request to the backend
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
    /**
     * handles the checkin of hardware for the current selected project
     * @param {int} qty 
     */
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
    /**
     * Function that handles the current user joining a project
     * @param {string} projectID 
     * @param {*} user 
     */
    const handleJoin = (projectID, user) => {
        if(projectID !== ''){ // checks to see if the field is empty or not
            // put request
            api().put("/projects/members/"+ projectID,{
                add_or_remove: "add",
                user_email: user
            }).then((response) => {
                getUserProjects(); // returns the updated user projects
                setShowJoinSuccess(true); // shows success message
            }).catch((e) => {
                console.log(e.response);
                if(e.response.status === 404){
                    setJoinFailMessage("Error. Project not found."); // if no project of inputted id was found
                }else{
                    setJoinFailMessage("Error. You have already joined this project."); // if already joined
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

    /**
     * Function that handles showing the popup of the selected project
     * @param {*} project 
     */
    const openProject = (project) => {
        setSelectedProject(project);
        setShowDialog(true);
    }

    /**
     * Function that handles the user deleting one of their projects
     * @param {*} project the project to be deleted
     */
    const deleteProject = (project) => {
        let id = project._id;
        // delete request
        api().delete("/projects/" + id).then((response) => {
            getUserProjects();
            setShowDeleteMessage(true);
        }).catch((e) => {
            console.log(e); // if delete fails
        })
    }

    /**
     * Function that handles closing of delete message
     */
    const handleDeleteMessageClose = () => {
        setShowDeleteMessage(false);
    }

    /**
     * Function that handles closing the successfully joined message
     */
    const handleJoinSuccessClose = () => {
        setShowJoinSuccess(false);
    }

    /**
     * Function that handles closing the failed to join message
     */
    const handleJoinFailClose = () => {
        setShowJoinFail(false);
    }

    /**
     * function that returns the react component that renders the set of hardware and information about it for the selected project
     * @returns the JSX component that renders the hardware set table for the current selected project.
     */
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

    /**
     * function that returns the react component that renders the set of users and information about it for the selected project
     * @returns the JSX component that renders the users table for the current selected project.
     */
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
    /**
     * Rerenders the page when the user of the website changes
     */
    useEffect(() => {
        getUserProjects();
        getHardwareSets();
        console.log(`all hw sets: ${allProjects}`)
      }, [auth.user]);
    /**
     * Rerenders page when the set of projects changes in some way
     */
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