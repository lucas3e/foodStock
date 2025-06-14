import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  IconButton,
  Chip
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  RestaurantMenu as RestaurantMenuIcon
} from '@mui/icons-material';

import { useToast } from '../components/Toast';
import { api } from '../services/api';

interface Cardapio {
  id: number;
  nome: string;
  data: string;
  turno: 'manhã' | 'tarde' | 'noite';
}

export default function Cardapios() {
  const [cardapios, setCardapios] = useState<Cardapio[]>([]);
  const [busca, setBusca] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { showToast, ToastContainer } = useToast();
  const [novoCardapio, setNovoCardapio] = useState({
    nome: '',
    data: '',
    turno: 'manhã',
  });

  useEffect(() => {
    carregarCardapios();
  }, []);

  async function carregarCardapios() {
    try {
      const res = await api.get('/cardapios');
      setCardapios(res.data);
    } catch (error) {
      showToast('Erro ao carregar cardápios', 'error');
    }
  }

  async function handleSalvarCardapio() {
    const { nome, data, turno } = novoCardapio;

    if (!nome || !data || !turno) {
      showToast('Preencha todos os campos', 'error');
      return;
    }

    try {
      await api.post('/cardapios', {
        nome,
        data,
        turno,
      });

      setNovoCardapio({ nome: '', data: '', turno: 'manhã' });
      setShowModal(false);
      showToast('Cardápio adicionado com sucesso!', 'success');
      carregarCardapios();
    } catch (error) {
      showToast('Erro ao salvar cardápio', 'error');
    }
  }

  async function handleExcluirCardapio(id: number) {
    if (!window.confirm('Tem certeza que deseja excluir este cardápio?')) return;

    try {
      await api.delete(`/cardapios/${id}`);
      showToast('Cardápio excluído com sucesso!', 'success');
      carregarCardapios();
    } catch (error) {
      showToast('Erro ao excluir cardápio', 'error');
    }
  }

  const cardapiosFiltrados = cardapios.filter(c =>
    c.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <>
      <ToastContainer />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4">Gestão de Cardápios</Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setShowModal(true)}>
            Adicionar Cardápio
          </Button>
        </Box>

        {/* Filtros */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <TextField
            fullWidth
            label="Buscar por nome"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Paper>

        {/* Tabela */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>NOME</TableCell>
                <TableCell>DATA</TableCell>
                <TableCell>TURNO</TableCell>
                <TableCell>AÇÕES</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cardapiosFiltrados.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <RestaurantMenuIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary">
                        Nenhum cardápio encontrado
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                cardapiosFiltrados.map((cardapio) => (
                  <TableRow key={cardapio.id} hover>
                    <TableCell>{cardapio.nome}</TableCell>
                    <TableCell>
                      <Chip
                        label={new Date(cardapio.data).toLocaleDateString('pt-BR')}
                        color="primary"
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{cardapio.turno}</TableCell>
                    <TableCell>
                      <IconButton size="small" color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleExcluirCardapio(cardapio.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Modal */}
        <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Adicionar Cardápio</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
              <TextField
                fullWidth
                label="Nome do Cardápio"
                value={novoCardapio.nome}
                onChange={(e) => setNovoCardapio({ ...novoCardapio, nome: e.target.value })}
              />
              <TextField
                fullWidth
                type="date"
                label="Data"
                value={novoCardapio.data}
                onChange={(e) => setNovoCardapio({ ...novoCardapio, data: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
              <FormControl fullWidth>
                <InputLabel>Turno</InputLabel>
                <Select
                  value={novoCardapio.turno}
                  label="Turno"
                  onChange={(e) =>
                    setNovoCardapio({ ...novoCardapio, turno: e.target.value as any })
                  }
                >
                  <MenuItem value="manhã">Manhã</MenuItem>
                  <MenuItem value="tarde">Tarde</MenuItem>
                  <MenuItem value="noite">Noite</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button variant="contained" onClick={handleSalvarCardapio}>
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}
