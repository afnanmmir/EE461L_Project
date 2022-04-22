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

const CreateHardware = (props) => {
    // const classes = useStyles();
    const [hardwareName, setHardwareName] = useState("");
    const [hardwareQty, setHardwareQty] = useState("");
    const [hardwarePrice, setHardwarePrice] = useState("")
    const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
    const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const auth = useAuthContext();
    const success = "Hardware Created!"

    const handleSuccessSnackbarClose = () => {
        setShowSuccessSnackbar(false);
    }

    const handleErrorSnackbarClose = () => {
        setShowErrorSnackbar(false);
    }

    const handleSubmit = () => {
        if(hardwareName === "" || hardwareQty === "" || hardwarePrice ===""){
            console.log("IM IN HERE")
            setErrorMessage("Please fill out all fields in order to create the project.")
            setShowErrorSnackbar(true);
        }else{
            let newHardware = {
                HWSetName: hardwareName,
                total_quantity: hardwareQty,
                price: hardwarePrice,
            };
            api().post("/hardware/",newHardware).then((response) => {
                console.log(response.data.success)
                if(response.data.success){
                    props.getAllHardware();
                    setSuccessMessage(success);
                    setShowSuccessSnackbar(true);
                }
                

            }).catch((e) => {
                setErrorMessage("Error in creating creating hardware, make sure the name you provided is unique.");
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
                <Typography variant="h5" fontWeight="bold">Create New Hardware</Typography>
            </Grid>
            <Grid item>
                <TextField 
                label = "Hardware Name" 
                variant = "filled"
                placeholder="Hardware Name"
                required
                value = {hardwareName}
                onChange={e => setHardwareName(e.target.value)}
                />
            </Grid>
            <Grid item>
                <TextField 
                label = "Hardware Quantity" 
                variant = "filled"
                placeholder="Hardware Quantity"
                required
                type="number"
                value = {hardwareQty}
                onChange={e => setHardwareQty(e.target.value)}
                />
            </Grid>
            <Grid item>
                <TextField 
                label = "Hardware Price" 
                variant = "filled"
                placeholder="Hardware Price"
                required
                type="number"
                value = {hardwarePrice}
                onChange={e => setHardwarePrice(e.target.value)}
                />
            </Grid>
            <Grid item>
                <Button onClick={() => {
                    handleSubmit();
                }}>
                    Create New Hardware
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

export default CreateHardware