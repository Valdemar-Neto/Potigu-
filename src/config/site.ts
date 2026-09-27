/**
 * Fonte única de conteúdo e contatos da landing page.
 * TODO(potigua): substituir `email` pelo e-mail comercial real.
 */
export const SITE = {
  name: 'Potiguá',
  slogan: 'Transformando recursos, criando sabores.',
  // Somente dígitos, com DDI + DDD (formato exigido pelo wa.me)
  whatsapp: '5584999172077',
  whatsappDisplay: '+55 (84) 99917-2077',
  email: 'comercial@potigua.com.br',
  region: 'Rio Grande do Norte · Brasil',
} as const

export const NAV = [
  { href: '#produto', label: 'Produto' },
  { href: '#processo', label: 'Processo' },
  { href: '#sustentabilidade', label: 'Sustentabilidade' },
  { href: '#marca', label: 'Sobre' },
  { href: '#contato', label: 'Contato' },
] as const

/**
 * Caminhos dos arquivos de marca. Coloque os arquivos reais em `public/brand/`
 * com estes nomes; enquanto não existirem, as seções mostram um placeholder.
 */
export const ASSETS = {
  logo: '/brand/logo.png',
  logoWhite: '/brand/logo-branco.png',
  symbol: '/brand/simbolo.png',
  symbolWhite: '/brand/simbolo-branco.png',
  wordmark: '/brand/wordmark.png',
  wordmarkWhite: '/brand/wordmark-branco.png',
  photoShrimpPowder: '/brand/camarao-po.webp',
  photoCoast: '/brand/litoral.webp',
  bag25: '/brand/embalagem-25kg.webp',
  bag10: '/brand/embalagem-10kg.webp',
} as const

export const OPPORTUNITY_STATS = [
  // TODO(potigua): validar número com a equipe técnica antes de publicar.
  { value: 40, suffix: '%', prefix: 'até ', label: 'do peso do camarão é cabeça e casca, geralmente descartadas no beneficiamento' },
  { value: 2, suffix: '', prefix: '', label: 'estados parceiros na origem da matéria-prima: RN e CE' },
  { value: 25, suffix: ' kg', prefix: '10 e ', label: 'embalagens industriais pensadas para a sua linha de produção' },
] as const

export const PROCESS_STEPS = [
  {
    title: 'Resíduo',
    text: 'O cefalotórax, a “cabeça” do camarão, sai do beneficiamento concentrando aroma, sabor, proteínas e minerais.',
  },
  {
    title: 'Coleta com parceiros',
    text: 'Cooperativas e beneficiadoras do Rio Grande do Norte e do Ceará fornecem a matéria-prima com rastreabilidade.',
  },
  {
    title: 'Processamento',
    text: 'Processo controlado, com foco em segurança alimentar, preserva os compostos sensoriais do crustáceo.',
  },
  {
    title: 'Saborizante em pó',
    text: 'Um ingrediente concentrado, estável e padronizado, com sabor e aroma marcantes de camarão.',
  },
  {
    title: 'Indústria',
    text: 'O que era descarte volta à cadeia como valor, nas formulações dos nossos clientes.',
  },
] as const

export const PRODUCT_BENEFITS = [
  { title: 'Alta concentração de sabor', text: 'Aroma e sabor intensos de camarão em pequenas dosagens.' },
  { title: 'Rico em proteínas e minerais', text: 'Agrega valor nutricional às formulações.' },
  { title: 'Feito para a indústria', text: 'Pó padronizado, fácil de dosar e incorporar em processos contínuos.' },
  { title: 'Origem rastreável', text: 'Matéria-prima de parceiros regionais do RN e do CE.' },
] as const

export const APPLICATIONS = [
  { title: 'Temperos e condimentos', text: 'Blends, sal temperado e bases de tempero.' },
  { title: 'Snacks', text: 'Salgadinhos, chips e biscoitos salgados.' },
  { title: 'Caldos e sopas', text: 'Caldos em pó, cubos e bases culinárias.' },
  { title: 'Massas e instantâneos', text: 'Miojos, massas recheadas e sachês de sabor.' },
  { title: 'Pratos prontos', text: 'Refeições congeladas, molhos e recheios.' },
  { title: 'Food service', text: 'Bases para cozinhas industriais e redes.' },
] as const

export const MISSION =
  'Transformar resíduos do beneficiamento de camarão em ingredientes alimentícios de alto valor agregado, por meio da inovação e de processos sustentáveis, contribuindo para a economia circular e para o desenvolvimento da cadeia produtiva regional.'

export const VISION =
  'Ser referência regional na valorização de resíduos do processamento de camarão, reconhecida pela qualidade de seus produtos, pela inovação e pelo compromisso com a sustentabilidade.'

export const VALUES = [
  { key: 'sustentabilidade', title: 'Sustentabilidade', text: 'Aproveitamento de recursos e redução de impactos ambientais, alinhados à Economia Circular.' },
  { key: 'inovacao', title: 'Inovação', text: 'Soluções tecnológicas que transformam subprodutos de pescados em ingredientes de maior valor.' },
  { key: 'qualidade', title: 'Qualidade e segurança alimentar', text: 'Qualidade dos produtos e segurança dos processos, atendendo às exigências do setor.' },
  { key: 'regional', title: 'Valorização regional', text: 'Parcerias com cooperativas e empresas que fortalecem a cadeia produtiva local.' },
  { key: 'responsabilidade', title: 'Responsabilidade', text: 'Transparência e compromisso nas relações comerciais, ambientais e sociais.' },
  { key: 'eficiencia', title: 'Eficiência', text: 'Melhoria contínua, uso eficiente de recursos e redução de desperdícios.' },
] as const

export const SEGMENTS = [
  'Temperos e condimentos',
  'Snacks',
  'Caldos e sopas',
  'Massas e instantâneos',
  'Pratos prontos',
  'Food service',
  'Outro',
] as const

export const INTERESTS = [
  { value: 'amostra', label: 'Solicitar amostra' },
  { value: 'cotacao', label: 'Cotação de fornecimento' },
  { value: 'parceria', label: 'Parceria de matéria-prima (cooperativa/beneficiadora)' },
  { value: 'outro', label: 'Outro assunto' },
] as const

export const VOLUMES = [
  { value: '10kg', label: 'Embalagem de 10 kg' },
  { value: '25kg', label: 'Embalagem de 25 kg' },
  { value: 'recorrente', label: 'Fornecimento recorrente' },
  { value: 'indefinido', label: 'Ainda não sei' },
] as const

/**
 * Mapa da seção Sustentabilidade.
 * TODO(potigua): os polos abaixo são polos conhecidos de carcinicultura, usados como ilustração —
 * trocar pelas cidades dos parceiros reais e pela localização da unidade da Potiguá.
 */
export const MAP_HQ = { name: 'Potiguá', city: 'Natal', lon: -35.21, lat: -5.79 } as const

export const MAP_HUBS = [
  { name: 'Acaraú', uf: 'CE', lon: -40.12, lat: -2.89 },
  { name: 'Aracati', uf: 'CE', lon: -37.77, lat: -4.56 },
  { name: 'Pendências', uf: 'RN', lon: -36.72, lat: -5.26 },
  { name: 'Canguaretama', uf: 'RN', lon: -35.13, lat: -6.38 },
] as const
