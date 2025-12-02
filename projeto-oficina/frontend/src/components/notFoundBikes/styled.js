import styled from 'styled-components';
import notFound from '../../img/notFound.png';

const SIDEBAR_WIDTH = '100px';

export const Container = styled.div`
  /* width: calc(80% - ${SIDEBAR_WIDTH}); */
  width: 1500px;
  margin: 0 auto;
  margin-left: 100px;
  margin-top: 20px;
  height: 800px;
  background: #252525;
  border: 2px solid #930707;
  border-radius: 15px;
  padding: 20px;
  position: relative;
`;

export const Title = styled.h1`
  color: #fffff0;
  font-family: 'Lilita One', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 85px;
  text-align: center;
  text-transform: uppercase;
`;

export const DivImage = styled.div`
  background-image: url(${notFound});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 600px;
  height: 700px;
  transform: rotate(10deg);
  position: absolute;
  bottom: 0;
  left: 0;
`;

export const DivContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

export const DivSpace = styled.div`
  width: 40%;
  height: 500px;
`;

export const TitleContent = styled.h2`
  color: #fffff0;
  font-size: 30px;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  font-style: normal;
`;

export const DivButtonSubmit = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  color: #fffff0;
  border-radius: 12px;
  text-transform: uppercase;
  padding: 15px;
  background: #930707;
  font-size: 17px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-style: normal;
  cursor: pointer;
  position: absolute;
  bottom: 10%;
  right: 10%;
  transition: all 0.3s ease-in-out;
  border: none;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.6);

  &:hover {
    color: #252525;
    background: #fffff0;
  }
`;
