import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useToast } from '../components/Toast';
import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  Container
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Inventory as InventoryIcon
} from '@mui/icons-material';

interface Categoria {
  id: number;
  nome: string;
}

interface Estoque {
  id: number;
  nome: string;
  quantidade: number;
  validade: string;
  preco: number;
  categoria: Categoria;
}

export default function Estoque() {
  const [estoques, setEstoques] = useState<Estoque[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [dataValidade, setDataValidade] = useState('');
  const [busca, setBusca] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { showToast, ToastContainer } = useToast();
  const [novoItem, setNovoItem] = useState({
    nome: '',
    categoria: '',
    quantidade: '',
    unidade: 'kg',
    dataValidade: '',
    precoUnitario: ''
  });

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      const [estoquesRes, categoriasRes] = await Promise.all([
        api.get('/estoque'),
        api.get('/categorias')
      ]);
      setEstoques(estoquesRes.data);
      setCategorias(categoriasRes.data);
    } catch (error) {
      showToast('Erro ao carregar dados', 'error');
    }
  }

  async function handleSalvarItem() {
    try {
      if (!novoItem.nome || !novoItem.categoria || !novoItem.quantidade || !novoItem.dataValidade || !novoItem.precoUnitario) {
        showToast('Por favor, preencha todos os campos', 'error');
        return;
      }

      await api.post('/estoque', {
        alimentoId: 1, // Temporary - should be selected from alimentos
        quantidade: parseFloat(novoItem.quantidade),
        dataValidade: novoItem.dataValidade,
        preco: parseFloat(novoItem.precoUnitario)
      });
      
      setShowModal(false);
      setNovoItem({
        nome: '',
        categoria: '',
        quantidade: '',
        unidade: 'kg',
        dataValidade: '',
        precoUnitario: ''
      });
      carregarDados();
      showToast('Item adicionado com sucesso!', 'success');
    } catch (error) {
      showToast('Erro ao salvar item', 'error');
    }
  }

  async function handleDeleteItem(id: number) {
    if (window.confirm('Tem certeza que deseja excluir este item?')) {
      try {
        await api.delete(`/estoque/${id}`);
        carregarDados();
        showToast('Item excluído com sucesso!', 'success');
      } catch (error) {
        showToast('Erro ao excluir item', 'error');
      }
    }
  }

  const estoquesFiltrados = estoques.filter(item => {
    const matchCategoria = !filtroCategoria || item.categoria.nome === filtroCategoria;
    const matchBusca = !busca || item.nome.toLowerCase().includes(busca.toLowerCase());
    return matchCategoria && matchBusca;
  });

  return (
    <>
      <ToastContainer />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Gestão de Estoque
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setShowModal(true)}
            sx={{ px: 3, py: 1.5 }}
          >
            Adicionar Item
          </Button>
        </Box>

        {/* Filtros */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            <Box sx={{ minWidth: 200, flex: 1 }}>
              <FormControl fullWidth>
                <InputLabel>Categoria</InputLabel>
                <Select
                  value={filtroCategoria}
                  label="Categoria"
                  onChange={(e) => setFiltroCategoria(e.target.value)}
                >
                  <MenuItem value="">Todas as categorias</MenuItem>
                  {categorias.map(categoria => (
                    <MenuItem key={categoria.id} value={categoria.nome}>
                      {categoria.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ minWidth: 200, flex: 1 }}>
              <TextField
                fullWidth
                type="date"
                label="Data de Validade"
                value={dataValidade}
                onChange={(e) => setDataValidade(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Box>

            <Box sx={{ minWidth: 200, flex: 1 }}>
              <TextField
                fullWidth
                label="Buscar"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar item..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        </Paper>

        {/* Tabela */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>NOME</TableCell>
                <TableCell>QUANTIDADE</TableCell>
                <TableCell>VALIDADE</TableCell>
                <TableCell>PREÇO</TableCell>
                <TableCell>AÇÕES</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {estoquesFiltrados.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <InventoryIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary">
                        Nenhum item encontrado
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Adicione itens ao estoque ou ajuste os filtros
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                estoquesFiltrados.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>{item.nome}</TableCell>
                    <TableCell>{item.quantidade} kg</TableCell>
                    <TableCell>
                      <Chip
                        label={new Date(item.validade).toLocaleDateString('pt-BR')}
                        color="warning"
                        variant="outlined"
                        size="small"
                      />
                    </TableCell>
                    <TableCell>R$ {item.preco.toFixed(2)}</TableCell>
                    <TableCell>
                      <IconButton size="small" color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => handleDeleteItem(item.id)}
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
        <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="md" fullWidth>
          <DialogTitle>Adicionar Item</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Box sx={{ minWidth: 200, flex: 1 }}>
                  <TextField
                    fullWidth
                    label="Nome do Item"
                    value={novoItem.nome}
                    onChange={(e) => setNovoItem({...novoItem, nome: e.target.value})}
                    required
                  />
                </Box>

                <Box sx={{ minWidth: 200, flex: 1 }}>
                  <FormControl fullWidth required>
                    <InputLabel>Categoria</InputLabel>
                    <Select
                      value={novoItem.categoria}
                      label="Categoria"
                      onChange={(e) => setNovoItem({...novoItem, categoria: e.target.value})}
                    >
                      <MenuItem value="">Selecione uma categoria</MenuItem>
                      {categorias.map(categoria => (
                        <MenuItem key={categoria.id} value={categoria.nome}>
                          {categoria.nome}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Box sx={{ minWidth: 200, flex: 1 }}>
                  <TextField
                    fullWidth
                    label="Quantidade"
                    type="number"
                    value={novoItem.quantidade}
                    onChange={(e) => setNovoItem({...novoItem, quantidade: e.target.value})}
                    required
                  />
                </Box>

                <Box sx={{ minWidth: 200, flex: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel>Unidade</InputLabel>
                    <Select
                      value={novoItem.unidade}
                      label="Unidade"
                      onChange={(e) => setNovoItem({...novoItem, unidade: e.target.value})}
                    >
                      <MenuItem value="kg">Quilogramas (kg)</MenuItem>
                      <MenuItem value="g">Gramas (g)</MenuItem>
                      <MenuItem value="l">Litros (l)</MenuItem>
                      <MenuItem value="ml">Mililitros (ml)</MenuItem>
                      <MenuItem value="unidade">Unidade</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Box sx={{ minWidth: 200, flex: 1 }}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Data de Validade"
                    value={novoItem.dataValidade}
                    onChange={(e) => setNovoItem({...novoItem, dataValidade: e.target.value})}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Box>

                <Box sx={{ minWidth: 200, flex: 1 }}>
                  <TextField
                    fullWidth
                    label="Preço Unitário"
                    type="number"
                    value={novoItem.precoUnitario}
                    onChange={(e) => setNovoItem({...novoItem, precoUnitario: e.target.value})}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                    }}
                    required
                  />
                </Box>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="contained" onClick={handleSalvarItem}>
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}
