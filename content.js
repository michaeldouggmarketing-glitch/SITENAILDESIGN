const ASSET='https://maira-beauty-atelier.vercel.app';
const A={
 hero:ASSET+'/assets/hero-C9J-03Tv.jpg',artist:ASSET+'/assets/artist-CMjrWSLo.jpg',space:ASSET+'/assets/space-q4V5CjOp.jpg',video:ASSET+'/media/espaco-levie-manicure.mp4',
 hands:ASSET+'/assets/portal-maos-BdMunZVi.jpg',h1:ASSET+'/assets/maos-1-BPlefsa7.jpg',h2:ASSET+'/assets/maos-2-Bg4ddySz.jpg',h3:ASSET+'/assets/maos-3-CTRtgBhC.jpg',h4:ASSET+'/assets/maos-4-rfh21_iL.jpg',
 feet:ASSET+'/assets/pes-1-Bug6h5o2.jpg',f2:ASSET+'/assets/pes-2-BWfWjU7E.jpg',f3:ASSET+'/assets/pes-3-C8znuF3B.jpg',
 brows:ASSET+'/assets/portal-sobrancelhas-BuZcoaty.jpg',b1:ASSET+'/assets/sobrancelhas-1-Beq9oMk4.jpg',b2:ASSET+'/assets/sobrancelhas-2-SxVcyiSm.jpg',b3:ASSET+'/assets/sobrancelhas-3-D6BRe2ZH.jpg',b4:ASSET+'/assets/sobrancelhas-4-BNWTVAgv.jpg',lacquer:ASSET+'/assets/lacquer-DEZgZfRO.jpg'
};
const WA='https://wa.me/5511999998888';
const app=document.querySelector('#app');
function horizontalRail(items,label='Trabalhos selecionados'){
  return `<section class="rail-section grain">
    <div class="shell rail-head">
      <div><div class="eyebrow" style="color:var(--champ)">${label}</div><h2 class="display">DETALHES QUE CONTAM HISTÓRIAS.</h2></div>
      <div class="rail-tools"><span class="rail-hint">Arraste para o lado →</span><button class="rail-btn prev" type="button" aria-label="Anterior">←</button><button class="rail-btn next" type="button" aria-label="Próximo">→</button></div>
    </div>
    <div class="rail-shell">
      <div class="rail" tabindex="0">
        ${items.map((x,i)=>`<figure class="work" data-rail-item>
          <img src="${x[0]}" alt="${x[2]||'Trabalho '+(i+1)}">
          <figcaption class="work-cap"><span class="eyebrow">${x[1]||label}</span><h3>${x[2]||'Detalhe autoral'}</h3></figcaption>
        </figure>`).join('')}
      </div>
    </div>
  </section>`;
}
const home=()=>`<section class="hero grain" data-scene="0"><div class="hero-pin"><div class="ambient"><i></i><i></i><i></i></div><div class="hero-media"><img class="hero-poster" src="${A.hero}" alt="Composição editorial de beleza"><video class="hero-video" src="${A.video}" poster="${A.hero}" muted playsinline autoplay loop></video></div><div class="hero-shade"></div><div class="lacquer-orb"></div><div class="shell hero-copy"><div class="hero-copy-inner"><div class="eyebrow">Maíra Beauty Atelier • mãos • pés • sobrancelhas</div><h1 class="display"><span class="hero-line"><span>BELEZA</span></span><span class="hero-line"><span>DESENHADA EM</span></span><span class="hero-line"><span>CADA DETALHE.</span></span></h1><p class="hero-sub">Uma experiência de cuidado onde técnica, presença e acabamento se encontram. O site acompanha o gesto — e não apenas mostra o resultado.</p><div class="hero-actions"><a class="btn primary" href="/agendar">Agendar meu horário</a><a class="btn" href="/portfolio">Ver portfólio</a></div></div></div><div class="cinema-cut" aria-hidden="true"></div><div class="scroll-mark">Deslize para continuar ↓</div></div></section>
<section class="kinetic-strip" aria-hidden="true"><div class="kinetic-track"><span>BELEZA EM MOVIMENTO • LACA • PÉROLA • PRECISÃO • </span><span>BELEZA EM MOVIMENTO • LACA • PÉROLA • PRECISÃO • </span></div></section>
<section class="manifest grain" data-scene="1"><div class="microtag">ATELIER</div><div class="shell manifest-grid"><div><div class="eyebrow" style="color:var(--ox)">Manifesto</div><h2 class="display">NÃO É SÓ ESTÉTICA.<br>É PRESENÇA.</h2><p>Cada detalhe comunica. A proposta não é criar um personagem, mas revelar forma, proporção e acabamento de um jeito que ainda parece seu.</p><a class="btn" style="color:var(--ink);border-color:rgba(120,30,58,.24)" href="/sobre">Conhecer a filosofia</a></div><div class="portrait-stack"><figure class="portrait-a"><img src="${A.artist}" alt="Retrato editorial da profissional"></figure><figure class="portrait-b"><img src="${A.b3}" alt="Olhar e sobrancelhas em enquadramento editorial"></figure></div></div></section>
<section class="universes" data-scene="2"><div class="universes-pin"><div class="u-head"><div><div class="eyebrow" style="color:var(--ox)">Três matérias</div><h2 class="display">LACA. PÉROLA.<br>PRECISÃO.</h2></div><p>Três universos. Uma assinatura. Cada capítulo muda de matéria sem quebrar a mesma experiência.</p></div><div class="panel-wrap"><article class="universe-card u1"><video src="${A.video}" muted playsinline autoplay loop></video><div class="u-overlay"></div><div class="u-copy"><span class="num">01 • LACA</span><h3>MÃOS & GEL</h3><p>Forma, cor e acabamento ganham profundidade. O brilho deixa de ser detalhe e vira matéria.</p><a class="btn" href="/maos-e-gel">Entrar no capítulo</a></div></article><article class="universe-card u2"><img src="${A.feet}" alt="Cuidado para os pés"><div class="u-overlay"></div><div class="u-copy"><span class="num">02 • PÉROLA</span><h3>PÉS</h3><p>Luz, água e leveza. O movimento desacelera e abre espaço para o cuidado.</p><a class="btn" href="/pes">Entrar no capítulo</a></div></article><article class="universe-card u3"><img src="${A.brows}" alt="Design de sobrancelhas"><div class="u-overlay"></div><div class="u-copy"><span class="num">03 • PRECISÃO</span><h3>SOBRANCELHAS</h3><p>Linha, proporção e expressão. A matéria se afina até virar desenho.</p><a class="btn" href="/sobrancelhas">Entrar no capítulo</a></div></article></div></div></section>
<section class="cinema-interlude grain" data-scene="3"><div class="cinema-pin"><video class="cinema-video" src="${A.video}" poster="${A.hands}" muted playsinline autoplay loop></video><div class="cinema-shade"></div><div class="cinema-beats shell"><div class="cinema-kicker eyebrow">A experiência continua</div><div class="cinema-beat beat-1 display">A MATÉRIA MUDA.</div><div class="cinema-beat beat-2 display">A ASSINATURA NÃO.</div><p class="cinema-note">O movimento da câmera, a luz e o scroll passam a dirigir a página como uma única cena.</p></div></div></section>
<section class="chapter dark grain" data-scene="3" data-word="LACA"><div class="lacquer-sheet"></div><div class="chapter-inner"><div class="copy"><div class="eyebrow chapter-label">Mãos & Gel • laca em movimento</div><h2 class="display">COR QUE<br>GANHA<br>PRESENÇA.</h2><p>Do desenho da forma ao brilho final: estrutura leve, pigmento profundo e acabamento que pede um segundo olhar.</p><a class="btn primary" href="/maos-e-gel">Explorar Mãos & Gel</a></div><div class="chapter-media hands-media"><div class="frame main"><video src="${A.video}" muted autoplay loop playsinline></video></div><div class="frame small"><img src="${A.h4}" alt="Nail design em detalhe"></div><div class="frame tiny"><img src="${A.lacquer}" alt="Textura borgonha"></div></div></div></section>
<section class="chapter light grain" data-scene="4" data-word="PÉROLA"><div class="water"></div><div class="chapter-inner"><div class="copy"><div class="eyebrow" style="color:var(--ox)">Pés • pérola e leveza</div><h2 class="display">O RITMO<br>MUDA.</h2><p>Um momento de cuidado que desacelera a narrativa. Superfícies claras, reflexos de água e acabamento limpo fazem a experiência respirar.</p><a class="btn" style="color:var(--ink)" href="/pes">Explorar cuidados para os pés</a></div><div class="chapter-media feet-media"><div class="frame main"><img src="${A.feet}" alt="Pedicure editorial"></div><div class="frame small"><img src="${A.f2}" alt="Acabamento das unhas dos pés"></div><div class="frame tiny"><img src="${A.f3}" alt="Materiais de cuidado"></div></div></div></section>
<section class="chapter dark grain" data-scene="5" data-word="PRECISÃO"><div class="chapter-inner"><div class="copy"><div class="eyebrow chapter-label">Sobrancelhas • precisão</div><h2 class="display">O TRAÇO<br>MUDA TODO<br>O OLHAR.</h2><p>A linha que atravessou a experiência vira mapeamento: início, arco e final. Naturalidade primeiro; precisão em cada decisão.</p><a class="btn primary" href="/sobrancelhas">Descobrir o design</a></div><div class="chapter-media brow-media"><div class="frame main"><img src="${A.b2}" alt="Sobrancelha em macro"></div><div class="frame small"><img src="${A.b4}" alt="Finalização do design"></div><div class="frame tiny"><img src="${A.b1}" alt="Mapeamento da sobrancelha"></div><svg class="precision-svg" viewBox="0 0 700 700"><path pathLength="1" d="M80 470 C 180 310, 320 250, 610 335"/><path pathLength="1" d="M120 520 C 260 390, 430 370, 640 430"/></svg></div></div></section>
${horizontalRail([[A.h1,'Mãos & Gel','Borgonha espelhado'],[A.b1,'Sobrancelhas','Mapeamento do arco'],[A.f2,'Pés','Precisão no contorno'],[A.h3,'Mãos & Gel','Nude champagne'],[A.b3,'Sobrancelhas','Expressão equilibrada'],[A.f3,'Pés','O gesto do cuidado']],'Portfólio selecionado')}
<section class="kinetic-strip kinetic-strip-dark" aria-hidden="true"><div class="kinetic-track reverse"><span>DETALHE • RITMO • PRESENÇA • ACABAMENTO • </span><span>DETALHE • RITMO • PRESENÇA • ACABAMENTO • </span></div></section>
<section class="artist grain" data-scene="5"><div class="shell artist-grid"><div class="artist-photo"><img src="${A.artist}" alt="Retrato editorial da profissional"><div class="signature">Maíra</div></div><div><div class="eyebrow" style="color:var(--ox)">A artista por trás dos detalhes</div><h2 class="display">TÉCNICA,<br>INTENÇÃO<br>E ARTE.</h2><p>Cada atendimento começa com observação e escuta. Referências, rotina e estilo pessoal orientam a experiência — do primeiro traço ao acabamento.</p><a class="btn" style="color:var(--ink)" href="/sobre">Conhecer a profissional</a></div></div></section>
<section class="proof grain"><div class="shell"><small>Prova social</small><div class="quote">“RESULTADO QUE SE PERCEBE.<br>CUIDADO QUE SE SENTE.”</div><p class="note">Esta área deve receber somente depoimentos reais autorizados. O layout já está preparado para foto, áudio curto e relato verificável — sem inventar prova social.</p></div></section>
<section class="ritual" data-scene="5"><div class="shell ritual-grid"><div><div class="eyebrow" style="color:var(--ox)">Monte seu ritual</div><h2 class="display">VOCÊ PASSOU<br>PELOS TRÊS<br>UNIVERSOS.</h2><p>Agora transforme a experiência em escolha. Combine os capítulos que fazem sentido e leve tudo pronto para a conversa no WhatsApp.</p></div><div class="ritual-card"><div class="choice-grid"><button class="choice" data-choice="Mãos & Gel"><i class="dot"></i><div><b>Mãos & Gel</b><span>Forma, cor, gel e nail design.</span></div></button><button class="choice" data-choice="Pés"><i class="dot"></i><div><b>Pés</b><span>Cuidado, esmaltação e acabamento.</span></div></button><button class="choice" data-choice="Sobrancelhas"><i class="dot"></i><div><b>Sobrancelhas</b><span>Mapeamento, desenho e finalização.</span></div></button></div><div class="summary">Seu ritual: <strong id="ritualText">nenhum universo selecionado ainda.</strong></div><a id="ritualWa" class="btn primary" style="margin-top:18px;width:100%" href="${WA}?text=Olá! Vim pelo site e gostaria de montar meu ritual." target="_blank" rel="noopener">Montar meu agendamento</a></div></div></section>
<section class="final grain"><div class="final-bg"></div><div class="shell final-inner"><div class="eyebrow" style="color:var(--champ)">Seu momento</div><h2 class="display">SEU PRÓXIMO DETALHE INESQUECÍVEL COMEÇA AQUI.</h2><a class="btn primary" href="${WA}?text=Olá! Vim pelo site e gostaria de consultar os horários disponíveis." target="_blank" rel="noopener">Agendar meu horário</a></div></section>${footer()}`;
function footer(){return `<footer class="footer"><div class="shell footer-grid"><div><a class="brand" href="/"><strong>MAÍRA</strong><span>Beauty Atelier</span></a><p style="max-width:340px;margin-top:22px">Mãos, pés e sobrancelhas em uma experiência de cuidado criada para realçar o que há de mais único em você.</p></div><div><h4>Navegação</h4><p><a href="/experiencias">Experiências</a><br><a href="/portfolio">Portfólio</a><br><a href="/sobre">Sobre</a><br><a href="/agendar">Agendar</a></p></div><div><h4>Contato</h4><p>(11) 99999-8888<br>@mairabeautyatelier<br>Rua das Orquídeas, 128 — São Paulo</p></div></div><div class="shell legal">© 2026 Maíra Beauty Atelier • Direção digital cinematográfica CVD</div></footer>`}
const routes={
 '/experiencias':{ey:'Experiências',title:'TRÊS UNIVERSOS. UMA SÓ EXPERIÊNCIA.',support:'Mãos, pés e sobrancelhas não aparecem como serviços soltos. Cada cuidado tem sua própria sensação e intenção — e todos carregam a mesma atenção aos detalhes.',img:A.hero,head:'LACA. PÉROLA. PRECISÃO.',text:'O mesmo código visual muda de matéria conforme o serviço. Isso torna cada experiência reconhecível sem quebrar a unidade da marca.',services:[['Mãos & Gel','Forma, cor e acabamento que expressam seu estilo.'],['Pés','Cuidado, leveza e beleza em cada passo.'],['Sobrancelhas','Harmonia e precisão para transformar o olhar.'],['Método','Consulta, criação, cuidado e finalização.']],gallery:[A.hands,A.feet,A.brows,A.lacquer]},
 '/maos-e-gel':{ey:'Mãos & Gel • forma, cor e brilho',title:'UNHAS QUE VESTEM A SUA PRESENÇA.',support:'Do desenho da forma ao brilho final: estrutura leve, cor precisa e acabamento que permanece impecável no dia a dia.',img:A.hands,head:'FORMA, COR E ACABAMENTO.',text:'Escolha um serviço específico ou comece por uma conversa. Cada opção abre o WhatsApp já com contexto.',services:[['Alongamento em Gel','Estrutura personalizada, leve e elegante.'],['Banho de Gel','Resistência com aparência natural.'],['Esmaltação em Gel','Cor e brilho com acabamento uniforme.'],['Nail Design','Composição de formato, cor e detalhes.']],gallery:[A.h1,A.h2,A.h3,A.h4]},
 '/pes':{ey:'Pés • cuidado e leveza',title:'CUIDADO QUE COMEÇA PELA BASE.',support:'Um ritual de cuidado para trazer leveza, acabamento e bem-estar a cada passo.',img:A.feet,head:'LEVEZA, ACABAMENTO E CUIDADO.',text:'O capítulo mais claro da experiência: ritmo mais calmo, superfícies peroladas e atenção ao detalhe.',services:[['Unhas dos Pés / Pedicure','Cuidado e acabamento personalizado.'],['Esmaltação dos Pés','Cor, precisão e finalização.'],['Cuidados para os Pés','Rotina de cuidado combinada durante o atendimento.'],['Orientação','Cuidados simples para prolongar o resultado.']],gallery:[A.feet,A.f2,A.f3,A.hero]},
 '/sobrancelhas':{ey:'Sobrancelhas • desenho e expressão',title:'O TRAÇO QUE MUDA TODO O OLHAR.',support:'Um desenho personalizado que respeita sua naturalidade, equilibra proporções e revela sua expressão.',img:A.brows,head:'LEITURA. MAPEAMENTO. DESENHO. FINALIZAÇÃO.',text:'A linha deixa de ser decoração e vira linguagem: início, arco, final e expressão conectados em uma única decisão visual.',services:[['Leitura do rosto','Observamos proporção, expressão e crescimento natural.'],['Mapeamento','Pontos de início, arco e final desenhados junto com você.'],['Design','Execução precisa respeitando a densidade natural.'],['Finalização','Ajuste fino e orientações de manutenção.']],gallery:[A.b1,A.b2,A.b3,A.b4]},
 '/portfolio':{ey:'Portfólio',title:'RESULTADOS REAIS. BELEZA AUTORAL.',support:'Uma galeria editorial organizada por universo. A versão final deve usar trabalhos reais autorizados da profissional.',img:A.h1,head:'DETALHES QUE CONTAM HISTÓRIAS.',text:'Aproxime, compare referências e envie o resultado que mais combina com você.',services:[['Mãos & Gel','Forma, cor, estrutura e acabamento.'],['Pés','Cuidado estético e finalização.'],['Sobrancelhas','Naturalidade, proporção e expressão.'],['Referências','Envie uma imagem e alinhe expectativas antes do atendimento.']],gallery:[A.h1,A.b1,A.f2,A.h3,A.b3,A.f3,A.h4,A.b4]},
 '/sobre':{ey:'Sobre a profissional',title:'BELEZA COM INTENÇÃO. DETALHE COM ASSINATURA.',support:'Cada atendimento começa com observação e escuta. Referências, rotina e preferências orientam um trabalho que une técnica, sensibilidade e acabamento.',img:A.artist,head:'A BELEZA MAIS FORTE É A QUE AINDA PARECE SUA.',text:'A proposta do atelier não é criar um personagem. É usar detalhe, proporção, cor e acabamento para revelar presença.',services:[['Escuta antes da técnica','A conversa vem antes do gesto.'],['Personalização real','Forma e desenho definidos para você.'],['Acabamento como assinatura','O detalhe final separa serviço de experiência.'],['Experiência confortável','Ambiente, ritmo e clareza fazem parte do cuidado.']],gallery:[A.artist,A.space,A.h3,A.b3]},
 '/agendar':{ey:'Agendar / contato',title:'MONTE SEU RITUAL. NÓS CUIDAMOS DO RESTO.',support:'Escolha um ou mais universos, selecione o que faz sentido e leve tudo organizado para uma conversa no WhatsApp.',img:A.hero,head:'TRÊS PASSOS. ZERO FRICÇÃO.',text:'Escolha seus serviços, revise a combinação e consulte os horários pelo WhatsApp.',services:[['1. Escolha','Selecione Mãos & Gel, Pés e/ou Sobrancelhas.'],['2. Revise','A combinação aparece organizada antes do envio.'],['3. Consulte','O WhatsApp abre com a mensagem pronta.'],['4. Confirme','A profissional confirma disponibilidade e próximos passos.']],gallery:[A.h1,A.feet,A.b2,A.artist]}
};

function cinematicFree(){
  return \`<div class="free-cinema">
    <canvas id="liquidUniverse" class="liquid-universe" aria-hidden="true"></canvas>

    <section class="free-reflection grain">
      <div class="free-reflection-stage">
        <div class="free-nail-media">
          <img src="\${A.h1}" alt="Detalhe real de manicure em acabamento borgonha">
        </div>
        <div class="free-nail-shade"></div>

        <div class="free-reflection-copy shell">
          <span class="eyebrow">CVD CINEMATIC WEB • SEM VÍDEO PAGO</span>
          <h1 class="display">ENTRE<br>NO REFLEXO.</h1>
          <p>A própria interface vira a câmera. O reflexo está vivo antes mesmo do primeiro toque.</p>
          <span class="free-guide">Deslize para atravessar a laca ↓</span>
        </div>

        <div class="free-reflection-focus" aria-hidden="true">
          <i></i><i></i><i></i>
        </div>
      </div>
    </section>

    <section class="liquid-world grain">
      <div class="shell liquid-world-copy">
        <span class="eyebrow">LACA • VOCÊ ESTÁ DENTRO DA MATÉRIA</span>
        <h2 class="display">A PÁGINA<br>NÃO TROCOU.<br>ELA ABRIU.</h2>
        <p>Esse movimento é renderizado em tempo real no navegador. Ele continua respirando mesmo com o dedo parado.</p>
      </div>
      <div class="liquid-depth" aria-hidden="true"><span>01</span><span>LACA</span><span>MATÉRIA</span></div>
    </section>

    <section class="gesture-emerge grain">
      <div class="gesture-video">
        <video src="\${A.video}" poster="\${A.hands}" muted autoplay loop playsinline></video>
      </div>
      <div class="gesture-aperture" aria-hidden="true"></div>
      <div class="shell gesture-copy">
        <span class="eyebrow">MÃOS & GEL • O FILME VIRA INTERFACE</span>
        <h2 class="display">A LACA<br>VIRA GESTO.</h2>
        <p>A matéria se abre e revela o trabalho real. Não existe um corte seco entre “efeito” e “conteúdo”.</p>
        <a class="btn primary" href="/maos-gel">Explorar Mãos & Gel</a>
      </div>
      <div class="gesture-contour" aria-hidden="true"></div>
    </section>

    <section class="free-swipe-intro grain">
      <div class="shell">
        <span class="eyebrow">TRABALHOS • INTERAÇÃO NATIVA</span>
        <h2 class="display">PARA O LADO,<br>OUTRAS HISTÓRIAS.</h2>
        <p>Arraste os trabalhos para o lado. Continue descendo normalmente para seguir a experiência.</p>
      </div>
    </section>

    \${horizontalRail([
      [A.h1,'Mãos & Gel','Borgonha espelhado'],
      [A.h4,'Mãos & Gel','Acabamento em detalhe'],
      [A.h3,'Mãos & Gel','Nude champagne'],
      [A.b1,'Precisão','A linha nasce'],
      [A.f2,'Pérola','A matéria clareia']
    ],'Arraste para o lado • continue descendo')}

    <section class="pearl-bridge grain">
      <div class="pearl-media"><img src="\${A.feet}" alt="Cuidado premium para os pés"></div>
      <div class="pearl-shade"></div>
      <div class="pearl-ripple" aria-hidden="true"><i></i><i></i><i></i></div>
      <div class="shell pearl-copy">
        <span class="eyebrow">PRÓXIMA MATÉRIA • PÉROLA</span>
        <h2 class="display">O BORGONHA<br>VIRA LUZ.</h2>
        <p>A próxima passagem seria laca → reflexo perolado → água → cuidado dos pés, usando o mesmo motor e sem API paga.</p>
        <a class="btn primary" href="/">Voltar para a Home</a>
      </div>
    </section>
  </div>\`;
}

function routePage(d){
  const routeWorks=d.gallery.map((img,i)=>[img,d.ey,['Detalhe 01','Detalhe 02','Detalhe 03','Detalhe 04','Detalhe 05','Detalhe 06','Detalhe 07','Detalhe 08'][i]||('Detalhe '+(i+1))]);
  return `<div class="route-page route-cinematic">
    <section class="route-hero route-motion grain">
      <div class="route-hero-bg"><img src="${d.img}" alt="${d.ey}"></div>
      <div class="route-hero-glow"></div>
      <div class="shell route-hero-copy">
        <div class="eyebrow" style="color:var(--champ)">${d.ey}</div>
        <h1 class="display">${d.title}</h1>
        <p class="route-support">${d.support}</p>
        <div class="route-actions"><a class="btn primary" href="${WA}?text=Olá! Vim pelo site e gostaria de conversar sobre ${encodeURIComponent(d.ey)}." target="_blank" rel="noopener">Conversar no WhatsApp</a><span class="route-down">Deslize para descobrir ↓</span></div>
      </div>
    </section>
    <section class="kinetic-strip route-strip" aria-hidden="true"><div class="kinetic-track"><span>${d.head} • DETALHE • PRESENÇA • </span><span>${d.head} • DETALHE • PRESENÇA • </span></div></section>
    <section class="route-story grain">
      <div class="shell route-story-grid">
        <div class="route-story-copy">
          <div class="eyebrow" style="color:var(--ox)">Experiência</div>
          <h2 class="display">${d.head}</h2>
          <p>${d.text}</p>
        </div>
        <div class="route-list">${d.services.map((x,i)=>`<article class="service" data-service-card><span class="service-num">0${i+1}</span><b>${x[0]}</b><p>${x[1]}</p><i class="service-line"></i></article>`).join('')}</div>
      </div>
    </section>
    ${horizontalRail(routeWorks,'Galeria • deslize')}
    <section class="route-cinema grain">
      <div class="route-cinema-media"><img src="${d.gallery[1]||d.img}" alt=""></div>
      <div class="route-cinema-shade"></div>
      <div class="shell route-cinema-copy"><span class="eyebrow" style="color:var(--champ)">Experiência contínua</span><h2 class="display">CADA DETALHE<br>CONDUZ AO<br>PRÓXIMO.</h2><p>Movimento, imagem e conteúdo trabalham juntos. Nada entra seco, nada termina sem entregar a próxima cena.</p></div>
    </section>
    <section class="final grain"><div class="final-bg"></div><div class="shell final-inner"><div class="eyebrow" style="color:var(--champ)">Seu momento</div><h2 class="display">CONVERSE SOBRE O RESULTADO QUE VOCÊ QUER.</h2><a class="btn primary" href="${WA}?text=Olá! Vim pelo site e gostaria de consultar os horários disponíveis." target="_blank" rel="noopener">Agendar meu horário</a></div></section>
    ${footer()}
  </div>`;
}
function render(){const p=location.pathname.replace(/\/$/,'')||'/';const isProof=p==='/'||p==='/cinematic-free';document.body.classList.toggle('free-cinema-mode',isProof);app.innerHTML=isProof?cinematicFree():routePage(routes[p]||routes['/experiencias']);window.scrollTo(0,0);initMotion();initRitual();initRails();}
function initRails(){
  document.querySelectorAll('.rail-section').forEach(section=>{
    const rail=section.querySelector('.rail');
    const prev=section.querySelector('.rail-btn.prev');
    const next=section.querySelector('.rail-btn.next');
    if(!rail)return;
    const step=()=>Math.max(260,Math.min(rail.clientWidth*.78,560));
    prev?.addEventListener('click',()=>rail.scrollBy({left:-step(),behavior:'smooth'}));
    next?.addEventListener('click',()=>rail.scrollBy({left:step(),behavior:'smooth'}));
    const update=()=>{
      const max=rail.scrollWidth-rail.clientWidth-4;
      prev?.classList.toggle('disabled',rail.scrollLeft<8);
      next?.classList.toggle('disabled',rail.scrollLeft>max);
    };
    rail.addEventListener('scroll',update,{passive:true}); update();
  });
}
function initRitual(){const choices=[...document.querySelectorAll('.choice')], text=document.querySelector('#ritualText'), link=document.querySelector('#ritualWa');if(!choices.length)return;const selected=new Set;choices.forEach(b=>b.addEventListener('click',()=>{const v=b.dataset.choice;selected.has(v)?selected.delete(v):selected.add(v);b.classList.toggle('active',selected.has(v));const arr=[...selected];text.textContent=arr.length?arr.join(' + '):'nenhum universo selecionado ainda.';link.href=WA+'?text='+encodeURIComponent('Olá! Vim pelo site e gostaria de montar meu ritual com: '+(arr.length?arr.join(', '):'quero ajuda para escolher')+'. Pode me mostrar as disponibilidades?')}))}
