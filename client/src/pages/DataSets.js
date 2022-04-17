import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Toolbar, Box } from '@mui/material';
import { AuthClass, useAuthContext } from '../Authentication'


function createData(name, description, download, carbs, protein) {
  return { name, description, download};
}

const rows = [
  createData('Abdominal and Direct Fetal ECG Database', 'Multichannel fetal electrocardiogram recordings obtained from 5 different women in labor, between 38 and 41 weeks of gestation.', 'https://physionet.org/static/published-projects/adfecgdb/abdominal-and-direct-fetal-ecg-database-1.0.0.zip'),
  createData('AF Termination Challenge Database','ECG recordings created for the Computers in Cardiology Challenge 2004, which focused on predicting spontaneous termination of atrial fibrillation','https://physionet.org/static/published-projects/aftdb/af-termination-challenge-database-1.0.0.zip'),
  createData('AHA Database Sample Excluded Record','Two ECG signals that were excluded from the 1980 American Heart Association database.','https://physionet.org/static/published-projects/ahadb/aha-database-sample-excluded-record-1.0.0.zip'),
  createData('A multi-camera and multimodal dataset for posture and gait analysis','Multimodal dataset with 166k samples for vision-based applications with a smart walker used in gait and posture rehabilitation. It is equipped with a pair of Depth cameras with data synchronized with an inertial MoCap system worn by the participant.','https://physionet.org/static/published-projects/multi-gait-posture/a-multi-camera-and-multimodal-dataset-for-posture-and-gait-analysis-1.0.0.zip'),
  createData('ANSI/AAMI EC13 Test Waveforms','The files in this set can be used for testing a variety of devices that monitor the electrocardiogram. The recordings include both synthetic and real waveforms.','https://physionet.org/static/published-projects/aami-ec13/ansiaami-ec13-test-waveforms-1.0.0.zip')
];

const DataSet = () => {
    // const userEmail = "afnan@gmail.com";
    // const userFirstName = "Afnan";
    // const userLastName = "Mir";
    const auth = useAuthContext();
    return (
      <div> 
      <Box sx={{ flexGrow: 1 }}>
          <AppBar position="relative">
              <Toolbar>
                  <Typography variant="h6" component="div" align='left' sx={{ flexGrow:1 }}>
                      Welcome {`${auth.user}`}
                  </Typography>
                  <Button color="inherit" href='../projects'>Projects</Button>
                  <Button color="inherit" href="../datasets">DataSets</Button>
                  <Button color="inherit" onClick={() => {auth.logOutUser()}}>Logout</Button>
              </Toolbar>
          </AppBar>
        </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Dataset</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Download</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">
                  <Link href={row.download}> ZIP file </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
        
      );
  }

  export default DataSet