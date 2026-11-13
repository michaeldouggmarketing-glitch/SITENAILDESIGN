// Generate explicit HTML entries for all institutional routes.
// Vercel static clean URLs need real entries even though the frontend uses history navigation.
const fs=require('node:fs');
const path=require('node:path');
const root=__dirname;
const dest=path.join(root,'dist');
const routes=['experiencias','maos-e-gel','pes','sobrancelhas','portfolio','sobre','agendar'];
fs.rmSync(dest,{recursive:true,force:true});
fs.mkdirSync(dest,{recursive:true});
for(const filename of ['index.html','styles.css','recovery.css','content.js','motion.js','recovery.js']){
 fs.copyFileSync(path.join(root,filename),path.join(dest,filename));
}
for(const route of routes){
 const directory=path.join(dest,route);
 fs.mkdirSync(directory,{recursive:true});
 fs.copyFileSync(path.join(dest,'index.html'),path.join(directory,'index.html'));
}
console.log('Maíra Cinematic: '+routes.length+' routes and image-safe assets prepared.');
