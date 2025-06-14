import MainLayout from '../../components/layout/MainLayout';
import ProfileForm from '../../components/forms/ProfileForm/ProfileForm';

export default function TelaProfile() {
  return (
    <MainLayout titulo="PERFIL">
      <>
      <div className='sectionUser'>
        <ProfileForm />
      </div>
      </>
    </MainLayout>
  );
}