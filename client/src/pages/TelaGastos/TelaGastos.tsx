// src/pages/TelaGastos/TelaGastos.tsx
import GastoForm from '../../components/forms/GastoForm/GastoForm';
import MainLayout from '../../components/layout/MainLayout/MainLayout';

export default function TelaGastos() {

  return (
    <MainLayout titulo="GASTOS">
      <GastoForm/>
    </MainLayout>
  );
}