import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { IoIosSearch } from 'react-icons/io';
import { IoHome } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { FaEdit, FaTimesCircle } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert';

import * as index from './styled';
import axios from '../../../services/axios';

export default function ClientesIndex() {
  const navigate = useNavigate();
  const [inputTerm, setInputTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const formatCPF = (cpfString) => {
    const digitos = cpfString.replace(/[^\d]/g, '');

    if (digitos.length === 11) {
      return digitos.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    return cpfString;
  };

  const formatNumber = (numberString) => {
    const digitos = numberString.replace(/[^\d]/g, '');

    if (digitos.length === 11) {
      return digitos.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }

    return numberString;
  };

  const handleCadastroClick = () => {
    navigate('/clientes/store');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleDelete = async (id, nome) => {
    confirmAlert({
      title: 'Confirmar exclusão',
      message: `Tem certeza que deseja apagar o cliente ${nome}?`,
      buttons: [
        {
          label: 'Apagar',
          onClick: async () => {
            try {
              const response = await axios.delete(
                `/clientes/delete.php?id=${id}`
              );

              if (response.data.success) {
                toast.success(response.data.message);
                window.location.reload();
                setClientes((prevClientes) =>
                  prevClientes.filter((c) => c.CLI_ID !== id)
                );
              } else {
                toast.error(response.data.message);
              }
            } catch (error) {
              toast.error('Erro ao tentar apagar o cliente', error);
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
    const timer = setTimeout(() => {
      setSearchTerm(inputTerm);
      setCurrentPage(1);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [inputTerm]);

  useEffect(() => {
    async function fetchClientes() {
      try {
        const response = await axios.get('/clientes/index.php', {
          params: {
            page: currentPage,
            limit: 10,
            search: searchTerm,
          },
        });

        if (response.data.success) {
          setClientes(response.data.clientes);
          setTotalPages(response.data.pagination.totalPages);

          if (response.data.clientes.length === 0) {
            if (searchTerm.length > 0) {
              toast.info('Nenhum cliente encontrado.');
            } else {
              toast.warn(
                'Ao menos um cliente deve estar cadastrado para verificar a lista.'
              );
            }
          }
        } else {
          toast.error('Erro ao buscar clientes.');
        }
      } catch (error) {
        toast.error('Não foi possível conectar ao servidor.');
      } finally {
        setLoading(false);
      }
    }

    fetchClientes();
  }, [currentPage, searchTerm]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    // eslint-disable-next-line
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <index.PageButton
          key={i}
          onClick={() => handlePageChange(i)}
          $active={i === currentPage}
        >
          {i}
        </index.PageButton>
      );
    }
    return pages;
  };

  if (loading) {
    return (
      <index.Container>
        <h1>Carregando</h1>
      </index.Container>
    );
  }

  return (
    <>
      <index.DivTitle>
        <index.Title>Clientes</index.Title>
      </index.DivTitle>
      <index.DivBotoes>
        <index.Search>
          <index.SearchCliente
            type="text"
            placeholder=""
            value={inputTerm}
            onChange={(e) => setInputTerm(e.target.value)}
          />
          <index.LabelCliente>
            Pesquisar Cliente <IoIosSearch className="iconSearch" />
          </index.LabelCliente>
        </index.Search>
        <index.HomeIcon title="Dashboard" onClick={handleHomeClick}>
          <IoHome className="HomeI" />
        </index.HomeIcon>
        <index.Cadastro>
          <index.BotaoCadastro onClick={handleCadastroClick}>
            Cadastrar Cliente
          </index.BotaoCadastro>
        </index.Cadastro>
      </index.DivBotoes>

      <index.Container>
        <h1>Clientes Cadastrados</h1>

        <index.StyledTable>
          <index.Thead>
            <index.Tr $isHead>
              <index.Th>ID</index.Th>
              <index.Th>Nome</index.Th>
              <index.Th>CPF</index.Th>
              <index.Th>E-mail</index.Th>
              <index.Th>Telefone</index.Th>
              <index.Th>Ativo</index.Th>
              <index.Th>Ações</index.Th>
            </index.Tr>
          </index.Thead>

          <index.Tbody>
            {clientes.length > 0 ? (
              clientes.map((cliente) => (
                <index.Tr key={cliente.CLI_ID}>
                  <index.Td>{cliente.CLI_ID}</index.Td>
                  <index.Td>{cliente.CLI_NOME}</index.Td>
                  <index.Td>{formatCPF(cliente.CLI_CPF)}</index.Td>
                  <index.Td>{cliente.CLI_EMAIL}</index.Td>
                  <index.Td>{formatNumber(cliente.CLI_TELEFONE)}</index.Td>
                  <index.Td>{cliente.CLI_ATIVO === 1 ? 'Sim' : 'Não'}</index.Td>
                  <index.Td>
                    <Link to={`/clientes/edit/${cliente.CLI_ID}`}>
                      <FaEdit className="edit" />
                    </Link>
                    <FaTimesCircle
                      className="delete"
                      onClick={() =>
                        handleDelete(cliente.CLI_ID, cliente.CLI_NOME)
                      }
                    />
                  </index.Td>
                </index.Tr>
              ))
            ) : (
              <index.Tr>
                <index.Td colSpan="7">Nenhum cliente cadastrado</index.Td>
              </index.Tr>
            )}
          </index.Tbody>
        </index.StyledTable>
        {totalPages > 1 && (
          <index.PaginationContainer>
            <index.PageButton
              onClick={() => handlePageChange(currentPage - 1)}
              disable={currentPage === 1}
            >
              &laquo;
            </index.PageButton>
            {renderPageNumbers()}

            <index.PageButton
              onClick={() => handlePageChange(currentPage + 1)}
              disable={currentPage === totalPages}
            >
              &raquo;
            </index.PageButton>
          </index.PaginationContainer>
        )}
      </index.Container>
    </>
  );
}
