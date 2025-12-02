import styled from 'styled-components';
import { PatternFormat } from 'react-number-format';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  margin: 30px auto;
  margin-bottom: 200px;
  padding: 20px;
  border: 5px solid #fffff0;
  border-radius: 20px;
  position: relative;

  .Title {
    margin-top: 0;
  }
`;

export const DivForm = styled.div`
  width: 1100px;
  height: 100%;
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  gap: 10px;

  .BtnCadastro {
    width: 300px;
    margin-top: 15px;
    font-family: 'Kanit', sans-serif;
    font-weight: 600;
    font-style: normal;
    background: #56ab2f;
    font-size: 30px;

    &:active {
      color: #fffff0;
    }

    &:disabled {
      background: #3a741fff;
      cursor: not-allowed;
    }
  }

  ::placeholder {
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    font-style: normal;
    text-transform: uppercase;
  }
`;

export const CpfTel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  margin-bottom: 30px;
`;

export const CpfTelCli = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
`;

export const CepNum = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  margin-bottom: 30px;
`;

export const DivAtivo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  padding: 5px;
  border-radius: 8px;
`;

export const InputName = styled.input`
  width: 80%;
  padding: 15px;
  background: #d9d9d9;
  border: none;
  border-radius: 8px;
  border: 2px solid #252525;
  font-size: 20px;
`;

export const InputCPF = styled(PatternFormat)`
  width: 40%;
  padding: 15px;
  background: #d9d9d9;
  border: none;
  border-radius: 8px;
  border: 2px solid #252525;
  font-size: 20px;
`;

export const InputTEL = styled(PatternFormat)`
  width: 40%;
  padding: 15px;
  background: #d9d9d9;
  border: none;
  border-radius: 8px;
  border: 2px solid #252525;
  font-size: 20px;
`;

export const InputEndereco = styled.input`
  width: 80%;
  padding: 15px;
  background: #d9d9d9;
  border: none;
  border-radius: 8px;
  border: 2px solid #252525;
  font-size: 20px;
`;

export const InputCep = styled.input`
  width: 40%;
  padding: 15px;
  background: #d9d9d9;
  border: none;
  border-radius: 8px;
  border: 2px solid #252525;
  font-size: 20px;
`;

export const InputBairro = styled.input`
  width: 40%;
  padding: 15px;
  background: #d9d9d9;
  border: none;
  border-radius: 8px;
  border: 2px solid #252525;
  font-size: 20px;
`;

export const InputNum = styled.input`
  width: 40%;
  padding: 15px;
  background: #d9d9d9;
  border: none;
  border-radius: 8px;
  border: 2px solid #252525;
  font-size: 20px;
`;

export const InputEmail = styled.input`
  width: 80%;
  padding: 15px;
  background: #d9d9d9;
  border: none;
  border-radius: 8px;
  border: 2px solid #252525;
  font-size: 20px;
`;

export const LabelAtivo = styled.label`
  font-size: 18px;
  color: #fffff0;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-style: normal;
  margin-right: 20px;
  text-transform: uppercase;
`;

export const InputAtivo = styled.input`
  padding: 15px;
  background: #d9d9d9;
  border: none;
  border-radius: 8px;
  border: 2px solid #252525;
  font-size: 20px;
`;

export const InputOBS = styled.textarea`
  width: 80%;
  height: 200px;
  padding: 15px;
  background: #d9d9d9;
  border: none;
  border-radius: 8px;
  border: 2px solid #252525;
  font-size: 20px;
`;

export const ArrowReturn = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 50%;
  background: #fffff0;
  position: absolute;
  left: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  cursor: pointer;
  color: #930707;

  &:hover {
    transform: scale(1.01);
  }

  &.ArrowReturnMotos {
    left: -12%;
  }

  &.ArrowReturnOrdem {
    left: -5%;
    width: 40px;
    height: 40px;
  }

  &.ArrowReturnEstoque {
    left: -10%;
    bottom: 50%;
  }
`;
