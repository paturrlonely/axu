import axios from 'axios';

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  try {
if (!args[0]) throw `Contoh : \n.pixiv Eula Lawrence`

const payloads = {
  query: `${args[0]}`,
  enable_nsfw: true,
  num_length: 20,
  tag: ""
};

const { data } = await axios.post(`https://api.itsrose.life/pixiv/search/`, payloads, {
    headers: { Authorization: `${global.rose}` }
  }).catch((e) => e?.response);
let img = data.result.results[Math.floor(Math.random() * data.result.results.length)].url;
        conn.sendFile(m.chat, img, 'img.png', `*Search results:* _${text}_`, m)
        	} catch (e) {
		console.log(e)
		throw `Pencarian Tidak Di Temukan!!!`
	}
}
handler.help = ['pixivimg'].map(v => v + ' query')
handler.tags = ['search']
handler.command = /^(pixiv|pixivimg)$/i
handler.limit = true
handler.nsfw = true

export default handler