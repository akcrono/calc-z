import type { GuideSection } from '../types';

const tr: GuideSection[] = [
  {
    id: 'trucks',
    title: 'Kamyonlar',
    blocks: [
      {
        type: 'paragraph',
        text: 'Kamyon ganimeti, eşya yuvası sayısına bağlı bir % şansla belirlenir. S (turuncu) kamyonlarda 7 eşya yuvası, A (mor) kamyonlarda ise 6 yuva vardır. Bir kamyona yapılan ilk baskın 3 eşya çalar (hem A hem S). S kamyonuna yapılan ikinci baskın 2 eşya, A kamyonuna yapılan ikinci baskın ise bir eşya çalar. Bu nedenle ilk baskında, 2 parçalı bir A kamyonundan kahraman parçası alma ihtimalin (3/6), 2 parçalı bir S kamyonundan (3/7) daha yüksektir.',
      },
      { type: 'paragraph', text: 'İpuçları:' },
      {
        type: 'list',
        items: [
          'Aynı sayıda parça varsa A kamyonlarını S kamyonlarına tercih et.',
          '2 parçalı bir A kamyonuna yaptığın her baskında ortalama ~1 parça alırsın.',
          '3 parçası yoksa bir A kamyonuna asla ikinci kez saldırma.',
          'Bir kez saldırıya uğramış 2 parçalı S kamyonlarına ikinci kez saldırmak mantıklıdır (2/4 ihtimal)',
          'Kamyonlardaki diğer eşyalar (elmas vb.) başka yerlerden kolayca elde edilir ve dikkate almaya değmez.',
        ],
      },
    ],
  },
  {
    id: 'bounties',
    title: 'Ödüller',
    blocks: [
      {
        type: 'paragraph',
        text: 'Çoğu durumda ödül hırsızlığı o kadar az şey çalar ki endişelenmeye değmez. İstisna "malzeme al" ödülüdür; bunu mümkün olan en kısa sürede almaya çalışmalısın. Çalınacak en iyi ödül neredeyse her zaman budur.',
      },
      { type: 'paragraph', text: 'İpuçları:' },
      {
        type: 'list',
        items: [
          'Ödül çalmaya çalışmak için en iyi zaman sıfırlamadan 2 saat ve 4 saat sonrasıdır.',
          '3 ödülün kalana kadar S (turuncu) gelene dek ödülleri yenilemek neredeyse her zaman doğru plandır. Sonrasında ihtimaller çok kötüleşir ve karar sana kalmış.',
          'Çiftlik hesapları mümkün olduğunda kaynak ödüllerine öncelik vermeli.',
          'Günlük alabileceğin ödül sayısı, karargah (HQ) seviyen arttıkça 27. seviyeye kadar artar. Çiftlik hesapları için önemlidir.',
        ],
      },
    ],
  },
  {
    id: 'recruit-refugees',
    title: 'Mülteci Alımı',
    blocks: [
      {
        type: 'paragraph',
        text: 'Her 12 saatte bir veya yenilemede tazelenir. Her 24 saatte bir ya da bir mülteci için bilet harcadığında ücretsiz bir yenileme hakkı verilir. Biletler öfke lordundan ve şan mağazasından elde edilir.',
      },
      { type: 'paragraph', text: 'İpuçları:' },
      {
        type: 'list',
        items: [
          'Önemli olan tek mor mülteci diplomattır. İttifak merkezinde 3 mor diplomat ve bir turuncu diplomat edinmeye çalış. Turuncu olan 3 yıldız olana kadar yalnızca bunlara odaklan.',
          'Yalnızca turuncu mülteci çıkma ihtimali varsa çek. Aksi halde 12 saati bekle veya ücretsiz yenilemeyi kullan (sayaç uzunsa). Turuncu gördüğünde en fazla iki kez çek (ihtiyacın olan belirli bir mülteciyse en fazla üç kez), sonra yenile.',
          'Uzun vadede seni en çok sınırlayacak şey açık ara turuncu mülteci parçaları olacak. Bu plan bunu hesaba katar.',
        ],
      },
    ],
  },
  {
    id: 'hero-recruitment',
    title: 'Kahraman Alımı',
    blocks: [
      {
        type: 'paragraph',
        text: 'Basit: perşembeye sakla. Kahraman alım biletleri oyun ilerledikçe değer kaybeder. Satın almaya veya onlar için kamyonları hedeflemeye değmezler.',
      },
    ],
  },
  {
    id: 'mystic-equipment',
    title: 'Mistik Ekipman',
    blocks: [
      { type: 'paragraph', text: "F1 ekipmanını eşit şekilde yükselt (+3'e geçmeden önce hepsini +2 yap)" },
      { type: 'paragraph', text: 'İpuçları:' },
      {
        type: 'list',
        items: [
          '+1 -> +2 en verimli güç artışıdır.',
          'Yalnızca salı günü harca',
          'En güvenilir kaynağın ödüllerdir (her gün en az 3 tanesi hariç hepsi S olmalı)',
        ],
      },
    ],
  },
  {
    id: 'modification-garage',
    title: 'Modifikasyon Garajı',
    blocks: [
      {
        type: 'paragraph',
        text: 'İngiliz anahtarları ne kadar cazip görünse de, aynı seviyedeki alternatiflere (güç çekirdekleri ve kahraman parçaları) kıyasla gücünü artırmada belirgin şekilde daha kötüdür. Dış modüllerin getirisi hızla azalır ve oldukça çabuk etkisiz hale gelirler.',
      },
      { type: 'paragraph', text: 'İpuçları:' },
      {
        type: 'list',
        items: [
          'Taktik eklentiler yalnızca F1 odaklı olmalı',
          'Yalnızca pazartesi günü harca',
          'Plan harcamayla ilgili uyarıyı görmezden gel. Doğru olabilir, ama çözümü (çok para harcamak) çoğu zaman gerçekçi değildir',
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
          'Günlük alarm kur (pazartesi-cumartesi 23:55, pazar 23:40)',
          'Arenayı sıfırlamaya ne kadar yakın tamamlarsan o kadar iyi',
          '3v3’te bile F1 her şeydir',
        ],
      },
    ],
  },
  {
    id: 'vip-shop',
    title: 'VIP Mağazası',
    blocks: [
      { type: 'paragraph', text: 'Sırasıyla:' },
      {
        type: 'list',
        ordered: true,
        items: ['Yakıt', 'Işınlayıcılar', 'İngiliz anahtarları', 'Güç çekirdekleri', 'Rozetler (f2p değilsen)'],
      },
      {
        type: 'paragraph',
        text: 'Gerisi zevkine kalmış. 8 saatlik ve 3 saatlik hızlandırmalar iyi bir fırsattır. Turuncu parçaların tanesi 1k; çoğu zaman değmez. Mavi taktik sandığı başlangıçta iyidir, ama taktik ekipmanın geliştikten sonra pek değeri kalmaz.',
      },
    ],
  },
  {
    id: 'merit-shop',
    title: 'Liyakat Mağazası',
    blocks: [
      {
        type: 'paragraph',
        text: 'F1 tamamen turuncu olana kadar turuncu ekipman, sonra yaklaşık 2:1 oranında güç çekirdeği ve dövme taşı. 300k civarı liyakat rozetin yoksa yalnızca indirimli olanları al.',
      },
    ],
  },
  {
    id: 'glory-shop',
    title: 'Şan Mağazası',
    blocks: [
      { type: 'paragraph', text: 'Öncelik:' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Kahraman parçaları',
          'Ekipman parçaları (f2p değilsen)',
          'İngiliz anahtarları',
          'Güç çekirdekleri',
          'Alaşımlar',
          'Mülteci biletleri (ÇOK fazla yoksa)',
          'Mor eklenti kutusu',
          'Dış modül kutuları',
          'Alım biletleri',
          'Çok fazla şan puanın varsa belki hızlandırma.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Başka hiçbir şeyle uğraşmıyorum. Bu sıra güne göre değişebilir (ör. mağaza pazartesi sıfırlandığı için önce İngiliz anahtarları)',
      },
    ],
  },
  {
    id: 'hero-battlefield',
    title: 'Kahraman Savaş Alanı',
    blocks: [
      { type: 'paragraph', text: 'İpuçları:' },
      {
        type: 'list',
        items: [
          "F1'i 3 savaş alanının her birinde sırayla kullan; her hafta karşı dizilişe uymana gerek yok.",
          'Diğer savaş alanlarında, ekstra şan puanı için tamamlayabileceğin daha düşük bir seviye seç',
          'Savaşan birliğin her zaman en iyi teçhizata sahip olsun diye turuncu ekipmanını aralarında değiştir',
        ],
      },
    ],
  },
  {
    id: 'lucky-discounter',
    title: 'Şanslı İndirimci',
    blocks: [
      {
        type: 'paragraph',
        text: "T10'u hedefliyorsan rozetleri her zaman al. Geri kalanını yalnızca %70+ indirimde al. Kaynak (rss) veya deneyim asla alma.",
      },
      {
        type: 'paragraph',
        text: 'İpucu: f2p (veya az harcayan) biriysen, iki etkinlikte bir son biletini sakla ve bir sonrakinde kullan. O bilet garantili %90 olur. Ör. bu ay biletini sakla, gelecek ay harca, ondan sonraki ay yine bir bilet sakla vb.',
      },
    ],
  },
  {
    id: 'roulette-wheel',
    title: 'Rulet Çarkı',
    blocks: [
      {
        type: 'paragraph',
        text: 'Kahraman parçalarını (f2p) veya ekipman parçalarını (ödeme yapan oyuncu) seç. Son gününde 10, 20 veya 40 çevirmede olacak şekilde çevir (sandıklar için)',
      },
    ],
  },
  {
    id: 'gacha',
    title: 'Gacha',
    blocks: [
      { type: 'paragraph', text: 'Günlük 5 ücretsiz çevirmeni kullan, sonra 2.500 sandığını hedefle.' },
      { type: 'paragraph', text: 'İpuçları:' },
      {
        type: 'list',
        items: [
          'Burası genellikle elmas harcamak için iyi bir yer değil (çok pahalı ve İngiliz anahtarları o kadar iyi değil).',
          'Elmas harcamadan önce ücretsiz çevirmelerinle 2+ sandık çıkmasını bekle. Sandık yuvaları dolunca artık sandık çıkmaz, bu da anahtar çıkma şansını artırır',
          'Anahtarlarını büyük kutular için sakla. Evet, aylar sürer, ama toplamda daha fazla İngiliz anahtarı alırsın.',
        ],
      },
    ],
  },
  {
    id: 'bullseye-bullet',
    title: 'Tam İsabet Mermisi',
    blocks: [
      {
        type: 'paragraph',
        text: '100 mermiyi de satın al. Tam olarak 12 tur bitene kadar at (sandık için), sonra mermilerini gelecek aya sakla.',
      },
    ],
  },
  {
    id: 'full-prep',
    title: 'Tam Hazırlık',
    blocks: [
      {
        type: 'paragraph',
        text: 'Tam hazırlıkta en önemli şey son sandık için 18 puan toplamaktır. Bunu yapmanın en kolay yolu kahraman deneyimi + asker eğitimi + boomer’lardır. İnşaat ve araştırmayı kendi VS günlerine saklamak en iyisidir. VS teslimlerini hem tam hazırlıkta hem VS’de puan almak için saklamayı deneyebilirsin.',
      },
    ],
  },
  {
    id: 'f1-strength',
    title: 'F1 Gücü',
    blocks: [
      {
        type: 'paragraph',
        text: 'Güce katkı sırası şöyledir: (asker güçlendirme binaları) > (kahraman parçaları) > (ekipman parçaları) > (güç çekirdekleri) > (dövme taşları) > (İngiliz anahtarları). Ancak güç çekirdekleri çok büyük miktarlarda kullanılabildiği için mümkün olduğunda onlara öncelik ver. Kahraman parçalarına ve ekipman parçalarına olan ihtiyacın, güç çekirdeklerinden çok önce biter.',
      },
      {
        type: 'paragraph',
        text: 'Farklı kombinasyonlar arasındaki gücü karşılaştırmak için fraksiyonu eşleştir ve F1 yapını kontrol et. Adil bir karşılaştırma için ekipmanı çıkardığından emin ol.',
      },
    ],
  },
  {
    id: 'where-to-spend-money',
    title: 'Paramı Nereye Harcamalıyım?',
    blocks: [
      {
        type: 'paragraph',
        text: 'Harcamak istiyorsan, bence gerçekten değen yalnızca birkaç yer var. Kabaca sırasıyla:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Yeni f1 kahramanı/ekipmanı savaş bileti. Bunları almanın tek yolu harcamak ve değerleri de sağlam',
          'Günlük hazine: son derece ucuz ve Apoca hazine ödülleri iyi. (Ben güç çekirdeği seçiyorum)',
          'Ekstra inşaatçı ve laboratuvar. Farkı çok belirgin.',
          'Altın külçe mağazasındaki yeni değer bileti gerçekten çok iyi. 10$ ile 35 İngiliz anahtarı, 2.500 rozet, 4k plan ve bir sürü başka şey alıyorsun. 50$ olanı da aynı değerde (2,5 kat fiyata 2,5 kat ödül).',
          'Her iki aylık bilet (hero code ve ApocaAid). ApocaAid 900 saatlik hızlandırma, 15.000 elmas, biraz bonus hasar ve bilet süresince neredeyse 10k elmas kazabilen bir f4 sağlar.',
          'Sezonluk paketler (sezon yolculuğu ve savaş zamanı yatırımı)',
          'Her 3 ayda bir 10$’lık şanslı indirimci bileti (her ay bir bilet dağıt).',
        ],
      },
    ],
  },
  {
    id: 'buildings-to-upgrade',
    title: 'Hangi Binaları Yükseltmeli',
    blocks: [
      { type: 'paragraph', text: 'Öncelik ver:' },
      {
        type: 'list',
        items: [
          'Karargah (HQ) ve gereksinimleri',
          'Askeri merkez (daha fazla asker savunmayı büyük ölçüde artırır)',
          "Fraksiyon binaları (Toxic guardian vb.) 20'ye kadar",
          "Radar 17'ye kadar (takviye ayrıntıları)",
        ],
      },
      { type: 'paragraph', text: 'Olursa iyi olur:' },
      {
        type: 'list',
        items: [
          'Diziliş 1 ve diziliş 2',
          'Toplanma meydanı',
          'Villa (22 civarına kadar)',
          'Kitapçı',
          'Restoran',
          "Fraksiyon binaları 30'a kadar (26-30 arası çok iyi asker bonusları)",
          'Eritme tesisi',
          'Çelik fabrikası',
        ],
      },
      {
        type: 'paragraph',
        text: 'Gerisiyle uğraşma. Kaynak binaları 14 civarından sonra değmez.',
      },
    ],
  },
  {
    id: 'where-to-spend-diamonds',
    title: 'Elmasları Nereye Harcamalı?',
    blocks: [
      {
        type: 'paragraph',
        text: "Mağazalar ve haftalık etkinlik için yukarıdaki öneriler. Sonrasında VIP 10'a ulaşmaya çalış; günlük turuncu kahraman parçası dahil birçok önemli avantaj sağlar.",
      },
    ],
  },
  {
    id: 'chain-mining',
    title: 'Zincirleme Madencilik Nedir?',
    blocks: [
      {
        type: 'paragraph',
        text: "Last Z'de güçlendirmeler şöyle çalışır: bir güçlendirmen aktifken, bir diziliş karargahından ayrıldığında güçlendirme o dizilişe uygulanır ve diziliş dışarıda kaldığı sürece devam eder. Bu da tarım güçlendirmesini alıp maden dizilişlerini gönderebileceğin ve eve dönene kadar güçlendirmeyi koruyacakları anlamına gelir. Elmas madenciliği için çok işe yarar. Dizilişini sürükleyerek bir maden noktasına taşırsan maksimum askerle gider. Böylece birkaç gün boyunca eve dönmeden noktadan noktaya geçebilir ve güçlendirmeyi günlerce koruyabilirsin.",
      },
      { type: 'paragraph', text: 'Adımlar:' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Başkentten tarım güçlendirmesini al.',
          'Maden dizilişini/dizilişlerini sürükleyerek kazmak istediğin kaynak noktasına taşı.',
          'Diziliş(ler) eve dönmeden önce onları farklı bir kaynak noktasına taşı ve oradan kaz.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Bunu düzenli bir rutine bağladığında (ör. yatmadan önce 15 saat boyunca 6. seviye elmas kaz), eve dönen (veya kazmayı henüz bitirmemiş) dizilişleri yolda yakalayıp yeni bir noktada başlatmak kolaylaşır.',
      },
    ],
  },
];

export default tr;
