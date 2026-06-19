export default function SchemeDetailPage({ params }: { params: { id: string } }) {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1 style={{ color: '#ea580c', marginBottom: '20px' }}>📜 Scheme Details</h1>
      <p>Scheme ID: {params.id}</p>
      <a href="/" style={{ color: '#f97316', marginTop: '20px', display: 'inline-block' }}>
        ← Back to Home
      </a>
    </div>
  );
}
