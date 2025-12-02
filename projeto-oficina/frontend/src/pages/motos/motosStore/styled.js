import styled from 'styled-components';
import { PatternFormat } from 'react-number-format';

import MotoPng from '../../../img/moto.png';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px auto 250px;
  width: 65%;
  height: 800px;
  border: 2px solid #930707;
  border-radius: 12px;
  backdrop-filter: blur(5px);
  box-shadow:
    -8px 8px 15px rgba(0, 0, 0, 0.2),
    2px 2px 25px #930707;
  padding: 20px;
`;

export const DivTitle = styled.h1`
  background: #930707;
  border: 1px solid #fffff0;
  margin: 20px auto;
  width: 450px;
  padding: 10px;
  border-radius: 40px;
  box-shadow: 0 0 4px #fffff0;
`;

export const TitleTop = styled.h1`
  color: white;
  font-size: 30px;
  text-align: center;
  text-transform: uppercase;
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  font-style: normal;
`;

export const Form = styled.form`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 800px;
  gap: 30px;
  padding: 15px;
`;

export const DivLabel = styled.div`
  width: 25%;
  position: relative;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #d9d9d9a6;
  margin-left: 10px;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-style: normal;
  text-transform: uppercase;
  position: absolute;
  top: 25%;
  left: 2.5%;
  gap: 10px;
  pointer-events: none;
  transition: opacity 0.2s ease-in-out;
`;

export const PlacaAno = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  gap: 30px;
`;

export const MarcaCor = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  gap: 30px;
`;

export const ModeloCpf = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  gap: 30px;
`;

export const InputPlaca = styled.input`
  width: 100%;
  padding: 15px;
  font-size: 20px;
  background: #252525;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  color: #fffff0;

  &:not(:placeholder-shown) + ${Label} {
    opacity: 0;
  }
`;

export const InputAno = styled.input`
  width: 50%;
  padding: 15px;
  font-size: 20px;
  background: #252525;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  color: #fffff0;

  &:not(:placeholder-shown) + ${Label} {
    opacity: 0;
  }
`;

export const InputMarca = styled.input`
  width: 100%;
  padding: 15px;
  font-size: 20px;
  background: #252525;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  color: #fffff0;

  &:not(:placeholder-shown) + ${Label} {
    opacity: 0;
  }
`;

export const InputCor = styled.input`
  width: 50%;
  padding: 15px;
  font-size: 20px;
  background: #252525;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  color: #fffff0;

  &:not(:placeholder-shown) + ${Label} {
    opacity: 0;
  }
`;

export const InputModelo = styled.input`
  width: 100%;
  padding: 15px;
  font-size: 20px;
  background: #252525;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  color: #fffff0;

  &:not(:placeholder-shown) + ${Label} {
    opacity: 0;
  }
`;

export const InputCPF = styled(PatternFormat)`
  width: 100%;
  padding: 15px;
  font-size: 20px;
  background: #252525;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  color: #fffff0;

  &:not(:placeholder-shown) + ${Label} {
    opacity: 0;
  }
`;

export const InputOBS = styled.textarea`
  width: 692px;
  height: 200px;
  padding: 15px;
  border: none;
  background: #252525;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  font-size: 20px;
  color: #fffff0;

  &::placeholder {
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    font-style: normal;
    text-transform: uppercase;
    color: #d9d9d9a6;
  }
`;

export const DivButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  gap: 20px;
`;

export const ButtonSubmit = styled.button`
  width: 200px;
  border: none;
  border: 1px solid #fffff0;
  padding: 13px;
  cursor: pointer;
  color: #fffff0;
  background: #930707;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-style: normal;
  text-transform: uppercase;
  font-size: 20px;
  box-shadow:
    -8px 8px 15px rgba(0, 0, 0, 0.2),
    8px 8px 15px rgba(0, 0, 0, 0.6);
  letter-spacing: 1px;

  &:hover {
    transform: scale(1.01);
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background: #550808ff;
    cursor: not-allowed;
  }
`;

export const ButtonClear = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 200px;
  border: none;
  border: 1px solid #fffff0;
  padding: 13px;
  cursor: pointer;
  color: #fffff0;
  background: #252525;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-style: normal;
  text-transform: uppercase;
  font-size: 20px;
  box-shadow:
    -8px 8px 15px rgba(0, 0, 0, 0.2),
    8px 8px 15px rgba(0, 0, 0, 0.6);
  letter-spacing: 1px;

  .Clear {
    color: red;
    font-size: 25px;
  }

  &:hover {
    transform: scale(1.01);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const DivImg = styled.div`
  width: 500px;
  background-image: url(${MotoPng});
  background-position: center;
  background-repeat: no-repeat;
  height: 500px;
  position: absolute;
  bottom: 0;
  right: 0;
  pointer-events: none;
`;
