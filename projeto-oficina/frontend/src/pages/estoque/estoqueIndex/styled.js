import styled, { css } from 'styled-components';

const SIDEBAR_WIDTH = '100px';

export const TopDiv = styled.div`
  width: 100%;
  display: flex;
  margin-top: 30px;
  justify-content: flex-start;
`;

export const TituloPeca = styled.h1`
  background-color: #930707;
  width: 400px;
  padding: 9px;
  color: #fffff0;
  border-radius: 40px;
  border: 1px solid #fffff0;
  font-size: 30px;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-style: normal;
  text-align: center;
  margin-left: calc(${SIDEBAR_WIDTH} + 20px);
  text-transform: uppercase;
  box-shadow: 0 0 4px #fffff0;
`;

export const BotaoCadastrarPeca = styled.div`
  width: 100%;
  display: flex;
  margin-top: 30px;
  justify-content: flex-start;
`;

export const TituloCadastrar = styled.button`
  background-color: #fffff0;
  color: #930707;
  width: 230px;
  padding: 8px;
  border-radius: 10px;
  font-size: 20px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-style: normal;
  text-align: center;
  margin-left: calc(${SIDEBAR_WIDTH} + 1525px);
  text-transform: uppercase;
  box-shadow: 0 0 10px #252525;
  border: none;
  cursor: pointer;
  border: 1px solid #930707;
`;

export const WhiteTable = styled.div`
  width: 90%;
  margin-top: 15px;
  margin-bottom: 250px;
  margin-left: calc(${SIDEBAR_WIDTH} + 45px);
`;

// export const StyledTable = styled.table`
//   width: 100%;
//   box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
//   background-color: #fffff0;
//   border-radius: 12px;
//   overflow: hidden;
// `;

// export const RedTable = styled.div`
//   background-color: #930707;
//   display: flex;
//   width: 1690px;
//   padding: 30px;
//   justify-content: flex-start;
//   color: #fffff0;
// `;

export const StyledTable = styled.table`
  width: 100%;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  background-color: #fffff0;
  border-radius: 12px;
  overflow: hidden;
`;

export const Thead = styled.thead`
  background-color: #930707;
  color: #fffff0;
`;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #eeeeeeff;
  }

  &:hover {
    background-color: #e9ecef;
  }

  ${(props) =>
    props.$isHead &&
    css`
      &:hover {
        background-color: transparent;
      }
    `}
`;

export const Th = styled.th`
  padding: 20px;
  text-transform: uppercase;
  font-size: 17px;
  letter-spacing: 0.5px;
  text-align: center;
  font-family: 'Kanit', sans-serif;
  font-weight: 600;
  font-style: normal;
`;

export const Td = styled.td`
  border: 1px solid #ccc;
  padding: 20px;
  border-top: 1px solid #dee2e6;
  font-size: 17px;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-style: normal;
  color: #252525;
`;
