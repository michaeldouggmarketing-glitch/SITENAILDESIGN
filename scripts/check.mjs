import {readFile} from 'node:fs/promises';
const index=await readFile('index.html','utf8'),app=await readFile('app.js','utf8'),css=await readFile('styles.css','utf8');
let failures=[];for(const p of ['experiencias','maos-e-gel','pes','sobrancelhas','portfolio','sobre','agendar'])if(!app.includes(`/${p}`))failures.push(p);
if(/5511999998888|instagram.com\/instagram|lorem ipsum|href="#"/.test(app+index))failures.push('placeholder link');
if(!css.includes('prefers-reduced-motion'))failures.push('reduced motion');
if(failures.length){console.error(failures);process.exitCode=1}else console.log('Static validations passed: 8 routes, no fake contact, reduced motion');