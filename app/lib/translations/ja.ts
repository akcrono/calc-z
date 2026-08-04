import type { Translations } from './types';

const ja: Translations = {
  appTitle: 'ラストZ シダ計算機',
  appDescription: 'リセットまでの時間と、目標のシダ量に到達するまでの時間を計算します。',
  loading: '読み込み中…',
  rateLabel: '1時間あたりのシダの葉',
  amountLabel: '保有しているシダの葉',
  neededLabel: '次のアップグレードに必要なシダの葉の合計',
  timeUntilTargetLabel: 'シダの葉獲得までの時間',
  timeUntilResetLabel: 'リセットまでの時間',
  resetVerdictLabel: '状態',
  readyBefore: 'リセット前',
  readyAfter: 'リセット後',
  rateError: '0より大きい値を入力してください。',
  languageLabel: '言語',
  guideLinkLabel: 'ゲームガイド',
  guideBackLink: '← 計算機に戻る',
  guideTitle: 'ゲームガイド',
  guideTocLabel: '目次',
  guideDescription:
    'Last Zの戦略のコツと優先順位リスト:トラック、バウンティ、ショップ、ヒーローバトルフィールドなど。',
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

export default ja;
