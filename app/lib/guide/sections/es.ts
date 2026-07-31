import type { GuideSection } from '../types';

const es: GuideSection[] = [
  {
    id: 'trucks',
    title: 'Camiones',
    blocks: [
      {
        type: 'paragraph',
        text: 'El botín de los camiones se determina por una probabilidad basada en el número de espacios de objetos. Los camiones S (naranja) tienen 7 espacios, mientras que los A (morado) tienen 6. El primer asalto a un camión roba 3 objetos (tanto A como S). El segundo asalto a un camión S roba 2 objetos, mientras que el segundo asalto a un camión A roba uno. Por lo tanto, es más probable conseguir un fragmento de héroe de un camión A con 2 fragmentos (probabilidad 3/6) que de un camión S con 2 fragmentos (probabilidad 3/7) en el primer asalto.',
      },
      { type: 'paragraph', text: 'Consejos:' },
      {
        type: 'list',
        items: [
          'Prefiere los camiones A sobre los S con el mismo número de fragmentos.',
          'Obtendrás en promedio ~1 fragmento por asalto al golpear un camión A de 2 fragmentos.',
          'Nunca golpees un camión A por segunda vez a menos que tenga 3 fragmentos.',
          'Los camiones S de 2 fragmentos que ya han sido golpeados una vez valen la pena golpear una segunda vez (probabilidad 2/4)',
          'Otro tipo de objetos (diamantes, etc.) en los camiones son fáciles de conseguir en otro lugar y no merecen consideración.',
        ],
      },
    ],
  },
  {
    id: 'bounties',
    title: 'Recompensas',
    blocks: [
      {
        type: 'paragraph',
        text: 'En general, el robo de recompensas roba tan poco que no vale la pena preocuparse. La excepción es "recibir suministros", que deberías intentar reclamar lo antes posible. Esta es casi siempre la mejor recompensa para robar.',
      },
      { type: 'paragraph', text: 'Consejos:' },
      {
        type: 'list',
        items: [
          'El mejor momento para intentar robar recompensas es 2 horas después del reinicio y 4 horas después del reinicio.',
          'Rerolear recompensas hasta conseguir una S (naranja) es casi siempre el plan correcto hasta que te queden 3 recompensas. Después las probabilidades empeoran mucho y depende de ti.',
          'Las granjas deberían priorizar las recompensas de recursos siempre que sea posible.',
          'El número de recompensas que puedes tener por día aumenta a medida que sube el nivel de tu HQ, hasta el nivel 27. Relevante para granjas.',
        ],
      },
    ],
  },
  {
    id: 'recruit-refugees',
    title: 'Reclutar Refugiados',
    blocks: [
      {
        type: 'paragraph',
        text: 'Se actualiza cada 12 horas o al rerolear. Se otorga un reroll gratuito cada 24 horas o cuando gastas boletos para intentar conseguir un refugiado. Los boletos se consiguen del señor de la furia y de la tienda de gloria.',
      },
      { type: 'paragraph', text: 'Consejos:' },
      {
        type: 'list',
        items: [
          'El único refugiado morado que importa es el diplomático. Intenta conseguir 3 diplomáticos morados y uno naranja en tu centro de alianza. Concéntrate exclusivamente en ellos hasta que tu naranja tenga 3 estrellas.',
          'Solo tira si hay posibilidad de conseguir un refugiado naranja. De lo contrario, espera las 12 horas o usa el reroll gratuito (si el temporizador es largo). Cuando veas un naranja, tira hasta dos veces (a menos que sea un refugiado específico que necesites, entonces tira hasta tres veces), luego rerolea.',
          'Los fragmentos de refugiado naranja serán, con diferencia, tu factor más limitante a largo plazo. Este plan tiene eso en cuenta.',
        ],
      },
    ],
  },
  {
    id: 'hero-recruitment',
    title: 'Reclutamiento de Héroes',
    blocks: [
      {
        type: 'paragraph',
        text: 'Sencillo: ahorra para el jueves. Los boletos de reclutamiento de héroes empeoran cuanto más avanza el juego. No vale la pena comprarlos ni apuntar a camiones para conseguirlos.',
      },
    ],
  },
  {
    id: 'mystic-equipment',
    title: 'Equipo Místico',
    blocks: [
      {
        type: 'paragraph',
        text: 'Mejora el equipo F1 de manera uniforme (llévalo todo a +2 antes de pasar a +3)',
      },
      { type: 'paragraph', text: 'Consejos:' },
      {
        type: 'list',
        items: [
          '+1 -> +2 es el aumento de poder más eficiente.',
          'Gasta solo los martes',
          'Tu fuente más fiable son las recompensas (como mínimo, todas menos 3 deberían ser S cada día)',
        ],
      },
    ],
  },
  {
    id: 'modification-garage',
    title: 'Garaje de Modificación',
    blocks: [
      {
        type: 'paragraph',
        text: 'Por muy atractivas que parezcan las llaves inglesas, son significativamente peores para aumentar tu poder en comparación con las alternativas del mismo nivel (núcleos de poder y fragmentos de héroe). Los módulos exteriores tienen rendimientos decrecientes significativos que los vuelven ineficaces bastante rápido.',
      },
      { type: 'paragraph', text: 'Consejos:' },
      {
        type: 'list',
        items: [
          'Los complementos tácticos deberían centrarse solo en F1',
          'Gasta solo los lunes',
          'Ignora la advertencia sobre gastar planos. Puede que sea cierta, pero la solución (gastar mucho dinero) suele ser poco realista',
        ],
      },
    ],
  },
  {
    id: 'arena',
    title: 'Arena',
    blocks: [
      {
        type: 'list',
        items: [
          'Configura una alarma diaria (23:55 de lunes a sábado, 23:40 el domingo)',
          'Cuanto más cerca del reinicio completes la arena, mejor',
          'Incluso en 3v3, F1 es el rey',
        ],
      },
    ],
  },
  {
    id: 'vip-shop',
    title: 'Tienda VIP',
    blocks: [
      { type: 'paragraph', text: 'En orden:' },
      {
        type: 'list',
        ordered: true,
        items: ['Gasolina', 'Teletransportadores', 'Llaves inglesas', 'Núcleos de poder', 'Insignias (a menos que seas f2p)'],
      },
      {
        type: 'paragraph',
        text: 'El resto es para gustos personales. Las aceleraciones de 8h y 3h son una buena oferta. Los fragmentos naranjas cuestan 1k cada uno, a menudo no merecen la pena. El cofre táctico azul es bueno al principio, pero pierde valor una vez que tu equipo táctico está desarrollado.',
      },
    ],
  },
  {
    id: 'merit-shop',
    title: 'Tienda de Mérito',
    blocks: [
      {
        type: 'paragraph',
        text: 'Equipo naranja hasta que F1 esté todo naranja, luego una proporción aproximada de 2:1 entre núcleos de poder y piedras de forja. Solo con descuento, a menos que tengas como 300k insignias de mérito.',
      },
    ],
  },
  {
    id: 'glory-shop',
    title: 'Tienda de Gloria',
    blocks: [
      { type: 'paragraph', text: 'Prioridad:' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Fragmentos de héroe',
          'Fragmentos de equipo (si no eres f2p)',
          'Llaves inglesas',
          'Núcleos de poder',
          'Aleaciones',
          'Boletos de refugiado (a menos que tengas MUCHOS)',
          'Caja de complemento morado',
          'Cajas de módulo exterior',
          'Boletos de reclutamiento',
          'Quizás velocidad si tienes mucha gloria extra.',
        ],
      },
      {
        type: 'paragraph',
        text: 'No me molesto con nada más. Este orden puede cambiar según el día (por ejemplo, llaves inglesas primero ya que la tienda se reinicia el lunes)',
      },
    ],
  },
  {
    id: 'hero-battlefield',
    title: 'Campo de Batalla de Héroes',
    blocks: [
      { type: 'paragraph', text: 'Consejos:' },
      {
        type: 'list',
        items: [
          'Rota F1 en cada uno de los 3, no hace falta que coincida con tu formación de contraataque cada semana.',
          'Para los demás campos de batalla, elige un nivel más bajo que puedas completar para puntos de gloria extra',
          'Mueve tu equipo naranja para que tu fuerza de combate siempre tenga el mejor equipo',
        ],
      },
    ],
  },
  {
    id: 'lucky-discounter',
    title: 'Descuento de la Suerte',
    blocks: [
      {
        type: 'paragraph',
        text: 'Compra siempre insignias si vas por el T10. El resto, solo cómpralo al 70%+. Nunca compres rss ni exp.',
      },
      {
        type: 'paragraph',
        text: 'Consejo: Si eres f2p (o gastas poco), guarda tu último boleto cada dos eventos y úsalo en el siguiente. Ese boleto será un 90% garantizado. Por ejemplo: guarda tu boleto este mes, gástalo el mes que viene, y luego guarda otro boleto el mes después, etc.',
      },
    ],
  },
  {
    id: 'roulette-wheel',
    title: 'Rueda de la Ruleta',
    blocks: [
      {
        type: 'paragraph',
        text: 'Elige fragmentos de héroe (f2p) o fragmentos de equipo (jugador de pago). Gira de forma que tu último día caiga en el giro 10, 20 o 40 (para los cofres)',
      },
    ],
  },
  {
    id: 'gacha',
    title: 'Gacha',
    blocks: [
      { type: 'paragraph', text: 'Usa tus 5 giros gratis al día, luego ve a por el cofre de 2.500.' },
      { type: 'paragraph', text: 'Consejos:' },
      {
        type: 'list',
        items: [
          'Este no suele ser un buen lugar para gastar diamantes (cuesta demasiado y las llaves inglesas no son tan buenas).',
          'Espera a tener 2+ cofres con tus giros gratis antes de gastar diamantes. Una vez que las ranuras de cofres se llenan, dejan de aparecer, lo que aumenta tus probabilidades de conseguir llaves.',
          'Guarda tus llaves para las cajas grandes. Sí, lleva meses, pero consigues más llaves inglesas en total.',
        ],
      },
    ],
  },
  {
    id: 'bullseye-bullet',
    title: 'Bala de Diana',
    blocks: [
      {
        type: 'paragraph',
        text: 'Compra las 100 balas. Tira hasta completar exactamente 12 rondas (para el cofre), luego guarda tus balas para el mes siguiente.',
      },
    ],
  },
  {
    id: 'full-prep',
    title: 'Preparación Total',
    blocks: [
      {
        type: 'paragraph',
        text: 'Lo más importante en la preparación total es conseguir 18 puntos para el cofre final. La forma más fácil de hacerlo es con xp de héroe + entrenamiento de tropas + boomers. La construcción y la investigación es mejor guardarlas para sus respectivos días de VS. Puedes intentar guardar tus entregas de VS para puntos tanto en preparación total como en VS.',
      },
    ],
  },
  {
    id: 'f1-strength',
    title: 'Fuerza de F1',
    blocks: [
      {
        type: 'paragraph',
        text: 'El orden de los contribuyentes de poder es (edificios de bonificación de tropas) > (fragmentos de héroe) > (fragmentos de equipo) > (núcleos de poder) > (piedras de forja) > (llaves inglesas). Sin embargo, como los núcleos de poder se pueden consumir en grandes cantidades, prioriza usarlos siempre que puedas. Te quedarás sin necesidad de fragmentos de héroe y de equipo mucho antes que de núcleos de poder.',
      },
      {
        type: 'paragraph',
        text: 'Compara la facción y revisa la estructura de tu F1 para comparar el poder entre diferentes combinaciones. Asegúrate de quitar el equipo para que las comparaciones sean justas.',
      },
    ],
  },
  {
    id: 'where-to-spend-money',
    title: '¿Dónde Debería Gastar Mi Dinero?',
    blocks: [
      {
        type: 'paragraph',
        text: 'Si quieres gastar, solo hay unos pocos lugares que creo que realmente valen la pena. En orden aproximado:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'El nuevo pase de batalla de héroe/equipo F1. El único lugar para conseguirlos es gastando, y también son valores sólidos',
          'Tesoro diario: extremadamente barato, y las recompensas del tesoro Apoca son buenas. (Yo elijo núcleos de poder)',
          'Constructor y laboratorio extra. Extremadamente notable.',
          'El nuevo pase de valor en la tienda de barras de oro es realmente bueno. Por $10 obtienes 35 llaves inglesas, 2.500 insignias, 4k planos y muchas otras cosas. El de $50 tiene el mismo valor (2,5x las recompensas por 2,5x el precio).',
          'Ambos pases mensuales (código de héroe y ApocaAid). ApocaAid proporciona 900 horas de aceleraciones, 15.000 diamantes, algo de daño extra, y un f4 que puede minar casi 10k diamantes durante el pase.',
          'Paquetes de temporada (viaje de temporada e inversión de guerra)',
          'El pase de descuento de la suerte de $10 una vez cada 3 meses (repartiendo un boleto por mes).',
        ],
      },
    ],
  },
  {
    id: 'buildings-to-upgrade',
    title: 'Qué Edificios Mejorar',
    blocks: [
      { type: 'paragraph', text: 'Prioriza:' },
      {
        type: 'list',
        items: [
          'HQ y sus dependencias',
          'Centro militar (más tropas aumenta enormemente la defensa)',
          'Edificios de facción (guardián tóxico, etc.) hasta el nivel 20',
          'Radar hasta el nivel 17 (detalles de refuerzo)',
        ],
      },
      { type: 'paragraph', text: 'Deseables:' },
      {
        type: 'list',
        items: [
          'Formación 1 y formación 2',
          'Plaza de reunión',
          'Villa (hasta el nivel 22 aproximadamente)',
          'Librería',
          'Restaurante',
          'Edificios de facción hasta el nivel 30 (muy buenas bonificaciones de tropas del 26 al 30)',
          'Planta de fundición',
          'Planta de acero',
        ],
      },
      {
        type: 'paragraph',
        text: 'No te molestes con el resto. Los edificios de recursos simplemente no valen la pena después del nivel 14 más o menos.',
      },
    ],
  },
  {
    id: 'where-to-spend-diamonds',
    title: '¿Dónde Gastar Diamantes?',
    blocks: [
      {
        type: 'paragraph',
        text: 'Las sugerencias anteriores son para las tiendas y el evento semanal. Después de eso, intenta llegar a VIP 10; tiene varios beneficios importantes, incluyendo un fragmento de héroe naranja diario.',
      },
    ],
  },
  {
    id: 'chain-mining',
    title: '¿Qué es la Minería en Cadena?',
    blocks: [
      {
        type: 'paragraph',
        text: 'La forma en que funcionan las bonificaciones en Last Z es que, mientras tengas una bonificación activa, se aplicará a una formación cuando salga de tu HQ durante todo el tiempo que esté fuera. Esto significa que puedes conseguir la bonificación de agricultura, luego enviar tus formaciones de minería, y mantendrán la bonificación hasta que vuelvan a casa. Esto puede ser muy útil para minar diamantes. Si arrastras tu formación a un nodo de minería, llevará el máximo de tropas. Esto te permitirá ir de nodo en nodo durante varios días sin volver a casa, manteniendo la bonificación durante días seguidos.',
      },
      { type: 'paragraph', text: 'Pasos:' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Consigue la bonificación de agricultura en la capital.',
          'Arrastra tus formaciones de minería hasta el nodo de recursos que quieras minar.',
          'Antes de que las formaciones vuelvan a casa, muévelas a un nodo de recursos diferente y mina desde ahí.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Una vez que consigas un ritmo regular para esto (por ejemplo, minar diamante 6 durante 15 horas antes de irte a dormir), es fácil interceptar formaciones cuando van de camino a casa (o casi terminando de minar) y hacer que empiecen en un nodo nuevo.',
      },
    ],
  },
];

export default es;
