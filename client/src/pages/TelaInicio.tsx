import MainLayout from '../components/layout/MainLayout';
import BalanceCard from '../components/ui/BalanceCard';

export default function TelaInicio() {
  return (
    <MainLayout titulo="INÍCIO"> 
      <div className='container' style={{ display: 'flex', flexDirection: 'column', gap: '20px' , justifySelf:'center'}}>
        <BalanceCard />
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
        </div>
      </div>

      <div className='containerGraphPizza'></div>

      <div className='containterGraph'></div>
    </MainLayout>
  );
}