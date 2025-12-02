import styled, { css, keyframes } from 'styled-components';

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
  width: 97%;
  display: flex;
  margin-top: 30px;
  justify-content: flex-end;
`;

export const TituloCadastrar = styled.button`
  background: #fffdf0;
  color: #930707;
  border: 2px solid #930707;
  padding: 14px 28px;
  font-size: 18px;
  font-weight: 700;
  font-family: 'Kanit', sans-serif;
  border-radius: 14px;
  cursor: pointer;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  transition: 0.25s ease-in-out;
  position: relative;
  overflow: hidden;

  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -120%;
    height: 100%;
    width: 120%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    transition: 0.45s ease;
  }

  &:hover::after {
    left: 120%;
  }

  &:hover {
    background: #ffffff;
    transform: translateY(-3px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.97);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  }
`;

export const WhiteTable = styled.div`
  width: 90%;
  margin-top: 15px;
  margin-bottom: 250px;
  margin-left: calc(${SIDEBAR_WIDTH} + 45px);
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 14px;
  background: transparent;
`;

export const Thead = styled.thead`
  background-color: #930707;
  color: #252525;

  th:first-child {
    border-radius: 12px 0 0 12px;
  }
  th:last-child {
    border-radius: 0 12px 12px 0;
  }

  color: #fffff0;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);

  th {
    border-bottom: 2px solid #650404;
  }
`;

export const Tbody = styled.tbody``;

export const Th = styled.th`
  padding: 20px;
  text-align: center;
  font-family: 'Kanit', sans-serif;
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const Tr = styled.tr`
  ${(props) =>
    props.$isHead &&
    css`
      color: #fffff0;
      transition: 0.2s ease;
      background-color: #930707;

      &:hover {
        transform: translateY(-4px);
        background-color: #fffff0;
        color: #930707;
      }

      &:hover ${Th} {
        color: #930707;
      }
    `}
  ${(props) =>
    !props.$isHead &&
    css`
      background-color: #fffff0;
      border-radius: 16px;
      box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.12);
      transition: 0.2s ease;

      &:nth-child(even) {
        background-color: #eeeeeeff;
      }

      &:hover {
        transform: translateY(-4px);
        background-color: #fffff0;
        box-shadow:
          0px 6px 15px rgba(0, 0, 0, 0.2),
          0px 6px 0px #930707;
      }

      td:first-child {
        border-radius: 16px 0 0 16px;
      }

      td:last-child {
        border-radius: 0 16px 16px 0;
      }
    `};
`;

export const Td = styled.td`
  ${(props) =>
    props.$isQtd &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    `}

  padding: 20px;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  font-size: 17px;
  font-weight: 600;
  color: #252525;
  border: none;

  .edit,
  .delete,
  .arrowQtd {
    font-size: 22px;
    color: #930707;
    cursor: pointer;
    transition: 0.2s ease;
    margin: 0 8px;

    &:hover {
      color: #252525;
      transform: scale(1.2) rotate(6deg);
    }
  }
`;

const fadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1}
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s ease;
`;

export const ModalBox = styled.div`
  background: #1a1a1a;
  width: 600px;
  padding: 30px;
  border-radius: 12px;
  border: 2px solid #930707;
  box-shadow: 0 0 15px rgba(147, 7, 7, 0.5);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-style: normal;
`;

export const ModalTitle = styled.h2`
  color: #fffff0;
  text-transform: uppercase;
  font-size: 24px;
  margin-bottom: 10px;
  border-bottom: 1px solid #333;
  padding-bottom: 10px;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-style: normal;
  text-align: center;

  span {
    color: #56ab2f;
  }
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  position: absolute;
  top: 15px;
  right: 15px;
  border: none;
  color: #fffff0;
  font-size: 20px;
  cursor: pointer;
  transition:
    color 0.2s,
    transform 0.4s;
  background: #930707;
  padding: 7px;

  &:hover {
    color: #252525;
    transform: rotateZ(180deg);
  }
`;

export const FormModal = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  gap: 20px;
`;

export const InputQtd = styled.input`
  width: 280px;
  padding: 7px;
  background: #252525;
  border: 1px solid #fffff0;
  color: #fffff0;
  font-size: 20px;
  font-family: 'Poppins', sans-serif;
  border-radius: 15px;
`;

export const ButtonAtt = styled.button`
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

  &:hover {
    transform: translateY(-4px);
  }

  &:active {
    transform: scale(0.98);
  }
`;
