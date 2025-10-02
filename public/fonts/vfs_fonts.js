import pdfMake from "pdfmake/build/pdfmake";
import { vfs } from "./vfs_fonts"; // подключаешь VFS

// Подключаешь виртуальную файловую систему
pdfMake.vfs = vfs;

// Регистрируешь шрифты
pdfMake.fonts = {
  TimesNewRoman: {
    normal: "Times-New-Roman.ttf",
    bold: "Times-New-Roman-Bold.ttf",
    italics: "Times-New-Roman-Italic.ttf",
    bolditalics: "Times-New-Roman-Bold-Italic.ttf",
  },
};