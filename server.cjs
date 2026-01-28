const express = require('express');
const cors = require('cors');
const { MercadoPagoConfig, Preference } = require('mercadopago');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Configurar Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN
});

const SITE_URL = process.env.SITE_URL || 'http://localhost:5173';

// Rota para criar preferência de pagamento
app.post('/api/create-preference', async (req, res) => {
  try {
    const { items, payer } = req.body;

    // Validar itens
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Carrinho vazio' });
    }

    const preference = new Preference(client);

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
        email: payer.email,
        phone: payer.phone ? {
          area_code: payer.phone.substring(0, 2),
          number: payer.phone.substring(2)
        } : undefined
      } : undefined,
      back_urls: {
        success: `${SITE_URL}/pagamento/sucesso`,
        failure: `${SITE_URL}/pagamento/erro`,
        pending: `${SITE_URL}/pagamento/pendente`
      },
      auto_return: 'approved',
      statement_descriptor: 'LEO E GUI AUTOPECAS',
      external_reference: `pedido-${Date.now()}`
    };

    const result = await preference.create({ body: preferenceData });

    res.json({
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
});

// Webhook para receber notificações do Mercado Pago
app.post('/api/webhook', async (req, res) => {
  try {
    const { type, data } = req.body;

    if (type === 'payment') {
      console.log('Pagamento recebido:', data.id);
      // Aqui você pode salvar o pagamento no banco de dados
      // e atualizar o status do pedido
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Erro no webhook:', error);
    res.sendStatus(500);
  }
});

// Rota de teste
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor de pagamentos funcionando!' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor de pagamentos rodando na porta ${PORT}`);
  console.log(`📍 API: http://localhost:${PORT}/api`);

  if (process.env.MP_ACCESS_TOKEN === 'SEU_ACCESS_TOKEN_AQUI') {
    console.log('\n⚠️  ATENÇÃO: Configure seu Access Token no arquivo .env');
    console.log('   Obtenha em: https://www.mercadopago.com.br/developers/panel/app\n');
  }
});
