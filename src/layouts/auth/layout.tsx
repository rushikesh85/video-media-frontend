import React, { PropsWithChildren } from 'react'
import NextLink from 'next/link'
import { Box, Typography, Grid } from '@mui/material' // Use stable Grid here
import Image from 'next/image'

import Logo from '../../assets/images/logo123.png'
import Auth from '../../assets/auth.svg'

export const Layout: React.FC<PropsWithChildren> = ({
  children
}) => (
  <Box
    component='main'
    sx={{
      display: 'flex',
      flex: '1 1 auto'
    }}
  >
    <Grid
      container
      sx={{ flex: '1 1 auto' }}
    >
      <Grid
        item
        xs={12}
        lg={6}
        sx={{
          backgroundColor: 'background.paper',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        <Box
          component='header'
          sx={{
            left: 0,
            p: 3,
            position: 'fixed',
            top: 0,
            width: '100%'
          }}
        >
          <Box
            component={NextLink}
            href='/'
            sx={{
              display: 'inline-flex',
              height: 32,
              width: 32
            }}
          >
            <Image src={Logo} alt='docxel logo' width={150} height={70} />
          </Box>
        </Box>
        {children}
      </Grid>
      <Grid
        item
        xs={12}
        lg={6}
        sx={{
          alignItems: 'center',
          background: 'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#090E23'
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography
            align='center'
            color='inherit'
            sx={{
              fontSize: '24px',
              lineHeight: '32px',
              mb: 1
            }}
            variant='h1'
          >
            Welcome to{' '}
            <Box
              component='a'
              sx={{ color: '#15B79E' }}
              target='_blank'
            >
              SafeLence
            </Box>
          </Typography>
          <Typography
            align='center'
            sx={{ mb: 3 }}
            variant='subtitle1'
          >
            A professional detective system
          </Typography>
          <Image
            alt=''
            src={Auth}
            width={600}
            height={591}
          />
        </Box>
      </Grid>
    </Grid>
  </Box>
)
