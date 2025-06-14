import { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography, Button, Divider, Stack } from '@mui/material';
import { useToast } from '../components/Toast';
import { api } from '../services/api';
import DashboardCard from '../components/DashboardCard';
import ItemExpiringSoon from '../components/ItemExpiringSoon';
import MovementItem from '../components/MovementItem';

interface DashboardStats {
  totalItens: number;
  itensVencendo: number;
  valorTotal: number;
  movimentacoes: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalItens: 0,
    itensVencendo: 0,
    valorTotal: 0,
    movimentacoes: 0
  });

  const { showToast, ToastContainer } = useToast();

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      // Simula dados estáticos
      setStats({
        totalItens: 156,
        itensVencendo: 8,
        valorTotal: 45230.5,
        movimentacoes: 23
      });
    } catch (err) {
      showToast('Erro ao carregar dados do dashboard', 'error');
    }
  }

  const cards = [
    { title: 'Total de Itens', value: stats.totalItens.toString(), color: 'primary' },
    { title: 'Itens Vencendo', value: stats.itensVencendo.toString(), color: 'warning' },
    { title: 'Valor Total', value: `R$ ${stats.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, color: 'success' },
    { title: 'Movimentações Hoje', value: stats.movimentacoes.toString(), color: 'secondary' }
  ];

  const itensVencendo = [
    { nome: 'Leite Integral', validade: '2024-01-15', quantidade: '12 L' },
    { nome: 'Pão de Forma', validade: '2024-01-16', quantidade: '8 unidades' },
    { nome: 'Iogurte Natural', validade: '2024-01-17', quantidade: '24 unidades' },
    { nome: 'Queijo Mussarela', validade: '2024-01-18', quantidade: '2 kg' }
  ];

  const movimentacoes = [
    { tipo: 'Entrada', item: 'Arroz Integral', quantidade: '+50 kg', hora: '14:30' },
    { tipo: 'Saída', item: 'Feijão Preto', quantidade: '-15 kg', hora: '13:45' },
    { tipo: 'Entrada', item: 'Óleo de Soja', quantidade: '+20 L', hora: '11:20' },
    { tipo: 'Saída', item: 'Açúcar Cristal', quantidade: '-8 kg', hora: '10:15' }
  ];

  return (
    <Box p={3}>
      <ToastContainer />

      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Visão geral do sistema de gestão de estoque
      </Typography>

      <Grid container spacing={2} mt={2}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <DashboardCard title={card.title} value={card.value} color={card.color} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} mt={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Itens com Validade Próxima (7 dias)
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={2}>
              {itensVencendo.map((item, index) => (
                <ItemExpiringSoon key={index} {...item} />
              ))}
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Movimentações Recentes
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={2}>
              {movimentacoes.map((mov, index) => (
                <MovementItem key={index} {...mov} />
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Ações Rápidas
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Button fullWidth variant="outlined">Adicionar Item</Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button fullWidth variant="outlined">Criar Cardápio</Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button fullWidth variant="outlined">Gerar Relatório</Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
