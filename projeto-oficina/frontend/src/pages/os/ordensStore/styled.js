import styled from 'styled-components';
import { PatternFormat } from 'react-number-format';

import ferramentas from '../../../img/ferramentas.png';

const SIDEBAR_WIDTH = '100px';

export const DivTop = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding-left: calc(${SIDEBAR_WIDTH} + 20px);
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
  width: 500px;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  height: 600px;
  width: calc(90% - ${SIDEBAR_WIDTH});
  margin-left: calc(${SIDEBAR_WIDTH} + 100px);
  border-radius: 12px;
  border: 2px solid #930707;
  box-shadow:
    2px 10px 15px rgba(0, 0, 0, 0.5),
    2px 2px 25px #930707;
  padding: 10px;
  position: relative;
`;

export const DivImg = styled.div`
  position: absolute;
  width: 250px;
  height: 250px;
  top: 150px;
  left: 30px;
  z-index: 100;
  background-image: url(${ferramentas});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  transform: rotate(-30deg);
`;

export const Form = styled.form`
  width: 90%;
  height: 95%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
`;

export const NomePlaca = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ValorStatus = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const InputServico = styled.input`
  width: 70%;
  padding: 13px;
  font-size: 17px;
  border: 2px solid #d9d9d9;
  border-radius: 12px;
  background: #252525;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  font-style: normal;
  color: #fffff0;

  &::placeholder {
    color: #d9d9d9a9;
  }
`;

export const InputNome = styled(PatternFormat)`
  width: 40%;
  padding: 13px;
  font-size: 17px;
  border: 2px solid #d9d9d9;
  border-radius: 12px;
  background: #252525;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  font-style: normal;
  color: #fffff0;

  &::placeholder {
    color: #d9d9d9a9;
  }
`;

export const InputPlaca = styled.input`
  width: 40%;
  padding: 13px;
  font-size: 17px;
  border: 2px solid #d9d9d9;
  border-radius: 12px;
  background: #252525;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  font-style: normal;
  color: #fffff0;

  &::placeholder {
    color: #d9d9d9a9;
  }
`;

export const InputValor = styled.input`
  width: 40%;
  padding: 13px;
  font-size: 17px;
  border: 2px solid #d9d9d9;
  border-radius: 12px;
  background: #252525;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  font-style: normal;
  color: #fffff0;

  &::placeholder {
    color: #d9d9d9a9;
  }
`;

export const InputStatus = styled.input`
  width: 40%;
  padding: 13px;
  font-size: 17px;
  border: 2px solid #d9d9d9;
  border-radius: 12px;
  background: #252525;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  font-style: normal;
  color: #fffff0;

  &::placeholder {
    color: #d9d9d9a9;
  }
`;

export const Observacao = styled.textarea`
  width: 70%;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  font-style: normal;
  padding: 13px;
  font-size: 17px;
  border: 2px solid #d9d9d9;
  border-radius: 12px;
  background: #252525;
  height: 180px;
  color: #fffff0;

  &::placeholder {
    color: #d9d9d9a9;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
`;

export const BtnSubmit = styled.button`
  width: 200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  border: 1px solid #fffff0;
  background: #930707;
  font-size: 17px;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-style: normal;
  color: #fffff0;
  text-transform: uppercase;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    transform: scale(1.01);
  }

  &:active {
    transform: scale(0.99);
  }
`;

export const BtnCancel = styled.button`
  width: 200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  border: 1px solid #fffff0;
  background: #930707;
  font-size: 17px;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-style: normal;
  color: #fffff0;
  text-transform: uppercase;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    transform: scale(1.01);
  }

  &:active {
    transform: scale(0.99);
  }
`;
