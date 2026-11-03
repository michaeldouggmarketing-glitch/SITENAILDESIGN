# QA CVD — Espaço Levie / V1

Data: 03/11/2026. Ambiente: Node.js, build local, Chromium/Playwright com HTML e scripts injetados por restrição do navegador a URLs locais e externas.

| Gate | Estado | Evidência |
|---|---|---|
| G01 Identidade | PARCIAL | Cliente confirmou nome Espaço Levie; arroba exata do Instagram não confirmada |
| G02 Fotos reais | PENDENTE | Nenhuma mídia da cliente autorizada; placeholders são ilustrações declaradas |
| G03 Design exclusivo | TESTADO PARCIAL | Capturas locais 390 e 1440 e revisão de hero |
| G04 Cinema | NÃO TESTADO COMPLETO | Animado em CSS; scrubbing de capítulo implementado, reversão em URL pública pendente |
| G05 Rotas | PARCIAL | Build gera oito rotas, atualização direta em URL Vercel ainda pendente |
| G06 Admin/CRM | NÃO APLICÁVEL | Projeto original institucional sem Admin; formulário prepara mensagem local, sem backend |
| G07 Mobile | PARCIAL | Homepage 390px sem overflow; 320/360 e demais rotas pendentes |
| G08 Mídia | PENDENTE | Ilustrações locais estáveis; mídias reais precisam entrar |
| G09 Acessibilidade | PARCIAL | Sem textos ocultos em falha de JS; CSS reduced-motion presente; QA de teclado completo pendente |
| G10 GitHub | PENDENTE | Commit em nova branch após validação/transferência |
| G11 Vercel | PENDENTE | Deploy preview ainda não realizado |
| G12 Limites | PARCIAL | Sem segredos, não há plugins pagos, telefone fictício removido |

### Testes reais concluídos
- `npm run check`: PASSOU, sem links com telefone placeholder.
- `npm run build`: PASSOU, oito rotas geradas na saída.
- Chromium 1440px Home: h1 renderizado, overflow horizontal 0px, pageerror [].
- Chromium 390px Home: h1 renderizado, overflow horizontal 0px, pageerror [].
- Chromium 390px /agendar: escolha Banho de gel atualiza resumo, overflow 0px, pageerror [].
- Chromium 390px /portfolio: filtro Pés alterou 6 itens para 2, overflow 0px, pageerror [].

### Observação de teste
O navegador automatizado não autorizou navegação HTTP para localhost ou file://; foi usado HTML/CSS/script local injetado no Chromium. Isso permite conferência da renderização, mas **não equivale a teste E2E em URL hospedada**.