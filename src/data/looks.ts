import { LookSilhouette } from '../types';

export const LOOKS_COLLECTION: LookSilhouette[] = [
  {
    id: 'silhouette-saint-germain',
    title: 'La Silhouette Saint-Germain',
    subtitle: 'O clássico French Ivy & Preppy de 1986',
    location: 'Café de Flore, Boulevard Saint-Germain',
    description: 'A quintessência do estilo KVANORI: alfaiataria em tweed marrom estruturado sobreposta à camisa branca de popeline egípcio, saia midi plissada em lã xadrez com caimento dinâmico, boina basca de feltro preto inclinada e bolsa estruturada em couro legítimo.',
    image: '/src/assets/images/hero_paris_1986_editorial_1790164814011.jpg',
    productIds: [
      'blazer-saint-germain',
      'camisa-saint-germain',
      'saia-rive-gauche',
      'boina-saint-germain',
      'bolsa-rive-gauche'
    ],
    tags: ['Tweed Francês', 'Tartan Xadrez', 'Alfaiataria Intelectual', 'Boina Basca']
  },
  {
    id: 'silhouette-montparnasse',
    title: 'La Promenade d’Automne',
    subtitle: 'Elegância sob a brisa parisiense',
    location: 'Pont des Arts & Rue Bonaparte',
    description: 'Construída para os dias frescos de outubro. O trench coat clássico de gabardine repelente à água sobrepõe o suéter macio de lã e alpaca gola alta, com a rica textura do veludo cotelê caramelo na saia Luxembourg e o toque nobre do lenço de seda pura.',
    image: '/src/assets/images/look_french_preppy_silhouette_1790164828265.jpg',
    productIds: [
      'trench-coat-paris',
      'sueter-odeon',
      'saia-luxembourg',
      'lenco-paris',
      'bolsa-rive-gauche'
    ],
    tags: ['Trench Coat', 'Alpaca Gola Alta', 'Veludo Cotelê', 'Seda Pura']
  },
  {
    id: 'silhouette-pantheon',
    title: 'L’Élégance Académique',
    subtitle: 'A intelectualidade poética da Sorbonne',
    location: 'Bibliothèque Sainte-Geneviève, Quartier Latin',
    description: 'Um diálogo harmonioso entre o corte nobre do blazer azul-marinho com botões heráldicos dourados, as listras finas da camisa Rivoli, a saia plissada soleil e a boina basca de feltro.',
    image: '/src/assets/images/editorial_carnet_paris_cafe_1790164857930.jpg',
    productIds: [
      'blazer-rive-gauche',
      'camisa-rivoli',
      'saia-montmartre',
      'boina-saint-germain',
      'bolsa-rive-gauche'
    ],
    tags: ['Navy & Dourado', 'Listras Bengala', 'Plissado Soleil', 'Boina Basca']
  },
  {
    id: 'silhouette-luxembourg',
    title: 'Le Dimanche au Luxembourg',
    subtitle: 'Conforto aristocrático e toque artesanal',
    location: 'Jardin du Luxembourg & Allée des Reines',
    description: 'A delicadeza do cardigan de lã merino artesanal na tonalidade vinho bordô envolvendo o vestido midi floral romântico sobre fundo creme, pontuado pela boina de lã pura e o lenço de seda estampado.',
    image: '/src/assets/images/category_knitwear_editorial_1790164841496.jpg',
    productIds: [
      'cardigan-montmartre',
      'vestido-montmartre',
      'boina-montmartre',
      'lenco-paris'
    ],
    tags: ['Lã Merino', 'Vestido Floral Vinho', 'Boina Francesa', 'Carré de Seda']
  }
];
