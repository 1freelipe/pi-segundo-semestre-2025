import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as estoque from './styled';

export default function EstoqueIndex() {
  const navigate = useNavigate();

  const handleNewPeça = () => {
    navigate('/estoque/store');
  };

  return (
    <>
      <estoque.TopDiv>
        <estoque.TituloPeca>Peças</estoque.TituloPeca>
      </estoque.TopDiv>
      <estoque.BotaoCadastrarPeca>
        <estoque.TituloCadastrar onClick={handleNewPeça}>
          Cadastrar Peças
        </estoque.TituloCadastrar>
      </estoque.BotaoCadastrarPeca>

      <estoque.WhiteTable>
        <estoque.StyledTable>
          <estoque.Thead>
            <estoque.Tr>
              <estoque.Th>Nome Peça</estoque.Th>
              <estoque.Th>Categoria</estoque.Th>
              <estoque.Th>Estoque</estoque.Th>
              <estoque.Th>Descrição</estoque.Th>
              <estoque.Th>Preço Uni.</estoque.Th>
              <estoque.Th>Preço Venda</estoque.Th>
              <estoque.Th>Lucro</estoque.Th>
            </estoque.Tr>
          </estoque.Thead>

          <estoque.Tbody>
            <estoque.Tr>
              <estoque.Td>Cliente 1</estoque.Td>
              <estoque.Td>Cliente 1</estoque.Td>
              <estoque.Td>Cliente 1</estoque.Td>
              <estoque.Td>Cliente 1</estoque.Td>
              <estoque.Td>Cliente 1</estoque.Td>
              <estoque.Td>Cliente 1</estoque.Td>
              <estoque.Td>Cliente 1</estoque.Td>
            </estoque.Tr>
          </estoque.Tbody>
        </estoque.StyledTable>
      </estoque.WhiteTable>
    </>
  );
}
