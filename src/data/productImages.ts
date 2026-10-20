/**
 * RIVE GAUCHE (PARIS, 1986) - Registre Central d'Images & Direction Artistique
 * 
 * Arquitetura de gerenciamento exclusivo de imagens por produto.
 * Cada peça possui uma URL principal única e galeria secundária própria,
 * associada ao conceito editorial analógico parisiense dos anos 1980.
 * 
 * Para substituir as imagens no futuro por fotos reais da marca ou CDN dedicado,
 * basta alterar os links neste arquivo, sem necessidade de modificar componentes de UI.
 */

export interface ProductVisualRecord {
  id: string;
  name: string;
  category: string;
  primary: string;
  gallery: string[];
  editorialDirection: {
    location: string;
    setting: string;
    analogMood: string;
    modelNotes: string;
  };
}

export const PRODUCT_IMAGE_REGISTRY: Record<string, ProductVisualRecord> = {
  // 1. Blazer Saint-Germain
  'blazer-saint-germain': {
    id: 'blazer-saint-germain',
    name: 'Blazer Saint-Germain em Tweed',
    category: 'Blazers',
    primary: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=900&auto=format&fit=crop'
    ],
    editorialDirection: {
      location: 'Café de Flore, Boulevard Saint-Germain',
      setting: 'Mesa de bistrô em ferro fundido, luz dourada de fim de tarde de outono',
      analogMood: 'Filme 35mm granulado sutil, tons amadeirados e café',
      modelNotes: 'Postura clássica intelectual, jornal Le Monde sob o braço'
    }
  },

  // 2. Blazer Montparnasse
  'blazer-montparnasse': {
    id: 'blazer-montparnasse',
    name: 'Blazer Montparnasse Príncipe de Gales',
    category: 'Blazers',
    primary: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=900&auto=format&fit=crop'
    ],
    editorialDirection: {
      location: 'Rue Campagne-Première, Montparnasse',
      setting: 'Fachada art déco de ateliê de pintor com janelões altos',
      analogMood: 'Contraste suave, iluminação difusa de dia nublado parisiense',
      modelNotes: 'Modelagem levemente oversized com lapelas notched estruturadas'
    }
  },

  // 3. Blazer KVANORI
  'blazer-rive-gauche': {
    id: 'blazer-rive-gauche',
    name: 'Blazer KVANORI Alfaiataria Navy',
    category: 'Blazers',
    primary: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=900&auto=format&fit=crop'
    ],
    editorialDirection: {
      location: 'Cour d’Honneur da Sorbonne, Quartier Latin',
      setting: 'Colunas de cantaria e degraus de pedra antiga',
      analogMood: 'Azul marinho profundo com reflexo dourado dos botões heráldicos',
      modelNotes: 'Elegância universitária francesa no estilo French Ivy 1986'
    }
  },

  // 4. Blazer Marais
  'blazer-marais': {
    id: 'blazer-marais',
    name: 'Blazer Marais em Tweed Verde-Musgo',
    category: 'Blazers',
    primary: 'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?q=80&w=900&auto=format&fit=crop'
    ],
    editorialDirection: {
      location: 'Place des Vosges, Le Marais',
      setting: 'Pátio com arcadas de tijolo vermelho e gramado outonal',
      analogMood: 'Verdes desaturados vintage, tons terra e hera úmida',
      modelNotes: 'Corte acinturado gracioso com textura encorpada de tweed'
    }
  },

  // 5. Cardigan Montmartre
  'cardigan-montmartre': {
    id: 'cardigan-montmartre',
    name: 'Cardigan Montmartre em Tricô Vinho',
    category: 'Cardigans & Suéteres',
    primary: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=900&auto=format&fit=crop'
    ],
    editorialDirection: {
      location: 'Rue des Saules, Montmartre',
      setting: 'Escadarias de paralelepípedos perto da vinha antiga de Montmartre',
      analogMood: 'Tons bordô ricos, calor da lã pura merino sob neblina matinal',
      modelNotes: 'Botões de madrepérola fechados até a metade, caimento solto'
    }
  },

  // 6. Cardigan Luxembourg
  'cardigan-luxembourg': {
    id: 'cardigan-luxembourg',
    name: 'Cardigan Luxembourg em Tricô Creme',
    category: 'Cardigans & Suéteres',
    primary: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=900&auto=format&fit=crop'
    ],
    editorialDirection: {
      location: 'Jardin du Luxembourg, perto da Fontaine Médicis',
      setting: 'Folhas amareladas caídas, cadeiras de ferro verde do jardim',
      analogMood: 'Branco creme luminoso e textura suave de trança artesanal',
      modelNotes: 'Aconchegante e refinado, mangas suavemente dobradas no punho'
    }
  },

  // 7. Suéter Saint-Paul
  'sueter-saint-paul': {
    id: 'sueter-saint-paul',
    name: 'Suéter Saint-Paul Gola V Navy',
    category: 'Cardigans & Suéteres',
    primary: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=900&auto=format&fit=crop'
    ],
    editorialDirection: {
      location: 'Village Saint-Paul, pátios de antiquários',
      setting: 'Estantes de livros de arte e relógios de época',
      analogMood: 'Azul náutico com acabamento canelado fino',
      modelNotes: 'Gola V esportiva-nobre com colarinho de camisa sobressaído'
    }
  },

  // 8. Suéter Odéon
  'sueter-odeon': {
    id: 'sueter-odeon',
    name: 'Suéter Odéon Gola Alta Bege',
    category: 'Cardigans & Suéteres',
    primary: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1475180098004-ca77a66827be?q=80&w=900&auto=format&fit=crop'
    ],
    editorialDirection: {
      location: 'Théâtre de l’Odéon, arcadas externas',
      setting: 'Paredes neoclássicas com cartazes de peças teatrais francesas',
      analogMood: 'Bege aveludado e sombras suaves no pescoço',
      modelNotes: 'Gola rolê estruturada dos poetas parisienses dos anos 80'
    }
  },

  // 9. Suéter Latin Quarter
  'sueter-latin-quarter': {
    id: 'sueter-latin-quarter',
    name: 'Suéter Latin Quarter Gola Redonda Verde',
    category: 'Cardigans & Suéteres',
    primary: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=900&auto=format&fit=crop'
    ],
    editorialDirection: {
      location: 'Livraria Shakespeare and Company, Quai de Montebello',
      setting: 'Pilhas de livros antigos e luz de abajur de latão',
      analogMood: 'Verde britânico clássico com lã escovada macia',
      modelNotes: 'Silhueta despojada acadêmica perfeita para tardes de leitura'
    }
  },

  // 10. Saia KVANORI
  'saia-rive-gauche': {
    id: 'saia-rive-gauche',
    name: 'Saia KVANORI Tartan Midi',
    category: 'Saias',
    primary: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=900&auto=format&fit=crop'
    ],
    editorialDirection: {
      location: 'Pont des Arts sobre o Rio Sena',
      setting: 'Vento soprando as pregas de lã com o Museu do Louvre ao fundo',
      analogMood: 'Xadrez nobre em marrom amadeirado e vinho borgonha',
      modelNotes: 'Cintura alta bem marcada com cinto de fivela artesanal'
    }
  },

  // 11. Saia Montmartre
  'saia-montmartre': {
    id: 'saia-montmartre',
    name: 'Saia Montmartre Plissada Azul-Marinho',
    category: 'Saias',
    primary: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=900&auto=format&fit=crop'
    ],
    editorialDirection: {
      location: 'Passage Choiseul, galeria coberta com cúpula de vidro',
      setting: 'Chão de mosaico e vitrines de alfarrabistas parisienses',
      analogMood: 'Plissado em leque fluido com reflexos de luz zenital',
      modelNotes: 'Movimento geométrico gracioso a cada passo'
    }
  },

  // 12. Saia Luxembourg
  'saia-luxembourg': {
    id: 'saia-luxembourg',
    name: 'Saia Luxembourg Veludo Cotelê Caramelo',
    category: 'Saias',
    primary: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?q=80&w=900&auto=format&fit=crop'
    ],
    editorialDirection: {
      location: 'Allée des Reines, Jardin du Luxembourg',
      setting: 'Estátuas de mármore e árvores com copas em degradê dourado',
      analogMood: 'Canelado aveludado profundo, tom caramelo conhaque quente',
      modelNotes: 'Linha A estruturada com botões frontais de tartaruga'
    }
  },

  // 13. Saia Marais
  'saia-marais': {
    id: 'saia-marais',
    name: 'Saia Marais Evasê em Lã Cinza',
    category: 'Saias',
    primary: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1582142306909-195724d33ffc?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1467043237213-65f2da53396f?q=80&w=900&auto=format&fit=crop'
    ],
    editorialDirection: {
      location: 'Hôtel de Sully, pátio renascentista no Marais',
      setting: 'Paredes de pedra calcária de Paris e portões de ferro batido',
      analogMood: 'Flanela cinza mescla com textura impecável de alfaiataria',
      modelNotes: 'Caimento suave que valoriza sapatos clássicos e mocassins'
    }
  },

  // 14. Saia Saint-Germain
  'saia-saint-germain': {
    id: 'saia-saint-germain',
    name: 'Saia Saint-Germain Xadrez Verde & Azul',
    category: 'Saias',
    primary: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=900&auto=format&fit=crop'
    ],
    editorialDirection: {
      location: 'Rue Bonaparte, antiquários e livrarias de arte',
      setting: 'Toldos de veludo escuro e vitrines com mapas antigos',
      analogMood: 'Tartan Black Watch em azul noturno e verde floresta',
      modelNotes: 'Cintura alta com acabamento sartorial e fenda discreta'
    }
  },

  // 15. Vestido Madeleine
  'vestido-madeleine': {
    id: 'vestido-madeleine',
    name: 'Vestido Madeleine Preto Midi',
    category: 'Vestidos',
    primary: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1495385794356-15371f348c31?q=80&w=900&auto=format&fit=crop'
    ],
    editorialDirection: {
      location: 'Place de la Madeleine, bistrô clássico parisiense',
      setting: 'Espelhos com molduras douradas e banquetas de couro escuro',
      analogMood: 'Preto acetinado sóbrio, silhueta escultural dos anos 80',
      modelNotes: 'Cintura bem marcada, gola limpa e comprimento abaixo do joelho'
    }
  },

  // 16. Vestido Montmartre
  'vestido-montmartre': {
    id: 'vestido-montmartre',
    name: 'Vestido Montmartre Floral Vintage',
    category: 'Vestidos',
    primary: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=900&auto=format&fit=crop'
    ],
    editorialDirection: {
      location: 'Rue Saint-Vincent, vinhedo de Montmartre',
      setting: 'Paredes de hera com flores silvestres secas sob o vento',
      analogMood: 'Estampa floral miúda em tons de rosa antigo e vinho sobre creme',
      modelNotes: 'Mangas longas com punhos ajustados e saia fluida romântica'
    }
  },

  // 17. Vestido Odéon
  'vestido-odeon': {
    id: 'vestido-odeon',
    name: 'Vestido Odéon Xadrez Vinho & Marrom',
    category: 'Vestidos',
    primary: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=900&auto=format&fit=crop'
    ],
    editorialDirection: {
      location: 'Rue de Condé, prédio haussmanniano com sacada de ferro',
      setting: 'Piso de taco em espinha e janelas francesas abertas',
      analogMood: 'Xadrez térmico outonal com paleta de conhaque e uva madura',
      modelNotes: 'Estruturado com abotoamento frontal e cinto combinando'
    }
  },

  // 18. Vestido Luxembourg
  'vestido-luxembourg': {
    id: 'vestido-luxembourg',
    name: 'Vestido Luxembourg Navy com Gola Branca',
    category: 'Vestidos',
    primary: 'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550639525-c97d455acf70?q=80&w=900&auto=format&fit=crop'
    ],
    editorialDirection: {
      location: 'Palais du Luxembourg, colunata externa',
      setting: 'Bustos em pedra e fontes decoradas com folhas outonais',
      analogMood: 'Contraste impecável entre o azul meia-noite e a gola alva',
      modelNotes: 'Inocência preppy parisiense com toque de alfaiataria estrita'
    }
  },

  // 19. Vestido Saint-Paul
  'vestido-saint-paul': {
    id: 'vestido-saint-paul',
    name: 'Vestido Saint-Paul em Lã Verde-Musgo',
    category: 'Vestidos',
    primary: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=900&auto=format&fit=crop'
    ],
    editorialDirection: {
      location: 'Cour Saint-Paul, pátio interno com calçamento histórico',
      setting: 'Lanternas francesas de ferro e hera nas paredes',
      analogMood: 'Lã encorpada de caimento nobre em verde oliva e musgo',
      modelNotes: 'Linhas retas com pences sutis, ideal para sobreposição de lenços'
    }
  },

  // 20. Camisa Saint-Germain
  'camisa-saint-germain': {
    id: 'camisa-saint-germain',
    name: 'Camisa Saint-Germain Popeline Branca',
    category: 'Camisas',
    primary: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551803091-e20673f15770?q=80&w=900&auto=format&fit=crop'
    ],
    editorialDirection: {
      location: 'Brasserie Lipp, Boulevard Saint-Germain',
      setting: 'Paredes de azulejos cerâmicos pintados à mão de 1900',
      analogMood: 'Popeline de algodão branco nítido com brilho discreto',
      modelNotes: 'Colarinho francês estruturado para usar sob blazers e cardigans'
    }
  },

  // 21. Camisa Rivoli
  'camisa-rivoli': {
    id: 'camisa-rivoli',
    name: 'Camisa Rivoli Listrada Azul & Branca',
    category: 'Camisas',
    primary: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=900&auto=format&fit=crop'
    ],
    editorialDirection: {
      location: 'Arcadas da Rue de Rivoli, em frente ao Jardim das Tulherias',
      setting: 'Pilastras monumentais e luz da manhã refletida no chão',
      analogMood: 'Listras milimétricas bengala em azul celeste e branco puro',
      modelNotes: 'Abotoamento com punhos franceses elegantes e descontraídos'
    }
  },

  // 22. Blusa Montmartre
  'blusa-montmartre': {
    id: 'blusa-montmartre',
    name: 'Blusa Montmartre Creme Gola Peter Pan',
    category: 'Camisas',
    primary: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=900&auto=format&fit=crop'
    ],
    editorialDirection: {
      location: 'Place du Tertre, estúdio de pintura histórico',
      setting: 'Cavaletes de madeira, tubos de tinta a óleo e telas aveludadas',
      analogMood: 'Crepe de seda creme suave com caimento poético',
      modelNotes: 'Gola Peter Pan arredondada com vivo delicado contrastante'
    }
  },

  // 23. Blusa Marais
  'blusa-marais': {
    id: 'blusa-marais',
    name: 'Blusa Marais Vinho Gola Alta',
    category: 'Camisas',
    primary: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=900&auto=format&fit=crop'
    ],
    editorialDirection: {
      location: 'Rue des Francs-Bourgeois, Hôtel Particulier',
      setting: 'Portas de carvalho maciço e luminárias de latão polido',
      analogMood: 'Tom merlot profundo, toque acetinado de viscose nobre',
      modelNotes: 'Gola alta drapeada com pequenos botões forrados na nuca'
    }
  },

  // 24. Trench Coat Paris
  'trench-coat-paris': {
    id: 'trench-coat-paris',
    name: 'Trench Coat Paris em Gabardine Bege',
    category: 'Casacos',
    primary: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=900&auto=format&fit=crop'
    ],
    editorialDirection: {
      location: 'Pont Alexandre III sob garoa fina de outono',
      setting: 'Luminárias ornamentais, Rio Sena cinzento e névoa suave',
      analogMood: 'Gabardine bege areia clássica, repelente com caimento pesado',
      modelNotes: 'Faixa amarrada displicentemente na cintura, colarinho erguido'
    }
  },

  // 25. Sobretudo Montparnasse
  'sobretudo-montparnasse': {
    id: 'sobretudo-montparnasse',
    name: 'Sobretudo Montparnasse em Lã Camel',
    category: 'Casacos',
    primary: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=900&auto=format&fit=crop'
    ],
    editorialDirection: {
      location: 'Boulevard du Montparnasse, diante de La Coupole',
      setting: 'Fachadas noturnas parisienses e bancos públicos de madeira',
      analogMood: 'Pura lã batida encorpada em tom camel dourado',
      modelNotes: 'Comprimento midi longo e imponente com ombreiras clássicas 1986'
    }
  },

  // 26. Casaco KVANORI
  'casaco-rive-gauche': {
    id: 'casaco-rive-gauche',
    name: 'Casaco KVANORI em Lã Xadrez',
    category: 'Casacos',
    primary: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544441892-794166f1e3be?q=80&w=900&auto=format&fit=crop'
    ],
    editorialDirection: {
      location: 'Quai de la Tournelle, margens do Sena',
      setting: 'Barcaças ancoradas e árvores plátano com folhas em tons de cobre',
      analogMood: 'Tartan de lã grossa em marrom terra, ocre e carvão',
      modelNotes: 'Abotoamento duplo com botões grandes de osso entalhado'
    }
  },

  // 27. Boina Saint-Germain
  'boina-saint-germain': {
    id: 'boina-saint-germain',
    name: 'Boina Saint-Germain em Feltro Preto',
    category: 'Boinas',
    primary: 'https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=900&auto=format&fit=crop'
    ],
    editorialDirection: {
      location: 'Place Saint-Germain-des-Prés, em frente à igreja românica',
      setting: 'Pombos parisienses e mesas externas de bistrô',
      analogMood: 'Feltro de lã pura francesa preto profundo, textura aveludada',
      modelNotes: 'Inclinada na diagonal com mecha de cabelo castanho à mostra'
    }
  },

  // 28. Boina Montmartre
  'boina-montmartre': {
    id: 'boina-montmartre',
    name: 'Boina Montmartre em Feltro Vinho',
    category: 'Boinas',
    primary: 'https://images.unsplash.com/photo-1534126511673-b6899657816a?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1534126511673-b6899657816a?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?q=80&w=900&auto=format&fit=crop'
    ],
    editorialDirection: {
      location: 'Place Dalida, Montmartre',
      setting: 'Farol clássico parisiense de ferro verde e ruelas curvas',
      analogMood: 'Tom vinho bordô vibrante e tradicional borda interna ajustada',
      modelNotes: 'Charme boêmio dos anos 80, combinação perfeita com cardigans'
    }
  },

  // 29. Lenço Paris
  'lenco-paris': {
    id: 'lenco-paris',
    name: 'Lenço Paris em Pura Seda Estampada',
    category: 'Lenços',
    primary: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?q=80&w=900&auto=format&fit=crop'
    ],
    editorialDirection: {
      location: 'Jardin des Tuileries, alameda de castanheiros',
      setting: 'Chafariz circular com gaivotas e cadeiras de jardim',
      analogMood: 'Geométrico vintage anos 80 em seda sarjada com borda enrolada à mão',
      modelNotes: 'Amarrado com nó parisiense simples e pontas caindo sobre o casaco'
    }
  },

  // 30. Bolsa KVANORI
  'bolsa-rive-gauche': {
    id: 'bolsa-rive-gauche',
    name: 'Bolsa KVANORI em Couro Estruturada',
    category: 'Bolsas',
    primary: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=900&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=900&auto=format&fit=crop'
    ],
    editorialDirection: {
      location: 'Pont Neuf, a ponte de pedra mais antiga de Paris',
      setting: 'Balaustradas com mascarões esculpidos do século XVI',
      analogMood: 'Couro legítimo marrom conhaque com brilho natural encerado',
      modelNotes: 'Fecho dourado de encaixe manual e alça ajustável a tiracolo'
    }
  }
};

/**
 * Obtém a imagem primária exclusiva de um produto pelo ID.
 */
export function getProductPrimaryImage(productId: string): string {
  return PRODUCT_IMAGE_REGISTRY[productId]?.primary || 
         'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=900&auto=format&fit=crop';
}

/**
 * Obtém a galeria completa de imagens de um produto pelo ID.
 */
export function getProductGallery(productId: string): string[] {
  return PRODUCT_IMAGE_REGISTRY[productId]?.gallery || [getProductPrimaryImage(productId)];
}

/**
 * Permite substituição dinâmica de imagens sem afetar componentes de exibição.
 */
export function updateProductImageOverride(productId: string, newPrimaryUrl: string, newGallery?: string[]) {
  if (PRODUCT_IMAGE_REGISTRY[productId]) {
    PRODUCT_IMAGE_REGISTRY[productId].primary = newPrimaryUrl;
    if (newGallery && newGallery.length > 0) {
      PRODUCT_IMAGE_REGISTRY[productId].gallery = newGallery;
    }
  }
}
