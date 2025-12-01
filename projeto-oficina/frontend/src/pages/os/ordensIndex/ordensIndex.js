import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { IoIosSearch, IoIosCreate } from 'react-icons/io';
import { MdCancel } from 'react-icons/md';
import { IoTimer } from 'react-icons/io5';

import {
  FaCheckCircle,
  FaHourglassHalf,
  FaExclamationCircle,
  FaTools,
  FaPlus,
  FaTimes,
  FaTrash,
  FaCalendarCheck,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';

import * as ordens from './styled';
import ChartFat from './components/chartFat';
import ChartCanceladas from './components/chartCanceladas';
import ChartAguardando from './components/chartAguardando';
import axios, { API_BASE_URL } from '../../../services/axios';

export default function OrdensIndex() {
  const navigate = useNavigate();
  const handleClickStore = () => {
    navigate('/ordemdeservico/store');
  };

  const [ordensData, setOrdensData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalAberto, setModalAberto] = useState(null);
  const SET_STATUS_TEXT = {
    A: 'Andamento',
    C: 'Cancelado',
    F: 'Finalizado',
  };

  const placaFormat = (placaString) => {
    const caracteres = placaString.replace(/[^a-z0-9]/gi, '');

    if (caracteres.length === 7) {
      return caracteres.replace(/(\w{3})(\w{4})/, '$1-$2');
    }

    return placaString;
  };

  const handleDelete = async (id, nome) => {
    confirmAlert({
      title: 'Confirmar exclusão',
      message: `Tem certeza que deseja apagar a ordem do cliente: ${nome}`,
      buttons: [
        {
          label: 'Apagar',
          onClick: async () => {
            try {
              const response = await axios.delete(`/os/delete.php?id=${id}`);

              if (response.data.success) {
                toast.success(response.data.message);
                setOrdensData((prevOrdens) =>
                  prevOrdens.filter((os) => os.ORDEM_ID !== id)
                );
              }
            } catch (error) {
              if (
                error.response &&
                error.response.data &&
                error.response.data.message
              ) {
                toast.error(error.response.data.message);
              } else {
                toast.error('Ocorreu um erro ao tentar apagar a ordem');
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

  const handleSetStatus = async (id, nome) => {
    confirmAlert({
      title: 'Confirmar cancelamento',
      message: `Tem certeza que deseja cancelar a ordem do cliente: ${nome}`,
      buttons: [
        {
          label: 'Cancelar',
          onClick: async () => {
            try {
              const response = await axios.put(`/os/setStatusC.php?id=${id}`);

              if (response.data.success) {
                toast.success(response.data.message);
                setOrdensData((prevOrdens) =>
                  prevOrdens.map((os) =>
                    os.ORDEM_ID === id ? { ...os, ORDEM_STATUS: 'C' } : os
                  )
                );
              }
            } catch (error) {
              if (
                error.response &&
                error.response.data &&
                error.response.data.message
              ) {
                toast.error(error.response.data.message);
              } else {
                toast.error('Ocorreu um erro ao tentar cancelar a ordem.');
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

  const handleSetStatusFinalizada = async (id, nome) => {
    confirmAlert({
      title: 'Confirmar finalização',
      message: `Tem certeza que deseja finalizar a ordem do cliente: ${nome}`,
      buttons: [
        {
          label: 'Finalizar',
          onClick: async () => {
            try {
              const response = await axios.put(`/os/setStatusF.php?id=${id}`);

              if (response.data.success) {
                toast.success(response.data.message);
                setOrdensData((prevOrdens) =>
                  prevOrdens.map((os) =>
                    os.ORDEM_ID === id ? { ...os, ORDEM_STATUS: 'F' } : os
                  )
                );
              }
            } catch (error) {
              if (
                error.response &&
                error.response.data &&
                error.response.message
              ) {
                toast.error(error.response.data.message);
              } else {
                toast.error(
                  'Ocorreu um erro ao tentar se conectar com o servidor.'
                );
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

  const handleOpen = (tipo) => {
    setModalAberto(tipo);
  };

  const handleClose = () => {
    setModalAberto(null);
  };

  useEffect(() => {
    async function fetchOrdens() {
      setLoading(true);
      try {
        const response = await axios.get('/os/index.php');

        if (response.data.success) {
          const dataOrdens = response.data.ordens || [];
          setOrdensData(dataOrdens);

          if (dataOrdens.length === 0) {
            toast.info(response.data.message);
          }
        } else {
          toast.error('Erro ao buscar ordens.');
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error('Ocorreu um erro ao tentar se conectar com o servidor.');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchOrdens();
  }, []);

  if (loading) {
    return (
      <ordens.ContainerContent>
        <h1>Carregando</h1>
      </ordens.ContainerContent>
    );
  }

  return (
    <>
      <ordens.ContainerFixed>
        <ordens.ButtonPlus onClick={handleClickStore}>
          <ordens.ButtonText>Criar ordem</ordens.ButtonText>
          <FaPlus className="icon" />
        </ordens.ButtonPlus>
      </ordens.ContainerFixed>
      <ordens.Content>
        <ordens.DivTop>
          <ordens.Title>Ordens de Serviço</ordens.Title>
          <ordens.Search placeholder="" type="text" />
          <ordens.LabelSearch>
            Buscar <IoIosSearch className="ioSearch" />
          </ordens.LabelSearch>
        </ordens.DivTop>

        <ordens.Container>
          <ordens.Statuscard>
            <FaCheckCircle className="FaCheck" />
            <ordens.TitleContent>Finalizadas</ordens.TitleContent>
            <ordens.SpanContent>8</ordens.SpanContent>
            <ordens.ButtonContent onClick={() => handleOpen('FINALIZADAS')}>
              Ver detalhes
            </ordens.ButtonContent>
          </ordens.Statuscard>

          <ordens.Statuscard>
            <FaHourglassHalf className="FaHoug" />
            <ordens.TitleContent>Aguardando Peças</ordens.TitleContent>
            <ordens.SpanContent>2</ordens.SpanContent>
            <ordens.ButtonContent onClick={() => handleOpen('AGUARDANDO')}>
              Ver detalhes
            </ordens.ButtonContent>
          </ordens.Statuscard>

          <ordens.Statuscard>
            <FaExclamationCircle className="FaExclamation" />
            <ordens.TitleContent>Canceladas</ordens.TitleContent>
            <ordens.SpanContent>1</ordens.SpanContent>
            <ordens.ButtonContent onClick={() => handleOpen('CANCELADAS')}>
              Ver detalhes
            </ordens.ButtonContent>
          </ordens.Statuscard>

          <ordens.Statuscard>
            <FaTools className="FaTools" />
            <ordens.TitleContent>Em Andamento</ordens.TitleContent>
            <ordens.SpanContent>4</ordens.SpanContent>
            <ordens.ButtonContent onClick={() => handleOpen('ANDAMENTO')}>
              Ver detalhes
            </ordens.ButtonContent>
          </ordens.Statuscard>
        </ordens.Container>

        <ordens.TitleContainerContent>
          <ordens.TitleAheadContent>Em Andamento</ordens.TitleAheadContent>
        </ordens.TitleContainerContent>
        <ordens.ContainerContent>
          <ordens.StyledTable>
            <ordens.Thead>
              <ordens.Tr $isHead>
                <ordens.Th>ID</ordens.Th>
                <ordens.Th>Cliente</ordens.Th>
                <ordens.Th>Funcionário</ordens.Th>
                <ordens.Th>Placa</ordens.Th>
                <ordens.Th>Serviço</ordens.Th>
                <ordens.Th>Valor</ordens.Th>
                <ordens.Th>Status</ordens.Th>
                <ordens.Th>Data Abertura</ordens.Th>
                <ordens.Th>Ações</ordens.Th>
                <ordens.Th>PDF</ordens.Th>
              </ordens.Tr>
            </ordens.Thead>

            <ordens.Tbody>
              {ordensData.length > 0 ? (
                ordensData.map((os) => (
                  <ordens.Tr key={os.ORDEM_ID}>
                    <ordens.Td>{os.ORDEM_ID}</ordens.Td>
                    <ordens.Td>{os.CLI_NOME}</ordens.Td>
                    <ordens.Td>{os.FUN_NOME}</ordens.Td>
                    <ordens.Td>{placaFormat(os.MOTO_PLACA)}</ordens.Td>
                    <ordens.Td>{os.ORDEM_SERVICO_REALIZADO}</ordens.Td>
                    <ordens.Td>
                      {os.ORDEM_VALOR_TOTAL > 0
                        ? `R$ ${os.ORDEM_VALOR_TOTAL}`
                        : 'Valor não informado'}
                    </ordens.Td>
                    <ordens.Td $status={os.ORDEM_STATUS}>
                      {SET_STATUS_TEXT[os.ORDEM_STATUS] || 'Status inválido'}
                    </ordens.Td>
                    <ordens.Td>{os.ORDEM_DATA_ABERTURA}</ordens.Td>
                    <ordens.Td>
                      <FaCalendarCheck
                        className="check"
                        onClick={() =>
                          handleSetStatusFinalizada(os.ORDEM_ID, os.CLI_NOME)
                        }
                      />
                      <Link to={`/ordemdeservico/edit/${os.ORDEM_ID}`}>
                        <IoIosCreate className="edit" />
                      </Link>
                      <FaTrash
                        className="delete"
                        onClick={() => handleDelete(os.ORDEM_ID, os.CLI_NOME)}
                      />
                      <MdCancel
                        className="cancel"
                        onClick={() =>
                          handleSetStatus(os.ORDEM_ID, os.CLI_NOME)
                        }
                      />
                    </ordens.Td>
                    <ordens.Td>
                      <a
                        href={`${API_BASE_URL}/os/download.php?id=${os.ORDEM_ID}`}
                        rel="noopener noreferrer"
                        target="_self"
                      >
                        <ordens.btnDownload>Baixar</ordens.btnDownload>
                      </a>
                    </ordens.Td>
                  </ordens.Tr>
                ))
              ) : (
                <ordens.Tr>
                  <ordens.Td colSpan="10">Nenhuma ordem cadastrada</ordens.Td>
                </ordens.Tr>
              )}
            </ordens.Tbody>
          </ordens.StyledTable>
        </ordens.ContainerContent>
      </ordens.Content>

      {/* Lógica do overlay */}
      {modalAberto && (
        <ordens.ModalOverlay onClick={handleClose}>
          <ordens.ModalBox onClick={(e) => e.stopPropagation()}>
            <ordens.CloseButton onClick={handleClose}>
              <FaTimes />
            </ordens.CloseButton>

            {modalAberto === 'FINALIZADAS' && (
              <>
                <ordens.ModalTitle>Ordens Finalizadas</ordens.ModalTitle>
                <ordens.DashboardKPICard>
                  <ordens.KPICard positive>
                    <ordens.TitleKPI>Faturamento</ordens.TitleKPI>
                    <ordens.SpanKPI>R$ 42.500,00</ordens.SpanKPI>
                    <small>+12% vs mês anterior</small>
                  </ordens.KPICard>
                  <ordens.KPICard positive>
                    <ordens.TitleKPI>Motos Entregues</ordens.TitleKPI>
                    <ordens.SpanKPI>45</ordens.SpanKPI>
                    <small>+41% vs mês anterior</small>
                  </ordens.KPICard>
                  <ordens.KPICard>
                    <ordens.TitleKPI>Total de Ordens</ordens.TitleKPI>
                    <ordens.SpanKPI>67</ordens.SpanKPI>
                    <small>-7% vs mês anterior</small>
                  </ordens.KPICard>
                </ordens.DashboardKPICard>

                <ordens.ModalTitle>Evolução Financeira</ordens.ModalTitle>
                <ordens.ChartContainer>
                  <ChartFat key="chart-faturamento" />
                </ordens.ChartContainer>
              </>
            )}

            {modalAberto === 'AGUARDANDO' && (
              <>
                <ordens.ModalTitle>Ordens Aguardando</ordens.ModalTitle>
                <ordens.DashboardKPICard>
                  <ordens.KPICard $isFixed>
                    <IoTimer className="Timer" />
                    <ordens.TitleKPI>Dias Aguardando Peças</ordens.TitleKPI>
                    <ordens.SpanKPI>3</ordens.SpanKPI>
                    <ordens.TitleKPI>
                      Dias desde que a moto chegou na oficina
                    </ordens.TitleKPI>
                    <ordens.SpanKPI>7</ordens.SpanKPI>
                  </ordens.KPICard>
                  <ordens.ChartContainerAguardando>
                    <ChartAguardando key="chart-aguardando" />
                  </ordens.ChartContainerAguardando>
                </ordens.DashboardKPICard>
                <ordens.ModalTitle>Panorama Geral</ordens.ModalTitle>
                <ordens.DashboardKPICard>
                  <ordens.KPICard>
                    <ordens.TitleKPI>Forcenedor mais rápido</ordens.TitleKPI>
                    <ordens.SpanKPI>México Motos</ordens.SpanKPI>
                  </ordens.KPICard>
                  <ordens.KPICard>
                    <ordens.TitleKPI>Média de espera</ordens.TitleKPI>
                    <ordens.SpanKPI>1,75</ordens.SpanKPI>
                  </ordens.KPICard>
                  <ordens.KPICard>
                    <ordens.TitleKPI>Peça mais abrangente</ordens.TitleKPI>
                    <ordens.SpanKPI>Kit de Transmissão da 160</ordens.SpanKPI>
                  </ordens.KPICard>
                </ordens.DashboardKPICard>
                <ordens.DashboardKPICard>
                  <ordens.KPICard>
                    <ordens.TitleKPI>Fornecedor mais demorado</ordens.TitleKPI>
                    <ordens.SpanKPI>Mercado Livre</ordens.SpanKPI>
                  </ordens.KPICard>
                  <ordens.KPICard>
                    <ordens.TitleKPI>Média de espera</ordens.TitleKPI>
                    <ordens.SpanKPI>8,25</ordens.SpanKPI>
                  </ordens.KPICard>
                  <ordens.KPICard>
                    <ordens.TitleKPI>Peça mais abrangente</ordens.TitleKPI>
                    <ordens.SpanKPI>Ferramentas</ordens.SpanKPI>
                  </ordens.KPICard>
                </ordens.DashboardKPICard>
              </>
            )}

            {modalAberto === 'CANCELADAS' && (
              <>
                <ordens.ModalTitle>Ordens Canceladas</ordens.ModalTitle>
                <ordens.DashboardKPICard>
                  <ordens.KPICard>
                    <ordens.TitleKPI>Valor Perdido</ordens.TitleKPI>
                    <ordens.SpanKPI>R$ 5400,00</ordens.SpanKPI>
                    <small>+12% vs mês anterior</small>
                  </ordens.KPICard>
                  <ordens.KPICard>
                    <ordens.TitleKPI>Taxa de Cancelamento</ordens.TitleKPI>
                    <ordens.SpanKPI>
                      15% das ordens abertas foram canceladas
                    </ordens.SpanKPI>
                    <small>+15% vs mês anterior</small>
                  </ordens.KPICard>
                </ordens.DashboardKPICard>

                <ordens.ModalTitle>Panorama Geral</ordens.ModalTitle>
                <ordens.DashboardKPICard>
                  <ordens.ChartContainerCancelado>
                    <ChartCanceladas key="chart-cancelado" />
                  </ordens.ChartContainerCancelado>
                  <ordens.KPICard>
                    <ordens.TitleKPI>Último Cancelamento</ordens.TitleKPI>
                    <ordens.SpanKPI>Placa: DEI3C80</ordens.SpanKPI>
                    <ordens.SpanKPI>Cliente: Celso Russomano</ordens.SpanKPI>
                    <ordens.SpanKPI>Motivo</ordens.SpanKPI>
                    <ordens.SpanKPI>
                      O preço para conserto estava muito acima do que eu costumo
                      pagar
                    </ordens.SpanKPI>
                  </ordens.KPICard>
                </ordens.DashboardKPICard>
              </>
            )}

            {modalAberto === 'ANDAMENTO' && (
              <>
                <ordens.ModalTitle>
                  Ordens em Andamento - <span>STATUS</span>
                </ordens.ModalTitle>
                <ordens.DashboardKPICard>
                  <ordens.KPICard>
                    <ordens.TitleKPI>Aguardando Aprovação</ordens.TitleKPI>
                    <ordens.SpanKPI>5</ordens.SpanKPI>
                  </ordens.KPICard>
                  <ordens.KPICard>
                    <ordens.TitleKPI>Em processo</ordens.TitleKPI>
                    <ordens.SpanKPI>12</ordens.SpanKPI>
                  </ordens.KPICard>
                  <ordens.KPICard>
                    <ordens.TitleKPI>Finalização</ordens.TitleKPI>
                    <ordens.SpanKPI>3</ordens.SpanKPI>
                  </ordens.KPICard>
                </ordens.DashboardKPICard>

                <ordens.ModalTitle>Fluxo</ordens.ModalTitle>
                <ordens.DashboardKPICard>
                  <ordens.KPICard>
                    <ordens.TitleKPI>Capacidade da Oficina</ordens.TitleKPI>
                    <ordens.SpanKPI>79%</ordens.SpanKPI>
                  </ordens.KPICard>
                  <ordens.KPICard>
                    <ordens.TitleKPI>Motos a mais de 2 dias</ordens.TitleKPI>
                    <ordens.SpanKPI>3</ordens.SpanKPI>
                  </ordens.KPICard>
                </ordens.DashboardKPICard>

                <ordens.ModalTitle>Modelo mais atendido</ordens.ModalTitle>
                <ordens.DashboardKPICard>
                  <ordens.KPICard>
                    <ordens.TitleKPI>Honda Titan CG 160</ordens.TitleKPI>
                    <ordens.SpanKPI className="maisAtendido">
                      27 Serviços esse mês
                    </ordens.SpanKPI>
                  </ordens.KPICard>
                </ordens.DashboardKPICard>
              </>
            )}
          </ordens.ModalBox>
        </ordens.ModalOverlay>
      )}
    </>
  );
}
