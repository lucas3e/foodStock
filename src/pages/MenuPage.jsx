import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/ui/Button';
import Table from '../components/ui/Table';
import { MdAdd, MdCheck, MdEdit, MdDelete } from 'react-icons/md';
import theme from '../Theme';


const MenuContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const MenuTable = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.small};
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 2fr 1fr 1fr;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textLight};
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 2fr 1fr 1fr;
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: rgba(0,0,0,0.02);
  }
`;

const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textLight};
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FormContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.small};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const FormTitle = styled.h3`
  margin-top: 0;
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  min-height: 100px;
  resize: vertical;
`;

const MealSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const TotalCalories = styled.div`
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const MenuPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [menus, setMenus] = useState([
    {
      id: 1,
      date: '15/05/2024',
      breakfast: 'Pão, Leite, Frutas',
      lunch: 'Arroz, Feijão, Frango',
      dinner: 'Sopa de Legumes',
      calories: '2500 kcal',
    },
    {
      id: 2,
      date: '16/05/2024',
      breakfast: 'Cereais, Iogurte',
      lunch: 'Macarrão, Carne',
      dinner: 'Sanduíche',
      calories: '2300 kcal',
    },
  ]);

  const handleAddMenu = () => {
    setShowForm(true);
  };

  return (
    <div>
      <h1>Gestão de Cardápios</h1>
      
      <Button primary onClick={handleAddMenu} style={{ marginBottom: theme.spacing.lg }}>
        <MdAdd /> Novo Cardápio
      </Button>
      
      {showForm ? (
        <FormContainer>
          <FormTitle>Novo Cardápio</FormTitle>
          
          <FormGroup>
            <Label>Data</Label>
            <Input type="date" />
          </FormGroup>
          
          <MealSection>
            <Label>Café da Manhã</Label>
            <TextArea placeholder="Adicionar alimento" />
          </MealSection>
          
          <MealSection>
            <Label>Almoço</Label>
            <TextArea placeholder="Adicionar alimento" />
          </MealSection>
          
          <MealSection>
            <Label>Jantar</Label>
            <TextArea placeholder="Adicionar alimento" />
          </MealSection>
          
          <TotalCalories>Total: 530 kcal</TotalCalories>
          
          <FormActions>
            <Button>Cancelar</Button>
            <Button primary>
              <MdCheck /> Salvar Cardápio
            </Button>
          </FormActions>
        </FormContainer>
      ) : (
        <MenuTable>
          <TableHeader>
            <div>Data</div>
            <div>Café da Manhã</div>
            <div>Almoço</div>
            <div>Jantar</div>
            <div>Calorias Totais</div>
            <div>Ações</div>
          </TableHeader>
          
          {menus.map(menu => (
            <TableRow key={menu.id}>
              <div>{menu.date}</div>
              <div>{menu.breakfast}</div>
              <div>{menu.lunch}</div>
              <div>{menu.dinner}</div>
              <div>{menu.calories}</div>
              <Actions>
                <ActionButton title="Editar">
                  <MdEdit size={20} />
                </ActionButton>
                <ActionButton title="Excluir">
                  <MdDelete size={20} />
                </ActionButton>
              </Actions>
            </TableRow>
          ))}
        </MenuTable>
      )}
    </div>
  );
};

export default MenuPage;