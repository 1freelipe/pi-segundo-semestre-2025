import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

import GlobalStyles from './styles/globalStyles';
import Layout from './components/background/layout';
import Dashboard from './pages/dashboard/dashboard';
import Page404 from './pages/404/page404';
import Clientes from './pages/clientes/clienteRoutes';
import UserProfile from './pages/userProfile/userProfile';
import Motos from './pages/motos/motosRoutes';
import Login from './pages/login/loginPage';
import Cadastro from './pages/login/loginCadastro';
import Agendamentos from './pages/agendamentos/agendRoutes';
import OrdemServico from './pages/os/ordemServicoRoutes';
import PrivateRoutes from './components/privateRoutes/privateRoutes';
import EstoqueRoutes from './pages/estoque/estoqueRoutes';

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        {/* Essas rotas estão acima, pois elas não precisam ser renderizas com os componentes do layout */}
        <Route path="/login/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Rota global, tanto para usuário logado, quanto para usuário deslogado */}
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
        </Route>

        {/* Já essas, estão sendo renderizadas com o outlet, e precisam dos componentes globais */}
        {/* Rotas privadas apenas para usuários logados */}
        <Route element={<PrivateRoutes />}>
          <Route element={<Layout />}>
            <Route path="/clientes/*" element={<Clientes />} />
            <Route path="/user" element={<UserProfile />} />
            <Route path="/motos/*" element={<Motos />} />
            <Route path="/agendamentos/*" element={<Agendamentos />} />
            <Route path="/ordemdeservico/*" element={<OrdemServico />} />
            <Route path="/estoque/*" element={<EstoqueRoutes />} />

            <Route path="*" element={<Page404 />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer autoClose={4000} theme="dark" />
    </>
  );
}

export default App;
