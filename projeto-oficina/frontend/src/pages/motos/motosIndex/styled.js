import styled from 'styled-components';

const SIDEBAR_WIDTH = '100px';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  max-height: 90vh;
  position: relative;
  width: calc(100% - ${SIDEBAR_WIDTH});
  margin-bottom: 250px;
  margin-left: ${SIDEBAR_WIDTH};
`;

export const DivTitle = styled.h1`
  margin-top: 20px;
  width: calc(100% - ${SIDEBAR_WIDTH});
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TitleTop = styled.h1`
  color: white;
  font-size: 30px;
  text-align: center;
  text-transform: uppercase;
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  font-style: normal;
  background: #930707;
  border: 1px solid #fffff0;
  box-shadow: 0 0 4px #fffff0;
  padding: 10px;
  border-radius: 40px;
  width: 450px;
  margin-left: ${SIDEBAR_WIDTH};
`;

export const ButtonNew = styled.button`
  background: #fffff0;
  width: 200px;
  position: absolute;
  padding: 17px;
  border: none;
  border: 2px solid #930707;
  border-radius: 9px;
  font-size: 20px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-style: normal;
  color: #930707;
  top: -5%;
  right: 3%;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
    border-color: #252525;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const InsertContent = styled.div`
  width: 100%;
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(2, 400px);
  grid-auto-columns: calc(50% - 10px);
  padding: 20px;
  gap: 20px;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: thin;
  scrollbar-color: #fffff0 #252525;

  &::-webkit-scrollbar {
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #252525;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #930707;
    border-radius: 5px;
    border: 2px solid #fffff0;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #c20a0a;
  }
`;

export const Containers = styled.div`
  height: 400px;
  border-radius: 14px;
  background: #252525;
  overflow: hidden;
  position: relative;
  border: 2px solid #930707;
  box-shadow:
    3px 2px 5px rgba(255, 255, 255, 0.4) inset,
    0 2px 8px #930707;

  &:hover {
    transform: scale(1.02);
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 95%;
  padding: 0 10px 10px 10px;
  gap: 25px;
`;

export const DivTitleContent = styled.div`
  margin: 0 auto;
  width: 450px;
  padding: 0 10px;
  border-radius: 40px;
`;

export const TitleContent = styled.h1`
  width: 100%;
  text-align: center;
  color: #930707;
  text-transform: uppercase;
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  font-style: normal;
  background: linear-gradient(90deg, #930707 0%, red 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const AnoPlaca = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Ano = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  flex: 1;
  text-transform: uppercase;
`;

export const AnoText = styled.h2`
  color: #fffff0;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-style: normal;
`;

export const AnoContent = styled.h2`
  color: #252525;
  width: 100px;
  border: 1px solid #930707;
  text-align: center;
  border-radius: 8px;
  background: #fffff0;
  opacity: 0.8;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-style: normal;
`;

export const Placa = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  flex: 1;
  text-transform: uppercase;
`;

export const PlacaText = styled.h2`
  color: #fffff0;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-style: normal;
`;

export const PlacaContent = styled.h2`
  color: #252525;
  width: 150px;
  border: 1px solid #930707;
  text-align: center;
  border-radius: 8px;
  background: #fffff0;
  opacity: 0.8;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-style: normal;
`;

export const CorMarca = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Cor = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  flex: 1;
  text-transform: uppercase;
`;

export const CorText = styled.h2`
  color: #fffff0;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-style: normal;
`;

export const CorContent = styled.h2`
  color: #252525;
  width: 150px;
  border: 1px solid #930707;
  text-align: center;
  border-radius: 8px;
  background: #fffff0;
  opacity: 0.8;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-style: normal;
`;

export const Marca = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  flex: 1;
  text-transform: uppercase;
`;

export const MarcaText = styled.h2`
  color: #fffff0;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-style: normal;
`;

export const MarcaContent = styled.h2`
  color: #252525;
  width: 150px;
  border: 1px solid #930707;
  text-align: center;
  border-radius: 8px;
  background: #fffff0;
  opacity: 0.8;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-style: normal;
`;

export const ClienteAtivo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Cliente = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  flex: 1;
  text-transform: uppercase;
`;

export const ClienteText = styled.h2`
  color: #fffff0;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-style: normal;
`;

export const ClienteContent = styled.h2`
  color: #252525;
  width: 220px;
  border: 1px solid #930707;
  text-align: center;
  border-radius: 8px;
  background: #fffff0;
  opacity: 0.8;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-style: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 3px;
`;

export const Ativo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  flex: 1;
  text-transform: uppercase;
`;

export const AtivoText = styled.h2`
  color: #fffff0;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-style: normal;
`;

export const AtivoContent = styled.h2`
  color: #56ab2f;
  width: 150px;
  text-align: center;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  font-style: normal;

  color: ${(props) => (props.$isAtivo ? '#56ab2f' : 'red')};
`;

export const ObservacaoDiv = styled.div`
  width: 100%;
  margin: 0;
  height: 100px;
  padding: 10px;
`;

export const ObservacaoText = styled.h2`
  width: 100%;
  text-align: center;
  color: #fffff0;
  text-transform: uppercase;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-style: normal;
`;

export const ObservacaoContent = styled.div`
  width: 100%;
  border: 1px solid #930707;
  background: #fffff0;
  opacity: 0.8;
  height: 100%;
  overflow: auto;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-style: normal;
  padding: 5px;
  color: #252525;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  width: 60px;
  position: absolute;
  top: 15px;
  right: 6px;
`;

export const BtnEdit = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background: #930707;
  border: none;
  cursor: pointer;
  font-size: 18px;
  border: 1px solid #fffff0;
  border-radius: 50%;
  transition: all 0.3s ease;

  .edit {
    color: #fffff0;
  }

  &:hover {
    background: #df3535ff;
    color: #252525;
  }
`;

export const BtnExclude = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background: #930707;
  border: none;
  cursor: pointer;
  color: #fffff0;
  font-size: 20px;
  border: 1px solid #fffff0;
  border-radius: 50%;

  transition: all 0.3s ease;

  &:hover {
    background: #df3535ff;
    color: #252525;
  }
`;

export const BtnAgenda = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background: #930707;
  border: none;
  cursor: pointer;
  color: #fffff0;
  font-size: 18px;
  border: 1px solid #fffff0;
  border-radius: 50%;

  transition: all 0.3s ease;

  &:hover {
    background: #df3535ff;
    color: #252525;
  }
`;
