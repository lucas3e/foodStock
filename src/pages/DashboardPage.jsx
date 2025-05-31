import React from 'react';
import styled from 'styled-components';
import Card from '../components/ui/Card';
import theme from '../Theme';

const DashboardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const CardWrapper = styled.div`
  flex: 1 1 300px; // grow, shrink, and min width
  min-width: 300px;
`;

const Section = styled.section`
  background-color: white;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.small};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SectionTitle = styled.h2`
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text};
`;

const ChartPlaceholder = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
`;

const DashboardPage = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bem-vindo de volta, Admin</p>

      <DashboardContainer>
        <CardWrapper>
          <Card title="Itens a Vencer" value="12" />
        </CardWrapper>
        <CardWrapper>
          <Card title="Custo Mensal" value="R$ 12.450" />
        </CardWrapper>
        <CardWrapper>
          <Card title="Estoque Baixo" value="8" />
        </CardWrapper>
      </DashboardContainer>

      <Section>
        <SectionTitle>Consumo Mensal</SectionTitle>
        <ChartPlaceholder>
          <p>Gráfico de consumo mensal</p>
        </ChartPlaceholder>
      </Section>
    </div>
  );
};

export default DashboardPage;
