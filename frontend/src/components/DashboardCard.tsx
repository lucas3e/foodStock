import { Card, CardContent, Typography } from '@mui/material';

interface Props {
  title: string;
  value: string;
  color: 'primary' | 'secondary' | 'success' | 'warning';
}

export default function DashboardCard({ title, value, color }: Props) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h5" color={`${color}.main`} fontWeight="bold">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
