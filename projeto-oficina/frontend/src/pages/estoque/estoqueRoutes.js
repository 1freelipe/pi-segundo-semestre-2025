import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import EstoqueIndex from './estoqueIndex/estoqueIndex';
import EstoqueStore from './estoqueStore/estoqueStore';

export default function EstoqueRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/estoque/index" replace />} />

      <Route path="/index" element={<EstoqueIndex />} />
      <Route path="/store" element={<EstoqueStore />} />
    </Routes>
  );
}
