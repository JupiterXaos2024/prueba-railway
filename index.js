const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');

// Iniciar servidor Express (para mantener el bot despierto en algunos hosts)
const app = express();
app.get('/', (_req, res) => res.send('Bot corriendo 🚀'));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App escuchando en puerto ${port}`));

// Configura cliente de WhatsApp
const client = new Client({
  authStrategy: new LocalAuth(),  // guarda sesión en ./session
  puppeteer: { headless: true }
});

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
  console.log('Escanea este código QR con tu WhatsApp.');
});

client.on('ready', () => {
  console.log('✅ Cliente listo!');
});

client.on('message', async msg => {
  console.log(`⏳ Mensaje de ${msg.from}: ${msg.body}`);
  if (msg.body.toLowerCase() === 'ping') {
    await msg.reply('pong');
  } else {
    // lógica de tu bot...
    await msg.reply(`Recibí: ${msg.body}`);
  }
});

client.initialize();
