function handler(m) {
  
  const kontak = {
	"displayName": 'Maximus Store',
	vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;;;;\nFN: Maximus Store\nitem1.TEL;waid=6281283516246:6281283516246\nitem1.X-ABLabel:\nMy Owner\nURL;Email Owner: maximusstoreindonesia@gmail.com\nORG: JASA SEWABOT, PANEL & LAIN-LAIN\nEND:VCARD`
}

conn.sendMessage(m.chat, { contacts: { contacts: [kontak] }}, { quoted: m })
  
}
handler.help = ['owner', 'creator']
handler.tags = ['info']

handler.command = /^(owner|creator)$/i

export default handler