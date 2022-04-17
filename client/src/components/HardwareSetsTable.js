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


const HardwareSetsTable = (props) => {
    const handleButtonDisable = ({ creator })=>{

    };
    const isMember = (project) => {
        return true;
    }

    const onOpenProject = (project) => {
        console.log("BUTTON PRESSED");
    }

    
    console.log(`sets: ${props.hwSets}`);

    return (
      <Paper sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
      }}>
          <Typography variant="h5" fontWeight="bold">Hardware Sets</Typography>
          <TableContainer component={Paper}>
              <Table aria-label="table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Hardware Set Name</TableCell>
                        <TableCell align="center">Total Capacity</TableCell>
                        <TableCell align="center">Amount Checked Out</TableCell>
                        <TableCell align="center">Amount Available</TableCell>
                        <TableCell align="center">Price per Unit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.hwSets.map(hwSet =>(
                        <TableRow key={hwSet.HWSetName}>
                            <TableCell component='th' scope="row" align="center">
                                {hwSet.HWSetName}
                            </TableCell>
                            <TableCell align="center">{hwSet.total_quantity}</TableCell>
                            <TableCell align="center">{hwSet.checked_out}</TableCell>
                            <TableCell align="center">{hwSet.available}</TableCell>
                            <TableCell align="center">{hwSet.price_per_unit}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
              </Table>
          </TableContainer>
      </Paper>
  )
}

export default HardwareSetsTable