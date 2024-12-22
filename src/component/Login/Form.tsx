/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import {
    Button,
    Stack,
    TextField,
    Typography,
    Paper,
    Box
} from '@mui/material'

interface LoginFormProps {
    form: {
        email: string | null
        password: string | null
    }
    onFormChange: any
    readOnly: boolean
    errors: any
    onSubmit: any
}

export const LoginForm: React.FC<LoginFormProps> = ({
    form,
    onFormChange,
    readOnly,
    errors,
    onSubmit
}) => (
    // Full screen container to center the form
    <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
            minHeight: '100vh', // Take up full viewport height
            background: 'linear-gradient(135deg, #15B79E 0%, #4B8B8C 100%)', // Optional background gradient
            overflow: 'hidden', // Prevent scrolling
            margin: 0, // Remove margin
        }}
    >
        <Paper
            elevation={6}
            sx={{
                width: { xs: '90%', sm: '400px' },
                padding: 3,
                borderRadius: 3,
                bgcolor: 'rgba(255, 255, 255, 0.8)',  // Transparent effect
                backdropFilter: 'blur(12px)',  // Slight blur effect for modern look
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                zIndex: 2,
            }}
        >
            <Typography
                variant="h4"
                align="center"
                color="primary.main"
                sx={{ marginBottom: 3, fontWeight: 'bold' }}
            >
                Welcome Back
            </Typography>
            <form onSubmit={onSubmit}>
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        label="User Email"
                        name="email"
                        type="email"
                        value={form.email || ''}
                        onChange={(e) => onFormChange('email')(e.target.value)}
                        disabled={readOnly}
                        error={!!errors.email}
                        helperText={errors.email}
                        variant="outlined"
                        sx={{
                            borderRadius: 2,
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'rgba(0, 0, 0, 0.23)',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#15B79E',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#15B79E',
                                },
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={form.password || ''}
                        onChange={(e) => onFormChange('password')(e.target.value)}
                        disabled={readOnly}
                        error={!!errors.password}
                        helperText={errors.password}
                        variant="outlined"
                        sx={{
                            borderRadius: 2,
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'rgba(0, 0, 0, 0.23)',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#15B79E',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#15B79E',
                                },
                            },
                        }}
                    />
                </Stack>
                <Button
                    fullWidth
                    size="large"
                    sx={{
                        mt: 3,
                        borderRadius: 2,
                        bgcolor: '#15B79E',
                        '&:hover': {
                            bgcolor: '#119e7c',
                        },
                    }}
                    type="submit"
                    variant="contained"
                >
                    Sign In
                </Button>
            </form>
        </Paper>
    </Box>
)
