import type { GuideSection } from '../types';

const en: GuideSection[] = [
  {
    id: 'trucks',
    title: 'Trucks',
    blocks: [
      {
        type: 'paragraph',
        text: 'Trucks loot is determined by a % chance based on the number of item slots. S (orange) trucks have 7 item slots, while A (purple) trucks have 6. The first raid of a truck steals 3 items (both A and S). The second raid of an S truck steals 2 items, while the second raid of an A truck steals one. Therefore, you are more likely to get a hero fragment from a 2 fragment A truck (3/6 odds) than a 2 fragment S truck (3/7 odds) on the first raid.',
      },
      { type: 'paragraph', text: 'Tips:' },
      {
        type: 'list',
        items: [
          'Prefer A trucks over S trucks with the same number of fragments.',
          'You will average ~1 fragment per raid hitting a 2 fragment A truck.',
          'Never hit an A truck a second time unless it has 3 fragments.',
          '2 fragment S trucks that have been hit once are good to hit a second time (2/4 odds)',
          'Other kinds of items (diamonds etc) in trucks are easy to get elsewhere and not worth consideration.',
        ],
      },
    ],
  },
  {
    id: 'bounties',
    title: 'Bounties',
    blocks: [
      {
        type: 'paragraph',
        text: 'For the most part, theft of bounties steals so little that it’s not worth your concern. The exception is "receive supplies", which you should attempt to claim as soon as possible. This is pretty much always the best bounty to steal.',
      },
      { type: 'paragraph', text: 'Tips:' },
      {
        type: 'list',
        items: [
          'The best time to try to steal bounties is 2 hours after reset and 4 hours after reset.',
          'Rerolling bounties until you get an S (orange) is almost always the correct plan until you have 3 bounties left. Then the odds get much worse and it’s up to you.',
          'Farms should prioritize resource bounties whenever possible.',
          'You increase the number of bounties you can have a day as your HQ level increases, up to level 27. Relevant for farms.',
        ],
      },
    ],
  },
  {
    id: 'recruit-refugees',
    title: 'Recruit Refugees',
    blocks: [
      {
        type: 'paragraph',
        text: 'Refreshes once every 12 hours or on reroll. A free reroll is given once every 24 hours or when you spend tickets to try for a refugee. Tickets are gotten from fury lord and the glory shop.',
      },
      { type: 'paragraph', text: 'Tips:' },
      {
        type: 'list',
        items: [
          'The only purple refugee that matters is the diplomat. Try to get 3 purple diplomats and one orange in your alliance center. Focus these exclusively until your orange is 3 star.',
          'Only roll if there is a chance to get an orange refugee. Otherwise wait the 12 hours or use the free reroll (if the timer is long). When you see an orange, roll up to twice (unless it’s a specific refugee you need, then roll up to three times), then reroll.',
          'Orange refugee fragments will be by far your most limiting factor long term. This plan accounts for that.',
        ],
      },
    ],
  },
  {
    id: 'hero-recruitment',
    title: 'Hero Recruitment',
    blocks: [
      {
        type: 'paragraph',
        text: 'Straightforward: save for Thursday. Hero recruitment tickets get worse the longer the game goes on. They are not worth buying or targeting trucks to get.',
      },
    ],
  },
  {
    id: 'mystic-equipment',
    title: 'Mystic Equipment',
    blocks: [
      { type: 'paragraph', text: 'Upgrade F1 equipment evenly (get all to +2 before moving to +3)' },
      { type: 'paragraph', text: 'Tips:' },
      {
        type: 'list',
        items: [
          '+1 -> +2 is the most efficient power increase.',
          'Only spend on Tuesday',
          'Your most reliable source is bounties (minimum all but 3 should be S every day)',
        ],
      },
    ],
  },
  {
    id: 'modification-garage',
    title: 'Modification Garage',
    blocks: [
      {
        type: 'paragraph',
        text: 'As appealing as wrenches are, they are significantly worse at increasing your power when compared to alternatives at the same tier (power cores and hero shards). Exterior modules have significant diminishing returns that make them ineffective fairly quickly.',
      },
      { type: 'paragraph', text: 'Tips:' },
      {
        type: 'list',
        items: [
          'Tactical plugins should focus on F1 only',
          'Only spend on monday',
          'Ignore the warning about spending blueprints. It may be true, but the fix (spending a lot of $$) is often unrealistic',
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
          'Set a daily alarm (23:55 monday-saturday, 23:40 sunday)',
          'The closer you complete arena to reset, the better',
          'Even in 3v3, F1 is king',
        ],
      },
    ],
  },
  {
    id: 'vip-shop',
    title: 'VIP Shop',
    blocks: [
      { type: 'paragraph', text: 'In order:' },
      {
        type: 'list',
        ordered: true,
        items: ['Gas', 'Teleporters', 'Wrenches', 'Power cores', 'Badges (unless f2p)'],
      },
      {
        type: 'paragraph',
        text: 'The rest are sprinkle to taste. The 8h and 3 hr speed ups are a good deal. Orange shards cost 1k each, often not worth it. Blue tactical chest is good early, but not much value after your tactical equipment has been developed.',
      },
    ],
  },
  {
    id: 'merit-shop',
    title: 'Merit Shop',
    blocks: [
      {
        type: 'paragraph',
        text: 'Orange equipment until F1 is all orange, then roughly 2:1 ratio of power cores and forging stones. Discount only unless you have like 300k merit badges.',
      },
    ],
  },
  {
    id: 'glory-shop',
    title: 'Glory Shop',
    blocks: [
      { type: 'paragraph', text: 'Priority:' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Hero shards',
          'Equipment fragments (if not f2p)',
          'Wrenches',
          'Power cores',
          'Alloys',
          'Refugee tickets (unless you have a LOT)',
          'Purple plugin box',
          'Exterior module boxes',
          'Recruitment tickets',
          'Maybe speed if you have a lot of extra glory.',
        ],
      },
      {
        type: 'paragraph',
        text: 'I don’t bother with anything else. This order can change depending on day (e.g. wrenches first since shop resets on monday)',
      },
    ],
  },
  {
    id: 'hero-battlefield',
    title: 'Hero Battlefield',
    blocks: [
      { type: 'paragraph', text: 'Tips:' },
      {
        type: 'list',
        items: [
          'Rotate F1 on each of the 3, no need to match your counter formation every week.',
          'For other battlefields, pick a lower level you can complete for extra glory points',
          'Move your orange equipment around so your fighting force always has the best gear',
        ],
      },
    ],
  },
  {
    id: 'lucky-discounter',
    title: 'Lucky Discounter',
    blocks: [
      {
        type: 'paragraph',
        text: 'Always buy badges if you’re going for T10. The rest only buy at 70%+. Never buy rss or exp.',
      },
      {
        type: 'paragraph',
        text: 'Tip: If you’re f2p (or low spend), save your last ticket every other event and use it in the next one. That ticket will be a guaranteed 90%. E.g. save your ticket this month, spend it next month, and then save another ticket the month after that etc.',
      },
    ],
  },
  {
    id: 'roulette-wheel',
    title: 'Roulette Wheel',
    blocks: [
      {
        type: 'paragraph',
        text: 'Pick hero fragments (f2p) or equipment shards (paid player). Spin so that your last day is on 10, 20, or 40 spins (for the chests)',
      },
    ],
  },
  {
    id: 'gacha',
    title: 'Gacha',
    blocks: [
      { type: 'paragraph', text: 'Use your 5 free spins a day, then go for 2,500 chest.' },
      { type: 'paragraph', text: 'Tips:' },
      {
        type: 'list',
        items: [
          'This is generally not a great place to spend diamonds (costs too much and wrenches aren’t that good).',
          'Wait for 2+ chests with your free spins before you spend diamonds. Once the chest slots fill up, they will no longer roll, which increases your chance of keys',
          'Save your keys for the big boxes. Yes, it takes months, but you get more wrenches overall.',
        ],
      },
    ],
  },
  {
    id: 'bullseye-bullet',
    title: 'Bullseye Bullet',
    blocks: [
      {
        type: 'paragraph',
        text: 'Buy all 100 bullets. Roll until exactly 12 rounds are done (for the chest), then save your bullets for the next month.',
      },
    ],
  },
  {
    id: 'full-prep',
    title: 'Full Prep',
    blocks: [
      {
        type: 'paragraph',
        text: 'The most important thing in full prep is getting 18 points for the final chest. The easiest way to do that is hero xp + troop training + boomers. Construction and research are best saved for their respective VS days. You can try to save your VS turn ins for points in both full prep and VS.',
      },
    ],
  },
  {
    id: 'f1-strength',
    title: 'F1 Strength',
    blocks: [
      {
        type: 'paragraph',
        text: 'The order of power contributors are (troop buff buildings) > (hero shards) > (equipment fragments) > (power cores) > (forging stones) > (wrenches). However, since power cores can be consumed in great quantities, prioritize them whenever possible. You will run out of need for hero shards and equipment fragments long before power cores.',
      },
      {
        type: 'paragraph',
        text: 'Match faction and check your F1 structure to compare power between different combinations. Make sure you remove equipment for fair comparisons.',
      },
    ],
  },
  {
    id: 'where-to-spend-money',
    title: 'Where Should I Spend My Money?',
    blocks: [
      {
        type: 'paragraph',
        text: 'If you want to spend, there are only a few places that I think are actually worth it. In rough order:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'New f1 hero/equipment battle pass. Only place to get these is spending, and these are solid values as well',
          'Daily treasure: extremely cheap, and the Apoca treasure rewards are good. (I go power cores)',
          'Extra builder and lab. Extremely noticeable.',
          'The new value pass in the gold bar store is actually really good. $10 gets you 35 wrenches, 2,500 badges, 4k blueprints, and a bunch of other stuff. The 50$ is the same value (2.5x the rewards at 2.5x the price).',
          'Both monthly passes (hero code and ApocaAid). ApocaAid provides 900 hours of speed ups, 15,000 diamonds, some bonus damage, and an f4 that can mine almost 10k diamonds over the course of the pass.',
          'Seasonal packages (season journey and wartime investment)',
          'The $10 lucky discounter pass once every 3 months (distribute one ticket per month).',
        ],
      },
    ],
  },
  {
    id: 'buildings-to-upgrade',
    title: 'What Buildings to Upgrade',
    blocks: [
      { type: 'paragraph', text: 'Prioritize:' },
      {
        type: 'list',
        items: [
          'HQ and dependencies',
          'Military center (more troops greatly increases defense)',
          'Faction buildings (Toxic guardian etc) to 20',
          'Radar to 17 (reinforcement details)',
        ],
      },
      { type: 'paragraph', text: 'Nice to have:' },
      {
        type: 'list',
        items: [
          'Formation 1 and formation 2',
          'Rally square',
          'Villa (to around 22 or so)',
          'Bookstore',
          'Restaurant',
          'Faction buildings to 30 (really nice troop bonuses from 26-30)',
          'Smelting plant',
          'Steel plant',
        ],
      },
      {
        type: 'paragraph',
        text: 'Don’t bother with the rest. Resource buildings are just not worth it after 14 or so.',
      },
    ],
  },
  {
    id: 'where-to-spend-diamonds',
    title: 'Where to Spend Diamonds?',
    blocks: [
      {
        type: 'paragraph',
        text: 'Above suggestions for shops and weekly event. After that, try to get to VIP 10; several significant benefits including daily orange hero shard.',
      },
    ],
  },
  {
    id: 'chain-mining',
    title: 'What Is Chain Mining?',
    blocks: [
      {
        type: 'paragraph',
        text: 'The way buffs work in last z is that while you have a buff, it will be applied to a formation when they leave your HQ for as long as they are gone. What this means is that you can get the agriculture buff, then send out your mining formations, and they will keep the buff until they come home. This can be very handy for mining diamonds. If you drag-move your formation to a mining node, it will bring max troops. This will allow you to go from node to node over the course of several days without going home, letting you keep the buff for days at a time.',
      },
      { type: 'paragraph', text: 'Steps:' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Get the agriculture buff from the capital.',
          'Drag move your mining formation(s) to whatever resource node you want to mine.',
          'Before the formation(s) come home, move them to a different resource node and mine from that one.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Once you get a regular cadence for this (e.g. mine diamond 6 for 15 hours before you go to bed), it’s easy to intercept formations on their way home (or not quite finished mining) and have them start on a new node.',
      },
    ],
  },
];

export default en;
