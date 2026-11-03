import {mkdir,cp,writeFile,rm} from 'node:fs/promises';
import {join} from 'node:path';
const base=process.cwd(),out=join(base,'dist');
await rm(out,{recursive:true,force:true});await mkdir(out,{recursive:true});
for(const file of ['index.html','styles.css','app.js','site-data.js']) await cp(join(base,file),join(out,file));
for(const p of ['experiencias','maos-e-gel','pes','sobrancelhas','portfolio','sobre','agendar']){await mkdir(join(out,p),{recursive:true});await cp(join(base,'index.html'),join(out,p,'index.html'));}
await cp(join(base,'public'),out,{recursive:true});
console.log('Built 8 routes into dist/');