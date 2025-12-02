import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Container,
  Title,
  DivImage,
  DivContent,
  TitleContent,
  DivSpace,
  DivButtonSubmit,
} from './styled';

export default function NotFoundBikes() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/motos/store');
  };
  return (
    <Container>
      <Title>Que tal cadastrar sua primeira moto?</Title>
      <DivImage />
      <DivContent>
        <DivSpace />
        <TitleContent>
          Para começar a registrar serviços, cadastre uma moto no sistema.
        </TitleContent>
        <DivButtonSubmit onClick={handleNavigate}>
          Cadastrar Moto
        </DivButtonSubmit>
      </DivContent>
    </Container>
  );
}
