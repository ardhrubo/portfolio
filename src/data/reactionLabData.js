// Scripted reaction game content. Simplified, illustrative chemistry — not a simulator.
// `effect` drives the flask animation; `mood` drives the portrait reaction.

export const reagents = [
  { id: 'vinegar', name: 'Vinegar', formula: 'CH₃COOH', color: '#f4e9c8', note: 'Weak acid' },
  { id: 'soda', name: 'Baking soda', formula: 'NaHCO₃', color: '#f5f7fa', note: 'Mild base' },
  { id: 'cabbage', name: 'Red cabbage juice', formula: 'Anthocyanin', color: '#7b4fb8', note: 'pH indicator' },
  { id: 'peroxide', name: 'Hydrogen peroxide', formula: 'H₂O₂ (3%)', color: '#dff3ff', note: 'Oxidiser' },
  { id: 'yeast', name: 'Yeast', formula: 'Catalase', color: '#d9b77e', note: 'Enzyme catalyst' },
  { id: 'water', name: 'Water', formula: 'H₂O', color: '#bfe6ff', note: 'Solvent' },
  { id: 'oil', name: 'Cooking oil', formula: 'Triglycerides', color: '#f2c94c', note: 'Non-polar' },
  { id: 'sodium', name: 'Sodium metal', formula: 'Na', color: '#c7ccd1', note: 'Very reactive' },
];

const key = (a, b) => [a, b].sort().join('+');

const list = [
  {
    pair: ['vinegar', 'soda'], id: 'fizz', title: 'Volcano fizz', effect: 'fizz', mood: 'excited',
    liquid: '#efe6cf', equation: 'NaHCO₃ + CH₃COOH → CH₃COONa + H₂O + CO₂↑',
    text: 'Acid meets base and releases carbon dioxide bubbles.', quote: 'Look at it go!',
  },
  {
    pair: ['cabbage', 'vinegar'], id: 'pink', title: 'Acid blush', effect: 'color', mood: 'blush',
    liquid: '#e2508f', equation: 'Indicator + H⁺ → red/pink form',
    text: 'Anthocyanin turns pink in acid — a natural pH indicator.', quote: 'Pink suits us.',
  },
  {
    pair: ['cabbage', 'soda'], id: 'teal', title: 'Base shift', effect: 'color', mood: 'curious',
    liquid: '#2bb5a0', equation: 'Indicator + OH⁻ → blue/green form',
    text: 'In a basic solution the same indicator shifts toward blue-green.', quote: 'Wait… it went green?',
  },
  {
    pair: ['cabbage', 'water'], id: 'neutral', title: 'Neutral purple', effect: 'color', mood: 'calm',
    liquid: '#8a62c9', equation: 'pH ≈ 7 → purple',
    text: 'Near-neutral water leaves the indicator purple.', quote: 'Balanced. As all things should be.',
  },
  {
    pair: ['peroxide', 'yeast'], id: 'foam', title: 'Elephant toothpaste', effect: 'foam', mood: 'shocked',
    liquid: '#f3eee4', equation: '2H₂O₂ —catalase→ 2H₂O + O₂↑',
    text: 'Yeast enzymes split peroxide fast; oxygen whips the mix into foam.', quote: 'That is a lot of foam.',
  },
  {
    pair: ['oil', 'water'], id: 'layers', title: 'Refusing to mix', effect: 'layers', mood: 'confused',
    liquid: '#bfe6ff', top: '#f2c94c', equation: 'Polar ≠ non-polar',
    text: 'Oil is non-polar, water is polar — they separate into layers.', quote: 'Some things just don’t mix.',
  },
  {
    pair: ['sodium', 'water'], id: 'boom', title: 'Alkali pop', effect: 'boom', mood: 'singed',
    liquid: '#d6e9f5', equation: '2Na + 2H₂O → 2NaOH + H₂↑',
    text: 'Sodium reacts violently, releasing hydrogen that can ignite. Lab-only with protection.', quote: '…I meant to do that.',
  },
  {
    pair: ['sodium', 'vinegar'], id: 'boom2', title: 'Even bigger pop', effect: 'boom', mood: 'singed',
    liquid: '#efe3c4', equation: '2Na + 2CH₃COOH → 2CH₃COONa + H₂↑',
    text: 'Acid makes sodium react even faster. Never try this outside a lab.', quote: 'My eyebrows…',
  },
  {
    pair: ['peroxide', 'vinegar'], id: 'caution', title: 'Quiet hazard', effect: 'warn', mood: 'worried',
    liquid: '#eef2e4', equation: 'CH₃COOH + H₂O₂ ⇌ CH₃COOOH + H₂O',
    text: 'Little to see, but it slowly forms irritating peracetic acid. Don’t mix these at home.', quote: 'Nope. Stepping back.',
  },
];

export const reactions = Object.fromEntries(list.map(r => [key(...r.pair), r]));
export const reactionCount = list.length;

export const fallbackReaction = {
  id: 'none', title: 'Nothing much', effect: 'none', mood: 'bored', equation: 'No visible reaction',
  text: 'Not every mix reacts. Try another pair.', quote: 'Was that… it?',
};

export function findReaction(a, b) {
  return reactions[key(a, b)] || fallbackReaction;
}
