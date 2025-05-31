import styled from 'styled-components';


const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBg};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.small};
  padding: ${({ theme }) => theme.spacing.lg};
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.medium};
    transform: translateY(-2px);
  }
`;

const CardTitle = styled.h3`
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 1rem;
  font-weight: 500;
`;

const CardValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

const Card = ({ title, value, children }) => {
  return (
    <CardContainer>
      <CardTitle>{title}</CardTitle>
      {value && <CardValue>{value}</CardValue>}
      {children}
    </CardContainer>
  );
};

export default Card;