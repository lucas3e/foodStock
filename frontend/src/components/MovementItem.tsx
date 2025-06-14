import { Box, Typography, Stack } from '@mui/material';

interface Props {
  tipo: 'Entrada' | 'Saída';
  item: string;
  quantidade: string;
  hora: string;
}

export default function MovementItem({ tipo, item, quantidade, hora }: Props) {
  const color = tipo === 'Entrada' ? 'success.main' : 'error.main';

  return (
    <Box display="flex" justifyContent="space-between">
      <Stack>
        <Typography variant="body2" fontWeight="medium">{item}</Typography>
        <Typography variant="caption" color="text.secondary">{tipo}</Typography>
      </Stack>
      <Stack textAlign="right">
        <Typography variant="body2" color={color}>{quantidade}</Typography>
        <Typography variant="caption" color="text.secondary">{hora}</Typography>
      </Stack>
    </Box>
  );
}
