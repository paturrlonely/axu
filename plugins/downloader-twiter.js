import { twitter } from 'betabotz-tools';

var handler = async (m, {
	conn,
	args,
	usedPrefix,
	command
}) => {
if (!args[0]) throw `Masukan URL!\n\ncontoh:\n${usedPrefix + command} https://twitter.com/ketchupnude/status/1713239814533955723`
if (!args[0].match(/twitter/gi)) throw `URL Tidak Ditemukan!`
    try {
         const data = await twitter(args[0])
         for ( let kon of data.result.mediaURLs ) {
         conn.sendFile(m.chat, kon, null, wm, m)
        }
     } catch (e) {
        throw `*Server Down!*`
    }
};
handler.command = /^(twitterdl|twitter)$/i
handler.help = ['twitter'].map(v => v + ' <url>');
handler.tags = ['downloader'];
handler.register = false;
handler.group = false;
handler.limit = true;
handler.owner = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;
handler.private = false;
export default handler;