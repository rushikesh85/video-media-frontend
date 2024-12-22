import React, { useEffect, useState } from 'react'
import { Box, Link, Stack, Typography } from '@mui/material'
import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'

import { doLogin } from '@/api/auth'
import { setToken } from '@/helpers/cookiesManager'
import { updateTokensAction } from '@/helpers/action'
import BasicAlerts from '@/component/ReusableAlert/alert'
import { LoginForm } from '@/component/Login/Form'
import Layout from '@/app/layout'

interface Form {
    email: string | null;
    password: string | null;
}

export const LoginContainer: React.FC = () => {
    const [form, setForm] = useState<Form>({
        email: null,
        password: null,
    })
    const [showError, setShowError] = useState<boolean>(false)
    const [loginInProgress, setLoginInProgress] = useState<boolean>(false)
    const [loginSuccess, setLoginSuccess] = useState(false)
    const [alert, setAlert] = useState({ open: false, severity: 'success', message: '' })
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        if (loginSuccess) {
            const { search } = window.location
            const params = new URLSearchParams(search)
            const redirectPath = params.get('redirectTo')
            if (redirectPath) {
                router.push(redirectPath)
            } else {
                router.push('/dashboard')
            }
        }
    }, [loginSuccess, router])

    const handleFormChange = (name: keyof Form) => (value: string) => {
        setForm((state) => ({ ...state, [name]: value }))
    }

    const getErrors = (form: Form) => {
        const errors: Record<string, string> = {}
        if (!form.email) {
            errors.email = 'Please enter a valid username.'
        }
        if (!form.password) {
            errors.password = 'Please enter a password.'
        }
        return errors
    }

    const errors = showError ? getErrors(form) : {}

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const errors = getErrors(form)
        if (Object.keys(errors).length > 0) {
            if (!showError) {
                setShowError(true)
            }
            return
        }

        const values = {
            email: form.email,
            password: form.password,
        }

        setLoginInProgress(true)
        try {
            const response = await doLogin(values)
            setLoginInProgress(false)

            if (response.data.accessToken) {
                setToken(response.data.accessToken)
                dispatch(updateTokensAction(response.data.accessToken))
                setAlert({ open: true, severity: 'success', message: 'Login successful!' })
                setLoginSuccess(true)
            } else {
                setAlert({ open: true, severity: 'error', message: 'Login failed. Please check your credentials and try again.' })
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setLoginInProgress(false)
            setAlert({ open: true, severity: 'error', message: 'An unexpected error occurred. Please try again later.' })
        }
    }

    const closeAlert = () => {
        setAlert({ ...alert, open: false })
    }

    return (
        <Layout>
            <Head>
                <title>Login | SafeLense</title>
            </Head>
            
            <Box
                sx={{
                    backgroundColor: 'background.paper',
                    flex: '1 1 auto',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        maxWidth: 550,
                        px: 3,
                        py: '114px',
                        width: '100%',
                    }}
                >
                    <div>
                        <Stack spacing={1} sx={{ mb: 3 }}>
                            <Typography variant='h4'>Login</Typography>
                            <Typography color='text.secondary' variant='body2'>
                                Don&apos;t have an account?
                                &nbsp;
                                <Link component={NextLink} href='/register' underline='hover' variant='subtitle2'>
                                    Register
                                </Link>
                            </Typography>
                        </Stack>
                        <LoginForm
                            form={form}
                            onFormChange={handleFormChange}
                            readOnly={loginInProgress}
                            errors={errors}
                            onSubmit={handleSubmit}
                        />
                        <BasicAlerts
                            open={alert.open}
                            severity={alert.severity as 'error' | 'warning' | 'info' | 'success'}
                            onClose={closeAlert}
                            message={alert.message}
                        />
                    </div>
                </Box>
            </Box>
        </Layout>
    )
}
