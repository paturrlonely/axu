import ytdl from 'ytdl-core';
import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';
import search from 'yt-search';
const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = (await import('@adiwajshing/baileys')).default

let handler = async (m, { conn, text, args, command }) => {
  if (!args[0]) return m.reply(`*example*: .${command} YTURL`);
  try {
    let results = await search(args[0]);
    let videoId = results.videos[0].videoId;
    let info = await ytdl.getInfo(videoId);
    let title = info.videoDetails.title.replace(/[^\w\s]/gi, '');
    let thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    let url = info.videoDetails.video_url;
    let duration = parseInt(info.videoDetails.lengthSeconds);
    let uploadDate = new Date(info.videoDetails.publishDate).toLocaleDateString();
    let views = info.videoDetails.viewCount;
    let minutes = Math.floor(duration / 60);
    let description = results.videos[0].description;
    let seconds = duration % 60;
    let durationText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
    function formatViews(views) {
  if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + 'M';
  } else if (views >= 1000) {
    return (views / 1000).toFixed(1) + 'K';
  } else {
    return views.toString();
  }
}

    let audio = ytdl(videoId, { quality: 'highestaudio' });
    let inputFilePath = 'tmp/' + title + '.webm';
    let outputFilePath = 'tmp/' + title + '.mp3';

    let viewsFormatted = formatViews(views);
    let infoText = `  ◦ *Duration*: ${durationText}
  ◦ *Upload*: ${uploadDate}
  ◦ *Views*: ${viewsFormatted}
  
YTdl By https://github.com/fent/node-ytdl-core
Search By https://github.com/talmobi/yt-search
Sent By Assistant ${global.info.namebot}`;

    /*var pesan = conn.relayMessage(m.chat, {
                extendedTextMessage:{
                text: infoText, 
                contextInfo: {
                     externalAdReply: {
                        title: "AUDIO SEDANG DI KIRIM",
                        body: `Youtube Play by Assisten ${global.info.namebot}`,
                        mediaType: 1,
                        previewType: 0,
                        renderLargerThumbnail: true,
                        thumbnailUrl: thumbnailUrl,
                        sourceUrl: "https://youtube.com"
                    }
                }, mentions: [m.sender]
}}, {});*/

/*await conn.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
        })*/
        	let msg = generateWAMessageFromContent(m.chat, {
  viewOnceMessage: {
    message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: infoText
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: global.wm
          }),
          header: proto.Message.InteractiveMessage.Header.create({
                ...(await prepareWAMessageMedia({ image : { url: thumbnailUrl}}, { upload: conn.waUploadToServer})), 
                  title: ``,
                  gifPlayback: true,
                  subtitle: 'yahh',
                  hasMediaAttachment: false  
                }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
              {
                "name": "quick_reply",
                "buttonParamsJson": `{"display_text":"AUDIO","id":".ytmp3 ${args[0]}"}`
              },
              {
                "name": "quick_reply",
                "buttonParamsJson": `{"display_text":"VIDEO","id":".ytmp4 ${args[0]}"}`
              }
           ],
          }),
          contextInfo: {
                  mentionedJid: [m.sender], 
                  forwardingScore: 999,
                  isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: global.info.channel,
                  newsletterName: global.info.namechannel,
                  serverMessageId: 143
                }
                }
        })
    }
  }
}, {})

await conn.relayMessage(m.chat, msg.message, {
  messageId: m.key.id
})

  } catch (e) {
    console.log(e);
    m.reply(`An error occurred while searching for the song: ${e.message}`);
  }
};

handler.help = ['youtube'].map(v => v + ' url');
handler.tags = ['downloader'];
handler.command = /^(yt|youtube)$/i;
handler.register = false
handler.premium = false;
handler.limit = true;

export default handler
