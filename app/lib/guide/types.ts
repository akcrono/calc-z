export type GuideBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean };

export interface GuideSection {
  id: string;
  title: string;
  blocks: GuideBlock[];
}
