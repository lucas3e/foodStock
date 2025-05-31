import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const LoginCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  padding: ${({ theme }) => theme.spacing.xl};
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  margin-top: 0;
  font-size: 1.5rem;
`;

const Subtitle = styled.h2`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 1rem;
  font-weight: 400;
  margin-top: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: left;
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const ForgotPassword = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const LoginPage = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('authToken', 'authenticated');
    setIsAuthenticated(true);
    navigate('/');
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>Sistema de Gestão Escolar</Title>
        <Subtitle>Controle de Estoque de Alimentos</Subtitle>
        
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="*********"
              required
            />
          </FormGroup>
          
          <CheckboxContainer>
            <Checkbox
              type="checkbox"
              id="adminAccess"
              checked={isAdmin}
              onChange={() => setIsAdmin(!isAdmin)}
            />
            <Label htmlFor="adminAccess">Acesso administrativo</Label>
          </CheckboxContainer>
          
          <LoginButton type="submit">Entrar</LoginButton>
          
          <ForgotPassword href="#">Esqueci minha senha</ForgotPassword>
        </form>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginPage;
