import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command }) => {
	try {
   let maximus = `*RECODED BY MAXIMUS*

> https://github.com/XM4ZE/XMYULA-MD

_Don't forget to give me 5 Stars 🙂_`
		conn.sendMessage(m.chat, {
            text: maximus,
            contextInfo: {
                forwardingScore: 9999,
                isForwarded: true,
                   forwardedNewsletterMessageInfo: {
                   newsletterJid: global.info.channel,
                   serverMessageId: null,
                   newsletterName: global.info.namechannel,
                   },
                   externalAdReply: {
                   title: global.info.namebot + `© 2024`,
                   body: 'Powered By Maximus',
                   thumbnailUrl: global.thum,
                   sourceUrl: 'https://github.com/XM4ZE/XMYULA-MD',
                   mediaType: 1,
                   renderLargerThumbnail: true
                   },
                },
            }, { quoted: m })
	} catch (e) {
		console.log(e)
		throw `Fitur Error.`
	}
};

handler.command = /^(sc|script)$/i
handler.register = false;
handler.premium = false;

export default handler;