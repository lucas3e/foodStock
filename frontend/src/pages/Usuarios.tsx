import { useEffect, useState } from 'react';
import {
  Box, Button, Card, CardContent, Dialog, DialogActions,
  DialogContent, DialogTitle, Grid, MenuItem, Select,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, TextField, Typography, Chip
} from '@mui/material';
import { Add, Close, Delete, Edit } from '@mui/icons-material';
import { api } from '../services/api';
import { useToast } from '../components/Toast';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  cargo: string;
  status: 'ativo' | 'inativo';
  ultimoAcesso: string;
}

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [novoUsuario, setNovoUsuario] = useState({
    nome: '',
    email: '',
    tipo: 'nutricionista',
    senha: '',
    confirmarSenha: ''
  });

  const { showToast, ToastContainer } = useToast();

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function carregarUsuarios() {
    try {
      const response = await api.get('/users');
      setUsuarios(response.data);
    } catch (error) {
      showToast('Erro ao carregar usuários', 'error');
    }
  }

  async function handleSalvarUsuario() {
    const { nome, email, senha, confirmarSenha, tipo } = novoUsuario;

    if (!nome || !email || !senha || !confirmarSenha) {
      showToast('Preencha todos os campos obrigatórios.', 'error');
      return;
    }

    if (senha !== confirmarSenha) {
      showToast('As senhas não coincidem.', 'error');
      return;
    }

    try {
      await api.post('/users', { nome, email, senha, tipo });
      showToast('Usuário criado com sucesso!', 'success');
      setNovoUsuario({ nome: '', email: '', tipo: 'nutricionista', senha: '', confirmarSenha: '' });
      setOpenModal(false);
      carregarUsuarios();
    } catch {
      showToast('Erro ao criar usuário.', 'error');
    }
  }

  return (
    <>
      <ToastContainer />

      <Box p={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Box>
            <Typography variant="h4" fontWeight="bold">Usuários</Typography>
            <Typography variant="subtitle1" color="text.secondary">Gerencie os usuários do sistema</Typography>
          </Box>
          <Button
            variant="contained"
            color="success"
            startIcon={<Add />}
            onClick={() => setOpenModal(true)}
          >
            Novo Usuário
          </Button>
        </Box>

        <Card>
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Usuário</TableCell>
                    <TableCell>Cargo</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Último Acesso</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usuarios.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        Nenhum usuário encontrado.
                      </TableCell>
                    </TableRow>
                  ) : (
                    usuarios.map((usuario) => (
                      <TableRow key={usuario.id}>
                        <TableCell>
                          <Typography fontWeight="medium">{usuario.nome}</Typography>
                          <Typography variant="body2" color="text.secondary">{usuario.email}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip label={usuario.tipo} color="primary" variant="outlined" />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={usuario.status}
                            color={usuario.status === 'ativo' ? 'success' : 'error'}
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          {new Date(usuario.ultimoAcesso).toLocaleString('pt-BR')}
                        </TableCell>
                        <TableCell>
                          <Box display="flex" gap={1}>
                            <Button size="small" color="primary">
                              <Edit fontSize="small" />
                            </Button>
                            <Button size="small" color="error">
                              <Delete fontSize="small" />
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>

      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          Novo Usuário
          <Button
            onClick={() => setOpenModal(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <Close />
          </Button>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nome Completo"
                fullWidth
                value={novoUsuario.nome}
                onChange={(e) => setNovoUsuario({ ...novoUsuario, nome: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                value={novoUsuario.email}
                onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                fullWidth
                value={novoUsuario.tipo}
                onChange={(e) => setNovoUsuario({ ...novoUsuario, tipo: e.target.value })}
              >
                <MenuItem value="nutricionista">Nutricionista</MenuItem>
                <MenuItem value="estoquista">Estoquista</MenuItem>
                <MenuItem value="admin">Administrador</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Senha"
                type="password"
                fullWidth
                value={novoUsuario.senha}
                onChange={(e) => setNovoUsuario({ ...novoUsuario, senha: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Confirmar Senha"
                type="password"
                fullWidth
                value={novoUsuario.confirmarSenha}
                onChange={(e) => setNovoUsuario({ ...novoUsuario, confirmarSenha: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
          <Button onClick={handleSalvarUsuario} variant="contained" color="success">
            Criar Usuário
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
