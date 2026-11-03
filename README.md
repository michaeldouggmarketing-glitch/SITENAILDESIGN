# Espaço Levie — CVD Cinematic Studio V1

Reconstrução autoral e portátil da demonstração institucional do Espaço Levie. Preserva o histórico do projeto `michaeldouggmarketing-glitch/SITENAILDESIGN` e substitui a dependência de imagens hospedadas em outra aplicação por composições de laca/pérola locais, construídas em HTML/CSS.

## Rodar

Requisitos: Node.js 20+; não há dependências de NPM de terceiros para execução ou build.

```bash
npm run dev
npm run check
npm run build
```

No navegador, acesse `http://localhost:4173`. O build cria `dist/` e inclui HTML estático para cada rota, com fallback de roteamento client-side. Configure a Vercel com build `npm run build`, saída `dist` e o arquivo `vercel.json` fornecido. Importante: não altere produção antes de testar o preview.

## Rotas

`/` · `/experiencias` · `/maos-e-gel` · `/pes` · `/sobrancelhas` · `/portfolio` · `/sobre` · `/agendar`

## Comportamentos implementados

- Navegação real multipágina, links profundos, menu responsivo, indicador de leitura e retorno de rota.
- Motion leve com scroll narrativo reversível em desktop, materialidade 3D em CSS e fallback `prefers-reduced-motion`.
- Serviços organizados por categoria, filtros reais e páginas individuais com âncoras de serviço.
- Portfólio filtrável com **composições editoriais identificadas como ilustrações**. Sem falsa atribuição a clientes ou resultados reais.
- Planejador de atendimento interativo que compõe e copia mensagem; **não coleta dados, não envia, não reserva e não simula sucesso comercial**.

## Pendências obrigatórias antes da publicação comercial

1. Confirmar e inserir o perfil Instagram, telefone WhatsApp, cidade e endereço reais em `site-data.js`.
2. Receber acervo da Clara/Espaço Levie com autorização, conferir origem e inserir fotos autênticas no portfólio, sobre e hero, registrando cada item em `docs/media-manifest.json`.
3. Validar lista de serviços com a responsável; são serviços do briefing anterior, não confirmação independente do Instagram.
4. Integrar o canal real de agendamento; até lá, o planejador apenas copia o resumo.
5. Revisar a identidade de marca definitiva e as informações de equipe/horários e preço.
6. Submeter a QA por rotas, acessibilidade, performance, várias larguras e testar Vercel preview.

O site em prévia usa `noindex,nofollow`. Retirar o bloqueio somente na aprovação comercial.

## Propriedade

Sem dependência de Lovable, ProductOS, banco de dados, vídeo externo ou hospedagem proprietária para funcionamento básico. Código-fonte livre para portar e editar na conta do titular. Não usar imagens de terceiros sem autorização.