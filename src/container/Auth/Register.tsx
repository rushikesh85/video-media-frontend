/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
'use client'
import React, { useState } from 'react'
import Head from 'next/head'
import NextLink from 'next/link'
import { Box, Link, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'



import { Layout } from '../../layouts/auth/layout'
import { FormData } from '../../constants/FormTypes/organization'
import { OrganisationRegistrationForm } from '@/component/Organization/Form'
import { registerUser } from '@/api/auth'
import BasicAlerts from '@/component/ReusableAlert/alert'

export const RegisterContainer: React.FC = () => {
    const [form, setForm] = useState<FormData>({
        username: '',
        contact: '',
        password: '',
        email: '',
        role: '',
    })
    const [showError, setShowError] = useState(false)
    const [alert, setAlert] = useState({ open: false, severity: 'success', message: '' })
    const router = useRouter()

    const getErrors = (form: FormData) => {
        const errors: any = {}

        if (!form.username) {
            errors.username = 'Please enter user name.'
        }

        if (!form.contact) {
            errors.contact = 'Please enter mobile number.'
        }

        if (!form.email) {
            errors.email = 'Please enter user email.'
        }

        if (!form.password) {
            errors.password = 'Please set your password.'
        }

        return errors
    }

    const handleSubmit = async (e: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        e && e.preventDefault()
        const errors = getErrors(form)
        if (Object.keys(errors).length > 0) {
            if (!showError) {
                setShowError(true)
            }
            return
        }
        const values = {
            username: form.username,
            contact: form.contact,
            password: form.password,
            email: form.email,
            role: form.role,
        }

        const response = await registerUser(values)
        if (response.isSuccess) {
            setAlert({ open: true, severity: 'success', message: 'Registration successful! Welcome to DocXel.' })
            router.push('/')
        } else {
            setAlert({ open: true, severity: 'error', message: 'Registration failed' })
        }
    }

    const handleFormChange = (name: string) => (value: string) => {
        setForm((state) => ({ ...state, [name]: value }))
    }

    const onClose = () => {
        setAlert({ ...alert, open: false })
    }

    const errors = showError ? getErrors(form) : {}

    return (
        <Layout>
            <Head>
                <title>
                    Register | SafeLense
                </title>
            </Head>
            <Box
                sx={{
                    flex: '1 1 auto',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Box
                    sx={{
                        maxWidth: 550,
                        px: 3,
                        py: '100px',
                        width: '100%'
                    }}
                >
                    <div>
                        <Stack
                            spacing={1}
                            sx={{ mb: 3 }}
                        >
                            <Typography variant='h4'>
                                Register
                            </Typography>
                            <Typography
                                color='text.secondary'
                                variant='body2'
                            >
                                Already have an account?
                                &nbsp;
                                <Link
                                    component={NextLink}
                                    href='/'
                                    underline='hover'
                                    variant='subtitle2'
                                >
                                    Log in
                                </Link>
                            </Typography>
                        </Stack>
                        <OrganisationRegistrationForm
                            form={form}
                            onFormChange={handleFormChange}
                            readOnly={false}
                            errors={errors}
                            onSubmit={handleSubmit} />
                        <BasicAlerts
                            open={alert.open}
                            severity={alert.severity as 'error' | 'warning' | 'info' | 'success'}
                            onClose={onClose}
                            message={alert.message}
                        />
                    </div>
                </Box>
            </Box>
        </Layout>
    )
}
