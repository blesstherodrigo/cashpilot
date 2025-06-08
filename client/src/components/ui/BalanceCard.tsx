export default function BalanceCard() {
    return (
        <div style={{
        padding: '16px',
        width:'40vw',
        height:'10vh',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        justifyContent: 'space-between',
        justifySelf: 'center',
        alignItems: 'center',
        }}>
        <div>
            <strong>R$: *******</strong>
        <div>SALTO ATUAL</div>
      </div>
      <div>
        <button style={{
          backgroundColor: '#4CAF50',
          border: 'none',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '20px',
        cursor: 'pointer'
        }}>
          +
        </button>
      </div>
    </div>
  );
}
