import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { 
  MdDashboard, 
  MdRestaurantMenu, 
  MdInventory, 
  MdBarChart, 
  MdPeople, 
  MdMenu 
} from 'react-icons/md';

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #2c3e50;
  color: white;
  height: 100vh;
  position: fixed;
  left: ${({ isOpen }) => (isOpen ? '0' : '-250px')};
  top: 0;
  z-index: 100;
  transition: left 0.3s ease;

  @media (min-width: 768px) {
    left: 0;
  }
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

const Overlay = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 90;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
    <Overlay isOpen={isOpen} onClick={onClose} />
      <SidebarContainer isOpen={isOpen}>
        <Logo>FoodStock</Logo>
        <Nav>
          <NavItem to="/" onClick={onClose}>
            <MdDashboard /> Dashboard
          </NavItem>
          <NavItem to="/cardapios" onClick={onClose}>
            <MdRestaurantMenu /> Cardápios
          </NavItem>
          <NavItem to="/estoque" onClick={onClose}>
            <MdInventory /> Estoque
          </NavItem>
          <NavItem to="/relatorios" onClick={onClose}>
            <MdBarChart /> Relatórios
          </NavItem>
          <NavItem to="/usuarios" onClick={onClose}>
            <MdPeople /> Usuários
          </NavItem>
        </Nav>
      </SidebarContainer>
    </>
  );
};




export default Sidebar;