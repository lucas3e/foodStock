import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/ui/Button';
import Table from '../components/ui/Table';
import { MdSearch } from 'react-icons/md';
import theme from '../Theme';

const UsersContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.small};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h1`
  margin-top: 0;
`;

const Filters = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SearchInput = styled.div`
  flex: 1;
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
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
`;

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userType, setUserType] = useState('all');
  
  const users = [
    { id: 1, name: "Ana Silva", email: "ana.silva@escola.com", type: "Master", status: "Ativo" },
    { id: 2, name: "Carlos Santos", email: "carlos.santos@escola.com", type: "Usuário", status: "Ativo" },
  ];
  
  const columns = [
    { header: 'Nome', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Tipo', accessor: 'type' },
    { header: 'Status', accessor: 'status' },
    { 
      header: 'Ações', 
      render: () => (
        <div>
          <Button>Editar</Button>
          <Button>Desativar</Button>
        </div>
      )
    },
  ];

  return (
    <UsersContainer>
      <Header>
        <Title>Gestão de Usuários</Title>
        <p>Gerencie os usuários do sistema</p>
      </Header>
      
      <Filters>
        <SearchInput>
          <MdSearch />
          <input 
            type="text" 
            placeholder="Buscar usuários..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInput>
        
        <Select value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="all">Todos os tipos</option>
          <option value="master">Master</option>
          <option value="user">Usuário</option>
        </Select>
        
        <Select>
          <option>Todos os status</option>
          <option>Ativo</option>
          <option>Inativo</option>
        </Select>
      </Filters>
      
      <Table columns={columns} data={users} />
    </UsersContainer>
  );
};

export default UsersPage;