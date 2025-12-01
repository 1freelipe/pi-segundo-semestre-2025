import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoIosSearch, IoIosCreate } from 'react-icons/io';
import { FaTrash, FaCalendarCheck } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import { confirmAlert } from 'react-confirm-alert';
import * as agendamentos from './styled';
import { agendamentosSchema } from '../../../services/validator';
import axios from '../../../services/axios';

export default function AgendamentosIndex() {
  const [agend, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const STATUS_MAP = { A: 'Andamento', C: 'Cancelado', F: 'Finalizado' };
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
      message: `Tem certeza que deseja apagar o agendamento do cliente: ${nome}`,
      buttons: [
        {
          label: 'Apagar',
          onClick: async () => {
            try {
              const response = await axios.delete(
                `/agendamentos/delete.php?id=${id}`
              );
              if (response.data.success) {
                toast.success(response.data.message);
                setAgendamentos((prevAgend) =>
                  prevAgend.filter((ag) => ag.AGEN_ID !== id)
                );
              }
            } catch (error) {
              if (error.response) {
                toast.error(error.response.data.message);
              } else {
                toast.error('Erro ao tentar apagar o agendamento.', error);
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
      message: `Tem certeza que deseja cancelar o agendamento do cliente: ${nome}`,
      buttons: [
        {
          label: 'Cancelar',
          onClick: async () => {
            try {
              const response = await axios.put(
                `/agendamentos/setStatusC.php?id=${id}`
              );
              if (response.data.success) {
                toast.success(response.data.message);
                setAgendamentos((prevAgend) =>
                  prevAgend.map((ag) =>
                    ag.AGEN_ID === id ? { ...ag, AGEN_STATUS: 'C' } : ag
                  )
                );
              }
            } catch (error) {
              if (error.response) {
                toast.error(error.response.data.message);
              } else {
                toast.error('Erro ao tentar cancelar o agendamento.', error);
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

  const handleSetStatusFinalizado = async (id, nome) => {
    confirmAlert({
      title: 'Confirmar finalização',
      message: `Tem certeza que deseja finalizar o agendamento do cliente: ${nome}`,
      buttons: [
        {
          label: 'Finalizar',
          onClick: async () => {
            try {
              const response = await axios.put(
                `/agendamentos/setStatusF.php?id=${id}`
              );
              if (response.data.success) {
                toast.success(response.data.message);
                setAgendamentos((prevAgend) =>
                  prevAgend.map((ag) =>
                    ag.AGEN_ID === id ? { ...ag, AGEN_STATUS: 'F' } : ag
                  )
                );
              }
            } catch (error) {
              if (error.response) {
                toast.error(error.response.data.message);
              } else {
                toast.error('Erro ao tentar finalizar o agendamento.', error);
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

  const { register, handleSubmit, reset, control } = useForm({
    resolver: yupResolver(agendamentosSchema),
    defaultValues: {
      cliente: '',
      placa: '',
      funcionario: '',
      data_agen: '',
      hora: '',
      observacao: '',
    },
  });

  const handleEdit = (agendamento) => {
    setEditingId(agendamento.AGEN_ID);

    reset({
      cliente: agendamento.CLI_CPF,
      placa: agendamento.MOTO_PLACA,
      funcionario: agendamento.FUN_NOME,
      data_agen: agendamento.AGEN_DATA,
      hora: agendamento.AGEN_HORA,
      observacao: agendamento.AGEN_MOTIVO_OBSERVACAO || '',
    });
  };

  // Lógica do Store
  // Definindo a rota do backend que o submit do formulário vai utilizar
  const handleFormSubmit = async (data) => {
    setLoading(true);
    try {
      const isEditing = editingId !== null;
      const url = isEditing
        ? `/agendamentos/update.php?id=${editingId}`
        : `/agendamentos/store.php`;
      const method = isEditing ? axios.put : axios.post;

      const response = await method(url, data);
      if (response.data.equal) {
        toast.info('Nenhum dado foi alterado.');
        setEditingId(null);
        reset({
          id: '',
          cliente: '',
          placa: '',
          funcionario: '',
          status: '',
          data_agen: '',
          hora: '',
          observacao: '',
        });
      }

      // Em caso de sucesso, mensagem de sucesso
      if (response.data.success) {
        toast.success(response.data.message);

        if (isEditing) {
          setAgendamentos((prevAgend) =>
            prevAgend.map((ag) =>
              ag.AGEN_ID === editingId
                ? {
                    ...ag,
                    AGEN_STATUS: ag.AGEN_STATUS,
                    AGEN_DATA: data.data_agen,
                    AGEN_HORA: data.hora,
                    AGEN_MOTIVO_OBSERVACAO: data.observacao,
                  }
                : ag
            )
          );

          setEditingId(null);
          reset({
            id: '',
            cliente: '',
            placa: '',
            funcionario: '',
            status: '',
            data_agen: '',
            hora: '',
            observacao: '',
          });
        } else {
          navigate('/agendamentos');
          reset();
        }
      }
    } catch (error) {
      // Capturando o erro em caso de erro
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Não foi possível se conectar com o servidor.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Função para percorrer o array de erros, e me mostrar exatamente o erro que eu preciso
  const onInvalid = (validationErrors) => {
    Object.values(validationErrors).forEach((e) => {
      toast.error(e.message);
    });
  };

  // Lógica do index
  useEffect(() => {
    async function fetchAgendamentos() {
      try {
        const response = await axios.get('/agendamentos/index.php');
        if (response.data.success) {
          const agendamentosData = response.data.agendamentos || [];
          setAgendamentos(agendamentosData);

          // Verificando o tamanho do array
          if (agendamentosData.length === 0) {
            toast.info(
              'A Baco Motos ainda não possui agendamentos cadastrados.'
            );
          }
        } else {
          toast.error('Erro ao buscar agendamentos.');
        }
      } catch (error) {
        toast.error('Não foi possível se conectar com o servidor.');
      } finally {
        setLoading(false);
      }
    }

    fetchAgendamentos();
  }, []);

  useEffect(() => {
    console.log(location.state);

    if (location.state && location.state.cliente && editingId === null) {
      const initialData = location.state;

      reset({
        cliente: initialData.cliente || '',
        placa: initialData.placa || '',
        funcionario: '',
        data_agen: '',
        hora: '',
        observacao: '',
      });

      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, location.pathname, navigate, reset, editingId]);

  if (loading) {
    return (
      <agendamentos.ContainerForm>
        <h1>Carregando</h1>
      </agendamentos.ContainerForm>
    );
  }

  return (
    <>
      <agendamentos.DivTop>
        <agendamentos.Title>Agendamentos</agendamentos.Title>
        <agendamentos.Search type="text" placeholder="" />
        <agendamentos.LabelSearch>
          Buscar Cliente <IoIosSearch className="ioSearch" />
        </agendamentos.LabelSearch>
      </agendamentos.DivTop>

      <agendamentos.ContainerForm>
        <agendamentos.Form
          method="POST"
          action=""
          onSubmit={handleSubmit(handleFormSubmit, onInvalid)}
        >
          <agendamentos.DivLabel>
            <agendamentos.Label>Cliente</agendamentos.Label>
            <Controller
              name="cliente"
              control={control}
              render={({ field }) => (
                <agendamentos.InputCliente format="###.###.###-##" {...field} />
              )}
            />
          </agendamentos.DivLabel>
          <agendamentos.DivLabel>
            <agendamentos.Label>Placa</agendamentos.Label>
            <agendamentos.InputPlaca type="text" {...register('placa')} />
          </agendamentos.DivLabel>
          <agendamentos.DivLabel>
            <agendamentos.Label>Mecânico</agendamentos.Label>
            <agendamentos.InputFuncionario
              type="text"
              {...register('funcionario')}
            />
          </agendamentos.DivLabel>
          <agendamentos.DataHora>
            <agendamentos.Label>Data</agendamentos.Label>
            <agendamentos.InputData type="date" {...register('data_agen')} />
            <agendamentos.Label className="LabelHora">
              Horário
            </agendamentos.Label>
            <agendamentos.InputHora type="time" {...register('hora')} />
          </agendamentos.DataHora>
          <agendamentos.InputObs
            type="text"
            placeholder="Observação"
            {...register('observacao')}
          />
          <agendamentos.ButtonsWrapper>
            <agendamentos.ButtonSubmit disabled={loading}>
              {editingId ? 'Salvar Edição' : 'Agendar'}
            </agendamentos.ButtonSubmit>
            {editingId && (
              <agendamentos.ButtonSubmit
                className="btnCancel"
                type="button"
                onClick={() => {
                  setEditingId(null);
                  reset({
                    id: '',
                    cliente: '',
                    placa: '',
                    funcionario: '',
                    status: '',
                    data_agen: '',
                    hora: '',
                    observacao: '',
                  });
                }}
              >
                Cancelar Edição
              </agendamentos.ButtonSubmit>
            )}
          </agendamentos.ButtonsWrapper>
        </agendamentos.Form>
      </agendamentos.ContainerForm>

      <agendamentos.DivTitleContent>
        <agendamentos.TitleContent>
          Próximos Agendamentos
        </agendamentos.TitleContent>
      </agendamentos.DivTitleContent>

      <agendamentos.ContainerContent>
        <agendamentos.StyledTable>
          <agendamentos.Thead>
            <agendamentos.Tr $isHead>
              <agendamentos.Th>ID</agendamentos.Th>
              <agendamentos.Th>Cliente</agendamentos.Th>
              <agendamentos.Th>Placa</agendamentos.Th>
              <agendamentos.Th>Mecânico</agendamentos.Th>
              <agendamentos.Th>Status</agendamentos.Th>
              <agendamentos.Th>Data</agendamentos.Th>
              <agendamentos.Th>Hora</agendamentos.Th>
              <agendamentos.Th>Ações</agendamentos.Th>
            </agendamentos.Tr>
          </agendamentos.Thead>

          <agendamentos.Tbody>
            {agend.length > 0 ? (
              agend.map((agen) => (
                <agendamentos.Tr key={agen.AGEN_ID}>
                  <agendamentos.Td>{agen.AGEN_ID}</agendamentos.Td>
                  <agendamentos.Td>{agen.CLI_NOME}</agendamentos.Td>
                  <agendamentos.Td>
                    {placaFormat(agen.MOTO_PLACA)}
                  </agendamentos.Td>
                  <agendamentos.Td>{agen.FUN_NOME}</agendamentos.Td>
                  <agendamentos.Td $status={agen.AGEN_STATUS}>
                    {STATUS_MAP[agen.AGEN_STATUS || 'Status inválido']}
                  </agendamentos.Td>
                  <agendamentos.Td>
                    {agen.AGEN_DATA !== '0000-00-00'
                      ? agen.AGEN_DATA
                      : 'Data não informada'}
                  </agendamentos.Td>
                  <agendamentos.Td>
                    {agen.AGEN_HORA !== '00:00:00'
                      ? agen.AGEN_HORA
                      : 'Hora não informada'}
                  </agendamentos.Td>
                  <agendamentos.Td>
                    <FaCalendarCheck
                      className="check"
                      onClick={() =>
                        handleSetStatusFinalizado(agen.AGEN_ID, agen.CLI_NOME)
                      }
                    />
                    <IoIosCreate
                      className="edit"
                      onClick={() => handleEdit(agen)}
                    />
                    <FaTrash
                      className="delete"
                      onClick={() => handleDelete(agen.AGEN_ID, agen.CLI_NOME)}
                    />
                    <MdCancel
                      className="cancel"
                      onClick={() =>
                        handleSetStatus(agen.AGEN_ID, agen.CLI_NOME)
                      }
                    />
                  </agendamentos.Td>
                </agendamentos.Tr>
              ))
            ) : (
              <agendamentos.Tr>
                <agendamentos.Td colSpan="8">
                  Nenhum agendamento cadastrado
                </agendamentos.Td>
              </agendamentos.Tr>
            )}
          </agendamentos.Tbody>
        </agendamentos.StyledTable>
      </agendamentos.ContainerContent>
    </>
  );
}
