import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import * as newEstoque from './styled';
import { ArrowReturn } from '../../clientes/clientesStore/styled';
import { estoqueSchema } from '../../../services/validator';
import axios from '../../../services/axios';

export default function EstoqueStore() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleReturn = () => {
    navigate('/estoque');
  };

  const { register, handleSubmit, reset, watch } = useForm({
    resolver: yupResolver(estoqueSchema),
  });

  const precoUnitario = watch('preco_unitario', 0);
  const precoVenda = watch('preco_venda', 0);

  const custo = Number(precoUnitario);
  const venda = Number(precoVenda);
  const lucroBruto = venda > custo ? venda - custo : 0;

  const lucroExibicao = lucroBruto.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const handleFormSubmit = async (data) => {
    setIsLoading(true);
    try {
      const dataToSend = {
        ...data,
        LUCRO_BRUTO: lucroBruto.toFixed(2),
      };

      const response = await axios.post('/estoque/store.php', dataToSend);

      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/estoque');
        reset();
      }
    } catch (error) {
      if (
        error.response &&
        error.data.response &&
        error.data.response.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Ocorreu um erro ao tentar cadastrar');
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
      <newEstoque.TopTitulo>
        <newEstoque.TitleCadastro>Cadastro de Peça</newEstoque.TitleCadastro>
      </newEstoque.TopTitulo>

      <newEstoque.ContainerForm>
        <ArrowReturn className="ArrowReturnEstoque">
          <FaArrowAltCircleLeft onClick={handleReturn} />
        </ArrowReturn>

        <newEstoque.DivTotal>
          <newEstoque.DivImg />
          <newEstoque.Form
            onSubmit={handleSubmit(handleFormSubmit, onInvalid)}
            method="POST"
            action=""
          >
            <newEstoque.InputPeca
              placeholder="Nome Peça"
              {...register('nome')}
            />

            <newEstoque.Select {...register('categoria')}>
              <option value="" disabled selected>
                Categoria
              </option>
              <option disabled value="SERVICO">
                Serviço
              </option>
              <option value="PECAS">Peças</option>
            </newEstoque.Select>

            <newEstoque.InputQntd
              placeholder="Quantidade"
              {...register('quantidade')}
            />

            <newEstoque.DivLine>
              <newEstoque.PrecoUni
                placeholder="Preço Uni."
                {...register('preco_unitario')}
              />
              <newEstoque.PrecoVenda
                placeholder="Preço Venda"
                {...register('preco_venda')}
              />
              <newEstoque.Lucro disabled>{lucroExibicao}</newEstoque.Lucro>
            </newEstoque.DivLine>

            <newEstoque.Descricao
              placeholder="Descrição"
              {...register('descricao')}
            />

            <newEstoque.ButtonCadastrar disabled={isLoading}>
              {isLoading ? 'Carregando' : 'Cadastrar'}
            </newEstoque.ButtonCadastrar>
          </newEstoque.Form>
        </newEstoque.DivTotal>
      </newEstoque.ContainerForm>
    </>
  );
}
