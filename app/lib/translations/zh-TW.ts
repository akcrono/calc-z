import type { Translations } from './types';

const zhTW: Translations = {
  appTitle: 'Last Z 蕨葉計算機',
  appDescription: '計算距離重置的時間，以及達到目標蕨葉數量所需的時間。',
  loading: '載入中…',
  rateLabel: '每小時蕨葉數',
  amountLabel: '庫存蕨葉數',
  neededLabel: '下次升級所需的蕨葉總數',
  timeUntilTargetLabel: '獲得蕨葉所需時間',
  timeUntilResetLabel: '距離重置的時間',
  resetVerdictLabel: '狀態',
  readyBefore: '重置前',
  readyAfter: '重置後',
  rateError: '請輸入大於 0 的數值。',
  languageLabel: '語言',
  guideLinkLabel: '遊戲攻略',
  guideBackLink: '← 返回計算機',
  guideTitle: '遊戲攻略',
  guideTocLabel: '目錄',
  guideDescription: 'Last Z 攻略技巧與優先順序清單：卡車、懸賞、商店、英雄戰場等。',
  heroEyebrow: 'Last Z: Survival Shooter',
  calculatorHeading: 'Fern reset calculator',
  calculatorSubhead: "Enter your fernleaf rate to see exactly when you'll hit your next upgrade.",
  storagePlaceholder: 'e.g. 4300',
  targetPlaceholder: 'e.g. 25000',
  ratePlaceholder: 'e.g. 120',
  marginToSpare: '{duration} to spare',
  marginMissesBy: 'misses by {duration}',
  alreadyReachedMessage: 'Target already reached — go collect your upgrade.',
  footerDisclaimer: 'Unofficial fan tool for Last Z: Survival Shooter.',
};

export default zhTW;
