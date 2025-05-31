import React, { useState } from 'react';
import styled from 'styled-components';
import Card from '../components/ui/Card';
import Table from '../components/ui/Table';
import theme from '../Theme';

const ReportsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const FiltersContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.small};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const FilterGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const FilterTitle = styled.h3`
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textLight};
`;

const ChartContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.small};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ChartPlaceholder = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
`;

const TopItemsContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.small};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const ReportsPage = () => {
  const [month, setMonth] = useState('01');
  const [year, setYear] = useState('2024');
  
  const topItems = [
    { id: 1, name: "Arroz", quantity: "250 kg", totalCost: "R$ 875,00", lastPurchase: "15/01/2024" },
    { id: 2, name: "Feijão", quantity: "180 kg", totalCost: "R$ 990,00", lastPurchase: "12/01/2024" },
    { id: 3, name: "Leite", quantity: "450 L", totalCost: "R$ 1.575,00", lastPurchase: "18/01/2024" },
  ];
  
  const columns = [
    { header: 'ITEM', accessor: 'name' },
    { header: 'QUANTIDADE', accessor: 'quantity' },
    { header: 'CUSTO TOTAL', accessor: 'totalCost' },
    { header: 'ÚLTIMA COMPRA', accessor: 'lastPurchase' },
  ];

  return (
    <div>
      <h1>Relatórios</h1>
      
      <ReportsContainer>
        <FiltersContainer>
          <FilterGroup>
            <FilterTitle>Período Mensal</FilterTitle>
            <select value={month} onChange={(e) => setMonth(e.target.value)}>
              <option value="01">Janeiro</option>
              <option value="02">Fevereiro</option>
              <option value="03">Março</option>
              <option value="04">Abril</option>
              <option value="05">Maio</option>
              <option value="06">Junho</option>
            </select>
            <select value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2025">2025</option>
            </select>
          </FilterGroup>
        </FiltersContainer>
        
        <div>
          <ChartContainer>
            <FilterTitle>Custos Mensais</FilterTitle>
            <ChartPlaceholder>
              <p>Gráfico de custos mensais</p>
            </ChartPlaceholder>
          </ChartContainer>
          
          <TopItemsContainer>
            <FilterTitle>Itens Mais Consumidos</FilterTitle>
            <Table columns={columns} data={topItems} />
          </TopItemsContainer>
        </div>
      </ReportsContainer>
    </div>
  );
};

export default ReportsPage;