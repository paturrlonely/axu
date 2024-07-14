import axios from 'axios';

let handler = async (m, { conn, text, command, usedPrefix }) => {
  if (!text) throw `Masukan Pertanyaan Anda`
    try {
    
    let payload = {
           prompt: text,
           temperature: 0.5,
           topP: 0.9,
           topK: 40,
           max_tokens: 100
    }
        const { data } = await axios.post("https://api.itsrose.rest/chatGPT/gemini", 
        payload, {
        headers: { Authorization: `${global.rose}` }
        }).catch((e) => e?.response);
        
        let { status, result } = data;
        let capt = `${result.messages.content}

*#${result.model}*`
        m.reply(capt)
        } catch (e) {
            console.log(e)
            m.reply(eror)
    }
}

handler.help = ['gemini']
handler.tags = ['ai']
handler.command = /^(geminiai|gemini)$/i
handler.limit = true;

export default handler