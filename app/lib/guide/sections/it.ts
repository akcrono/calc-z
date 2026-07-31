import type { GuideSection } from '../types';

const it: GuideSection[] = [
  {
    id: 'trucks',
    title: 'Camion',
    blocks: [
      {
        type: 'paragraph',
        text: "Il bottino dei camion è determinato da una probabilità basata sul numero di slot per oggetti. I camion S (arancioni) hanno 7 slot, mentre quelli A (viola) ne hanno 6. Il primo assalto a un camion ruba 3 oggetti (sia A che S). Il secondo assalto a un camion S ruba 2 oggetti, mentre il secondo assalto a un camion A ne ruba uno. Pertanto, è più probabile ottenere un frammento eroe da un camion A con 2 frammenti (probabilità 3/6) che da un camion S con 2 frammenti (probabilità 3/7) al primo assalto.",
      },
      { type: 'paragraph', text: 'Consigli:' },
      {
        type: 'list',
        items: [
          'Preferisci i camion A ai camion S con lo stesso numero di frammenti.',
          'In media otterrai ~1 frammento per assalto colpendo un camion A da 2 frammenti.',
          'Non colpire mai un camion A una seconda volta a meno che non abbia 3 frammenti.',
          'I camion S da 2 frammenti già colpiti una volta vale la pena colpirli una seconda volta (probabilità 2/4)',
          'Altri tipi di oggetti (diamanti ecc.) nei camion sono facili da ottenere altrove e non meritano considerazione.',
        ],
      },
    ],
  },
  {
    id: 'bounties',
    title: 'Taglie',
    blocks: [
      {
        type: 'paragraph',
        text: 'Per la maggior parte, il furto di taglie ruba così poco che non vale la pena preoccuparsene. L\'eccezione è "ricevi rifornimenti", che dovresti cercare di reclamare il prima possibile. Questa è quasi sempre la migliore taglia da rubare.',
      },
      { type: 'paragraph', text: 'Consigli:' },
      {
        type: 'list',
        items: [
          'Il momento migliore per provare a rubare taglie è 2 ore dopo il reset e 4 ore dopo il reset.',
          'Rerollare le taglie finché non ottieni una S (arancione) è quasi sempre il piano corretto finché non ti rimangono 3 taglie. Dopodiché le probabilità peggiorano molto ed è una tua scelta.',
          'Le farm dovrebbero dare priorità alle taglie di risorse quando possibile.',
          'Il numero di taglie che puoi avere al giorno aumenta con il livello del tuo HQ, fino al livello 27. Rilevante per le farm.',
        ],
      },
    ],
  },
  {
    id: 'recruit-refugees',
    title: 'Reclutare Rifugiati',
    blocks: [
      {
        type: 'paragraph',
        text: 'Si aggiorna ogni 12 ore o al reroll. Viene concesso un reroll gratuito ogni 24 ore o quando spendi biglietti per tentare di ottenere un rifugiato. I biglietti si ottengono dal signore della furia e dal negozio della gloria.',
      },
      { type: 'paragraph', text: 'Consigli:' },
      {
        type: 'list',
        items: [
          'L\'unico rifugiato viola che conta è il diplomatico. Cerca di ottenere 3 diplomatici viola e uno arancione nel tuo centro alleanza. Concentrati esclusivamente su questi finché il tuo arancione non ha 3 stelle.',
          'Tira solo se c\'è possibilità di ottenere un rifugiato arancione. Altrimenti aspetta le 12 ore o usa il reroll gratuito (se il timer è lungo). Quando vedi un arancione, tira fino a due volte (a meno che non sia un rifugiato specifico di cui hai bisogno, allora tira fino a tre volte), poi rerolla.',
          'I frammenti di rifugiato arancione saranno di gran lunga il tuo fattore più limitante a lungo termine. Questo piano ne tiene conto.',
        ],
      },
    ],
  },
  {
    id: 'hero-recruitment',
    title: 'Reclutamento Eroi',
    blocks: [
      {
        type: 'paragraph',
        text: 'Semplice: risparmia per giovedì. I biglietti di reclutamento eroi peggiorano man mano che il gioco va avanti. Non vale la pena comprarli o puntare ai camion per ottenerli.',
      },
    ],
  },
  {
    id: 'mystic-equipment',
    title: 'Equipaggiamento Mistico',
    blocks: [
      {
        type: 'paragraph',
        text: "Potenzia l'equipaggiamento F1 in modo uniforme (porta tutto a +2 prima di passare a +3)",
      },
      { type: 'paragraph', text: 'Consigli:' },
      {
        type: 'list',
        items: [
          '+1 -> +2 è l\'aumento di potenza più efficiente.',
          'Spendi solo di martedì',
          'La tua fonte più affidabile sono le taglie (come minimo, tutte tranne 3 dovrebbero essere S ogni giorno)',
        ],
      },
    ],
  },
  {
    id: 'modification-garage',
    title: 'Garage delle Modifiche',
    blocks: [
      {
        type: 'paragraph',
        text: 'Per quanto le chiavi inglesi possano sembrare allettanti, sono significativamente peggiori nell\'aumentare il tuo potere rispetto alle alternative dello stesso livello (nuclei di potenza e frammenti eroe). I moduli esterni hanno rendimenti decrescenti significativi che li rendono inefficaci abbastanza rapidamente.',
      },
      { type: 'paragraph', text: 'Consigli:' },
      {
        type: 'list',
        items: [
          'I plugin tattici dovrebbero concentrarsi solo su F1',
          'Spendi solo di lunedì',
          "Ignora l'avviso sulla spesa dei progetti. Potrebbe essere vero, ma la soluzione (spendere un sacco di soldi) è spesso irrealistica",
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
          'Imposta una sveglia giornaliera (23:55 da lunedì a sabato, 23:40 la domenica)',
          "Prima completi l'arena rispetto al reset, meglio è",
          'Anche in 3v3, F1 è il re',
        ],
      },
    ],
  },
  {
    id: 'vip-shop',
    title: 'Negozio VIP',
    blocks: [
      { type: 'paragraph', text: 'In ordine:' },
      {
        type: 'list',
        ordered: true,
        items: ['Carburante', 'Teletrasportatori', 'Chiavi inglesi', 'Nuclei di potenza', 'Distintivi (a meno che tu non sia f2p)'],
      },
      {
        type: 'paragraph',
        text: 'Il resto è a piacere. Le accelerazioni da 8h e 3h sono un buon affare. I frammenti arancioni costano 1k ciascuno, spesso non ne vale la pena. Il forziere tattico blu è buono all\'inizio, ma perde valore una volta sviluppato il tuo equipaggiamento tattico.',
      },
    ],
  },
  {
    id: 'merit-shop',
    title: 'Negozio dei Meriti',
    blocks: [
      {
        type: 'paragraph',
        text: 'Equipaggiamento arancione finché F1 non è tutto arancione, poi un rapporto approssimativo di 2:1 tra nuclei di potenza e pietre di forgiatura. Solo in sconto, a meno che tu non abbia circa 300k distintivi di merito.',
      },
    ],
  },
  {
    id: 'glory-shop',
    title: 'Negozio della Gloria',
    blocks: [
      { type: 'paragraph', text: 'Priorità:' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Frammenti eroe',
          'Frammenti equipaggiamento (se non sei f2p)',
          'Chiavi inglesi',
          'Nuclei di potenza',
          'Leghe',
          'Biglietti rifugiato (a meno che tu non ne abbia TANTI)',
          'Scatola plugin viola',
          'Scatole modulo esterno',
          'Biglietti reclutamento',
          'Forse velocità se hai molta gloria extra.',
        ],
      },
      {
        type: 'paragraph',
        text: "Non mi preoccupo d'altro. Quest'ordine può cambiare a seconda del giorno (ad es. chiavi inglesi per prime dato che il negozio si resetta di lunedì)",
      },
    ],
  },
  {
    id: 'hero-battlefield',
    title: 'Campo di Battaglia degli Eroi',
    blocks: [
      { type: 'paragraph', text: 'Consigli:' },
      {
        type: 'list',
        items: [
          'Ruota F1 su ciascuno dei 3, non serve abbinare la formazione contro ogni settimana.',
          'Per gli altri campi di battaglia, scegli un livello più basso che puoi completare per punti gloria extra',
          "Sposta il tuo equipaggiamento arancione in modo che la tua forza combattente abbia sempre l'equipaggiamento migliore",
        ],
      },
    ],
  },
  {
    id: 'lucky-discounter',
    title: 'Sconto Fortunato',
    blocks: [
      {
        type: 'paragraph',
        text: 'Compra sempre i distintivi se punti al T10. Il resto compralo solo al 70%+. Non comprare mai rss o exp.',
      },
      {
        type: 'paragraph',
        text: "Consiglio: Se sei f2p (o spendi poco), risparmia il tuo ultimo biglietto ogni altro evento e usalo nel successivo. Quel biglietto sarà garantito al 90%. Ad es. risparmia il biglietto questo mese, spendilo il mese prossimo, e poi risparmia un altro biglietto il mese dopo ancora, ecc.",
      },
    ],
  },
  {
    id: 'roulette-wheel',
    title: 'Ruota della Roulette',
    blocks: [
      {
        type: 'paragraph',
        text: 'Scegli frammenti eroe (f2p) o frammenti equipaggiamento (giocatore paganti). Gira in modo che il tuo ultimo giorno cada al giro 10, 20 o 40 (per i forzieri)',
      },
    ],
  },
  {
    id: 'gacha',
    title: 'Gacha',
    blocks: [
      { type: 'paragraph', text: 'Usa i tuoi 5 giri gratuiti al giorno, poi punta al forziere da 2.500.' },
      { type: 'paragraph', text: 'Consigli:' },
      {
        type: 'list',
        items: [
          'Questo generalmente non è un buon posto dove spendere diamanti (costa troppo e le chiavi inglesi non sono così buone).',
          'Aspetta di avere 2+ forzieri con i tuoi giri gratuiti prima di spendere diamanti. Una volta che gli slot dei forzieri si riempiono, non compariranno più, aumentando le tue probabilità di ottenere chiavi.',
          'Conserva le tue chiavi per le scatole grandi. Sì, ci vogliono mesi, ma ottieni più chiavi inglesi in totale.',
        ],
      },
    ],
  },
  {
    id: 'bullseye-bullet',
    title: 'Proiettile Bersaglio',
    blocks: [
      {
        type: 'paragraph',
        text: 'Compra tutti i 100 proiettili. Tira finché non completi esattamente 12 round (per il forziere), poi conserva i proiettili per il mese successivo.',
      },
    ],
  },
  {
    id: 'full-prep',
    title: 'Preparazione Completa',
    blocks: [
      {
        type: 'paragraph',
        text: 'La cosa più importante nella preparazione completa è ottenere 18 punti per il forziere finale. Il modo più facile per farlo è xp eroe + addestramento truppe + boomer. Costruzione e ricerca è meglio conservarle per i rispettivi giorni VS. Puoi provare a conservare le tue consegne VS per punti sia nella preparazione completa che in VS.',
      },
    ],
  },
  {
    id: 'f1-strength',
    title: 'Forza F1',
    blocks: [
      {
        type: 'paragraph',
        text: 'L\'ordine dei contributori di potenza è (edifici bonus truppe) > (frammenti eroe) > (frammenti equipaggiamento) > (nuclei di potenza) > (pietre di forgiatura) > (chiavi inglesi). Tuttavia, poiché i nuclei di potenza possono essere consumati in grandi quantità, dai loro priorità ogni volta che puoi. Ti mancheranno i frammenti eroe ed equipaggiamento molto prima dei nuclei di potenza.',
      },
      {
        type: 'paragraph',
        text: 'Abbina la fazione e controlla la struttura del tuo F1 per confrontare il potere tra diverse combinazioni. Assicurati di rimuovere l\'equipaggiamento per confronti equi.',
      },
    ],
  },
  {
    id: 'where-to-spend-money',
    title: 'Dove Dovrei Spendere i Miei Soldi?',
    blocks: [
      {
        type: 'paragraph',
        text: 'Se vuoi spendere, ci sono solo pochi posti che penso valgano davvero la pena. In ordine approssimativo:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          "Il nuovo battle pass eroe/equipaggiamento F1. L'unico posto per ottenerli è spendendo, e sono anche valori solidi",
          'Tesoro giornaliero: estremamente economico, e le ricompense del tesoro Apoca sono buone. (Io scelgo i nuclei di potenza)',
          'Costruttore e laboratorio extra. Estremamente evidente.',
          'Il nuovo pass valore nel negozio delle barre d\'oro è davvero molto buono. $10 ti danno 35 chiavi inglesi, 2.500 distintivi, 4k progetti e un sacco di altre cose. Il $50 ha lo stesso valore (2,5x le ricompense per 2,5x il prezzo).',
          "Entrambi i pass mensili (codice eroe e ApocaAid). ApocaAid fornisce 900 ore di accelerazioni, 15.000 diamanti, un po' di danno bonus, e un f4 che può minare quasi 10k diamanti nel corso del pass.",
          'Pacchetti stagionali (viaggio stagionale e investimento bellico)',
          'Il pass sconto fortunato da $10 una volta ogni 3 mesi (distribuendo un biglietto al mese).',
        ],
      },
    ],
  },
  {
    id: 'buildings-to-upgrade',
    title: 'Quali Edifici Potenziare',
    blocks: [
      { type: 'paragraph', text: 'Dai priorità a:' },
      {
        type: 'list',
        items: [
          'HQ e le sue dipendenze',
          'Centro militare (più truppe aumentano notevolmente la difesa)',
          'Edifici di fazione (guardiano tossico ecc.) fino al livello 20',
          'Radar fino al livello 17 (dettagli rinforzo)',
        ],
      },
      { type: 'paragraph', text: 'Piacevoli da avere:' },
      {
        type: 'list',
        items: [
          'Formazione 1 e formazione 2',
          'Piazza di raduno',
          'Villa',
          'Libreria',
          'Ristorante',
          'Edifici di fazione fino al livello 30 (bonus truppe davvero notevoli dal 26 al 30)',
          'Impianto di fusione',
          'Acciaieria',
        ],
      },
      {
        type: 'paragraph',
        text: 'Non preoccuparti del resto. Gli edifici di risorse semplicemente non ne valgono la pena dopo il livello 14 circa.',
      },
    ],
  },
  {
    id: 'chain-mining',
    title: "Cos'è il Chain Mining?",
    blocks: [
      {
        type: 'paragraph',
        text: 'Il modo in cui funzionano i buff in Last Z è che finché hai un buff attivo, verrà applicato a una formazione quando esce dal tuo HQ per tutto il tempo in cui è fuori. Questo significa che puoi ottenere il buff dell\'agricoltura, poi inviare le tue formazioni minerarie, e manterranno il buff finché non tornano a casa. Questo può essere molto utile per minare diamanti. Se trascini la tua formazione su un nodo minerario, porterà il massimo delle truppe. Questo ti permetterà di andare da nodo a nodo per diversi giorni senza tornare a casa, mantenendo il buff per giorni di fila.',
      },
      { type: 'paragraph', text: 'Passaggi:' },
      {
        type: 'list',
        ordered: true,
        items: [
          "Ottieni il buff dell'agricoltura dalla capitale.",
          'Trascina le tue formazioni minerarie verso qualsiasi nodo di risorse tu voglia minare.',
          'Prima che le formazioni tornino a casa, spostale su un nodo di risorse diverso e minaci da lì.',
        ],
      },
      {
        type: 'paragraph',
        text: "Una volta che ottieni un ritmo regolare per questo (ad es. minare diamante 6 per 15 ore prima di andare a dormire), è facile intercettare le formazioni mentre tornano a casa (o non hanno ancora finito di minare) e farle iniziare su un nodo nuovo.",
      },
    ],
  },
];

export default it;
