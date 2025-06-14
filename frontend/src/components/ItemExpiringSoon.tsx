import { Box, Typography, Stack } from '@mui/material';

interface Props {
  nome: string;
  validade: string;
  quantidade: string;
}

export default function ItemExpiringSoon({ nome, validade, quantidade }: Props) {
  return (
    <Box display="flex" justifyContent="space-between">
      <Stack>
        <Typography variant="body2" fontWeight="medium">{nome}</Typography>
        <Typography variant="caption" color="text.secondary">{quantidade}</Typography>
      </Stack>
      <Typography variant="caption" color="warning.main">
        {new Date(validade).toLocaleDateString('pt-BR')}
      </Typography>
    </Box>
  );
}
