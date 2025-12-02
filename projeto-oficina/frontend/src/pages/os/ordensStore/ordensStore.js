import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import * as ordem from './styled';
import { ArrowReturn } from '../../clientes/clientesStore/styled';
import { ordensSchema } from '../../../services/validator';
import axios from '../../../services/axios';

export default function OrdensStore() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleReturn = () => {
    navigate('/ordemdeservico');
  };

  const { register, handleSubmit, reset, control } = useForm({
    resolver: yupResolver(ordensSchema),
  });

  const handleFormSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post('/os/store.php', data);

      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/ordemdeservico');
        reset();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Ocorreu um erro ao tentar se conectar com o servidor.');
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
      <ordem.DivTop>
        <ordem.Title>Cadastro Ordem de Serviço</ordem.Title>
      </ordem.DivTop>

      <ordem.Container>
        <ordem.DivImg />
        <ArrowReturn className="ArrowReturnOrdem">
          <FaArrowAltCircleLeft onClick={handleReturn} />
        </ArrowReturn>

        <ordem.Form
          method="POST"
          action=""
          onSubmit={handleSubmit(handleFormSubmit, onInvalid)}
        >
          <ordem.InputServico
            type="text"
            placeholder="Serviço Realizado"
            {...register('servico')}
          />
          <ordem.NomePlaca>
            <Controller
              name="cliente"
              control={control}
              render={({ field }) => (
                <ordem.InputNome
                  format="###.###.###-##"
                  placeholder="CPF cliente"
                  {...field}
                />
              )}
            />
            <ordem.InputPlaca
              type="text"
              placeholder="Placa"
              {...register('placa')}
            />
          </ordem.NomePlaca>
          <ordem.ValorStatus>
            <ordem.InputValor
              type="number"
              placeholder="Valor Total"
              {...register('valor')}
            />
            <ordem.InputStatus
              type="text"
              placeholder="Mecânico"
              {...register('funcionario')}
            />
          </ordem.ValorStatus>
          <ordem.Observacao
            placeholder="Obervação"
            {...register('observacao')}
          />
          <ordem.ButtonsWrapper>
            <ordem.BtnSubmit type="submit" disabled={isLoading}>
              {isLoading ? 'Carregando' : 'Cadastrar'}
            </ordem.BtnSubmit>
            <ordem.BtnCancel
              onClick={(e) => {
                e.preventDefault();
                reset();
                navigate('/ordemdeservico');
              }}
            >
              Cancelar
            </ordem.BtnCancel>
          </ordem.ButtonsWrapper>
        </ordem.Form>
      </ordem.Container>
    </>
  );
}
