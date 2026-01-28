import { MercadoPagoConfig, Preference } from 'mercadopago';

export default async function handler(req, res) {
  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { items, payer } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Carrinho vazio' });
    }

    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN
    });

    const preference = new Preference(client);

    const siteUrl = process.env.SITE_URL || 'https://seu-site.vercel.app';

    const preferenceData = {
      items: items.map(item => ({
        id: String(item.id),
        title: item.name,
        description: item.description || item.name,
        quantity: item.quantity,
        currency_id: 'BRL',
        unit_price: Number(item.price)
      })),
      payer: payer ? {
        name: payer.name,
        email: payer.email
      } : undefined,
      back_urls: {
        success: `${siteUrl}/pagamento/sucesso`,
        failure: `${siteUrl}/pagamento/erro`,
        pending: `${siteUrl}/pagamento/pendente`
      },
      auto_return: 'approved',
      statement_descriptor: 'LEO E GUI AUTOPECAS',
      external_reference: `pedido-${Date.now()}`
    };

    const result = await preference.create({ body: preferenceData });

    res.status(200).json({
      id: result.id,
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point
    });

  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    res.status(500).json({
      error: 'Erro ao processar pagamento',
      details: error.message
    });
  }
}
