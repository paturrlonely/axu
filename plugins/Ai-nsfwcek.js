import fetch from 'node-fetch';
import uploadImage from '../lib/uploadImage.js';

let handler = async (m, { conn, usedPrefix, command, args }) => {

   let q = m.quoted ? m.quoted : m;
   let mime = (q.msg || q).mimetype || '';
   if (/image/.test(mime)) {
     try {
       let media = await q.download();
        let url = await uploadImage(media);
         let data = await( await fetch(`https://api.betabotz.eu.org/api/tools/nsfw-detect?url=${url}&apikey=${global.lann}`)).json()
    
   let cap = `*Label Name:* ${data.labelName}\n*NSFW Results:* ${data.confidence}`

   m.reply(cap)
         } catch (e) {
			console.log(e)
			m.reply(eror)
	  }
    } else {
		m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`)
	}
}

handler.help = ['nsfwcek']
handler.tags = ['ai', 'tools']
handler.command = /^(nsfwcek)$/i
handler.limit = true

export default handler