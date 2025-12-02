import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BsCreditCardFill } from 'react-icons/bs';
import {
  FaCalendar,
  FaBookmark,
  FaAddressCard,
  FaArrowAltCircleLeft,
} from 'react-icons/fa';
import { FaMotorcycle } from 'react-icons/fa6';
import { IoColorPaletteOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as newMotos from '../motosStore/styled';
import { ArrowReturn } from '../../clientes/clientesStore/styled';
import axios from '../../../services/axios';
import { motosUpdateSchema } from '../../../services/validator';
import {
  IdAtivo,
  InputId,
  ToggleWrapper,
  HiddenCheckbox,
  StyledSwitch,
  StyledThumb,
  ToggleLabel,
} from './styled';

export default function MotosStore() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleArrowReturn = () => {
    navigate('/motos');
  };

  const { id } = useParams();

  const { register, handleSubmit, reset, watch, control } = useForm({
    resolver: yupResolver(motosUpdateSchema),
  });

  const isAtivo = watch('MOTO_ATIVO');

  useEffect(() => {
    async function getMoto() {
      try {
        const response = await axios.get(`/motos/show.php?id=${id}`);

        if (response.data.success) {
          const motoData = response.data.moto;

          const dataMap = {
            ...motoData,

            MOTO_ATIVO: !!motoData.MOTO_ATIVO,
          };

          reset(dataMap);
        } else {
          toast.error(response.data.message);
          navigate('/motos');
        }
      } catch (error) {
        toast.error('Erro ao carregar dados.');
        navigate('/motos');
      }
    }

    if (id) {
      getMoto();
    }
  }, [id, navigate, reset]);

  const handleFormSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post('/motos/update.php', data);
      if (response.data.equal) {
        toast.warn(response.data.message);
        navigate('/motos');
        return;
      }

      toast.success(response.data.message);
      navigate('/motos');
      reset();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Não foi possível se conectar com o servidor.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onInvalid = (validationErrors) => {
    Object.values(validationErrors).forEach((e) => {
      toast.error(e.message);
    });
  };

  return (
    <>
      <newMotos.DivTitle>
        <newMotos.TitleTop>Edição de Motos</newMotos.TitleTop>
      </newMotos.DivTitle>

      <newMotos.Container>
        <newMotos.DivImg />
        <ArrowReturn className="ArrowReturnMotos">
          <FaArrowAltCircleLeft onClick={handleArrowReturn} />
        </ArrowReturn>

        <newMotos.Form
          method="POST"
          action=""
          onSubmit={handleSubmit(handleFormSubmit, onInvalid)}
        >
          <IdAtivo>
            <newMotos.DivLabel>
              <InputId
                type="text"
                placeholder=""
                disabled
                {...register('MOTO_ID')}
              />
              <newMotos.Label>ID</newMotos.Label>
            </newMotos.DivLabel>

            <ToggleWrapper>
              <HiddenCheckbox
                {...register('MOTO_ATIVO')}
                id="motoAtivoToggle"
              />
              <StyledSwitch htmlFor="motoAtivoToggle">
                <StyledThumb />
              </StyledSwitch>

              <ToggleLabel>{isAtivo ? 'Ativo' : 'Inativo'}</ToggleLabel>
            </ToggleWrapper>
          </IdAtivo>

          <newMotos.PlacaAno>
            <newMotos.DivLabel>
              <newMotos.InputPlaca
                type="text"
                {...register('MOTO_PLACA')}
                placeholder=""
              />
              <newMotos.Label>
                <BsCreditCardFill />
                Placa
              </newMotos.Label>
            </newMotos.DivLabel>
            <newMotos.DivLabel>
              <newMotos.InputAno
                type="text"
                {...register('MOTO_ANO')}
                placeholder=""
              />
              <newMotos.Label>
                <FaCalendar />
                Ano
              </newMotos.Label>
            </newMotos.DivLabel>
          </newMotos.PlacaAno>

          <newMotos.MarcaCor>
            <newMotos.DivLabel>
              <newMotos.InputMarca
                type="text"
                {...register('MARCA_NOME')}
                placeholder=""
              />
              <newMotos.Label>
                <FaBookmark />
                Marca
              </newMotos.Label>
            </newMotos.DivLabel>

            <newMotos.DivLabel>
              <newMotos.InputCor
                type="text"
                {...register('COR_NOME')}
                placeholder=""
              />
              <newMotos.Label>
                <IoColorPaletteOutline />
                Cor
              </newMotos.Label>
            </newMotos.DivLabel>
          </newMotos.MarcaCor>

          <newMotos.ModeloCpf>
            <newMotos.DivLabel>
              <newMotos.InputModelo
                type="text"
                {...register('MODELO_NOME')}
                placeholder=""
              />
              <newMotos.Label>
                <FaMotorcycle />
                Modelo
              </newMotos.Label>
            </newMotos.DivLabel>

            <newMotos.DivLabel>
              <Controller
                name="CLI_CPF"
                control={control}
                render={({ field }) => (
                  <newMotos.InputCPF
                    format="###.###.###-##"
                    placeholder=""
                    {...field}
                  />
                )}
              />
              <newMotos.Label>
                <FaAddressCard />
                CPF
              </newMotos.Label>
            </newMotos.DivLabel>
          </newMotos.ModeloCpf>

          <newMotos.InputOBS
            placeholder="Observação"
            {...register('MOTO_OBSERVACAO')}
          />

          <newMotos.DivButtons>
            <newMotos.ButtonSubmit type="submit" disabled={isLoading}>
              {isLoading ? 'Carregando' : 'Atualizar'}
            </newMotos.ButtonSubmit>
          </newMotos.DivButtons>
        </newMotos.Form>
      </newMotos.Container>
    </>
  );
}
