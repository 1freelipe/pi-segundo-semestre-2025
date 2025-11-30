import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import axios from '../../../services/axios';
import clienteSchema from '../../../services/validator';

import * as clientes from './styled';
import * as index from '../clientesIndex/styled';

export default function ClientesStore() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleReturn = () => {
    navigate('/clientes/index');
  };

  const { register, handleSubmit, reset, control } = useForm({
    resolver: yupResolver(clienteSchema),
  });

  const handleFormSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post('/clientes/store.php', data);

      toast.success(response.data.message);
      navigate('/clientes/index');

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
    Object.values(validationErrors).forEach((error) => {
      toast.error(error.message);
    });
  };

  return (
    <clientes.Container>
      <clientes.ArrowReturn>
        <FaArrowAltCircleLeft onClick={handleReturn} />
      </clientes.ArrowReturn>
      <clientes.DivForm>
        <index.DivTitle className="Title">
          <index.Title>Cadastro Clientes</index.Title>
        </index.DivTitle>
        <clientes.Form
          method="POST"
          action=""
          onSubmit={handleSubmit(handleFormSubmit, onInvalid)}
        >
          <clientes.InputName
            {...register('nome')}
            type="text"
            placeholder="Nome Completo"
          />
          <clientes.CpfTel>
            <Controller
              name="cpf"
              control={control}
              render={({ field }) => (
                <clientes.InputCPF
                  format="###.###.###-##"
                  placeholder="CPF"
                  {...field}
                />
              )}
            />

            <Controller
              name="telefone"
              control={control}
              render={({ field }) => (
                <clientes.InputTEL
                  format="(##) #####-####"
                  placeholder="Telefone"
                  {...field}
                />
              )}
            />
          </clientes.CpfTel>
          <clientes.InputEndereco
            type="text"
            required
            placeholder="Endereço"
            {...register('endereco')}
          />
          <clientes.CepNum>
            <clientes.InputCep
              type="number"
              required
              placeholder="CEP"
              {...register('cep')}
            />
            <clientes.InputBairro
              type="text"
              placeholder="Bairro"
              {...register('bairro')}
            />
            <clientes.InputNum
              type="number"
              required
              placeholder="Número"
              {...register('numero')}
            />
          </clientes.CepNum>
          <clientes.InputEmail
            {...register('email')}
            type="text"
            placeholder="E-mail"
          />
          <clientes.InputOBS
            type="text"
            placeholder="Observação"
            {...register('obs')}
          />
          <index.BotaoCadastro
            className="BtnCadastro"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Carregando' : 'Cadastrar'}
          </index.BotaoCadastro>
        </clientes.Form>
      </clientes.DivForm>
    </clientes.Container>
  );
}
