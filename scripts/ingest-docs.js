// Uso: coloca PDF/DOCX en ./documentos y ejecuta npm run ingest
// Importa texto a knowledge/documents.json como PENDIENTE_DE_VALIDACION.
// No publica automáticamente como fuente oficial: se requiere revisión humana.
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const dir = path.join(__dirname, "..", "documentos");
const out = path.join(__dirname, "..", "knowledge", "documents.json");
function chunks(text, size=1100, overlap=140) {
  const clean=String(text||"").replace(/\s+/g," ").trim(), arr=[];
  for(let i=0;i<clean.length;i+=size-overlap){const t=clean.slice(i,i+size).trim();if(t.length>80)arr.push({text:t,page:null,index:arr.length});}
  return arr;
}
(async()=>{
  if(!fs.existsSync(dir)){fs.mkdirSync(dir,{recursive:true});console.log("Crea ./documentos y coloca allí tus PDF/DOCX. No hay carpeta previa.");return;}
  const files=fs.readdirSync(dir).filter(f=>/\.(pdf|docx)$/i.test(f));
  let docs=fs.existsSync(out)?JSON.parse(fs.readFileSync(out,"utf8")):[];
  for(const file of files){
    const full=path.join(dir,file);let text="";
    if(/\.pdf$/i.test(file)) text=(await pdfParse(fs.readFileSync(full))).text||"";
    else text=(await mammoth.extractRawText({path:full})).value||"";
    if(text.trim().length<80){console.warn("Texto insuficiente; posible PDF escaneado:",file);continue;}
    docs.push({id:`import-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,title:file,category:"Por clasificar",version:"Pendiente de validación",status:"PENDIENTE_DE_VALIDACION",uploadedAt:new Date().toISOString(),chunks:chunks(text)});
    console.log("Importado para revisión:",file);
  }
  fs.writeFileSync(out,JSON.stringify(docs,null,2),"utf8");
  console.log("Importación terminada. Revisa cada documento y su vigencia antes de publicar.");
})().catch(e=>{console.error(e);process.exit(1)});
