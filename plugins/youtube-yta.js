/*let fetch = require('node-fetch')

let handler = async (m, { conn, args, usedPrefix, command }) => {
	if (!args[0]) throw `*Contoh:* ${usedPrefix + command} https://youtu.be/z6tDHN20h7s`
	if (!args[0].match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))) return m.reply(`URL tidak benar`)
		try {
			let res = await fetch(`https://api.lolhuman.xyz/api/ytaudio?apikey=${global.lolkey}&url=${args[0]}`)
			let anu = await res.json()
			anu = anu.result
			if (!anu.link.link) throw new Error('Error')
			conn.sendMessage(m.chat, {
                audio: {
                    url: anu.link.link
                },
                mimetype: 'audio/mpeg',
                contextInfo: {
                    externalAdReply: {
                        title: anu.title,
                        body: "YouTube Downloader Audio By Assisten Yula 💕",
                        thumbnailUrl: anu.thumbnail,
                        sourceUrl: "",
                        mediaType: 1,
                        showAdAttribution: true,
                        renderLargerThumbnail: true
                    }
                }
            })
		} catch (e) {
			console.log(e)
			throw `Invalid Youtube URL / terjadi kesalahan.`
		}
	}*/
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

const sleep = (ms) => {
return new Promise(resolve => setTimeout(resolve, ms));
}

var handler = async (m, { conn, args }) => {
  if (!args[0]) throw 'Urlnya Mana Banh? >:('
  m.reply(wait)
  let q = '128kbps'
  let v = args[0]

  // Ambil info dari video
  const yt = await youtubedl(v).catch(async () => await  youtubedlv2(v))
  const dl_url = await yt.audio[q].download()
  const ttl = await yt.title
  const size = await yt.audio[q].fileSizeH
  const info = `*F I L E  T Y P E*
• Judul: ${ttl}
• Ukuran: ${size}`
  conn.sendMessage(m.chat, {
    document: { url: dl_url }, 
    mimetype: 'audio/mpeg', 
    fileName: `${ttl}.mp3`,
    caption: info
  }, {quoted: m})
  await sleep(2000)
  if (await yt.audio[q].fileSize > 15000) return m.reply(`SizeFile: ${size}\nTidak dapat mengirim Voice Note. Silahkan ambil music yang bertype File`)
  conn.sendFile(m.chat, dl_url, 'kasar.mp3', null, m, true, {
type: 'audioMessage', 
ptt: true 
})
}
handler.help = ['ytmp3 <url>']
handler.tags = ['downloader']
handler.command = /^(yt(a(udio)?|mp3))$/i

handler.premium = false
handler.limit = true

export default handler


 