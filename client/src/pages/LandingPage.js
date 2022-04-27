/**
 * LandingPage.js contains a render of the landing page of the app before logging in and/or signing up.
 * ALL PAGES USE THE MATERIAL UI: https://mui.com/getting-started/installation/
 */


import React from 'react'
import { AppBar, Container, Stack } from '@mui/material'
import { Button } from '@mui/material'
import { Box } from '@mui/material'
import { Typography } from '@mui/material'

const LandingPage = () => {
  return (
    <div>
        <AppBar position="relative">
        <Typography variant="h6" color="inherit" noWrap>
            Our Project
        </Typography>
        </AppBar>
        <main>
            <Box sx={{
                bgColor: 'background.paper',
                pt:8,
                pb:6,
                }}
            >
                <Container maxWidth="sm">
                    <Typography
                        component="h1"
                        variant="h2"
                        align='center'
                        color="text.primary"
                        gutterBottom
                    >
                        Welcome to our app
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        Create projects, checkout hardware, and download datasets.
                    </Typography>
                    <Stack
                        sx={{ pt:4 }}
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                    >
                        <a href='/login'><Button variant='contained'>Log in</Button></a>
                        <a href='/register'><Button variant='outlined'>Sign Up</Button></a>
                    </Stack>
                </Container>
            </Box>
        </main>
    </div>
  )
}
export default LandingPage


