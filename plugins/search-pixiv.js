import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
if (!text) throw `Contoh : \n.pixiv Eula Lawrence`

const payloads = {
  query: `${text}`,
  enable_nsfw: true,
  num_length: pickRandom(['1', '2', '3', '4', '5', '6', '7', '8']),
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

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}