import React from 'react';
import * as newEstoque from './styled';

export default function EstoqueStore() {
  return (
    <>
      <newEstoque.TopTitulo>
        <newEstoque.TitleCadastro>Cadastro de Peça</newEstoque.TitleCadastro>
      </newEstoque.TopTitulo>

      <newEstoque.ContainerForm>
        <newEstoque.DivTotal>
          <newEstoque.DivImg />
          <newEstoque.Form>
            <newEstoque.InputPeca placeholder="Nome Peça" />

            <newEstoque.Select>
              <option disabled>Categoria</option>
              <option>Serviço</option>
              <option>Estoque</option>
            </newEstoque.Select>

            <newEstoque.InputQntd placeholder="Estoque" />

            <newEstoque.DivLine>
              <newEstoque.PrecoUni placeholder="Preço Uni." />
              <newEstoque.PrecoVenda placeholder="Preço Venda" />
              <newEstoque.Lucro placeholder="Lucro" />
            </newEstoque.DivLine>

            <newEstoque.Descricao placeholder="Descrição" />

            <newEstoque.ButtonCadastrar>Cadastrar</newEstoque.ButtonCadastrar>
          </newEstoque.Form>
        </newEstoque.DivTotal>
      </newEstoque.ContainerForm>
    </>
  );
}
