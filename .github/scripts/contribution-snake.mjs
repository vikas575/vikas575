import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Read the weeks from GitHub's contributionCalendar GraphQL field.
const weeks = JSON.parse(readFileSync(0, 'utf8'));
if (!Array.isArray(weeks) || !weeks.length) throw new Error('Missing contribution calendar');
const levels = ['NONE', 'FIRST_QUARTILE', 'SECOND_QUARTILE', 'THIRD_QUARTILE', 'FOURTH_QUARTILE'];
const days = weeks.flatMap(({ contributionDays }, x) => contributionDays.map(({ weekday: y, contributionLevel }) => {
  const level = levels.indexOf(contributionLevel);
  if (level < 0 || !Number.isInteger(y) || y < 0 || y > 6) throw new Error('Invalid contribution day');
  return { x, y, level };
}));
if (!days.length) throw new Error('Empty contribution calendar');

const active = days.filter(day => day.level > 0);
const food = new Map(active.map(day => [`${day.x},${day.y}`, day]));
const spacing = 16;
const initialLength = 3;
const route = [[-initialLength, 0]];
const bites = [];
function advance(x, y) {
  route.push([x, y]);
  const day = food.get(`${x},${y}`);
  if (day) bites.push({ day, step: route.length - 1 });
}

// Alternate downward and upward passes in active weeks. The body always has
// room to grow because the route never crosses itself.
for (let x = 1 - initialLength; x < weeks.length; x++) {
  const y = route.at(-1)[1];
  advance(x, y);
  if (!weeks[x]?.contributionDays.some(day => day.contributionLevel !== 'NONE')) continue;
  const direction = y === 0 ? 1 : -1;
  for (let i = 1; i <= 6; i++) advance(x, y + i * direction);
}
advance(weeks.length, route.at(-1)[1]);
if (bites.length !== food.size) throw new Error('The snake missed an active day');

const lastStep = route.length - 1;
const headStart = initialLength - 1;
const holdBefore = 6;
const walkEnd = holdBefore + lastStep - headStart;
const loop = walkEnd + 19;
const duration = `${(loop * 0.115).toFixed(3)}s`;
const fraction = (part, total = loop) => Number((part / total).toFixed(7));
const routePath = route.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x * spacing} ${y * spacing}`).join(' ');

const palettes = {
  'snake.svg': { tiles: ['#d9f5e2', '#98e4ac', '#51c774', '#269c53', '#13713c'], snake: '#69eb49', stripe: '#89f15b', edge: '#11612e' },
  'snake-dark.svg': { tiles: ['#173d2c', '#245b3c', '#36884d', '#50af63', '#76d784'], snake: '#91fa57', stripe: '#b0ff71', edge: '#285c31' },
};

function switchAt(step, attribute, before, after) {
  const time = fraction(holdBefore + step - headStart);
  return `<animate attributeName="${attribute}" calcMode="discrete" values="${before};${after}" keyTimes="0;${time}" dur="${duration}" repeatCount="indefinite"/>`;
}

function tile({ x, y }, fill, animation = '') {
  return `<rect x="${x * spacing - 6}" y="${y * spacing - 6}" width="12" height="12" rx="3" fill="${fill}">${animation}</rect>`;
}

function segment(index, colors) {
  // Segment i follows the head by i cells and appears on its own bite.
  const firstStep = Math.max(0, headStart - index);
  const startTime = holdBefore + Math.max(0, index - headStart);
  const from = fraction(firstStep, lastStep);
  const to = fraction(lastStep - index, lastStep);
  const times = `0;${fraction(startTime)};${fraction(walkEnd)};1`;
  const motion = `<animateMotion dur="${duration}" repeatCount="indefinite" rotate="auto" calcMode="linear" keyPoints="${from};${from};${to};${to}" keyTimes="${times}"><mpath href="#route" xlink:href="#route"/></animateMotion>`;
  const bite = bites[index - initialLength];
  const reveal = bite ? switchAt(bite.step, 'opacity', '0', '1') : '';
  const head = index === 0;
  const shape = head
    ? `<rect x="-8" y="-7" width="18" height="14" rx="6" fill="${colors.snake}"/><g fill="#fff" stroke="none"><circle cx="4" cy="-3.5" r="2.5"/><circle cx="4" cy="3.5" r="2.5"/></g><g fill="#103c24" stroke="none"><circle cx="4.9" cy="-3.5" r="1.25"/><circle cx="4.9" cy="3.5" r="1.25"/></g>`
    : `<rect x="-8" y="-5.5" width="16" height="11" rx="5" fill="${index % 2 ? colors.snake : colors.stripe}"/>`;
  return `<g class="${head ? 'head' : 'segment'}" opacity="${bite ? 0 : 1}" stroke="${colors.edge}" stroke-width="1.4">${reveal}${motion}${shape}</g>`;
}

function draw(colors) {
  const grid = days.map(day => tile(day, colors.tiles[day.level])).join('\n');
  const eaten = bites.map(({ day, step }) => `<g opacity="0">${switchAt(step, 'opacity', '0', '1')}${tile(day, colors.tiles[0])}</g>`).join('\n');
  // Draw from tail to head so the eyes stay visible through turns.
  const body = Array.from({ length: initialLength + bites.length }, (_, i) => segment(i, colors)).reverse().join('\n');
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-58 -16 ${weeks.length * spacing + 76} 128" role="img" aria-labelledby="title desc">
<title id="title">Growing contribution snake</title>
<desc id="desc">A green snake gains one segment for each of ${bites.length} active days. The faintest green marks days with zero contributions.</desc>
<style>@media (prefers-reduced-motion: reduce) { .animation { display: none } }</style>
<defs><path id="route" d="${routePath}"/></defs>
<g id="calendar">${grid}</g>
<g class="animation"><g id="eaten">${eaten}</g><g id="snake">${body}</g></g>
</svg>\n`;
}

const output = process.argv[2] ?? 'dist';
mkdirSync(output, { recursive: true });
for (const [name, palette] of Object.entries(palettes)) writeFileSync(join(output, name), draw(palette));
