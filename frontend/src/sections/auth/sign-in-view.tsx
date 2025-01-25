import type { LoginRequest } from 'src/intefaces';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { signIn } from 'src/services/auth.service';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function SignInView() {
    const router = useRouter();
    const [loginRequest, setLoginRequest] = useState<LoginRequest>({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLoginRequest((prev) => ({
        ...prev,
        [name]: value,
        }));
    }, []);

    const handleSubmit = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const { data } = await signIn(loginRequest);
            // console.log(data.accessToken);
            localStorage.setItem('accessToken', data.accessToken);
            router.push('/');
        } catch (error) {
            console.error(error);
        }
        },
        [loginRequest, router]
    );

    const renderForm = (
        <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
        >
        <TextField
            fullWidth
            name="email"
            label="Email address"
            value={loginRequest.email}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 3 }}
        />

        <TextField
            fullWidth
            name="password"
            label="Password"
            value={loginRequest.password}
            onChange={handleChange}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
                </InputAdornment>
            ),
            }}
            sx={{ mb: 3 }}
        />

        <LoadingButton fullWidth size="large" type="submit" color="inherit" variant="contained">
            Sign in
        </LoadingButton>
        </Box>
    );

    return (
        <>
        <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
            <Typography variant="h5">Sign in</Typography>
            <Typography variant="body2" color="text.secondary">
            Don&apos;t have an account?
            <Link href="/sign-up" variant="subtitle2" sx={{ ml: 0.5 }}>
                Get started
            </Link>
            </Typography>
        </Box>

        {renderForm}
        </>
    );
}
