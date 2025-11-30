import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/authContexts';

import axios from '../../services/axios';
import './css/login.css';

export default function LoginPage() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login: authLogin } = useAuth();

  /* Effect apenas para o link do bootstrap */
  useEffect(() => {
    const boostrapURL =
      'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';

    const linkTag = document.createElement('link');
    linkTag.id = 'bootstrap-login-css';
    linkTag.href = boostrapURL;
    linkTag.rel = 'stylesheet';
    linkTag.integrity =
      'sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH';
    linkTag.crossOrigin = 'anonymous';

    document.documentElement.setAttribute('data-bs-theme', 'dark');

    document.head.appendChild(linkTag);

    // Retirando o link quando o componente é desmontado
    return () => {
      const linkRemove = document.getElementById('bootstrap-login-css');
      if (linkRemove) {
        document.head.removeChild(linkRemove);
      }

      document.documentElement.removeAttribute('data-bs-theme');
    };
  }, []);

  useEffect(() => {
    if (location.state && location.state.message) {
      toast.warn(location.state.message);
    }

    navigate(location.pathname, { replace: true, state: {} });
  }, [location, navigate, location.pathname]);

  // 2. Função que lida com o envio do formulário
  const handleSubmit = async (event) => {
    // Previne o recarregamento padrão da página
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/login/loginUser.php', {
        FUN_LOGIN: login,
        FUN_SENHA: senha,
      });

      if (response.data.success) {
        authLogin(response.data.usuario);
        toast.success(response.data.message);
        localStorage.setItem('user_token', response.data.token);
        navigate('/');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // 5. Lógica de erro
      toast.error('Usuário ou senha incorretos.', error);
    } finally {
      setLoading(false);
    }
  };

  // 6. O HTML traduzido para JSX
  return (
    // O <body> é gerenciado pelo React, então usamos <div> com as classes
    <div className="bg-dark d-flex align-items-center justify-content-center vh-100">
      <main className="card login-card shadow-lg p-4 border-0">
        <div className="text-center mb-4">
          {/* '<img>' precisa de '/' no final e o 'src' deve apontar para a pasta 'public' */}
          <img
            src="/img/logoBaco.png"
            alt="Logo NexBit"
            width="90"
            className="mb-2"
          />
          <h4 className="fw-bold text-danger">Baco Motos</h4>
          <p className="text-secondary mb-0">Bem-vindo ao sistema Mainteer</p>
        </div>

        {/* 7. O <form> agora chama a função 'handleSubmit' */}
        <form onSubmit={handleSubmit} action="" method="POST">
          <div className="mb-3">
            {/* 'for' vira 'htmlFor' */}
            {/* eslint-disable-next-line */}
            <label htmlFor="login" className="form-label text-light">
              Usuário
            </label>
            <input
              type="text"
              className="form-control bg-dark text-light border-secondary"
              id="login"
              name="login"
              placeholder="Digite seu usuário" // <-- corrigido
              required
              value={login} // 8. Conecta o input ao estado
              onChange={(e) => setLogin(e.target.value)} // Atualiza o estado
            />
          </div>

          <div className="mb-3">
            {/* eslint-disable-next-line */}
            <label htmlFor="senha" className="form-label text-light">
              Senha
            </label>
            <input
              type="password"
              className="form-control bg-dark text-light border-secondary"
              id="senha"
              name="senha"
              placeholder="Digite sua senha"
              required
              value={senha} // 8. Conecta o input ao estado
              onChange={(e) => setSenha(e.target.value)} // Atualiza o estado
            />
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-danger fw-semibold"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <small className="text-secondary">
            Não possui conta?
            {/* 9. Troque o <a> por <Link> se estiver usando React Router */}
            <Link to="/cadastro" className="text-danger text-decoration-noe">
              Registrar-se
            </Link>
            {/* Ex: <Link to="/cadastro" className="text-danger text-decoration-none">Registrar-se</Link> */}
          </small>
        </div>

        <div className="text-center mt-4">
          <small className="text-secondary">
            © 2025 NexBit - Projeto Mainteer
          </small>
        </div>
      </main>
    </div>
  );
}
