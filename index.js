import { spawn } from 'child_process';
import _0x51778d from 'path';
import 'console';
import 'util';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const sleep = _0x1be527 => {
  return new Promise(_0x3b5847 => setTimeout(_0x3b5847, _0x1be527));
};
import _0xe6951a from 'cfonts';
import _0x5cb723 from 'chalk';
console.clear();
const __dirname = dirname(fileURLToPath(import.meta.url));
const start = async () => {
  const _0x5985d7 = [_0x51778d.join(__dirname, "main.js"), ...process.argv.slice(0x2)];
  const _0x1d8993 = spawn(process.argv[0x0], _0x5985d7, {
    'stdio': ["inherit", 'inherit', "inherit", "ipc"]
  });
  _0x1d8993.on("exit", _0x2f4bf9 => {
    console.error("❎ Exited with code:", _0x2f4bf9);
    if (_0x2f4bf9 === '.' || _0x2f4bf9 === 0x1 || _0x2f4bf9 === 0x0) {
      start();
    }
  });
};
await sleep(0x7d0);
_0xe6951a.say("\n\nAssisten-YuLa Bot\n", {
  'font': 'tiny',
  'align': 'center',
  'gradient': ["red", "blue"]
});
_0xe6951a.say("Simple Whatsapp Bot Use QR Code & Pairing Code\nWith Baileys Library\n\nInstagram: https://instagram.com/maximusstore.id\nFacebook: https://facebook.com/maximusstoreindonesia\nWhatsApp: wa.me/6281283516246\n\n", {
  'font': "console",
  'align': "center",
  'colors': ['blue']
});
console.log(_0x5cb723.bold.green("\nTerima kasih telah menggunakan sc ini."));
start();
