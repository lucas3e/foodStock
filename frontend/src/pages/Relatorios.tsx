import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Select,
  MenuItem,
  TextField,
  CircularProgress,
  useTheme,
} from '@mui/material';
import { useToast } from '../components/Toast';

// Ícones MUI que vamos usar
import DescriptionIcon from '@mui/icons-material/Description';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import InventoryIcon from '@mui/icons-material/Inventory';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import DownloadIcon from '@mui/icons-material/Download';

const RELATORIOS = [
  {
    tipo: 'consumo',
    titulo: 'Relatório de Consumo',
    descricao: 'Análise detalhada do consumo de alimentos',
    Icon: DescriptionIcon,
  },
  {
    tipo: 'custos',
    titulo: 'Relatório de Custos',
    descricao: 'Análise financeira e controle de gastos',
    Icon: MonetizationOnIcon,
  },
  {
    tipo: 'estoque',
    titulo: 'Relatório de Estoque',
    descricao: 'Controle de entrada e saída de produtos',
    Icon: InventoryIcon,
  },
  {
    tipo: 'cardapios',
    titulo: 'Relatório de Cardápios',
    descricao: 'Análise dos cardápios e refeições servidas',
    Icon: RestaurantMenuIcon,
  },
];

const RELATORIOS_RECENTES = [
  { nome: 'Relatório de Consumo - Janeiro 2024', data: '2024-01-31', tipo: 'consumo' },
  { nome: 'Relatório de Custos - 4º Trimestre 2023', data: '2023-12-31', tipo: 'custos' },
  { nome: 'Relatório de Estoque - Dezembro 2023', data: '2023-12-31', tipo: 'estoque' },
  { nome: 'Relatório de Cardápios - 2º Semestre 2023', data: '2023-12-31', tipo: 'cardapios' },
];

export default function Relatorios() {
  const theme = useTheme();
  const [tipoRelatorio, setTipoRelatorio] = useState('consumo');
  const [periodo, setPeriodo] = useState('mensal');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showToast, ToastContainer } = useToast();

  async function handleGerarRelatorio() {
    if (!dataInicio || !dataFim) {
      showToast('Por favor, selecione o período do relatório', 'error');
      return;
    }

    setIsLoading(true);
    try {
      // Simulação da chamada API
      await new Promise((r) => setTimeout(r, 1500));

      showToast('Relatório gerado com sucesso!', 'success');
    } catch {
      showToast('Erro ao gerar relatório', 'error');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Box p={4} minHeight="100vh" bgcolor={theme.palette.background.default}>
      <ToastContainer />

      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Relatórios
        </Typography>
        <Typography color="text.secondary">
          Gere relatórios detalhados do sistema
        </Typography>
      </Box>

      {/* Seleção de Tipo */}
      <Grid container spacing={3} mb={6}>
        {RELATORIOS.map(({ tipo, titulo, descricao, Icon }) => {
          const selected = tipoRelatorio === tipo;
          return (
            <Grid item xs={12} sm={6} md={3} key={tipo}>
              <Button
                onClick={() => setTipoRelatorio(tipo)}
                variant={selected ? 'contained' : 'outlined'}
                color={selected ? 'success' : 'inherit'}
                fullWidth
                sx={{
                  flexDirection: 'column',
                  py: 4,
                  borderRadius: 3,
                  textTransform: 'none',
                  '&:hover': { bgcolor: selected ? 'success.dark' : 'grey.100' },
                }}
              >
                <Icon
                  sx={{ fontSize: 40, mb: 1, color: selected ? 'white' : 'text.primary' }}
                />
                <Typography
                  variant="h6"
                  fontWeight={600}
                  color={selected ? 'white' : 'text.primary'}
                  gutterBottom
                >
                  {titulo}
                </Typography>
                <Typography
                  variant="body2"
                  color={selected ? 'rgba(255,255,255,0.85)' : 'text.secondary'}
                  align="center"
                >
                  {descricao}
                </Typography>
              </Button>
            </Grid>
          );
        })}
      </Grid>

      {/* Configurações do Relatório */}
      <Box
        component="section"
        bgcolor="background.paper"
        p={3}
        borderRadius={3}
        boxShadow={1}
        mb={6}
      >
        <Typography variant="h6" fontWeight={700} mb={3}>
          Configurações do Relatório
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" mb={1}>
              Período
            </Typography>
            <Select
              fullWidth
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              size="medium"
            >
              <MenuItem value="diario">Diário</MenuItem>
              <MenuItem value="semanal">Semanal</MenuItem>
              <MenuItem value="mensal">Mensal</MenuItem>
              <MenuItem value="anual">Anual</MenuItem>
              <MenuItem value="personalizado">Personalizado</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Data Inicial"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              size="medium"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Data Final"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              size="medium"
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            display="flex"
            alignItems="flex-end"
            justifyContent="flex-start"
          >
            <Button
              variant="contained"
              color="success"
              onClick={handleGerarRelatorio}
              disabled={isLoading}
              fullWidth
              size="large"
              startIcon={isLoading ? <CircularProgress color="inherit" size={20} /> : null}
              sx={{ textTransform: 'none' }}
            >
              {isLoading ? 'Gerando...' : 'Gerar Relatório'}
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Relatórios Recentes */}
      <Box
        component="section"
        bgcolor="background.paper"
        p={3}
        borderRadius={3}
        boxShadow={1}
      >
        <Typography variant="h6" fontWeight={700} mb={3}>
          Relatórios Recentes
        </Typography>

        <Grid container spacing={2}>
          {RELATORIOS_RECENTES.map(({ nome, data, tipo }, index) => {
            let color = theme.palette.grey[300];
            if (tipo === 'consumo') color = theme.palette.purple ? theme.palette.purple.main : '#9c27b0';
            else if (tipo === 'custos') color = theme.palette.success.main;
            else if (tipo === 'estoque') color = theme.palette.info.main;
            else if (tipo === 'cardapios') color = theme.palette.warning.main;

            return (
              <Grid
                key={index}
                item
                xs={12}
                sx={{
                  bgcolor: 'background.default',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  px: 2,
                  py: 1.5,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  '&:hover': {
                    bgcolor: 'grey.100',
                    cursor: 'pointer',
                  },
                }}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: color,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                    }}
                  >
                    <DescriptionIcon fontSize="small" />
                  </Box>
                  <Box>
                    <Typography fontWeight={600}>{nome}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(data).toLocaleDateString('pt-BR')}
                    </Typography>
                  </Box>
                </Box>

                <Button
                  size="small"
                  color="primary"
                  startIcon={<DownloadIcon />}
                  sx={{ textTransform: 'none' }}
                >
                  Download
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}
