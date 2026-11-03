export const BRAND = {
  name: 'Espaço Levie',
  instagram: '',  // PENDENTE: URL exata do perfil confirmado
  whatsapp: '',   // PENDENTE: telefone da empresa confirmado
  address: '',    // PENDENTE: endereço confirmado
  city: '',
  contactStatus: 'PENDENTE DE CONFIRMAÇÃO',
  note: 'Prévia criativa: sem fotos de trabalhos, telefone, endereço ou depoimentos não verificados.'
};
export const SERVICES = [
  {id:'manicure',name:'Manicure',group:'maos',page:'/maos-e-gel',eyebrow:'01 / MÃOS',short:'Cuidado e acabamento para as unhas naturais.',desc:'Uma pausa para cuidar da forma, do acabamento e da expressão das suas mãos.',tag:'Natural'},
  {id:'blindagem',name:'Blindagem das unhas',group:'maos',page:'/maos-e-gel',eyebrow:'02 / MÃOS',short:'Proteção estética e acabamento das unhas naturais.',desc:'Uma possibilidade de acabamento para quem prefere valorizar as próprias unhas.',tag:'Acabamento'},
  {id:'banho-gel',name:'Banho de gel',group:'maos',page:'/maos-e-gel',eyebrow:'03 / MÃOS',short:'Superfície luminosa com acabamento em gel.',desc:'O universo do gel com atenção a formato, superfície e manutenção orientada.',tag:'Gel'},
  {id:'alongamento-f1',name:'Alongamento F1',group:'maos',page:'/maos-e-gel',eyebrow:'04 / MÃOS',short:'Extensão de unhas com formato pensado para o seu estilo.',desc:'Proporção, comprimento e acabamento apresentados em uma experiência personalizada.',tag:'Alongamento'},
  {id:'posticas',name:'Unhas postiças realistas',group:'maos',page:'/maos-e-gel',eyebrow:'05 / MÃOS',short:'Uma alternativa estética para variar o visual.',desc:'Diferentes possibilidades de aparência, comprimento e acabamento.',tag:'Estilo'},
  {id:'pedicure',name:'Pedicure',group:'pes',page:'/pes',eyebrow:'06 / PÉS',short:'Cuidado de beleza para os pés.',desc:'Um momento dedicado ao cuidado estético e ao acabamento das unhas dos pés.',tag:'Essencial'},
  {id:'spa-pes',name:'Spa dos pés',group:'pes',page:'/pes',eyebrow:'07 / PÉS',short:'Um ritual de pausa, conforto e cuidado.',desc:'Um cuidado de pés com foco em ritual estético, conforto e bem-estar.',tag:'Ritual'},
  {id:'calosidades',name:'Cuidados com calosidades',group:'pes',page:'/pes',eyebrow:'08 / PÉS',short:'Atenção estética à aparência dos pés.',desc:'Converse diretamente com a profissional para avaliar a adequação do procedimento.',tag:'Cuidados'},
  {id:'brow',name:'Design de sobrancelhas',group:'sobrancelhas',page:'/sobrancelhas',eyebrow:'09 / OLHAR',short:'Desenho que respeita a expressão natural.',desc:'Um desenho de sobrancelhas alinhado à forma do rosto e à identidade de cada pessoa.',tag:'Expressão'},
  {id:'henna',name:'Design com henna',group:'sobrancelhas',page:'/sobrancelhas',eyebrow:'10 / OLHAR',short:'Possibilidade de finalização com henna.',desc:'Uma proposta de realce para explorar com a profissional, conforme preferência e indicação.',tag:'Definição'}
];
export const GROUPS = [
  {id:'maos',num:'01',label:'Mãos & gel',name:'A arte do gesto.',tag:'A textura que encontra a luz',route:'/maos-e-gel',intro:'Do natural ao acabamento em gel, cada detalhe pode expressar um jeito de ser.',symbol:'G'},
  {id:'pes',num:'02',label:'Pés',name:'O tempo desacelera.',tag:'Uma pausa que faz sentido',route:'/pes',intro:'O cuidado também pode ser um momento de descanso, leveza e presença.',symbol:'P'},
  {id:'sobrancelhas',num:'03',label:'Sobrancelhas',name:'A beleza do olhar.',tag:'Expressão sem excessos',route:'/sobrancelhas',intro:'Traços que valorizam a sua própria expressão, sem deixar de parecer você.',symbol:'S'}
];
export const FAQ = [
  ['Como escolher a experiência ideal?', 'Explore os serviços, selecione os que chamam sua atenção e use o planejador para organizar suas preferências antes de falar com a profissional.'],
  ['Posso conhecer os trabalhos antes de agendar?', 'Sim. Estamos preparando uma seleção de imagens reais autorizadas para o portfólio. Enquanto isso, a apresentação preserva a identidade do projeto sem atribuir resultados fictícios ao espaço.'],
  ['Existe uma tabela de valores?', 'A disponibilidade, os valores e os detalhes de cada serviço devem ser confirmados diretamente com o Espaço Levie. Não apresentamos preços que não foram verificados.'],
  ['Como funciona o agendamento?', 'Você pode organizar sua experiência nesta prévia. O envio direto ao canal oficial será habilitado quando o WhatsApp ou Instagram da empresa estiver confirmado.'],
  ['Posso combinar mais de um serviço?', 'O planejador permite combinar opções. O agendamento conjunto e o tempo necessário dependem de confirmação da profissional.'],
  ['Todos os serviços são adequados a qualquer pessoa?', 'Não necessariamente. A avaliação, as orientações de manutenção e a indicação de cada procedimento são individuais e devem ser confirmadas pela profissional.']
];