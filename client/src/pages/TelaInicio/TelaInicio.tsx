// src/pages/TelaInicio/TelaInicio.tsx

import MainLayout from '../../components/layout/MainLayout';
import InicioForm from '../../components/forms/InicioForm/InicioForm';

export default function TelaInicio() {
  return (
    <MainLayout titulo="INÍCIO"> 
      <InicioForm/>
    </MainLayout>
  );
}