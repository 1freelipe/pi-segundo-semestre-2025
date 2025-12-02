import styled, { css } from 'styled-components';

export const Container = styled.div`
  background: #930707;
  color: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 25px;
  border-radius: 4px;
  box-shadow: 0 0 8px #ccc;
  width: ${(props) => (props.$isExpanded ? '320px' : '100px')};
  transition: all 0.4s ease-in-out;
  overflow: hidden;
  position: fixed;
  padding: 0 15px;
  z-index: 10;
  top: 0;
  left: 0;
`;

export const NavText = styled.span`
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  max-width: ${(props) => (props.$isExpanded ? '200px' : '0')};
  margin-left: ${(props) => (props.$isExpanded ? '20px' : '0')};
  opacity: ${(props) => (props.$isExpanded ? '1' : '0')};
  transition:
    max-width 0.5s ease-in-out,
    opacity 0.1s ease-in-out,
    margin-left 0.1s ease-in-out;
`;

export const NavList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 50px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-style: normal;
  ${(props) =>
    props.$isUser &&
    css`
      gap: 10px;
      position: relative;

      &::before {
        content: '';
        height: 1px;
        background: #ccc;
        position: absolute;
        top: -8px;
        right: 0;
        left: 0;
      }

      &::after {
        content: '';
        height: 1px;
        background: #ccc;
        position: absolute;
        bottom: -8px;
        right: 0;
        left: 0;
      }
    `}
`;

export const NavItem = styled.li`
  width: 100%;
`;

export const NavLink = styled.a`
  display: flex;
  padding: 15px 10px;
  align-items: center;
  width: 100%;
  /* justify-content: ${(props) =>
    props.$isExpanded ? 'flex-start' : 'center'}; */
  padding-left: ${(props) => (props.$isExpanded ? '20px' : '10px')};
  justify-content: ${(props) => (props.$isExpanded ? 'flex-start' : 'center')};
  color: white;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
  }

  .userIcon {
    font-size: 25px;
    margin-top: 7px;
  }

  .bikeIcon {
    font-size: 25px;
    margin-top: 7px;
  }

  ${(props) =>
    props.$isLogo &&
    css`
      padding-bottom: 0;

      &:hover {
        background-color: transparent;
      }

      &.active {
        background-color: transparent;
      }
    `}

  ${(props) =>
    props.$isUser &&
    css`
      margin: 0;
      justify-content: ${props.$isExpanded ? 'center' : 'center'};
    `}

  ${NavText} {
    transition-delay: 0.1s;
  }

  &.active {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 20px;
  }
`;

export const IconWrapper = styled.div`
  font-size: 24px;
  min-width: 24px;
`;

export const IconeMainteer = styled.img`
  width: 60px;
  width: ${(props) => (props.$isExpanded ? '140px' : '60px')};
  margin-left: ${(props) => (props.$isExpanded ? '5px' : '0')};
  transition: 0.3s ease-in-out;
`;
