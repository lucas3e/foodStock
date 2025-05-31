import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './SideBar';
import Header from './Header';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 250px; /* Largura da sidebar */
`;

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  flex: 1;
`;

const Layout = () => {
  return (
    <LayoutContainer>
      <Sidebar />
      <MainContent>
        <Header />
        <Content>
          <Outlet />
        </Content>
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout;