import { FormEvent, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/Toast';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Container,
  Link,
  Avatar
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const { showToast, ToastContainer } = useToast();
  const navigate = useNavigate();


  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    
    if (!email || !password) {
      showToast('Por favor, preencha todos os campos', 'error');
      return;
    }

    setIsLoading(true);
    
    try {
      await signIn(email, password);
      showToast('Login realizado com sucesso!', 'success');
      navigate('/dashboard'); // redireciona para a rota do dashboard
    } catch (error) {
      showToast('Email ou senha incorretos', 'error');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <ToastContainer />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
          py: 4,
          px: 2
        }}
      >
        <Container maxWidth="sm">
          <Card elevation={4} sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <Avatar
                  sx={{
                    mb: 2,
                    width: 56,
                    height: 56,
                    bgcolor: 'primary.main'
                  }}
                >
                  <RestaurantIcon />
                </Avatar>
                <Typography component="h1" variant="h5" gutterBottom>
                  Sistema de Gestão Escolar
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Controle de Estoque de Alimentos
                </Typography>
              </Box>

              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="admin"
                      color="primary"
                      checked={isAdmin}
                      onChange={(e) => setIsAdmin(e.target.checked)}
                    />
                  }
                  label="Acesso administrativo"
                  sx={{ mt: 1 }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isLoading}
                  sx={{ mt: 3, mb: 2, py: 1.5 }}
                >
                  {isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Entrar'
                  )}
                </Button>
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <Link href="#" variant="body2" color="primary">
                    Esqueci minha senha
                  </Link>
                </Box>
              </Box>
            </CardContent>
          </Card>
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              © 2024 FoodStock. Todos os direitos reservados.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
}
