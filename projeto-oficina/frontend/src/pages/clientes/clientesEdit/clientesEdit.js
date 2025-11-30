import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from '../../../services/axios';

import * as clientes from '../clientesStore/styled';
import * as index from '../clientesIndex/styled';
import { clienteUpSchema } from '../../../services/validator';

export default function ClientesEdit() {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate('/clientes/index');
  };

  const { id } = useParams();

  const { register, handleSubmit, reset, control } = useForm({
    resolver: yupResolver(clienteUpSchema),
  });

  useEffect(() => {
    async function getCliente() {
      try {
        const response = await axios.get(`/clientes/show.php?id=${id}`);
        const clienteData = response.data.cliente;
        if (response.data.success) {
          reset({
            CLI_ID: clienteData.CLI_ID,
            CLI_NOME: clienteData.CLI_NOME,
            CLI_CPF: clienteData.CLI_CPF,
            CLI_TELEFONE: clienteData.CLI_TELEFONE,
            CLI_CEP: clienteData.CLI_CEP,
            CLI_ENDERECO: clienteData.CLI_ENDERECO,
            CLI_BAIRRO: clienteData.CLI_BAIRRO,
            CLI_NUMERO: clienteData.CLI_NUMERO,
            CLI_EMAIL: clienteData.CLI_EMAIL,
            CLI_ATIVO: clienteData.CLI_ATIVO,
            CLI_OBSERVACAO: clienteData.CLI_OBSERVACAO,
          });
        } else {
          toast.error(response.data.message);
          navigate('/clientes');
        }
      } catch (error) {
        toast.error('Erro ao carregar dados.');
        navigate('/clientes');
      }
    }

    getCliente();
  }, [navigate, reset, id]);

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     // eslint-disable-next-line
  //     [name]: type === 'checkbox' ? (checked ? 1 : 0) : value,
  //   }));
  // };

  const handleFormSubmit = async (data) => {
    try {
      const dataToSend = {
        ...data,
        CLI_ID: id,
      };

      const response = await axios.put('/clientes/update.php', dataToSend);

      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/clientes');
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Não foi possível se conectar com o servidor.');
      }
    }
  };

  const onInvalid = (validationErrors) => {
    Object.values(validationErrors).forEach((e) => {
      toast.error(e.message);
    });
  };

  return (
    <clientes.Container>
      <clientes.ArrowReturn>
        <FaArrowAltCircleLeft onClick={handleReturn} />
      </clientes.ArrowReturn>
      <clientes.DivForm>
        <index.DivTitle className="Title">
          <index.Title>Edição de Clientes</index.Title>
        </index.DivTitle>
        <clientes.Form
          method="POST"
          action=""
          onSubmit={handleSubmit(handleFormSubmit, onInvalid)}
        >
          <clientes.InputName
            type="text"
            required
            placeholder="Nome Completo"
            {...register('CLI_NOME')}
          />
          <clientes.CpfTelCli>
            <Controller
              name="CLI_CPF"
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
              name="CLI_TELEFONE"
              control={control}
              render={({ field }) => (
                <clientes.InputTEL
                  format="(##)#####-####"
                  placeholder="Telefone"
                  {...field}
                />
              )}
            />
          </clientes.CpfTelCli>
          <clientes.DivAtivo>
            <clientes.LabelAtivo>Cliente Ativo?</clientes.LabelAtivo>
            <Controller
              name="CLI_ATIVO"
              control={control}
              render={({ field }) => (
                <clientes.InputAtivo
                  type="checkbox"
                  {...field}
                  checked={field.value === 1 || field.value === true}
                  onChange={(e) => field.onChange(e.target.checked ? 1 : 0)}
                />
              )}
            />
          </clientes.DivAtivo>
          <clientes.InputEndereco
            type="text"
            required
            placeholder="Endereço"
            {...register('CLI_ENDERECO')}
          />
          <clientes.CepNum>
            <clientes.InputCep
              type="number"
              required
              placeholder="CEP"
              {...register('CLI_CEP')}
            />
            <clientes.InputBairro
              type="text"
              placeholder="Bairro"
              {...register('CLI_BAIRRO')}
            />
            <clientes.InputNum
              type="number"
              required
              placeholder="Número"
              {...register('CLI_NUMERO')}
            />
          </clientes.CepNum>
          <clientes.InputEmail
            type="email"
            required
            placeholder="E-mail"
            {...register('CLI_EMAIL')}
          />
          <clientes.InputOBS
            type="text"
            placeholder="Observação"
            {...register('CLI_OBSERVACAO')}
          />
          <index.BotaoCadastro className="BtnCadastro" type="submit">
            Atualizar
          </index.BotaoCadastro>
        </clientes.Form>
      </clientes.DivForm>
    </clientes.Container>
  );
}
