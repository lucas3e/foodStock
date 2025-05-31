import styled from 'styled-components';


const ButtonBase = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  
  &:active {
    transform: scale(0.98);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled(ButtonBase)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const OutlineButton = styled(ButtonBase)`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const Button = ({ primary, children, ...props }) => {
  if (primary) {
    return <PrimaryButton {...props}>{children}</PrimaryButton>;
  }
  return <OutlineButton {...props}>{children}</OutlineButton>;
};

export default Button;