import styled, { css } from 'styled-components';

const SIDEBAR_WIDTH = '100px';

export const Container = styled.div`
  width: calc(90% - ${SIDEBAR_WIDTH});
  margin-left: calc(${SIDEBAR_WIDTH} + 100px);
  margin-bottom: 250px;
  border-radius: 12px;

  h1 {
    text-align: center;
    font-size: 30px;
    text-transform: uppercase;
    color: #fffff0;
    font-family: 'Kanit', sans-serif;
    font-weight: 600;
    font-style: normal;
    margin-bottom: 15px;
    background: #930707;
    padding: 10px;
    border: 1px solid #fffff0;
    border-radius: 12px;
  }
`;

export const DivTitle = styled.div`
  margin-top: 20px;
  width: calc(100% - ${SIDEBAR_WIDTH});
  margin-left: ${SIDEBAR_WIDTH};
`;

export const Title = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  background: #930707;
  border: 1px solid #fffff0;
  box-shadow: 0 0 4px #fffff0;
  border-radius: 40px;
  padding: 10px;
  color: white;
  font-size: 30px;
  text-align: center;
  text-transform: uppercase;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-style: normal;
  width: 400px;
`;

export const DivBotoes = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100px;
  margin-top: 30px;
  padding: 10px;
  gap: 30px;
  width: calc(96% - ${SIDEBAR_WIDTH});
  margin-left: ${SIDEBAR_WIDTH};
  padding-left: 100px;
  margin-bottom: 30px;
`;

export const HomeIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  font-size: 40px;

  .HomeI {
    color: #fffff0;
    cursor: pointer;
  }
`;

export const Search = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 150px;
  position: relative;
`;

export const Cadastro = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 150px;
`;

export const BotaoCadastro = styled.button`
  cursor: pointer;
  background: #fffff0;
  width: 100%;
  padding: 20px;
  font-size: 25px;
  border: 1px solid #fffff0;
  border-radius: 50px;
  background: #930707;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-style: normal;
  color: #fffff0;
  box-shadow: 0 0 4px #fffff0;
  text-transform: uppercase;

  &:hover {
    transform: scale(1.01);
  }

  &:active {
    transform: scale(0.99);
    color: #252525;
  }
`;

export const SearchCliente = styled.input`
  cursor: text;
  background: #fffff0;
  width: 100%;
  padding: 20px;
  border: 2px solid #930707;
  border-radius: 50px;
  background: #fffff0;
  box-shadow: 0 0 4px #fffff0;
  font-size: 25px;
`;

export const LabelCliente = styled.label`
  width: 92%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  z-index: 10;
  left: 20px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-style: normal;
  text-transform: uppercase;
  font-size: 25px;
  color: #252525;
  opacity: 0.7;
  cursor: text;
  pointer-events: none;
  transition: opacity 0.2s ease-in-out;

  ${SearchCliente}:not(:placeholder-shown) + & {
    opacity: 0;
  }

  .iconSearch {
    font-size: 40px;
  }
`;

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

  .edit {
    color: #930707;
    font-size: 20px;
    text-align: center;
    margin-right: 10px;
    cursor: pointer;

    &:hover {
      color: #252525;
    }
  }

  .delete {
    color: #930707;
    text-align: center;
    font-size: 20px;
    cursor: pointer;

    &:hover {
      color: #252525;
    }
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  margin-top: 1.5rem;
`;

export const PageButton = styled.button`
  background: ${(props) => (props.$active ? '#930707' : '#252525')};
  color: ${(props) => (props.$active ? '#fffff0' : '#fffff0')};
  border: 1px solid #d9d9d9;
  padding: 10px 15px;
  margin: 0 2px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 15px;
  font-weight: bold;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #e9ecef;
    color: #252525;
  }

  &:disabled {
    color: #6c757d;
    background-color: #fff;
    border-color: #dee2e6;
    cursor: not-allowed;
  }
`;
