export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { type, data } = req.body;

    if (type === 'payment') {
      console.log('Pagamento recebido:', data.id);
      // Aqui você pode salvar o pagamento no banco de dados
    }

    res.status(200).end();
  } catch (error) {
    console.error('Erro no webhook:', error);
    res.status(500).end();
  }
}
