import styled, { keyframes } from 'styled-components';

const SIDEBAR_WIDTH = '100px';

const scrollUp = keyframes`
  0% {
    transform: translateY(0)
  }

  100% {
    transform: translateY(-50%);
  }
`;

export const ContainerDash = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  height: 500px;
  margin: 40px auto;
`;

export const DashOne = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fffff0;
  width: 48%;
  height: 500px;
  border-radius: 9px;
`;

export const ChartOne = styled.div`
  width: 710px;
  height: 480px;
  border: 1px solid #930707;
  border-radius: 12px;
  padding: 10px;
`;

export const DashTwo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #fffff0;
  width: 48%;
  height: 500px;
  border-radius: 9px;
  padding: 10px;
  position: relative;
`;

export const ChartTwo = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  width: 710px;
  height: 480px;
  border-radius: 12px;
  border: 1px solid #930707;
  overflow: hidden;

  h2 {
    text-align: center;
    margin: 30px;
    color: #fffff0;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    font-style: normal;
  }

  span {
    font-weight: bold;
  }
`;

export const DivAnimation = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  width: 710px;

  animation: ${scrollUp} 15s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`;

export const ChartDivOne = styled.div`
  width: 90%;
  background: #930707;
  border: 1px solid #fffff0;
  border-radius: 9px;
  box-shadow: 0 2px 7px #252525;
  flex-shrink: 0;
  margin-bottom: 20px;
`;
export const ChartDivTwo = styled.div`
  width: 90%;
  background: #930707;
  border: 1px solid #fffff0;
  border-radius: 9px;
  box-shadow: 0 2px 7px #252525;
  flex-shrink: 0;
  margin-bottom: 20px;
`;
export const ChartDivThree = styled.div`
  width: 90%;
  background: #930707;
  border: 1px solid #fffff0;
  border-radius: 9px;
  box-shadow: 0 2px 7px #252525;
  flex-shrink: 0;
  margin-bottom: 20px;
`;

export const ChartDivFour = styled.div`
  width: 90%;
  background: #930707;
  border: 1px solid #fffff0;
  border-radius: 9px;
  box-shadow: 0 2px 7px #252525;
  flex-shrink: 0;
  margin-bottom: 20px;
`;

export const ChartThree = styled.div`
  background: #252525;
  width: 99%;
  height: 500px;
  border-radius: 12px;
  border: 1px solid #930707;
  padding: 10px;
  box-shadow: 0 2px 7px #252525;
`;

export const DashTitle = styled.h1`
  font-family: 'Kanit', sans-serif;
  font-weight: 600;
  font-style: normal;
  margin-top: 10px;
  color: #fffff0;
  width: 99%;
  background: #970707;
  text-align: center;
  padding: 10px;
  border-radius: 7px;
  box-shadow: 0 2px 7px #252525;
`;

export const DashGeral = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px 20px 20px;
  gap: 20px;
  width: 80%;
  margin: 0 auto 250px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fffff0;
    border-radius: 12px;
    z-index: -1;
  }
`;

export const ChartFinal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 70px;
`;

export const ChartFour = styled.div`
  width: 700px;
  height: 450px;
  border-radius: 12px;
  border: 1px solid #930707;
  padding: 10px;
  background: #252525;
  box-shadow: 0 2px 7px #252525;
`;

export const ChartFive = styled.div`
  width: 700px;
  height: 450px;
  border: 1px solid #930707;
  border-radius: 12px;
  padding: 10px;
  background: #252525;
  box-shadow: 0 2px 7px #252525;
`;

export const Arrow = styled.div`
  width: 50px;
  height: 50px;
  position: fixed;
  right: 30px;
  bottom: 10px;
  font-size: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #970707;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }

  &::before {
    content: '';
    background: #fff;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: -1;
  }
`;

export const DashTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  backdrop-filter: blur(10px);
  width: calc(90% - ${SIDEBAR_WIDTH});
  margin-left: calc(${SIDEBAR_WIDTH} + 100px);
  padding: 20px 10px;
  height: 150px;
  border-radius: 12px;
  gap: 15px;
  border: 1px solid #252525;
`;

export const TitleTop = styled.h4`
  color: #fffff0;
  margin: 0 auto;
  width: 60%;
  background: #970707;
  text-align: center;
  padding: 5px 10px;
  border-radius: 7px;
  border: 1px solid #fffff0;
  box-shadow: 0 0 12px #fffff085;
  white-space: nowrap;
`;

export const ChartTopOne = styled.div`
  backdrop-filter: blur(10px);
  width: 40%;
  height: 140px;
  border-radius: 12px;
  padding: 10px;
  border: 2px solid #970707;
  text-align: center;
  box-shadow: 0 1px 8px #930707;

  h4 {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-style: normal;
  }

  .MiniTitle {
    color: #fffff0;
    margin-top: 30px;
    font-size: 25px;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    font-style: normal;
  }
`;

export const ChartTopTwo = styled.div`
  backdrop-filter: blur(10px);
  width: 40%;
  height: 140px;
  border-radius: 12px;
  border: 2px solid #970707;
  padding: 10px;
  text-align: center;
  box-shadow: 0 1px 8px #930707;

  h4 {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-style: normal;
  }

  .MiniTitle {
    color: #fffff0;
    margin-top: 30px;
    font-size: 25px;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    font-style: normal;
  }
`;

export const ChartTopThree = styled.div`
  backdrop-filter: blur(10px);
  width: 40%;
  height: 140px;
  border-radius: 12px;
  border: 2px solid #970707;
  padding: 10px;
  text-align: center;
  box-shadow: 0 1px 8px #930707;

  h4 {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-style: normal;
  }

  .MiniTitle {
    color: #fffff0;
    margin-top: 30px;
    font-size: 25px;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    font-style: normal;
  }
`;
