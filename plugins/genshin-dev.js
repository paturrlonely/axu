import genshindb from 'genshin-db';

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
	if (!text) throw `Example : *${usedPrefix + command} Eula*`
	try {
		let anu = await genshindb.characters(text)
		let ini_txt = `  "${text}": {\n`
		ini_txt += `  "image": "",\n`
		ini_txt += `  "voice": "",\n`
		ini_txt += `  "description": "${anu.description}",\n`
		ini_txt += `  "name": "${anu.name}",\n`
		ini_txt += `  "title": "${anu.title}",\n`
		ini_txt += `  "element": "${anu.element}",\n`
		ini_txt += `  "weapon": "${anu.weapontype}",\n`
		ini_txt += `  "substat": "${anu.substat}",\n`
		ini_txt += `  "rarity": "⭐ ${anu.rarity}",\n`
		ini_txt += `  "gender": "${anu.gender} ( ${anu.body} )",\n`
		ini_txt += `  "birthday": "${anu.birthday}",\n`
		ini_txt += `  "constellation": "${anu.constellation}",\n`
		ini_txt += `  "association": "${anu.association}",\n`
		ini_txt += `  "region": "${anu.region}",\n`
		ini_txt += `  "characters_voice": {\n    "english": "${anu.cv.english}",\n    "chinese": "${anu.cv.chinese}",\n    "japanese": "${anu.cv.japanese}",\n    "korean": "${anu.cv.korean}"\n`
		ini_txt += `  }\n`
		ini_txt += `},`
		conn.sendFile(m.chat, anu.images.cover2, 'cover.png', ini_txt, m)
	} catch (e) {
		console.log(e)
		let anu2 = await genshindb.characters(`names`, { matchCategories: true })
		m.reply(`*Not Found*\n\n*Available characters is :*\n${anu2.join(", ")}`)
	}
}

handler.help = ['gidev'].map(v => v + ' characters')
handler.tags = ['owner']
handler.command = /^((gi|genshin)dev?)$/i

handler.group = true
handler.limit = true

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)