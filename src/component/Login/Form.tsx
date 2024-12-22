/* eslint-disable @next/next/no-img-element */
import React from 'react';
import {
    Button,
    Stack,
    TextField,
    Typography,
    Paper,
    Box
} from '@mui/material';

interface LoginFormProps {
    form: {
        email: string | null;
        password: string | null;
    };
    onFormChange: (field: 'email' | 'password') => (value: string) => void;
    readOnly: boolean;
    errors: {
        email?: string;
        password?: string;
    };
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
    form,
    onFormChange,
    readOnly,
    errors,
    onSubmit
}) => (

    <Box
        display="flex"
        flexDirection="row"
        sx={{
            // minHeight: '100vh',
            backgroundColor: '#f2f2f2',
        }}
    >

        <Box
            flex={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
                background: 'white',
                padding: 4,
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    width: { xs: '90%', sm: '400px' },
                    padding: 4,
                    borderRadius: 4,
                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    color="text.primary"
                    sx={{ marginBottom: 3, fontWeight: 'bold' }}
                >
                    Welcome Back!
                </Typography>

                <form onSubmit={onSubmit}>
                    <Stack spacing={3}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={form.email || ''}
                            onChange={(e) => onFormChange('email')(e.target.value)}
                            disabled={readOnly}
                            error={!!errors.email}
                            helperText={errors.email}
                            variant="outlined"
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
                        Login
                    </Button>
                </form>
            </Paper>
        </Box>
    </Box>
);

export default LoginForm;
