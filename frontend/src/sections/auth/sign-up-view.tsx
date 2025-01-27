import type { UserCreateRequest } from 'src/intefaces';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { ERole } from 'src/intefaces';
import { useAuth } from 'src/context/AuthContext';
import { signUp } from 'src/services/auth.service';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function SignUpView() {
    const router = useRouter();
    const [registerRequest, setRegiserRequest] = useState<UserCreateRequest>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: [ERole.ROLE_USER],
        birthday: new Date(),
    })
    const [showPassword, setShowPassword] = useState(false);

    const { register } = useAuth();

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setRegiserRequest((prev) => ({
            ...prev,
            [name]: value,
        }));
        }, []);

    const handleSubmit = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const registerDec = await register(registerRequest);
            if(registerDec === true){
                router.push('/sign-in');
            }
        },[register, registerRequest, router]
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
          name="firstName"
          label="First Name"
          value={registerRequest.firstName}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          name="lastName"
          label="Last Name"
          value={registerRequest.lastName}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          name="email"
          label="Email address"
          value={registerRequest.email}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          name="password"
          label="Password"
          value={registerRequest.password}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
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
        <TextField
          fullWidth
          name="birthday"
          label="Birthday"
          type="date"
          value={registerRequest.birthday.toISOString().split('T')[0]}
          onChange={(e) => {
            setRegiserRequest((prev) => ({
              ...prev,
              birthday: new Date(e.target.value),
            }));
          }}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          color="inherit"
          variant="contained"
        >
          Sign up
        </LoadingButton>
      </Box>
    );

    return (
        <>
        <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
            <Typography variant="h5">Sign in</Typography>
            <Typography variant="body2" color="text.secondary">
            Already have an account?
            <Link href="/sign-in" variant="subtitle2" sx={{ ml: 0.5 }}>
                Login
            </Link>
            </Typography>
        </Box>

        {renderForm}
        </>
    );
}
