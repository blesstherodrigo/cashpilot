import Title from '../components/ui/TitlePilot';
import LoginForm from '../components/forms/LoginForm';
import MainLayout from '../components/layout/MainLayout';
import  '../components/ui/TelaGastos.css'
import Modal from '../components/ui/ModalAddGastos';
import { useState } from 'react';
import ModalGastos from '../components/ui/ModalAddGastos';


export default function TelaGastos() {

  const[openModal, setOpenModal] = useState(false)

  return (
    <MainLayout titulo="GASTOS">
      <>
        <div>
          <button className='AddGasto' onClick={() => setOpenModal(true)}>ADD GASTO</button>
          </div>
            <ModalGastos isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}>
            </ModalGastos>
          <br />

          <p>Não há registro de gastos no momento</p>
      </>
    </MainLayout>
  );
}