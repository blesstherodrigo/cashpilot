import MainLayout from '../../components/layout/MainLayout/MainLayout';
import SuporteForm from '../../components/forms/SuporteForm/SuporteForm';
import TitleSuporte from '../../components/ui/Titles/TitleSuporte/TitleSuporte'

export default function TelaSuporte() {

  return (
  <MainLayout titulo="SUPORTE">
    <div>
      <TitleSuporte/>
      <SuporteForm />
    </div>
  </MainLayout>
  );
  
}

