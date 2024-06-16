const fetch = require('node-fetch');
const uploadImage = require('../lib/uploadImage')

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';
    if (/^image/.test(mime) && !/webp/.test(mime)) {
      const img = await q.download();
      const out = await uploadImage(img);
      m.reply(wait);
    if (command === 'removebg' || command === 'nobg') {
        const api = await fetch(`https://api.betabotz.eu.org/api/tools/removebg?url=${out}&apikey=${lann}`);
        const image = await api.json();
        const url = image.url.result;
        conn.sendFile(m.chat, url, null, wm, m);
      }
    } else {
      m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim.`);
    }
  } catch (e) {
    console.error(e);
    throw `🚩 *Server Error*`
  }
}

handler.command = handler.help = ['removebg','nobg'];
handler.tags = ['tools'];
handler.premium = false;
handler.limit = false;

module.exports = handler;