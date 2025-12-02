import styled from 'styled-components';
import ImgPeca from '../../../img/imgpeca.png';

export const TopTitulo = styled.div`
  width: 100%;
  display: flex;
  margin-top: 30px;
  justify-content: flex-start;
`;

export const TitleCadastro = styled.div`
  background-color: #930707;
  width: 400px;
  padding: 7px;
  color: #fffff0;
  border-radius: 40px;
  border: 1px solid #fffff0;
  font-size: 30px;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-style: normal;
  text-align: center;
  margin-left: 120px;
  box-shadow: 0 0 4px #fffff0;
`;

export const ContainerForm = styled.div`
  background: #252525;
  padding: 10px;
  width: 900px;
  height: 500px;
  margin: 30px auto;
  margin-top: 70px;
  border: 1px solid #fffff0;
  border-radius: 15px;
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.4),
    10px 8px 20px rgba(0, 0, 0, 0.5),
    2px 2px 2px #d9d9d96c inset;
  position: relative;
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  gap: 20px;
`;

export const InputPeca = styled.input`
  width: 480px;
  padding: 7px;
  background: #252525;
  border: 1px solid #fffff0;
  border-radius: 12px;
  color: #fffff0;
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
`;

export const Select = styled.select`
  width: 480px;
  padding: 7px;
  background: #252525;
  border: 1px solid #fffff0;
  border-radius: 12px;
  color: #fffff0;
  opacity: 0.9;
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
`;

export const InputQntd = styled.input`
  width: 480px;
  padding: 7px;
  background: #252525;
  border: 1px solid #fffff0;
  color: #fffff0;
  font-size: 20px;
  font-family: 'Poppins', sans-serif;
  border-radius: 15px;
`;

export const DivLine = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;
export const PrecoUni = styled.input`
  width: 152px;
  padding: 7px;
  background: #252525;
  border: 1px solid #fffff0;
  color: #fffff0;
  font-size: 20px;
  font-family: 'Poppins', sans-serif;
  border-radius: 15px;
`;

export const PrecoVenda = styled.input`
  width: 152px;
  padding: 7px;
  background: #252525;
  border: 1px solid #fffff0;
  color: #fffff0;
  font-size: 20px;
  font-family: 'Poppins', sans-serif;
  border-radius: 15px;
`;

export const Lucro = styled.div`
  width: 152px;
  padding: 7px;
  background: #252525;
  border: 1px solid #fffff0;
  color: #fffff0;
  font-size: 20px;
  font-family: 'Poppins', sans-serif;
  border-radius: 15px;
`;

export const Descricao = styled.input`
  width: 480px;
  height: 100px;
  padding: 7px;
  background: #252525;
  border: 1px solid #fffff0;
  color: #fffff0;
  font-size: 20px;
  font-family: 'Poppins', sans-serif;
  border-radius: 15px;
`;

export const ButtonCadastrar = styled.button`
  width: 200px;
  padding: 12px;
  background: linear-gradient(180deg, #b80000, #6b0000);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
  transition: 0.2s ease;
  color: #fffff0;
  font-size: 20px;
  font-family: 'Poppins', sans-serif;
`;

export const DivTotal = styled.div`
  display: flex;
  margin-left: 240px;
  margin-top: 30px;
`;

export const DivImg = styled.div`
  width: 300px;
  height: 320px;
  background-image: url(${ImgPeca});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  margin-left: -200px;
  margin-top: 15px;
`;
