process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import './config.js';
import { createRequire } from 'module';
import _0x6ac9ca, { join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { platform } from 'process';
global.__filename = function filename(_0xca8036 = import.meta.url, _0x1b02cd = platform !== "win32") {
  return _0x1b02cd ? /file:\/\/\//.test(_0xca8036) ? fileURLToPath(_0xca8036) : _0xca8036 : pathToFileURL(_0xca8036).toString();
};
global.__dirname = function dirname(_0x50ab49) {
  return _0x6ac9ca.dirname(global.__filename(_0x50ab49, true));
};
global.__require = function require(_0x14d8a3 = import.meta.url) {
  return createRequire(_0x14d8a3);
};
import 'ws';
import { readdirSync, existsSync, readFileSync, watch } from 'fs';
import _0x3ea7ac from 'yargs';
import { spawn } from 'child_process';
import _0x429100 from 'lodash';
import 'console';
import _0x1cc464 from 'cfonts';
import _0x53b2f1 from 'syntax-error';
import 'os';
import _0x3c5c92 from 'chalk';
import { format } from 'util';
import { makeWASocket, protoType, serialize } from './lib/simple.js';
import { Low, JSONFile } from 'lowdb';
import _0xe493e9 from 'pino';
import { mongoDB, mongoDBV2 } from './lib/mongoDB.js';
const {
  makeCacheableSignalKeyStore,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  PHONENUMBER_MCC
} = await import("@adiwajshing/baileys");
const {
  chain
} = _0x429100;
const PORT = process.env.PORT || process.env.SERVER_PORT || 0xbb8;
protoType();
serialize();
global.API = (_0x464496, _0x3d6716 = '/', _0x4e96c5 = {}, _0x2194d1) => (_0x464496 in global.APIs ? global.APIs[_0x464496] : _0x464496) + _0x3d6716 + (_0x4e96c5 || _0x2194d1 ? '?' + new URLSearchParams(Object.entries({
  ..._0x4e96c5,
  ...(_0x2194d1 ? {
    [_0x2194d1]: global.APIKeys[_0x464496 in global.APIs ? global.APIs[_0x464496] : _0x464496]
  } : {})
})) : '');
global.timestamp = {
  'start': new Date()
};
const __dirname = global.__dirname(import.meta.url);
global.opts = new Object(_0x3ea7ac(process.argv.slice(0x2)).exitProcess(false).parse());
global.prefix = new RegExp('^[' + (opts.prefix || "â€ŽxzXZ/i!#$%+Â£Â¢â‚¬Â¥^Â°=Â¶âˆ†Ã—Ã·Ï€âˆšâœ“Â©Â�?:;?&.\\-").replace(/[|\\{}()[\]^$+*?.\-\^]/g, "\\$&") + ']');
global.db = new Low(/https?:\/\//.test(opts.db || '') ? new cloudDBAdapter(opts.db) : /mongodb(\+srv)?:\/\//i.test(opts.db) ? opts.mongodbv2 ? new mongoDBV2(opts.db) : new mongoDB(opts.db) : new JSONFile((opts._[0x0] ? opts._[0x0] + '_' : '') + 'database.json'));
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) {
    return new Promise(_0x2a2530 => setInterval(async function () {
      if (!global.db.READ) {
        clearInterval(this);
        _0x2a2530(global.db.data == null ? global.loadDatabase() : global.db.data);
      }
    }, 1000));
  }
  if (global.db.data !== null) {
    return;
  }
  global.db.READ = true;
  await global.db.read()['catch'](console.error);
  global.db.READ = null;
  global.db.data = {
    'users': {},
    'chats': {},
    'stats': {},
    'msgs': {},
    'banned': {},
    'sticker': {},
    'settings': {},
    ...(global.db.data || {})
  };
  global.db.chain = chain(global.db.data);
};
loadDatabase();
global.authFile = '' + (opts._[0x0] || 'sessions');
console.log("Load AuthFile from " + authFile);
const {
  state,
  saveCreds
} = await useMultiFileAuthState(global.authFile);
const {
  version,
  isLatest
} = await fetchLatestBaileysVersion();
console.log("using WA v" + version.join('.') + ", isLatest: " + isLatest);
const pairingCode = process.argv.includes("--pairing");
const connectionOptions = {
  'version': version,
  'logger': _0xe493e9({
    'level': 'silent'
  }),
  'printQRInTerminal': !pairingCode,
  'browser': ["Ubuntu", "Chrome", "20.0.04"],
  'auth': {
    'creds': state.creds,
    'keys': makeCacheableSignalKeyStore(state.keys, _0xe493e9().child({
      'level': "silent",
      'stream': "store"
    }))
  }
};
global.conn = makeWASocket(connectionOptions);
conn.isInit = false;
if (!opts.test) {
  setInterval(async () => {
    if (global.db.data) {
      await global.db.write()["catch"](console.error);
    }
  }, 60000);
}
if (opts.server) {
  (await import("./server.js"))["default"](global.conn, PORT);
}
async function connectionUpdate(_0x521115) {
  const {
    receivedPendingNotifications: _0x2fe7ab,
    connection: _0x3f7bad,
    lastDisconnect: _0x5935a8,
    isOnline: _0x403474,
    isNewLogin: _0x52388f
  } = _0x521115;
  if (_0x52388f) {
    conn.isInit = true;
  }
  if (_0x3f7bad == "connecting") {
    console.log(_0x3c5c92.redBright("Mengaktifkan Bot, Mohon tunggu sebentar..."));
  }
  if (_0x3f7bad == "open") {
    console.log(_0x3c5c92.green("Tersambung"));
  }
  if (_0x403474 == true) {
    console.log(_0x3c5c92.green("Status Aktif"));
  }
  if (_0x403474 == false) {
    console.log(_0x3c5c92.red("Status Mati"));
  }
  if (_0x2fe7ab) {
    console.log(_0x3c5c92.yellow("Menunggu Pesan Baru"));
  }
  if (_0x3f7bad == "close") {
    console.log(_0x3c5c92.red("koneksi terputus & mencoba menyambung ulang..."));
  }
  global.timestamp.connect = new Date();
  if (_0x5935a8 && _0x5935a8.error && _0x5935a8.error.output && _0x5935a8.error.output.statusCode !== DisconnectReason.loggedOut) {
    console.log(_0x3c5c92.red("Connecting..."));
    await global.reloadHandler(true);
  }
  if (global.db.data == null) {
    await global.loadDatabase();
  }
}
process.on("uncaughtException", console.error);
let isInit = true;
let handler = await import("./handler.js");
global.reloadHandler = async function (_0x16d2ff) {
  try {
    const _0x6e776 = await import("./handler.js?update=" + Date.now())["catch"](console.error);
    if (Object.keys(_0x6e776 || {}).length) {
      handler = _0x6e776;
    }
  } catch (_0x101fa9) {
    console.error(_0x101fa9);
  }
  if (_0x16d2ff) {
    const _0x326e7f = global.conn.chats;
    try {
      global.conn.ws.close();
    } catch {}
    conn.ev.removeAllListeners();
    global.conn = makeWASocket(connectionOptions, {
      'chats': _0x326e7f
    });
    isInit = true;
  }
  if (!isInit) {
    conn.ev.off('messages.upsert', conn.handler);
    conn.ev.off("group-participants.update", conn.participantsUpdate);
    conn.ev.off("groups.update", conn.groupsUpdate);
    conn.ev.off("message.delete", conn.onDelete);
    conn.ev.off('connection.update', conn.connectionUpdate);
    conn.ev.off("creds.update", conn.credsUpdate);
  }
  conn.welcome = "*@user*\n*𝚑𝚊𝚜 𝚓𝚘𝚒𝚗𝚎𝚍 𝚝𝚑𝚎 𝚐𝚛𝚘𝚞𝚙*\n\n𝙱𝚎𝚏𝚘𝚛𝚎 𝚝𝚑𝚊𝚝, 𝚍𝚘𝚗𝚝 𝚏𝚘𝚛𝚐𝚎𝚝 𝚝𝚘 𝚛𝚎𝚊𝚍 𝚝𝚑𝚎 𝚐𝚛𝚘𝚞𝚙 𝚛𝚞𝚕𝚎𝚜";
  conn.bye = "*@user* *𝚑𝚊𝚜 𝚕𝚎𝚏𝚝 𝚝𝚑𝚎 𝚐𝚛𝚘𝚞𝚙*";
  conn.spromote = "@user sekarang admin!";
  conn.sdemote = "@user sekarang bukan admin!";
  conn.sDesc = "Deskripsi telah diubah ke \n@desc";
  conn.sSubject = "Judul grup telah diubah ke \n@subject";
  conn.sIcon = "Icon grup telah diubah!";
  conn.sRevoke = "Link group telah diubah ke \n@revoke";
  conn.handler = handler.handler.bind(global.conn);
  conn.participantsUpdate = handler.participantsUpdate.bind(global.conn);
  conn.groupsUpdate = handler.groupsUpdate.bind(global.conn);
  conn.onDelete = handler.deleteUpdate.bind(global.conn);
  conn.connectionUpdate = connectionUpdate.bind(global.conn);
  conn.credsUpdate = saveCreds.bind(global.conn);
  conn.ev.on("messages.upsert", conn.handler);
  conn.ev.on('group-participants.update', conn.participantsUpdate);
  conn.ev.on("groups.update", conn.groupsUpdate);
  conn.ev.on("message.delete", conn.onDelete);
  conn.ev.on("connection.update", conn.connectionUpdate);
  conn.ev.on("creds.update", conn.credsUpdate);
  isInit = false;
  return true;
};
const pluginFolder = global.__dirname(join(__dirname, "./plugins/index"));
const pluginFilter = _0x5eadda => /\.js$/.test(_0x5eadda);
global.plugins = {};
async function filesInit() {
  for (let _0x55b6ce of readdirSync(pluginFolder).filter(pluginFilter)) {
    try {
      let _0x35ae55 = global.__filename(join(pluginFolder, _0x55b6ce));
      const _0xa5ef84 = await import(_0x35ae55);
      global.plugins[_0x55b6ce] = _0xa5ef84['default'] || _0xa5ef84;
    } catch (_0x45343a) {
      conn.logger.error(_0x45343a);
      delete global.plugins[_0x55b6ce];
    }
  }
}
filesInit().then(_0x2defbb => console.log(Object.keys(global.plugins)))['catch'](console.error);
global.reload = async (_0x3c3a3a, _0x3ce7ca) => {
  if (/\.js$/.test(_0x3ce7ca)) {
    let _0x174331 = global.__filename(join(pluginFolder, _0x3ce7ca), true);
    if (_0x3ce7ca in global.plugins) {
      if (existsSync(_0x174331)) {
        conn.logger.info("re - require plugin '" + _0x3ce7ca + "'");
      } else {
        conn.logger.warn("deleted plugin '" + _0x3ce7ca + "'");
        return delete global.plugins[_0x3ce7ca];
      }
    } else {
      conn.logger.info("requiring new plugin '" + _0x3ce7ca + "'");
    }
    let _0x57a549 = _0x53b2f1(readFileSync(_0x174331), _0x3ce7ca, {
      'sourceType': "module",
      'allowAwaitOutsideFunction': true
    });
    if (_0x57a549) {
      conn.logger.error("syntax error while loading '" + _0x3ce7ca + "'\n" + format(_0x57a549));
    } else {
      try {
        const _0x4c5dda = await import(global.__filename(_0x174331) + "?update=" + Date.now());
        global.plugins[_0x3ce7ca] = _0x4c5dda["default"] || _0x4c5dda;
      } catch (_0x4cd2ee) {
        conn.logger.error("error require plugin '" + _0x3ce7ca + "\n" + format(_0x4cd2ee) + "'");
      } finally {
        global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([_0x20a07a], [_0x53e605]) => _0x20a07a.localeCompare(_0x53e605)));
      }
    }
  }
};
Object.freeze(global.reload);
watch(pluginFolder, global.reload);
await global.reloadHandler();
async function _quickTest() {
  let _0xb944c0 = await Promise.all([spawn("ffmpeg"), spawn('ffprobe'), spawn("ffmpeg", ["-hide_banner", "-loglevel", "error", "-filter_complex", "color", "-frames:v", '1', '-f', "webp", '-']), spawn('convert'), spawn("magick"), spawn('gm'), spawn("find", ["--version"])].map(_0x3e6c4b => {
    return Promise.race([new Promise(_0x1e414b => {
      _0x3e6c4b.on("close", _0x1b9db7 => {
        _0x1e414b(_0x1b9db7 !== 0x7f);
      });
    }), new Promise(_0x3d97f6 => {
      _0x3e6c4b.on("error", _0x5111b1 => _0x3d97f6(false));
    })]);
  }));
  let [_0x54bde6, _0x25c741, _0x266554, _0x57031a, _0x287f31, _0x56b82e, _0x1e8810] = _0xb944c0;
  console.log(_0xb944c0);
  let _0xd1ccfa = global.support = {
    'ffmpeg': _0x54bde6,
    'ffprobe': _0x25c741,
    'ffmpegWebp': _0x266554,
    'convert': _0x57031a,
    'magick': _0x287f31,
    'gm': _0x56b82e,
    'find': _0x1e8810
  };
  Object.freeze(global.support);
  if (!_0xd1ccfa.ffmpeg) {
    conn.logger.warn("Please install ffmpeg for sending videos (pkg install ffmpeg)");
  }
  if (_0xd1ccfa.ffmpeg && !_0xd1ccfa.ffmpegWebp) {
    conn.logger.warn("Stickers may not animated without libwebp on ffmpeg (--enable-ibwebp while compiling ffmpeg)");
  }
  if (!_0xd1ccfa.convert && !_0xd1ccfa.magick && !_0xd1ccfa.gm) {
    conn.logger.warn("Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)");
  }
}
_quickTest().then(() => conn.logger.info("☑️ Quick Test Done"))["catch"](console.error);
import _0x59b1bb from 'readline';
const sleep = _0x4f3027 => {
  return new Promise(_0x342503 => setTimeout(_0x342503, _0x4f3027));
};
const rl = _0x59b1bb.createInterface({
  'input': process.stdin,
  'output': process.stdout
});
const question = _0xb62a35 => new Promise(_0xe97dc7 => rl.question(_0xb62a35, _0xe97dc7));
if (pairingCode && !conn.authState.creds.registered) {
  await sleep(0x1b58);
  console.clear();
  _0x1cc464.say("\nPAIRING CODE\n", {
    'font': "tiny",
    'align': "left",
    'gradient': ["red", "blue"]
  });
  console.log(_0x3c5c92.bold.white("━━━━━━━━━━━ https://github.com/XM4ZE ━━━━━━━━━━━"));
  console.log(_0x3c5c92.bold.green("\n\nMasukan nomor kamu :"));
  let phoneNumber = await question(_0x3c5c92.bgBlack(_0x3c5c92.greenBright("> ")));
  phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
  if (!Object.keys(PHONENUMBER_MCC).some(_0x5d2ed4 => phoneNumber.startsWith(_0x5d2ed4))) {
    console.log(_0x3c5c92.bold.red("MASUKAN NOMORMU DENGAN BENAR AWALI DENGAN 62 !!!"));
    console.log(_0x3c5c92.bold.green("\nMasukan nomor :"));
    phoneNumber = await question(_0x3c5c92.bgBlack(_0x3c5c92.greenBright('>')));
    phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
  }
  let code = await conn.requestPairingCode(phoneNumber);
  code = code?.["match"](/.{1,4}/g)?.["join"]('-') || code;
  console.log(_0x3c5c92.bold.green("Kode tautan kamu : "), _0x3c5c92.bold.yellow(code));
  rl.close();
}
