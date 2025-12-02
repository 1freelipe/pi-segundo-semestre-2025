import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { FaEdit, FaTimesCircle, FaCalendarAlt } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert';

import * as bikes from './styled';
import NotFoundBikes from '../../../components/notFoundBikes/notFound';
import axios from '../../../services/axios';

export default function MotosIndex() {
  const navigate = useNavigate();

  const [motos, setMotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const placaFormat = (placaString) => {
    const caracteres = placaString.replace(/[^a-z0-9]/gi, '').toUpperCase();

    if (caracteres.length === 7) {
      return caracteres.replace(/(\w{3})(\w{4})/, '$1-$2');
    }

    return placaString;
  };

  const handleNewClick = () => {
    navigate('/motos/store');
  };

  const handleDelete = async (id, nome, cliente) => {
    confirmAlert({
      title: 'Confirmar exclusão',
      message: `Tem certeza que deseja apagar a moto: ${nome} do cliente: ${cliente}`,
      buttons: [
        {
          label: 'Apagar',
          onClick: async () => {
            try {
              const response = await axios.delete(`/motos/delete.php?id=${id}`);
              if (response.data.success) {
                toast.success('Moto apagada com sucesso.');
                setMotos((prevMotos) =>
                  prevMotos.filter((m) => m.MOTO_ID !== id)
                );
              } else {
                toast.error(response.data.message);
              }
            } catch (error) {
              if (error.response) {
                toast.error(error.response.data.message);
              }
              toast.error('Erro ao tentar apagar a moto', error);
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

  const handleClickAgend = async (moto) => {
    try {
      const dataToSend = {
        cliente: moto.CLI_CPF,
        placa: moto.MOTO_PLACA,
      };

      navigate('/agendamentos/index', { state: dataToSend });
    } catch (error) {
      toast.error('Erro ao preparar agendamento.');
    }
  };

  useEffect(() => {
    async function fetchMotos() {
      setLoading(true);
      try {
        const response = await axios.get('/motos/index.php');

        if (response.data.success) {
          const dataMotos = response.data.motos || [];
          setMotos(dataMotos);

          if (dataMotos.length === 0) {
            toast.warn(
              'Ao menos uma moto deve estar cadastrada para visualizar.'
            );
          }
        } else {
          toast.error('Erro ao buscar motos.');
        }
      } catch (error) {
        toast.error('Erro ao se conectar com o servidor.');
      } finally {
        setLoading(false);
      }
    }

    fetchMotos();
  }, []);

  // eslint-disable-next-line
const renderContent = () => {
    if (loading) {
      return (
        <bikes.InsertContent>
          <bikes.TitleContent>Carregando motos....</bikes.TitleContent>
        </bikes.InsertContent>
      );
    }

    if (motos.length === 0) {
      return <NotFoundBikes />;
    }

    return motos.map((moto) => (
      <bikes.Containers key={moto.MOTO_ID}>
        <bikes.Content>
          <bikes.TitleContent>
            {moto.MARCA_NOME} {moto.MODELO_NOME}
          </bikes.TitleContent>

          <bikes.ButtonsWrapper>
            <bikes.BtnEdit>
              <Link to={`/motos/edit/${moto.MOTO_ID}`}>
                <FaEdit className="edit" />
              </Link>
            </bikes.BtnEdit>
            <bikes.BtnExclude>
              <FaTimesCircle
                className="exclude"
                onClick={() =>
                  handleDelete(moto.MOTO_ID, moto.MODELO_NOME, moto.CLI_NOME)
                }
              />
            </bikes.BtnExclude>
            <bikes.BtnAgenda>
              <FaCalendarAlt
                className="agenda"
                onClick={() => handleClickAgend(moto)}
              />
            </bikes.BtnAgenda>
          </bikes.ButtonsWrapper>

          <bikes.AnoPlaca>
            <bikes.Ano>
              <bikes.AnoText>Ano:</bikes.AnoText>
              <bikes.AnoContent>{moto.MOTO_ANO}</bikes.AnoContent>
            </bikes.Ano>
            <bikes.Placa>
              <bikes.PlacaText>Placa:</bikes.PlacaText>
              <bikes.PlacaContent>
                {placaFormat(moto.MOTO_PLACA)}
              </bikes.PlacaContent>
            </bikes.Placa>
          </bikes.AnoPlaca>

          <bikes.CorMarca>
            <bikes.Cor>
              <bikes.CorText>Cor:</bikes.CorText>
              <bikes.CorContent>{moto.COR_NOME}</bikes.CorContent>
            </bikes.Cor>

            <bikes.Marca>
              <bikes.MarcaText>Marca:</bikes.MarcaText>
              <bikes.MarcaContent>{moto.MARCA_NOME}</bikes.MarcaContent>
            </bikes.Marca>
          </bikes.CorMarca>

          <bikes.ClienteAtivo>
            <bikes.Cliente>
              <bikes.ClienteText>Cliente:</bikes.ClienteText>
              <bikes.ClienteContent title={moto.CLI_NOME}>
                {moto.CLI_NOME}
              </bikes.ClienteContent>
            </bikes.Cliente>

            <bikes.Ativo>
              <bikes.AtivoText>Status:</bikes.AtivoText>
              <bikes.AtivoContent $isAtivo={moto.MOTO_ATIVO}>
                {moto.MOTO_ATIVO === 1 ? 'ATIVO' : 'INATIVO'}
              </bikes.AtivoContent>
            </bikes.Ativo>
          </bikes.ClienteAtivo>

          <bikes.ObservacaoDiv>
            <bikes.ObservacaoText>Observação</bikes.ObservacaoText>
            <bikes.ObservacaoContent>
              {moto.MOTO_OBSERVACAO === ''
                ? 'Sem observações.'
                : moto.MOTO_OBSERVACAO}
            </bikes.ObservacaoContent>
          </bikes.ObservacaoDiv>
        </bikes.Content>
      </bikes.Containers>
    ));
  };

  return (
    <>
      <bikes.DivTitle>
        <bikes.TitleTop>Motos Cadastradas</bikes.TitleTop>
      </bikes.DivTitle>

      <bikes.Container>
        <bikes.ButtonNew onClick={handleNewClick}>+Nova Moto</bikes.ButtonNew>

        <bikes.InsertContent>{renderContent()}</bikes.InsertContent>
      </bikes.Container>
    </>
  );
}
