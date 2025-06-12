import MainLayout from '../components/layout/MainLayout';
import '../components/ui/TelaProfile.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import ProfileForm from '../components/forms/ProfileForm';

export default function TelaProfile() {
  return (
    <MainLayout titulo="PERFIL">
      <>
      <div style={{ padding: '2rem' }}>
      <ProfileForm />
      </div>
      </>
    </MainLayout>
  );
}