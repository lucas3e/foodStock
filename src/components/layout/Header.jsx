import React from 'react';
import styled from 'styled-components';
import { MdNotifications, MdAccountCircle, MdMenu  } from 'react-icons/md';

const HeaderContainer = styled.header`
  background-color: white;
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 90;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const IconButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.textLight};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: 50%;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const MenuButton = styled.button`
  display: flex;
  background: none;
  border: none;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Header = ({ onMenuClick }) => {
  return (
    <HeaderContainer>
      <MenuButton onClick={onMenuClick}>
        <MdMenu />
      </MenuButton>
      <Title>Dashboard</Title>
      <Actions>
        <IconButton>
          <MdNotifications />
        </IconButton>
        <UserInfo>
          <MdAccountCircle size={32} />
          <span>Admin</span>
        </UserInfo>
      </Actions>
    </HeaderContainer>
  );
};



export default Header;
