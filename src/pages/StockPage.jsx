import React, { useState } from 'react';
import styled from 'styled-components';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Table from '../components/ui/Table';
import { MdSearch, MdAdd } from 'react-icons/md';

const FiltersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const FilterGroup = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.small};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const FilterTitle = styled.h3`
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 1rem;
  font-weight: 500;
`;

const FilterContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  label {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textLight};
  }

  input {
    padding: ${({ theme }) => theme.spacing.sm};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const SearchInput = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing.sm};

  input {
    border: none;
    flex: 1;
    padding: 0 ${({ theme }) => theme.spacing.sm};
    font-size: 1rem;

    &:focus {
      outline: none;
    }
  }

  svg {
    color: ${({ theme }) => theme.colors.textLight};
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const StockPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    name: '',
    quantity: '',
    expiry: '',
  });

  const stockItems = [
    { id: 1, name: "Arroz", quantity: "50 kg", expiry: "2023-12-30", price: "R$ 250,00" },
    { id: 2, name: "Feijão", quantity: "30 kg", expiry: "2023-11-15", price: "R$ 180,00" },
    { id: 3, name: "Açúcar", quantity: "20 kg", expiry: "2024-01-20", price: "R$ 100,00" },
  ];

  const columns = [
    { header: 'NOME', accessor: 'name' },
    { header: 'QUANTIDADE', accessor: 'quantity' },
    { header: 'VALIDADE', accessor: 'expiry' },
    { header: 'PREÇO', accessor: 'price' },
  ];

  return (
    <div>
      <h1>Gestão de Estoque</h1>

      <FiltersContainer>
        <FilterGroup>
          <FilterTitle>Categoria</FilterTitle>
          <FilterContent>
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              type="text"
              placeholder="Ex: Arroz"
              value={filters.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            />

            <label htmlFor="quantity">Quantidade</label>
            <input
              id="quantity"
              type="text"
              placeholder="Ex: 50 kg"
              value={filters.quantity}
              onChange={(e) => setFilters({ ...filters, quantity: e.target.value })}
            />
          </FilterContent>
        </FilterGroup>

        <FilterGroup>
          <FilterTitle>Data de Validade</FilterTitle>
          <FilterContent>
            <label htmlFor="expiry">Data</label>
            <input
              id="expiry"
              type="date"
              value={filters.expiry}
              onChange={(e) => setFilters({ ...filters, expiry: e.target.value })}
            />
          </FilterContent>
        </FilterGroup>

        <FilterGroup>
          <FilterTitle>Buscar</FilterTitle>
          <FilterContent>
            <label htmlFor="search">Buscar item</label>
            <SearchInput>
              <MdSearch />
              <input
                id="search"
                type="text"
                placeholder="Buscar item..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchInput>
          </FilterContent>
        </FilterGroup>
      </FiltersContainer>

      <ActionsContainer>
        <Button primary onClick={() => setShowForm(true)}>
          <MdAdd /> Adicionar Item
        </Button>
      </ActionsContainer>

      <Table columns={columns} data={stockItems} />
    </div>
  );
};

export default StockPage;
