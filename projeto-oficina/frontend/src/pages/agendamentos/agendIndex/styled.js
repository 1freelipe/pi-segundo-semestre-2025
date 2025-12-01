import styled from 'styled-components';
import { PatternFormat } from 'react-number-format';

const SIDEBAR_WIDTH = '100px';
const STATUS_COLOR_TEXT = (status) => {
  switch (status) {
    case 'A':
      return '#330aff';
    case 'C':
      return 'red';
    case 'F':
      return '#21cf21ff';
    default:
      return 'inherit';
  }
};

export const DivTop = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 20px;
  padding-left: calc(${SIDEBAR_WIDTH} + 20px);
  position: relative;
`;

export const Title = styled.h1`
  color: white;
  font-size: 25px;
  text-align: center;
  text-transform: uppercase;
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  font-style: normal;
  background: #930707;
  border: 1px solid #fffff0;
  padding: 7px;
  border-radius: 40px;
  box-shadow: 0 0 4px #fffff0;
  width: 320px;
`;

export const Search = styled.input`
  width: 350px;
  padding: 15px;
  margin-right: 2%;
  background: #252525;
  border: 1px solid #fffff0;
  border-radius: 6px;
  color: #fffff0;
  font-size: 20px;
`;

export const LabelSearch = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  z-index: 10;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  font-style: normal;
  text-transform: uppercase;
  font-size: 18px;
  color: #fffff0;
  opacity: 0.7;
  cursor: text;
  pointer-events: none;
  transition: opacity 0.2s ease-in-out;
  right: 3%;
  top: 25%;
  width: 315px;

  ${Search}:not(:placeholder-shown) + & {
    opacity: 0;
  }

  .ioSearch {
    font-size: 25px;
  }
`;

export const ContainerForm = styled.div`
  background: #252525;
  width: 700px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px auto;
  border: 1px solid #fffff0;
  border-radius: 15px;
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.4),
    10px 8px 20px rgba(0, 0, 0, 0.5),
    2px 2px 2px #d9d9d96c inset;
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-direction: column;
  width: 95%;
`;

export const DivLabel = styled.div`
  width: 600px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Label = styled.label`
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  font-style: normal;
  text-transform: uppercase;
  font-size: 20px;
  color: #fffff0;
  opacity: 0.7;
  cursor: text;
  pointer-events: none;

  .LabelHora {
    margin-right: 0;
  }
`;

export const DataHora = styled.div`
  width: 600px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const InputCliente = styled(PatternFormat)`
  width: 480px;
  padding: 7px;
  background: #252525;
  border: 1px solid #fffff0;
  border-radius: 12px;
  color: #fffff0;
  font-size: 20px;
`;

export const InputPlaca = styled.input`
  width: 480px;
  padding: 7px;
  background: #252525;
  border: 1px solid #fffff0;
  border-radius: 12px;
  color: #fffff0;
  font-size: 20px;
`;

export const InputData = styled.input`
  width: 130px;
  padding: 7px;
  background: #252525;
  border: 1px solid #fffff0;
  border-radius: 12px;
  color: #fffff0;
  font-size: 20px;
`;

export const InputHora = styled.input`
  width: 130px;
  padding: 7px;
  background: #252525;
  border: 1px solid #fffff0;
  border-radius: 12px;
  color: #fffff0;
  font-size: 20px;
`;

export const InputObs = styled.textarea`
  width: 92%;
  height: 150px;
  padding: 7px;
  background: #252525;
  border: 1px solid #fffff0;
  border-radius: 12px;
  color: #fffff0;
  font-size: 20px;

  &::placeholder {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-style: normal;
    text-transform: uppercase;
    color: #fffff0;
    opacity: 0.6;
    font-size: 17px;
  }
`;

export const InputFuncionario = styled.input`
  width: 480px;
  padding: 7px;
  background: #252525;
  border: 1px solid #fffff0;
  border-radius: 12px;
  color: #fffff0;
  font-size: 20px;
`;

export const ButtonSubmit = styled.button`
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #930707;
  margin: 0 auto;
  border: none;
  padding: 13px;
  border: 1px solid #fffff0;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  letter-spacing: 1px;
  font-style: normal;
  text-transform: uppercase;
  color: #fffff0;
  border-radius: 9px;
  font-size: 20px;
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.4),
    6px 6px 12px rgba(0, 0, 0, 0.4);
  cursor: pointer;

  &:hover {
    transform: scale(1.01);
  }

  &:active {
    transform: scale(0.99);
  }

  &.btnCancel {
    width: 240px;
  }
`;

export const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const ContainerContent = styled.div`
  width: calc(100% - ${SIDEBAR_WIDTH} - 50px);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px auto;
  background: #252525;
  border: 1px solid #930707;
  border-radius: 12px;
  margin-bottom: 250px;
  margin-left: calc(${SIDEBAR_WIDTH} + 30px);
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.5),
    15px 12px 20px rgba(0, 0, 0, 0.5);
`;

export const DivTitleContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: calc(100% - ${SIDEBAR_WIDTH});
  padding-left: calc(${SIDEBAR_WIDTH} + 50px);
`;

export const TitleContent = styled.h2`
  width: 300px;
  padding: 5px;
  background: #930707;
  border: 1px solid #fffff0;
  border-radius: 8px;
  text-align: center;
  font-size: 19px;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #930707;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
`;

export const Thead = styled.thead`
  background-color: #202020;
  color: #fffff0;
  font-size: 20px;
`;

export const Th = styled.th`
  padding: 15px 10px;
  text-align: center;
  font-weight: bold;
  font-size: 1em;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 2px solid #202020;

  &:last-child {
    border-right: none;
  }
`;

export const Tbody = styled.tbody`
  background-color: #383838;
  font-size: 18px;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
`;

export const Tr = styled.tr`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #4a4a4a;
    cursor: pointer;
  }
`;

export const Td = styled.td`
  padding: 12px 10px;
  color: ${(props) => STATUS_COLOR_TEXT(props.$status)};
  font-size: 1em;

  .edit {
    color: #fffff0;
    font-size: 24px;
    text-align: center;
    margin-right: 10px;
    cursor: pointer;

    &:hover {
      color: #252525;
    }
  }

  .delete {
    color: #fffff0;
    text-align: center;
    font-size: 20px;
    margin-right: 10px;
    cursor: pointer;

    &:hover {
      color: #252525;
    }
  }

  .check {
    color: #fffff0;
    text-align: center;
    font-size: 20px;
    margin-right: 10px;
    cursor: pointer;

    &:hover {
      color: #252525;
    }
  }

  .cancel {
    color: #fffff0;
    text-align: center;
    font-size: 22px;
    cursor: pointer;

    &:hover {
      color: #252525;
    }
  }
`;
