import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

// Assumindo que você tem o axios configurado para a URL base do backend
import axios from '../../services/axios';
// Importe seu CSS local se necessário:
// import './css/login.css';

export default function CadastroPage() {
  const [nome, setNome] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 1. Carregamento e remoção do CSS do Bootstrap via useEffect
  useEffect(() => {
    const bootstrapURL =
      'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';

    const linkTag = document.createElement('link');
    linkTag.id = 'bootstrap-cadastro-css';
    linkTag.href = bootstrapURL;
    linkTag.rel = 'stylesheet';
    linkTag.integrity =
      'sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH';
    linkTag.crossOrigin = 'anonymous';

    // Definir tema escuro para Bootstrap
    document.documentElement.setAttribute('data-bs-theme', 'dark');
    document.head.appendChild(linkTag);

    // Retirando o link quando o componente é desmontado
    return () => {
      const linkRemove = document.getElementById('bootstrap-cadastro-css');
      if (linkRemove) {
        document.head.removeChild(linkRemove);
      }
      document.documentElement.removeAttribute('data-bs-theme');
    };
  }, []);

  // 2. Função que lida com o envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) return;

    // Validação básica de senha
    if (senha !== confirmarSenha) {
      toast.error('A senha e a confirmação de senha não coincidem.');
      return;
    }

    setLoading(true);

    try {
      // Objeto de dados (o backend deve esperar FUN_NOME, FUN_LOGIN, FUN_SENHA)
      const dataToSend = {
        FUN_NOME: nome,
        FUN_LOGIN: login,
        FUN_SENHA: senha, // O backend deve hashear esta senha
      };

      const response = await axios.post('/login/cadastroUser.php', dataToSend);

      if (response.data.success) {
        toast.success('Cadastro realizado com sucesso! Faça login.');
        // Redireciona para a tela de login
        navigate('/login');
      } else {
        // Captura a mensagem de erro do backend (ex: usuário já existe)
        toast.error(
          response.data.message || 'Erro ao tentar cadastrar usuário.'
        );
      }
    } catch (error) {
      let errorMessage =
        'Ocorreu um erro ao tentar se conectar com o servidor.';
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // 3. O JSX traduzido
  return (
    <div className="bg-dark d-flex align-items-center justify-content-center vh-100">
      <main className="card login-card shadow-lg p-4 border-0">
        <div className="text-center mb-4">
          <img
            src="/img/logoBaco.png"
            alt="Logo Baco Motos"
            width="90"
            className="mb-2"
          />
          <h4 className="fw-bold text-danger">Baco Motos</h4>
          <p className="text-secondary mb-0">
            Crie sua conta no sistema Mainteer
          </p>
        </div>

        <form onSubmit={handleSubmit} action="" method="POST">
          {/* Campo Nome */}
          <div className="mb-3">
            {/* eslint-disable-next-line */}
            <label htmlFor="nome" className="form-label text-light">
              Nome
            </label>
            <input
              type="text"
              className="form-control bg-dark text-light border-secondary"
              id="nome"
              placeholder="Digite seu nome completo"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          {/* Campo Usuário (Login) */}
          <div className="mb-3">
            {/* eslint-disable-next-line */}
            <label htmlFor="login" className="form-label text-light">
              Usuário (Login)
            </label>
            <input
              type="text"
              className="form-control bg-dark text-light border-secondary"
              id="login"
              placeholder="Digite o usuário"
              required
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>

          {/* Campo Senha */}
          <div className="mb-3">
            {/* eslint-disable-next-line */}
            <label htmlFor="senha" className="form-label text-light">
              Senha
            </label>
            <input
              type="password"
              className="form-control bg-dark text-light border-secondary"
              id="senha"
              placeholder="Crie uma senha"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          {/* Campo Confirmar Senha */}
          <div className="mb-3">
            {/* eslint-disable-next-line */}
            <label htmlFor="confirmar_senha" className="form-label text-light">
              Confirmar Senha
            </label>
            <input
              type="password"
              className="form-control bg-dark text-light border-secondary"
              id="confirmar_senha"
              placeholder="Confirme sua senha"
              required
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-danger fw-semibold"
              disabled={loading}
            >
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </div>

          <div id="msgRetorno" className="mt-3 text-center" />
        </form>

        <div className="text-center mt-4">
          <small className="text-secondary">
            Já possui conta?
            <Link to="/login" className="text-danger text-decoration-none">
              Entrar
            </Link>
          </small>
        </div>

        <div className="text-center mt-3">
          <small className="text-secondary">
            © 2025 NexBit - Projeto Mainteer
          </small>
        </div>
      </main>
    </div>
  );
}
