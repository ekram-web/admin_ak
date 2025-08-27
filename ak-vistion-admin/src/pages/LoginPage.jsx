import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../features/auth/authSlice';
import { mockApi } from '../api/mockApi';
import { Button, TextField, Box, Typography, Container, CircularProgress, Avatar, Paper } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
const LoginPage = () => {
const dispatch = useDispatch();
const navigate = useNavigate();
const [loading, setLoading] = useState(false);
const handleSubmit = async (event) => {
event.preventDefault();
setLoading(true);
const response = await mockApi.login("admin", "password");
if (response.success) {
dispatch(loginSuccess({ user: response.user, token: response.token }));
navigate('/dashboard');
}
setLoading(false);
};
return (
<Container component="main" maxWidth="xs">
<Paper elevation={6} sx={{ marginTop: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
<Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
<LockOutlinedIcon />
</Avatar>
<Typography component="h1" variant="h5">
AK-Vistion Admin
</Typography>
<Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
<TextField margin="normal" required fullWidth id="username" label="Username" name="username" defaultValue="admin" autoFocus />
<TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" defaultValue="password" />
<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
{loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
</Button>
</Box>
</Paper>
</Container>
);
};
export default LoginPage;