/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Button, Stack, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material'

import { FormData } from '../../constants/FormTypes/organization'

interface OrganisationRegistrationFormProps {
    form: FormData
    onFormChange: any
    readOnly: boolean
    errors: any
    onSubmit: any
}

export const OrganisationRegistrationForm: React.FC<OrganisationRegistrationFormProps> = ({
    form,
    onFormChange,
    readOnly,
    errors,
    onSubmit
}) => (
    <form onSubmit={onSubmit}>
        <Stack spacing={3}>
            <TextField
                fullWidth
                label='User Name'
                name='username'
                type='text'
                value={form.username || ''}
                onChange={(e) => onFormChange('username')(e.target.value)}
                disabled={readOnly}
                error={!!errors.username}
                helperText={errors.username}
            />
            <TextField
                fullWidth
                label='User Email'
                name='email'
                type='email'
                value={form.email || ''}
                onChange={(e) => onFormChange('email')(e.target.value)}
                disabled={readOnly}
                error={!!errors.email}
                helperText={errors.email}
            />
            <TextField
                fullWidth
                label='User Contact'
                name='contact'
                type='phone'
                value={form.contact || ''}
                onChange={(e) => onFormChange('contact')(e.target.value)}
                disabled={readOnly}
                error={!!errors.contact}
                helperText={errors.contact}
            />
            <FormControl fullWidth error={!!errors.role}>
                <InputLabel>Role</InputLabel>
                <Select
                    label='Role'
                    name='role'
                    value={form.role || ''}
                    onChange={(e) => onFormChange('role')(e.target.value)}
                    disabled={readOnly}
                >
                    <MenuItem value='user'>User</MenuItem>
                    <MenuItem value='admin'>Admin</MenuItem>
                    <MenuItem value='super_admin'>Super Admin</MenuItem>
                </Select>
                {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
            </FormControl>
            <TextField
                fullWidth
                label='Password'
                name='password'
                type='password'
                value={form.password || ''}
                onChange={(e) => onFormChange('password')(e.target.value)}
                disabled={readOnly}
                error={!!errors.password}
                helperText={errors.password}
            />
        </Stack>
        <Button
            fullWidth
            size='large'
            sx={{ mt: 3 }}
            type='submit'
            variant='contained'
        >
            Register
        </Button>
    </form>
)
