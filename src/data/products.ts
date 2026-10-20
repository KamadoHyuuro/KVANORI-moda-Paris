import { Product, Category } from '../types';
import { getProductGallery } from './productImages';

export const PRODUCTS: Product[] = [
  // ==========================================
  // 1. BLAZERS
  // ==========================================
  {
    id: 'blazer-saint-germain',
    name: 'Blazer Saint-Germain',
    frenchSubtitle: 'Veste structurée en tweed chevron chevronné',
    category: 'Blazers',
    price: 980,
    originalPrice: 1150,
    description: 'Blazer em autêntico tweed marrom de lã virgem com clássico padrão espinha de peixe (herringbone). Silhueta estruturada com corte sartorial dos anos 1980, ombreiras sutis de alfaiataria, forro acetinado e botões dourados em latão escovado com relevo heráldico.',
    story: 'Inspirado nas tardes intelectuais do Café de Flore e nas estudantes da Sorbonne em 1986. Uma peça que equilibra a sobriedade britânica com a displicência elegante da margem esquerda parisiense.',
    images: getProductGallery('blazer-saint-germain'),
    colors: [
      { name: 'Tweed Marrom Espinha de Peixe', hex: '#6E4732' },
      { name: 'Bege Feno & Caramelo', hex: '#A88264' },
      { name: 'Café Escuro Amadeirado', hex: '#42281D' }
    ],
    sizes: ['34', '36', '38', '40', '42'],
    composition: '100% Pura Lã Virgem Britânica; Forro: 100% Viscose Bemberg acetinada',
    care: 'Lavagem especializada a seco. Passar a ferro em temperatura média com pano de algodão protetor.',
    details: [
      'Padrão clássico espinha de peixe (herringbone) tecido em tear tradicional',
      'Estrutura de entretela de crina de cavalo no peitoral para caimento impecável',
      'Botões dourados com brasão floral francês gravado em relevo',
      'Bolsos frontais com lapela forrada e bolso de lenço embutido no peito'
    ],
    stockStatus: 'Em estoque',
    isBestseller: true,
    completeLookIds: ['camisa-saint-germain', 'saia-rive-gauche', 'boina-saint-germain', 'bolsa-rive-gauche'],
    styleNote: 'Combine com a saia plissada KVANORI e a boina preta para o arquétipo definitivo do French Preppy.'
  },
  {
    id: 'blazer-montparnasse',
    name: 'Blazer Montparnasse',
    frenchSubtitle: 'Veste de tailleur à motif Prince de Galles',
    category: 'Blazers',
    price: 940,
    description: 'Blazer com refinado xadrez príncipe de Gales em harmonia de tons cinza e vinho bordô. Modelagem levemente oversized de inspiração menswear dos anos 80, lapelas notched alongadas e fenda posterior central.',
    story: 'Homenagem aos ateliês e cafés de Montparnasse, onde artistas e escritoras adotavam o tailoring masculino com feminilidade despretensiosa.',
    images: getProductGallery('blazer-montparnasse'),
    colors: [
      { name: 'Príncipe de Gales Cinza & Vinho', hex: '#58535A' },
      { name: 'Cinza Grafite Tartan', hex: '#3E3D42' }
    ],
    sizes: ['34', '36', '38', '40', '42'],
    composition: '90% Lã Penteada, 10% Seda Natural; Forro: 100% Cupro respirável',
    care: 'Lavagem a seco profissional. Não alvejar. Vaporizar verticalmente.',
    details: [
      'Xadrez Príncipe de Gales cortado com rigoroso alinhamento de costura',
      'Modelagem ligeiramente ampla com ombros descontraídos',
      'Abotoamento simples com botões de chifre genuíno em tom âmbar',
      'Quatro botões funcionais nos punhos com caseado artesanal'
    ],
    stockStatus: 'Em estoque',
    isNew: true,
    completeLookIds: ['sueter-odeon', 'saia-marais', 'lenco-paris', 'bolsa-rive-gauche'],
    styleNote: 'Use sobreposto ao suéter de gola alta Odéon com as mangas do blazer levemente puxadas para cima.'
  },
  {
    id: 'blazer-rive-gauche',
    name: 'Blazer KVANORI',
    frenchSubtitle: 'Blazer de club universitaire en serge bleu marine',
    category: 'Blazers',
    price: 920,
    description: 'Blazer de alfaiataria clássica em sarja encorpada azul-marinho francês. Corte reto impecável, lapela peaked imponente e botões metálicos dourados gravados com emblema universitário.',
    story: 'A peça fundadora do guarda-roupa French Ivy. Inspirado nos grêmios acadêmicos da Sorbonne e nos passeios pelo Boulevard Saint-Michel.',
    images: getProductGallery('blazer-rive-gauche'),
    colors: [
      { name: 'Azul-Marinho Francês', hex: '#1B273D' },
      { name: 'Azul Meia-Noite Profundo', hex: '#111827' }
    ],
    sizes: ['34', '36', '38', '40', '42'],
    composition: '100% Sarja de Lã Fria Quatro Estações; Forro: 100% Cetim de Seda',
    care: 'Lavagem a seco em lavanderia especializada.',
    details: [
      'Botões franceses fundidos em latão dourado com acabamento semibrilho',
      'Forro listrado contrastante nos braços para dobras elegantes',
      'Corte clássico estruturado com pences verticais modeladoras'
    ],
    stockStatus: 'Em estoque',
    isBestseller: true,
    completeLookIds: ['camisa-rivoli', 'saia-montmartre', 'boina-saint-germain', 'bolsa-rive-gauche'],
    styleNote: 'Perfeito com a camisa listrada Rivoli e a saia plissada azul-marinho.'
  },
  {
    id: 'blazer-marais',
    name: 'Blazer Marais',
    frenchSubtitle: 'Veste cintrée en tweed vert mousse',
    category: 'Blazers',
    price: 890,
    description: 'Blazer confeccionado em tweed macio verde-musgo com sutis pontuações em verde oliva e dourado seco. Corte levemente acinturado que desenha a silhueta, bolsos embutidos e botões forrados.',
    story: 'Evoca os jardins secretos dos hôtels particuliers do Marais e as tardes preguiçosas sob a sombra das arcadas da Place des Vosges.',
    images: getProductGallery('blazer-marais'),
    colors: [
      { name: 'Verde-Musgo Floresta', hex: '#344530' },
      { name: 'Verde Oliva Escuro', hex: '#2B3828' }
    ],
    sizes: ['34', '36', '38', '40', '42'],
    composition: '80% Lã Rústica, 20% Alpaca; Forro: 100% Viscose',
    care: 'Lavagem a seco recomendada.',
    details: [
      'Trama encorpada com toque aconchegante de alpaca',
      'Corte levemente acinturado com pence francesa',
      'Gola de veludo cotelê verde escuro aplicada na parte inferior da lapela'
    ],
    stockStatus: 'Últimas 2 peças',
    completeLookIds: ['blusa-marais', 'saia-luxembourg', 'lenco-paris', 'bolsa-rive-gauche'],
    styleNote: 'Cria uma paleta de outono sublime quando coordenado com a saia caramelo Luxembourg.'
  },

  // ==========================================
  // 2. CARDIGANS E SUÉTERES
  // ==========================================
  {
    id: 'cardigan-montmartre',
    name: 'Cardigan Montmartre',
    frenchSubtitle: 'Gilet en tricot de laine vierge bordeaux',
    category: 'Cardigans & Suéteres',
    price: 680,
    originalPrice: 790,
    description: 'Cardigan em rico tricô de lã virgem na tonalidade vinho bordô profundo. Trama encorpada com relevo discreto, botões frontais em madrepérola escura polida e acabamento canelado nos punhos e barra.',
    story: 'Desenhado para as manhãs frescas subindo as colinas de Montmartre em direção aos cafés da Rue Lepic.',
    images: getProductGallery('cardigan-montmartre'),
    colors: [
      { name: 'Vinho Bordô Profundo', hex: '#5A1725' },
      { name: 'Borgonha Escuro', hex: '#44111C' }
    ],
    sizes: ['PP', 'P', 'M', 'G'],
    composition: '100% Pura Lã Merino Ultrafina (fiada na França)',
    care: 'Lavar à mão em água fria com sabão neutro para lãs. Secar na horizontal sobre toalha.',
    details: [
      'Ponto canelado inglês denso e macio que não deforma',
      'Sete botões frontais em madrepérola natural gravada',
      'Punhos dobráveis e caimento vintage confortavelmente ajustado'
    ],
    stockStatus: 'Em estoque',
    isBestseller: true,
    completeLookIds: ['camisa-saint-germain', 'saia-rive-gauche', 'boina-montmartre'],
    styleNote: 'Use fechado como peça principal com o colarinho da camisa de fora, ou aberto sobre vestido floral.'
  },
  {
    id: 'cardigan-luxembourg',
    name: 'Cardigan Luxembourg',
    frenchSubtitle: 'Gilet en tricot texturé écru fait main',
    category: 'Cardigans & Suéteres',
    price: 650,
    description: 'Cardigan clássico em tom creme baunilha em tricô texturizado com pontos trançados sutis e ponto arroz. Toque aveludado de lã merino com cashmere, abotoamento frontal e bolsos aplicados.',
    story: 'Inspirado nos fins de semana ensolarados no Jardin du Luxembourg, lendo Marguerite Duras sob o murmúrio da Fontaine Médicis.',
    images: getProductGallery('cardigan-luxembourg'),
    colors: [
      { name: 'Creme Baunilha Natural', hex: '#F3EDE1', border: true },
      { name: 'Marfim Amendoado', hex: '#EAE1D2', border: true }
    ],
    sizes: ['PP', 'P', 'M', 'G'],
    composition: '85% Lã Merino Australiana, 15% Cashmere da Mongólia',
    care: 'Lavagem delicada à mão ou ciclo lã na máquina com bolsa protetora.',
    details: [
      'Padrão texturizado trançado com riqueza tátil',
      'Botões artesanais de madeira torneada encerada',
      'Dois bolsos frontais funcionais ideais para guardar um lenço'
    ],
    stockStatus: 'Em estoque',
    isNew: true,
    completeLookIds: ['vestido-montmartre', 'boina-saint-germain', 'bolsa-rive-gauche'],
    styleNote: 'Sobreponha ao vestido floral Montmartre para uma composição bucólica e aristocrática.'
  },
  {
    id: 'sueter-saint-paul',
    name: 'Suéter Saint-Paul',
    frenchSubtitle: 'Pull en maille fine à col en V bleu marine',
    category: 'Cardigans & Suéteres',
    price: 590,
    description: 'Suéter em malha nobre de lã penteada azul-marinho com elegante decote gola V. Silhueta preppy acadêmica, punhos justos canelados e caimento limpo.',
    story: 'Uma ode aos dias de estudo nas bibliotecas de Paris e às caminhadas pelas galerias antigas do Village Saint-Paul.',
    images: getProductGallery('sueter-saint-paul'),
    colors: [
      { name: 'Azul-Marinho Acadêmico', hex: '#162238' },
      { name: 'Azul Escuro Mescla', hex: '#1D2A42' }
    ],
    sizes: ['PP', 'P', 'M', 'G'],
    composition: '100% Lã Merino Extrafina Penteada',
    care: 'Lavagem manual a frio. Não torcer. Secagem na horizontal.',
    details: [
      'Decote V estruturado na medida exata para emoldurar gravatas ou colarinhos',
      'Malha gauge 12 de altíssima densidade e leveza térmica',
      'Bordado tonal microscópico com monograma RG na barra'
    ],
    stockStatus: 'Em estoque',
    completeLookIds: ['camisa-rivoli', 'saia-saint-germain', 'boina-saint-germain'],
    styleNote: 'Combine com a camisa listrada Rivoli e a saia xadrez Saint-Germain para o visual estudante francesa de elite.'
  },
  {
    id: 'sueter-odeon',
    name: 'Suéter Odéon',
    frenchSubtitle: 'Pull à col roulé en laine et alpaga beige',
    category: 'Cardigans & Suéteres',
    price: 620,
    description: 'Suéter confeccionado em lã e alpaca macia na cor bege avelã com gola alta dobrável volumosa. Peça aconchegante, atemporal e indispensável para a estação fria parisiense.',
    story: 'Desenhado em homenagem ao Théâtre de l’Odéon e aos intelectuais existencialistas que faziam da gola alta sua marca registrada de elegância.',
    images: getProductGallery('sueter-odeon'),
    colors: [
      { name: 'Bege Avelã Quente', hex: '#C5B39C' },
      { name: 'Areia Dourada', hex: '#D7C7B2' }
    ],
    sizes: ['PP', 'P', 'M', 'G'],
    composition: '70% Lã Pura, 30% Baby Alpaca Peruana',
    care: 'Lavagem a seco ou à mão delicada.',
    details: [
      'Gola alta anatômica que não aperta e mantém a forma o dia todo',
      'Ponto canelado largo nas mangas e na barra',
      'Fibra de alpaca naturalmente térmica e respirável'
    ],
    stockStatus: 'Em estoque',
    completeLookIds: ['trench-coat-paris', 'saia-luxembourg', 'lenco-paris'],
    styleNote: 'Fica deslumbrante sob o Trench Coat Paris, com o bege do casaco contrastando sutilmente com o tom avelã do suéter.'
  },
  {
    id: 'sueter-latin-quarter',
    name: 'Suéter Latin Quarter',
    frenchSubtitle: 'Pull ras du cou en tricot vert forêt',
    category: 'Cardigans & Suéteres',
    price: 580,
    description: 'Suéter em tricô encorpado verde escuro floresta com gola redonda clássica canelada. Caimento clássico relaxado, fiação espessa aconchegante e pontos reforçados nos ombros.',
    story: 'Inspirado nos estudantes de filosofia que povoavam os sebos e cafés da Rue Soufflot e Boulevard Saint-Germain.',
    images: getProductGallery('sueter-latin-quarter'),
    colors: [
      { name: 'Verde Escuro Britânico', hex: '#1C3324' },
      { name: 'Verde Pinho Envelhecido', hex: '#263D2E' }
    ],
    sizes: ['PP', 'P', 'M', 'G'],
    composition: '100% Lã Virgem de Shetland',
    care: 'Lavagem manual suave. Passar a ferro brando com vapor.',
    details: [
      'Gola redonda clássica com reforço de elastano invisível na borda',
      'Lã de Shetland autêntica com toque rústico sofisticado',
      'Acabamentos de costura inglesa reforçada'
    ],
    stockStatus: 'Em estoque',
    completeLookIds: ['camisa-saint-germain', 'saia-marais', 'bolsa-rive-gauche'],
    styleNote: 'Use com a camisa branca Saint-Germain por baixo, deixando apenas a gola à vista.'
  },

  // ==========================================
  // 3. SAIAS
  // ==========================================
  {
    id: 'saia-rive-gauche',
    name: 'Saia KVANORI',
    frenchSubtitle: 'Jupe midi plissée en laine tartan marron et bordeaux',
    category: 'Saias',
    price: 560,
    originalPrice: 650,
    description: 'Saia midi de cintura alta em tecido de lã com rico xadrez tartan em marrom conhaque, vinho bordô e detalhes em mostarda suave. Pregas profundas com movimento fluido e cós estruturado sartorial.',
    story: 'A peça mais icônica do movimento preppy da KVANORI nos anos 1980. Confortável para pedalar pelo cais do Sena ou caminhar pelas livrarias.',
    images: getProductGallery('saia-rive-gauche'),
    colors: [
      { name: 'Tartan Marrom & Vinho', hex: '#653B32' },
      { name: 'Xadrez Conhaque & Ocre', hex: '#774735' }
    ],
    sizes: ['34', '36', '38', '40', '42'],
    composition: '100% Pura Lã Fria Tartan; Forro: 100% Acetato respirável',
    care: 'Lavagem a seco recomendada para preservar a nitidez das pregas.',
    details: [
      'Pregas costuradas no quadril para contorno perfeito e abertas na barra',
      'Fecho com zíper invisível lateral e colchete de alfaiate',
      'Comprimento midi clássico (74cm no tamanho 36)'
    ],
    stockStatus: 'Em estoque',
    isBestseller: true,
    completeLookIds: ['blazer-saint-germain', 'cardigan-montmartre', 'boina-saint-germain', 'bolsa-rive-gauche'],
    styleNote: 'Combine com o Blazer Saint-Germain e meias curtas brancas para o look canônico parisiense.'
  },
  {
    id: 'saia-montmartre',
    name: 'Saia Montmartre',
    frenchSubtitle: 'Jupe plissée soleil en gabardine bleu marine',
    category: 'Saias',
    price: 520,
    description: 'Saia plissada em estilo plissé soleil em gabardine de lã leve azul-marinho. Cintura alta com elástico interno discreto, caimento gracioso e caimento esvoaçante a cada passo.',
    story: 'Desenhada para capturar o vento suave no alto da colina de Montmartre, em frente ao Sacré-Cœur.',
    images: getProductGallery('saia-montmartre'),
    colors: [
      { name: 'Azul-Marinho Plissado', hex: '#192339' },
      { name: 'Azul Noturno Sóbrio', hex: '#121A2A' }
    ],
    sizes: ['34', '36', '38', '40', '42'],
    composition: '65% Lã Tropical, 35% Seda Natural',
    care: 'Lavagem a seco em processo suave.',
    details: [
      'Plissado termofixado permanente de precisão francesa',
      'Cós entretelado firme que afina visualmente a cintura',
      'Barra com costura de lenço feita à mão'
    ],
    stockStatus: 'Em estoque',
    completeLookIds: ['blazer-rive-gauche', 'camisa-rivoli', 'boina-saint-germain'],
    styleNote: 'Componha com o blazer navy KVANORI e sapatos Mary Jane para máxima distinção acadêmica.'
  },
  {
    id: 'saia-luxembourg',
    name: 'Saia Luxembourg',
    frenchSubtitle: 'Jupe trapèze en velours côtelé couleur caramel',
    category: 'Saias',
    price: 490,
    description: 'Saia em veludo cotelê encorpado de canaletas médias na tonalidade caramelo tostado. Linha A levemente evasê com cintura alta marcada, bolsos frontais de alfaiataria e botões de tartaruga.',
    story: 'Inspirada nos tons terrosos das folhas de outono no Jardim de Luxemburgo e nos figurinos do cinema Nouvelle Vague tardio.',
    images: getProductGallery('saia-luxembourg'),
    colors: [
      { name: 'Veludo Cotelê Caramelo', hex: '#9C5E33' },
      { name: 'Conhaque Ambarino', hex: '#874E28' }
    ],
    sizes: ['34', '36', '38', '40', '42'],
    composition: '100% Algodão Puro com acabamento veludo cotelê lavado',
    care: 'Lavar pelo avesso em ciclo delicado. Passar a ferro pelo avesso para manter o veludo.',
    details: [
      'Textura canelada nobre com brilho aveludado discreto',
      'Abotoamento frontal integral com botões em resina de tartaruga',
      'Dois bolsos faca profundos e confortáveis'
    ],
    stockStatus: 'Em estoque',
    isNew: true,
    completeLookIds: ['sueter-odeon', 'trench-coat-paris', 'lenco-paris'],
    styleNote: 'Fica magnífica com botas de cano médio e o suéter gola rolê Odéon.'
  },
  {
    id: 'saia-marais',
    name: 'Saia Marais',
    frenchSubtitle: 'Jupe évasée en flanelle de laine grise',
    category: 'Saias',
    price: 510,
    description: 'Saia evasê em nobre flanela de lã pura cinza mescla. Estrutura impecável de quatro panos cortados no viés que conferem caimento em sino natural e cós com passantes para cintos finos.',
    story: 'Inspirada nas galerias de arte contemporânea que despontavam no Marais em meados dos anos 80.',
    images: getProductGallery('saia-marais'),
    colors: [
      { name: 'Flanela Cinza Mescla', hex: '#68696E' },
      { name: 'Cinza Grafite Chumbo', hex: '#4B4C50' }
    ],
    sizes: ['34', '36', '38', '40', '42'],
    composition: '100% Flanela de Lã Virgem; Forro: 100% Viscose',
    care: 'Lavagem especializada a seco.',
    details: [
      'Corte evasê no viés que ondula suavemente ao caminhar',
      'Forro acetinado antiestático que não gruda na meia-calça',
      'Zíper traseiro embutido com puxador discreto'
    ],
    stockStatus: 'Em estoque',
    completeLookIds: ['blazer-montparnasse', 'blusa-marais', 'bolsa-rive-gauche'],
    styleNote: 'Adicione um cinto de couro conhaque fino para marcar a cintura com máxima elegância.'
  },
  {
    id: 'saia-saint-germain',
    name: 'Saia Saint-Germain',
    frenchSubtitle: 'Jupe taille haute en tartan vert et bleu marine',
    category: 'Saias',
    price: 540,
    description: 'Saia reta de cintura alta em autêntico tartan Black Watch nos tons de verde floresta e azul-marinho profundo. Fenda posterior discreta para caminhar, bolsos embutidos e acabamento sartorial.',
    story: 'O tartan predileto da juventude parisiense culta que frequentava os cinemas de arte da Rue Champollion.',
    images: getProductGallery('saia-saint-germain'),
    colors: [
      { name: 'Xadrez Verde Floresta & Navy', hex: '#223632' },
      { name: 'Tartan Noturno', hex: '#192825' }
    ],
    sizes: ['34', '36', '38', '40', '42'],
    composition: '100% Pura Lã Penteada Tartan Escocês Tradicional',
    care: 'Lavagem a seco em lavanderia especializada.',
    details: [
      'Padrão histórico Black Watch de altíssima fidelidade',
      'Fenda posterior com transpasse reforçado',
      'Cós alto anatômico que molda a linha da cintura'
    ],
    stockStatus: 'Últimas 2 peças',
    completeLookIds: ['sueter-saint-paul', 'camisa-saint-germain', 'boina-saint-germain'],
    styleNote: 'Harmoniza perfeitamente com sapatos mocassim de couro polido e bolsa tiracolo.'
  },

  // ==========================================
  // 4. VESTIDOS
  // ==========================================
  {
    id: 'vestido-madeleine',
    name: 'Vestido Madeleine',
    frenchSubtitle: 'Robe midi noire à taille marquée et boutonnage rétro',
    category: 'Vestidos',
    price: 780,
    originalPrice: 890,
    description: 'Vestido midi preto em crepe nobre de lã com cintura bem marcada por cinto forrado no mesmo tecido. Decote fechado elegante com gola discreta, mangas longas estruturadas e saia com pregas amplas.',
    story: 'Um clássico absoluto da elegância parisiense atemporal. Idealizado para um chá da tarde na Place de la Madeleine seguido de concerto no Palais Garnier.',
    images: getProductGallery('vestido-madeleine'),
    colors: [
      { name: 'Preto Ébano Parisiense', hex: '#1C1B1B' },
      { name: 'Preto Carvão Sóbrio', hex: '#232222' }
    ],
    sizes: ['34', '36', '38', '40', '42'],
    composition: '80% Lã Crepe de Alfaiataria, 20% Seda; Forro: 100% Cupro',
    care: 'Lavagem a seco profissional.',
    details: [
      'Cinto largo com fivela retangular revestida artesanalmente',
      'Fileira de pequenos botões de madrepérola preta no busto',
      'Bolsos laterais invisíveis na costura da saia'
    ],
    stockStatus: 'Em estoque',
    isBestseller: true,
    completeLookIds: ['boina-saint-germain', 'lenco-paris', 'bolsa-rive-gauche'],
    styleNote: 'Complete com o lenço de seda Paris amarrado ao pescoço para um contraste sofisticado de cores.'
  },
  {
    id: 'vestido-montmartre',
    name: 'Vestido Montmartre',
    frenchSubtitle: 'Robe romantique à imprimé fleuri champêtre sur fond crème',
    category: 'Vestidos',
    price: 740,
    description: 'Vestido romântico de mangas longas com delicada estampa floral miúda sobre fundo creme manteiga. Punhos ajustados com abotoamento de pérola, cintura franzida com elastex macio e comprimento midi esvoaçante.',
    story: 'Remete aos quadros impressionistas e às flores frescas vendidas nas calçadas do Marché aux Fleurs da Île de la Cité.',
    images: getProductGallery('vestido-montmartre'),
    colors: [
      { name: 'Floral Vintage Creme & Vinho', hex: '#F1E8DC', border: true },
      { name: 'Floral Areia & Carmim', hex: '#E6DC CE', border: true }
    ],
    sizes: ['PP', 'P', 'M', 'G'],
    composition: '100% Crepe de Chine de Seda Pura; Forro: 100% Viscose leve',
    care: 'Lavagem a seco delicada ou à mão em temperatura ambiente com shampoo de seda.',
    details: [
      'Estampa botânica exclusiva com rosas silvestres e folhagens secas',
      'Mangas bufantes discretas com drapeado suave no ombro',
      'Decote em lágrima com cordão de amarração na nuca'
    ],
    stockStatus: 'Em estoque',
    isNew: true,
    completeLookIds: ['cardigan-luxembourg', 'boina-montmartre', 'bolsa-rive-gauche'],
    styleNote: 'Fica adorável com o cardigan de tricô creme Luxembourg por cima nos dias de brisa fresca.'
  },
  {
    id: 'vestido-odeon',
    name: 'Vestido Odéon',
    frenchSubtitle: 'Robe-chemise en laine à carreaux bordeaux et noisette',
    category: 'Vestidos',
    price: 760,
    description: 'Vestido-camisa confeccionado em lã macia com padronagem xadrez em tons de vinho bordô, avelã e marrom quente. Colarinho clássico entretelado, carcela frontal com botões e saia evasê plissada.',
    story: 'Inspirado nos almoços literários da Rue de l’Odéon e na sofisticação austera das leitoras parisienses dos anos 80.',
    images: getProductGallery('vestido-odeon'),
    colors: [
      { name: 'Xadrez Vinho & Marrom Avelã', hex: '#5E342F' },
      { name: 'Tartan Terracota Quente', hex: '#6F3E35' }
    ],
    sizes: ['34', '36', '38', '40', '42'],
    composition: '100% Lã Fria Tartan de Toque Acetinado',
    care: 'Lavagem a seco especializada.',
    details: [
      'Botões de corozo castanho alinhados artesanalmente com a padronagem',
      'Cinto de amarrar destacável com pontas pespontadas',
      'Mangas com punho estruturado que podem ser dobradas na altura do antebraço'
    ],
    stockStatus: 'Em estoque',
    completeLookIds: ['boina-montmartre', 'bolsa-rive-gauche'],
    styleNote: 'Um clássico completo: vista com a boina vinho Montmartre e mocassins conhaque.'
  },
  {
    id: 'vestido-luxembourg',
    name: 'Vestido Luxembourg',
    frenchSubtitle: 'Robe de tailleur bleu marine à col claudine blanc contrasté',
    category: 'Vestidos',
    price: 720,
    description: 'Vestido de corte reto em sarja de lã azul-marinho com delicada gola branca em popeline de algodão destacada. Silhueta preppy francesa nostálgica, mangas 3/4 e acabamento impecável.',
    story: 'Um ícone de elegância juvenil aristocrática, inspirado nas estudantes dos colégios tradicionais do 6º arrondissement de Paris.',
    images: getProductGallery('vestido-luxembourg'),
    colors: [
      { name: 'Azul-Marinho com Gola Branca', hex: '#19243A' }
    ],
    sizes: ['34', '36', '38', '40', '42'],
    composition: '85% Lã Virgem, 15% Seda; Gola: 100% Algodão Egípcio Popeline',
    care: 'Lavagem a seco para preservar o contraste entre o azul marinho e o branco puro da gola.',
    details: [
      'Gola Peter Pan contrastante alva com costura minuciosa de alta precisão',
      'Pequeno laço de gorgurão removível sob o colarinho',
      'Zíper invisível dorsal e forro completo em cetim antiestático'
    ],
    stockStatus: 'Em estoque',
    completeLookIds: ['boina-saint-germain', 'bolsa-rive-gauche'],
    styleNote: 'O visual definitivo da garota parisiense dos anos 1980.'
  },
  {
    id: 'vestido-saint-paul',
    name: 'Vestido Saint-Paul',
    frenchSubtitle: 'Robe droite en tissu de laine vert mousse façonné',
    category: 'Vestidos',
    price: 750,
    description: 'Vestido em tecido nobre de pura lã verde-musgo com caimento reto estruturado. Decote canoa limpo, mangas compridas com caseados funcionais e fenda posterior elegante.',
    story: 'Uma homenagem à simplicidade geométrica e aos tons florestais da arquitetura renascentista da Place Royale.',
    images: getProductGallery('vestido-saint-paul'),
    colors: [
      { name: 'Verde-Musgo Floresta', hex: '#31422E' },
      { name: 'Verde Oliva Escuro', hex: '#2A3828' }
    ],
    sizes: ['34', '36', '38', '40', '42'],
    composition: '100% Lã Pura Penteada Encorpada; Forro: 100% Viscose Bemberg',
    care: 'Lavagem especializada a seco.',
    details: [
      'Pences diagonais que desenham o busto com elegância discreta',
      'Bolsos laterais embutidos com reforço interno',
      'Comprimento logo abaixo do joelho para proporcionalidade perfeita'
    ],
    stockStatus: 'Últimas 2 peças',
    completeLookIds: ['lenco-paris', 'boina-saint-germain', 'bolsa-rive-gauche'],
    styleNote: 'Use com o lenço de seda estampado Paris ao redor do pescoço para quebrar a monocromia verde com classe.'
  },

  // ==========================================
  // 5. CAMISAS E BLUSAS
  // ==========================================
  {
    id: 'camisa-saint-germain',
    name: 'Camisa Saint-Germain',
    frenchSubtitle: 'Chemise en popeline de coton égyptien blanche à col classique',
    category: 'Camisas',
    price: 420,
    description: 'Camisa branca clássica confeccionada em popeline de algodão egípcio de fibra longa. Gola clássica perfeitamente entretelada, botões de madrepérola legítima e punhos franceses refinados.',
    story: 'A peça fundamental de qualquer guarda-roupa parisiense respeitável. Impecável sob blazers de tweed ou cardigans de tricô.',
    images: getProductGallery('camisa-saint-germain'),
    colors: [
      { name: 'Branco Alvo Engomado', hex: '#FFFFFF', border: true },
      { name: 'Branco Seda Natural', hex: '#F8F6F1', border: true }
    ],
    sizes: ['34', '36', '38', '40', '42'],
    composition: '100% Algodão Egípcio Giza 87 Fio 120/2 de Altíssima Densidade',
    care: 'Lavar em água fria ou morna. Passar a ferro em alta temperatura com vapor e goma leve de alfaiate.',
    details: [
      'Colarinho clássico francês com barbelas removíveis de latão',
      'Caseados de precisão com fio de seda encerado',
      'Fralda curva tradicional que permanece firme dentro da saia ou calça'
    ],
    stockStatus: 'Em estoque',
    isBestseller: true,
    completeLookIds: ['blazer-saint-germain', 'saia-rive-gauche', 'boina-saint-germain'],
    styleNote: 'A base obrigatória para qualquer combinação com blazers ou cardigans de lã.'
  },
  {
    id: 'camisa-rivoli',
    name: 'Camisa Rivoli',
    frenchSubtitle: 'Chemise rayée bâton bleu ciel et blanc en fil-à-fil',
    category: 'Camisas',
    price: 440,
    description: 'Camisa com padronagem listrada bengala em azul celeste e branco puro. Modelagem tradicional com prega macho nas costas, colarinho estruturado e punhos com botão duplo.',
    story: 'Inspirada nos passeios matinais sob os arcos da Rue de Rivoli e nas camisarias artesanais das passagens cobertas de Paris.',
    images: getProductGallery('camisa-rivoli'),
    colors: [
      { name: 'Listrado Azul & Branco', hex: '#587FA8' },
      { name: 'Listrado Celeste Suave', hex: '#779BC2' }
    ],
    sizes: ['34', '36', '38', '40', '42'],
    composition: '100% Algodão Puro Fio Tinto',
    care: 'Lavagem em máquina em ciclo normal. Passar a ferro com vapor.',
    details: [
      'Listras milimétricas tecidas no próprio tear (não estampadas)',
      'Prega macho dorsal que garante liberdade total de movimentos',
      'Abotoamento frontal embutido para visual mais clean'
    ],
    stockStatus: 'Em estoque',
    completeLookIds: ['blazer-rive-gauche', 'sueter-saint-paul', 'saia-saint-germain'],
    styleNote: 'Deixe o colarinho e os punhos listrados escaparem por baixo do suéter navy Saint-Paul.'
  },
  {
    id: 'blusa-montmartre',
    name: 'Blusa Montmartre',
    frenchSubtitle: 'Blouse en crêpe de soie écru à col Peter Pan festonné',
    category: 'Camisas',
    price: 450,
    description: 'Blusa fluida na tonalidade creme porcelana com delicada gola Peter Pan de bordas arredondadas e sutis pregas no peito. Caimento macio e poético com mangas suavemente volumosas.',
    story: 'Captura a ingenuidade boêmia das musas dos pintores impressionistas e o charme nostálgico dos cabarés literários.',
    images: getProductGallery('blusa-montmartre'),
    colors: [
      { name: 'Creme Porcelana Suave', hex: '#F7F2E6', border: true },
      { name: 'Marfim Amendoado', hex: '#ECE4D4', border: true }
    ],
    sizes: ['34', '36', '38', '40', '42'],
    composition: '100% Crepe de Seda Natural de Caimento Líquido',
    care: 'Lavagem a seco ou manual com produto neutro para tecidos nobres.',
    details: [
      'Gola Peter Pan estruturada com vivo delicado costurado à mão',
      'Três pregas verticais frontais que alongam suavemente a silhueta',
      'Punhos fechados com botões encapados no próprio tecido de seda'
    ],
    stockStatus: 'Em estoque',
    isNew: true,
    completeLookIds: ['cardigan-montmartre', 'saia-luxembourg', 'boina-montmartre'],
    styleNote: 'Combine com o Cardigan Montmartre aberto e a saia de veludo caramelo.'
  },
  {
    id: 'blusa-marais',
    name: 'Blusa Marais',
    frenchSubtitle: 'Chemisier col montant en viscose satinée bordeaux',
    category: 'Camisas',
    price: 460,
    description: 'Blusa sofisticada em tom vinho bordô profundo com elegante gola alta (mock neck) drapeada. Tecido de viscose nobre com toque acetinado, mangas longas bufantes nos ombros e caimento fluido.',
    story: 'Um tributo à elegância misteriosa das noites de outono no Marais e às leituras dramáticas nos salões particulares parisienses.',
    images: getProductGallery('blusa-marais'),
    colors: [
      { name: 'Vinho Merlot Profundo', hex: '#581925' },
      { name: 'Borgonha Escuro', hex: '#44111C' }
    ],
    sizes: ['34', '36', '38', '40', '42'],
    composition: '100% Viscose com Acabamento Acetinado Japonês',
    care: 'Lavar em água fria pelo avesso. Não usar secadora.',
    details: [
      'Gola alta ajustável com fecho discreto de três botões forrados na nuca',
      'Ombros suavemente franzidos para criar volume anos 80 controlado',
      'Barra reta projetada para uso tanto por dentro quanto por fora da saia'
    ],
    stockStatus: 'Em estoque',
    completeLookIds: ['blazer-marais', 'saia-marais', 'bolsa-rive-gauche'],
    styleNote: 'Use com a saia de lã cinza Marais para criar um contraste de texturas rico entre o brilho do cetim e a rusticidade da flanela.'
  },

  // ==========================================
  // 6. CASACOS
  // ==========================================
  {
    id: 'trench-coat-paris',
    name: 'Trench Coat Paris',
    frenchSubtitle: 'Imperméable emblématique double boutonnage en gabardine beige',
    category: 'Casacos',
    price: 1280,
    originalPrice: 1450,
    description: 'O clássico absoluto das calçadas de Paris. Confeccionado em gabardine pesada de algodão hidrorrepelente na icônica tonalidade bege areia. Abotoamento duplo, pala nas costas, fivela nos punhos e cinto estruturado com argolas em D metálicas.',
    story: 'Criado para resistir à chuva fina de novembro sobre as pontes do Sena com o charme cinematográfico de Catherine Deneuve.',
    images: getProductGallery('trench-coat-paris'),
    colors: [
      { name: 'Bege Gabardine Paris', hex: '#C7B49B' },
      { name: 'Areia Claro Desértico', hex: '#D8C7B0' }
    ],
    sizes: ['34', '36', '38', '40', '42'],
    composition: '100% Algodão Gabardine com Tratamento Hidrorrepelente; Forro: 100% Algodão Xadrez Vintage',
    care: 'Lavagem especializada a seco.',
    details: [
      'Pala de proteção frontal contra vento e pala traseira de tempestade',
      'Botões imponentes de chifre escuro com brasão gravado',
      'Fivelas de couro legítimo revestidas manualmente nos punhos e na cintura',
      'Comprimento abaixo do joelho para proteção completa e silhueta dramática'
    ],
    stockStatus: 'Em estoque',
    isBestseller: true,
    completeLookIds: ['sueter-odeon', 'saia-luxembourg', 'lenco-paris', 'bolsa-rive-gauche'],
    styleNote: 'Amarre a faixa na cintura com um nó despojado sem fechar a fivela para o verdadeiro jeito parisiense de vestir.'
  },
  {
    id: 'sobretudo-montparnasse',
    name: 'Sobretudo Montparnasse',
    frenchSubtitle: 'Manteau long ceinturé en pure laine couleur camel',
    category: 'Casacos',
    price: 1450,
    description: 'Sobretudo longo em pura lã batida pesada na requintada cor camel conhaque. Ombros ligeiramente estruturados, lapela notched generosa e cinto na mesma lã para ajustar a silhueta com suntuosidade.',
    story: 'Inspirado nos invernos rigorosos e no glamour sóbrio dos grandes bulevares de Montparnasse nos anos 80.',
    images: getProductGallery('sobretudo-montparnasse'),
    colors: [
      { name: 'Camel Conhaque Nobre', hex: '#996C41' },
      { name: 'Marrom Caramelo Aquecido', hex: '#825732' }
    ],
    sizes: ['34', '36', '38', '40', '42'],
    composition: '100% Pura Lã Virgem Batida Encorpada (peso 580g/m²); Forro: 100% Cupro Bemberg',
    care: 'Lavagem a seco em lavanderia especializada.',
    details: [
      'Isolamento térmico excepcional sem perder a elegância da alfaiataria',
      'Fenda traseira ampla para liberdade total ao caminhar a passos largos',
      'Bolsos profundos forrados com flanela quente para aquecer as mãos'
    ],
    stockStatus: 'Em estoque',
    completeLookIds: ['sueter-latin-quarter', 'saia-saint-germain', 'boina-saint-germain'],
    styleNote: 'Um investimento para a vida toda. Fica magnífico sobre qualquer vestido ou combinação de alfaiataria.'
  },
  {
    id: 'casaco-rive-gauche',
    name: 'Casaco KVANORI',
    frenchSubtitle: 'Manteau d’hiver en drap de laine tartan écossais',
    category: 'Casacos',
    price: 1380,
    description: 'Casaco invernal confeccionado em lã encorpada com padronagem xadrez rica em tons de terra, ocre, conhaque e carvão. Modelagem casulo aconchegante com abotoamento duplo e gola que pode ser usada em pé.',
    story: 'Uma homenagem aos passeios dominicais pelo cais de livros de arte e gravuras antigas ao longo do Sena.',
    images: getProductGallery('casaco-rive-gauche'),
    colors: [
      { name: 'Xadrez Terra & Conhaque', hex: '#4C3F3A' },
      { name: 'Tartan Cinza & Carvão', hex: '#584E49' }
    ],
    sizes: ['34', '36', '38', '40', '42'],
    composition: '90% Lã Rústica, 10% Caxemira; Forro: 100% Cetim de Seda',
    care: 'Lavagem profissional a seco.',
    details: [
      'Drap de lã espesso com toque aveludado e isolamento máximo',
      'Gola transformável que fecha até o pescoço com botão oculto',
      'Abotoamento duplo com seis botões de osso esculpido'
    ],
    stockStatus: 'Últimas 2 peças',
    completeLookIds: ['sueter-saint-paul', 'saia-marais', 'boina-montmartre', 'bolsa-rive-gauche'],
    styleNote: 'Equilibre o volume generoso do casaco com peças retas por baixo e meias de lã com sapatos clássicos.'
  },

  // ==========================================
  // 7. ACESSÓRIOS
  // ==========================================
  {
    id: 'boina-saint-germain',
    name: 'Boina Saint-Germain',
    frenchSubtitle: 'Béret basque traditionnel en feutre de pure laine noire',
    category: 'Boinas',
    price: 260,
    description: 'Boina basca tradicional confeccionada no sul da França em feltro de 100% pura lã virgem preta impermeabilizada. Aba interna ajustada com acabamento em couro legítimo fino e o clássico cabichou (pequeno rabicho) no topo.',
    story: 'O símbolo imortal do intelectual e artista parisiense, imortalizado por Simone de Beauvoir e Juliette Gréco nos porões de jazz de Saint-Germain.',
    images: getProductGallery('boina-saint-germain'),
    colors: [
      { name: 'Preto Basco Autêntico', hex: '#161515' },
      { name: 'Preto Meia-Noite Profundo', hex: '#1C1C20' }
    ],
    sizes: ['Único (Ajustável de 55cm a 59cm)'],
    composition: '100% Pura Lã Virgem Francesa Feltrada; Borda interna: 100% Couro de Carneiro',
    care: 'Escovar suavemente com escova de cerdas naturais. Não molhar excessivamente. Secar à sombra.',
    details: [
      'Feltro denso e moldável que se adapta ao formato da cabeça com o uso',
      'Tratamento repelente à água e ao vento tradicional',
      'Diâmetro generoso de 28cm para inclinação lateral teatral'
    ],
    stockStatus: 'Em estoque',
    isBestseller: true,
    completeLookIds: ['blazer-saint-germain', 'camisa-saint-germain', 'saia-rive-gauche'],
    styleNote: 'Use levemente inclinada para a direita com alguns fios de cabelo soltos emoldurando o rosto.'
  },
  {
    id: 'boina-montmartre',
    name: 'Boina Montmartre',
    frenchSubtitle: 'Béret d’artiste en laine feutrée couleur bordeaux profond',
    category: 'Boinas',
    price: 260,
    description: 'Boina de feltro de lã pura francesa na apaixonante tonalidade vinho bordô. Toque aveludado denso, costura artesanal sem emendas externas visíveis e ajuste firme e confortável.',
    story: 'Evoca o espírito lírico dos pintores de Montmartre e a energia criativa dos anos 1980 na capital da moda.',
    images: getProductGallery('boina-montmartre'),
    colors: [
      { name: 'Vinho Bordô Parisiense', hex: '#581924' },
      { name: 'Carmim Profundo', hex: '#68202C' }
    ],
    sizes: ['Único (Ajustável de 55cm a 59cm)'],
    composition: '100% Pura Lã Francesa Mérinos d’Arles',
    care: 'Limpar apenas a seco ou escovar delicadamente com escova macia.',
    details: [
      'Tingimento artesanal que mantém a profundidade da cor bordô por décadas',
      'Forro interno em cetim de seda jacquard com motivo floral KVANORI',
      'Resistente a respingos e frio intenso'
    ],
    stockStatus: 'Em estoque',
    completeLookIds: ['cardigan-montmartre', 'vestido-montmartre', 'lenco-paris'],
    styleNote: 'Dá um ponto focal de cor magnífico a qualquer casaco preto, camel ou cinza.'
  },
  {
    id: 'lenco-paris',
    name: 'Lenço Paris',
    frenchSubtitle: 'Carré de soie roulotté main à motif géométrique vintage',
    category: 'Lenços',
    price: 340,
    description: 'Carré em pura sarja de seda 14 momme com padronagem geométrica vintage inspirada nas composições gráficas dos anos 80 em tons de vinho, mostarda dourada, azul-marinho e creme. Bordas enroladas e costuradas à mão (roulotté).',
    story: 'Um tesouro de seda desenhado nos ateliês têxteis de Lyon, evocando os labirintos dos Jardins des Tuileries.',
    images: getProductGallery('lenco-paris'),
    colors: [
      { name: 'Geométrico Vinho, Dourado & Marinho', hex: '#6D2533' },
      { name: 'Terracota & Creme Antigo', hex: '#944B3A' }
    ],
    sizes: ['90cm x 90cm'],
    composition: '100% Pura Sarja de Seda de Amoreira (14 Mommes)',
    care: 'Lavagem profissional a seco ou manual em água fria com sabão líquido suave para sedas.',
    details: [
      'Acabamento manual de alta costura com bainha roulotté de 4mm',
      'Estamparia em quadro tradicional com nitidez impecável em ambos os lados',
      'Dimensão clássica 90x90cm ideal para múltiplos nós franceses'
    ],
    stockStatus: 'Em estoque',
    isBestseller: true,
    completeLookIds: ['blazer-montparnasse', 'trench-coat-paris', 'bolsa-rive-gauche'],
    styleNote: 'Dobre em triângulo e amarre com nó frouxo no decote do casaco ou amarre na alça da sua bolsa de couro.'
  },
  {
    id: 'bolsa-rive-gauche',
    name: 'Bolsa KVANORI',
    frenchSubtitle: 'Sac besace structuré en cuir marron tanné végétal à boucle dorée',
    category: 'Bolsas',
    price: 890,
    originalPrice: 1050,
    description: 'Bolsa estruturada em couro legítimo bovino marrom conhaque com curtimento vegetal ecológico. Formato de pasta clássica dos anos 80 com fecho frontal dourado em latão escovado, alça a tiracolo ajustável e compartimentos internos forrados.',
    story: 'A fiel companheira das caminhadas literárias pelas margens do Sena. Espaçosa o suficiente para um caderno moleskine, óculos de tartaruga e livros de poesia.',
    images: getProductGallery('bolsa-rive-gauche'),
    colors: [
      { name: 'Couro Conhaque Envelhecido', hex: '#6F4125' },
      { name: 'Couro Marrom Café Profundo', hex: '#482D20' }
    ],
    sizes: ['26cm (largura) x 20cm (altura) x 8cm (profundidade)'],
    composition: '100% Couro Bovino Calfskin Flor Integral com Curtimento Vegetal; Forro: 100% Sarja de Algodão Cru',
    care: 'Hidratar periodicamente com cera de abelha ou creme específico para couros nobres.',
    details: [
      'Ferragens em latão sólido fundido com banho de ouro envelhecido',
      'Costura pespontada reforçada com linha de algodão encerado',
      'Bolso traseiro externo para acesso rápido e bolso interno com zíper'
    ],
    stockStatus: 'Em estoque',
    isBestseller: true,
    completeLookIds: ['blazer-saint-germain', 'trench-coat-paris', 'saia-rive-gauche'],
    styleNote: 'Um acessório definitivo que envelhece ganhando pátina e personalidade ao longo das décadas.'
  }
];

export const CATEGORIES_LIST: { id: string; name: Category; count: number; image: string }[] = [
  {
    id: 'blazers',
    name: 'Blazers',
    count: 4,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cardigans',
    name: 'Cardigans & Suéteres',
    count: 5,
    image: '/src/assets/images/category_knitwear_editorial_1790164841496.jpg'
  },
  {
    id: 'camisas',
    name: 'Camisas',
    count: 4,
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'saias',
    name: 'Saias',
    count: 5,
    image: '/src/assets/images/look_french_preppy_silhouette_1790164828265.jpg'
  },
  {
    id: 'vestidos',
    name: 'Vestidos',
    count: 5,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'casacos',
    name: 'Casacos',
    count: 3,
    image: '/src/assets/images/editorial_carnet_paris_cafe_1790164857930.jpg'
  },
  {
    id: 'boinas',
    name: 'Boinas',
    count: 2,
    image: 'https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'lencos',
    name: 'Lenços',
    count: 1,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'bolsas',
    name: 'Bolsas',
    count: 1,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop'
  }
];
