import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { 
  MdDashboard, 
  MdRestaurantMenu, 
  MdInventory, 
  MdBarChart, 
  MdPeople 
} from 'react-icons/md';

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #2c3e50;
  color: white;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
`;

const Logo = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 1px solid rgba(255,255,255,0.1);
`;

const Nav = styled.nav`
  padding: ${({ theme }) => theme.spacing.md};
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  border-radius: 4px;
  color: rgba(255,255,255,0.7);
  text-decoration: none;
  transition: all 0.2s;
  
  &:hover {
    background-color: rgba(255,255,255,0.1);
    color: white;
  }
  
  &.active {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Logo>FoodStock</Logo>
      <Nav>
        <NavItem to="/">
          <MdDashboard /> Dashboard
        </NavItem>
        <NavItem to="/cardapios">
          <MdRestaurantMenu /> Cardápios
        </NavItem>
        <NavItem to="/estoque">
          <MdInventory /> Estoque
        </NavItem>
        <NavItem to="/relatorios">
          <MdBarChart /> Relatórios
        </NavItem>
        <NavItem to="/usuarios">
          <MdPeople /> Usuários
        </NavItem>
      </Nav>
    </SidebarContainer>
  );
};

export default Sidebar;