import styled from 'styled-components';


const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${({ theme }) => theme.colors.cardBg};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

const TableHeader = styled.thead`
  background-color: ${({ theme }) => theme.colors.background};
`;

const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: rgba(0,0,0,0.02);
  }
`;

const TableHeaderCell = styled.th`
  padding: ${({ theme }) => theme.spacing.md};
  text-align: left;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textLight};
`;

const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.md};
`;

const Table = ({ columns, data }) => {
  return (
    <TableContainer>
      <StyledTable>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHeaderCell key={index}>{column.header}</TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <tbody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex}>
                  {column.render ? column.render(row) : row[column.accessor]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default Table;