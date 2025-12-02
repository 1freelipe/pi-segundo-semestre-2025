import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimesCircle, FaEdit, FaTimes } from 'react-icons/fa';
import { RiArrowUpBoxFill } from 'react-icons/ri';
import { confirmAlert } from 'react-confirm-alert';

import { toast } from 'react-toastify';
import * as estoque from './styled';
import axios from '../../../services/axios';

export default function EstoqueIndex() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [stock, setEstoque] = useState([]);
  const [modalAberto, setModalAberto] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [newQuantity, setNewQuantity] = useState('');

  const handleNewPeça = () => {
    navigate('/estoque/store');
  };

  const handleOpen = (id) => {
    setEditingId(id);
    setModalAberto('QUANTIDADE');
  };

  const handleClose = () => {
    setModalAberto(null);
    setEditingId(null);
    setNewQuantity('');
  };

  const handleChangeQtd = (e) => {
    setNewQuantity(e.target.value);
  };

  const handleAtt = async (e) => {
    e.preventDefault();

    const quantityToSend = Number(newQuantity);

    if (!editingId || quantityToSend < 0) {
      toast.error('A quantidade deve ser um número válido e positivo');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.put(
        `/estoque/atualizar_estoque.php?id=${editingId}`,
        { quantidade: quantityToSend }
      );

      if (response.data.success) {
        toast.success(response.data.message);

        setEstoque((prevEstoque) =>
          prevEstoque.map((st) =>
            st.PECAS_SER_ID === editingId
              ? { ...st, PECAS_SER_ESTOQUE: quantityToSend }
              : st
          )
        );

        handleClose();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Erro ao e conectar com o servidor ou processar requisição');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id, nome) => {
    confirmAlert({
      title: 'Confirmar exclusão',
      message: `Tem certeza que deseja excluir a peça: ${nome}`,
      buttons: [
        {
          label: 'Apagar',
          onClick: async () => {
            try {
              const response = await axios.delete(
                `/estoque/delete.php?id=${id}`
              );

              if (response.data.success) {
                toast.success(response.data.message);
                setEstoque((prevEstoque) =>
                  prevEstoque.filter((es) => es.PECAS_SER_ID !== id)
                );
              }
            } catch (error) {
              if (
                error.response &&
                error.data.response &&
                error.data.response.message
              ) {
                toast.error(error.response.message);
              } else {
                toast.error('Ocorreu um erro ao tentar deletar a peça.');
              }
            }
          },
        },
        {
          label: 'Não',
          onClick: () => {},
        },
      ],
    });
  };

  useEffect(() => {
    setIsLoading(true);

    async function fetchEstoque() {
      try {
        const response = await axios.get('/estoque/index.php');

        if (response.data.success) {
          const dataEstoque = response.data.estoque || [];
          setEstoque(dataEstoque);

          if (dataEstoque.length === 0) {
            toast.info('O estoque está vazio.');
          }
        }
      } catch (error) {
        if (
          error.response &&
          error.data.response &&
          error.data.response.message
        ) {
          toast.error(error.response.message);
        } else {
          toast.error('Erro ao se conectar com o servidor.');
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchEstoque();
  }, []);
  if (isLoading) {
    return (
      <estoque.WhiteTable>
        <h1>Carregando estoque....</h1>
      </estoque.WhiteTable>
    );
  }

  return (
    <>
      <estoque.TopDiv>
        <estoque.TituloPeca>Estoque de Peças</estoque.TituloPeca>
      </estoque.TopDiv>
      <estoque.BotaoCadastrarPeca>
        <estoque.TituloCadastrar onClick={handleNewPeça}>
          Cadastrar Peças
        </estoque.TituloCadastrar>
      </estoque.BotaoCadastrarPeca>

      <estoque.WhiteTable>
        <estoque.StyledTable>
          <estoque.Thead>
            <estoque.Tr $isHead>
              <estoque.Th>Nome Peça</estoque.Th>
              <estoque.Th>Categoria</estoque.Th>
              <estoque.Th>Quantidade</estoque.Th>
              <estoque.Th>Descrição</estoque.Th>
              <estoque.Th>Preço Uni.</estoque.Th>
              <estoque.Th>Preço Venda</estoque.Th>
              <estoque.Th>Lucro</estoque.Th>
              <estoque.Th>Ações</estoque.Th>
            </estoque.Tr>
          </estoque.Thead>

          <estoque.Tbody>
            {stock.length > 0 ? (
              stock.map((st) => (
                <estoque.Tr key={st.PECAS_SER_ID}>
                  <estoque.Td>{st.PECAS_SER_NOME}</estoque.Td>
                  <estoque.Td>
                    {st.PECAS_SER_CATEGORIA === 'P' ? 'Peças' : 'Indefinido'}
                  </estoque.Td>
                  <estoque.Td $isQtd>
                    {st.PECAS_SER_ESTOQUE}
                    <RiArrowUpBoxFill
                      className="arrowQtd"
                      onClick={() => handleOpen(st.PECAS_SER_ID)}
                    />
                  </estoque.Td>
                  <estoque.Td>
                    {st.PECAS_SER_DESCRICAO
                      ? st.PECAS_SER_DESCRICAO
                      : 'Sem descrição'}
                  </estoque.Td>
                  <estoque.Td>
                    {st.PECAS_SER_PRECO_UNITARIO
                      ? `R$ ${st.PECAS_SER_PRECO_UNITARIO}`
                      : 'R$ 00.00'}
                  </estoque.Td>
                  <estoque.Td>
                    {st.PECAS_SER_PRECO_VENDA
                      ? `R$ ${st.PECAS_SER_PRECO_VENDA}`
                      : `R$ 00.00`}
                  </estoque.Td>
                  <estoque.Td>
                    {st.PECAS_SER_MARGEM
                      ? `R$ ${st.PECAS_SER_MARGEM}`
                      : 'R$ 00.00'}
                  </estoque.Td>
                  <estoque.Td>
                    <FaEdit className="edit" />
                    <FaTimesCircle
                      className="delete"
                      onClick={() =>
                        handleDelete(st.PECAS_SER_ID, st.PECAS_SER_NOME)
                      }
                    />
                  </estoque.Td>
                </estoque.Tr>
              ))
            ) : (
              <estoque.Tr>
                <estoque.Td colSpan="8">Nenhum peça cadastrada</estoque.Td>
              </estoque.Tr>
            )}
          </estoque.Tbody>
        </estoque.StyledTable>
      </estoque.WhiteTable>

      {modalAberto && (
        <estoque.ModalOverlay onClick={handleClose}>
          <estoque.ModalBox onClick={(e) => e.stopPropagation()}>
            <estoque.CloseButton onClick={handleClose}>
              <FaTimes />
            </estoque.CloseButton>

            {modalAberto === 'QUANTIDADE' && (
              <>
                <estoque.ModalTitle>Atualizar quantidade</estoque.ModalTitle>
                <estoque.FormModal onSubmit={handleAtt}>
                  <estoque.InputQtd
                    placeholder="Digite a nova quantidade"
                    value={newQuantity}
                    onChange={handleChangeQtd}
                  />
                  <estoque.ButtonAtt type="submit">Atualizar</estoque.ButtonAtt>
                </estoque.FormModal>
              </>
            )}
          </estoque.ModalBox>
        </estoque.ModalOverlay>
      )}
    </>
  );
}
