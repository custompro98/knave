import { rollOnTable } from "knave-2e-generator";
import { roll3d6, rolld6, rolldN } from "./roll";

export interface Knave {
  id: string;
  level: number;
  xp: number;
  curHp: number;
  maxHp: number;
  firstCareer: string;
  secondCareer: string | undefined;
  name: string;
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
  items: any[];
  saved: boolean;
}

const LOCAL_STORAGE_KEY_KNAVES = "knaves";

const ABILITIES = ["str", "dex", "con", "int", "wis", "cha"];

function makeAbilityScoreCounter(rolls: number[]) {
  return function (ability: (typeof ABILITIES)[number]) {
    const targetIdx = ABILITIES.indexOf(ability) + 1;

    return rolls.reduce((acc, roll) => {
      if (roll == targetIdx) {
        return acc + 1;
      }
      return acc;
    }, 0);
  };
}

function itemsFromCareer(career: string) {
  return career // name (item1, item2, item3)
    .split("(")[1] // item1, item2, item3)
    .split(",") // ['item1', ' item2', ' item3)']
    .map((item) => item.trim()) // ['item1', 'item2', 'item3)']
    .map((item) => item.replace(/\)$/, "")) // ['item1', 'item2', 'item3']
    .map((item) => `${item[0].toUpperCase()}${item.slice(1).toLowerCase()}`); // ['Item1', 'Item2', 'Item3']
}

function careerName(career: string) {
  return career // name (item1, item2, item3)
    .split("(")[0] // 'name '
    .trim(); // name
}

export function rollKnave(): Knave {
  const name = rollOnTable("names");
  const rolls = [rolld6(), rolld6(), rolld6()];

  const generateAbilityScore = makeAbilityScoreCounter(rolls);
  const con = generateAbilityScore("con");
  const items = [...Array(10 + con)];

  const firstCareer = rollOnTable("careers");
  const secondCareer = rollOnTable("careers");

  const itemsFromCareers = [
    ...itemsFromCareer(firstCareer),
    ...itemsFromCareer(secondCareer),
  ];

  // Items from careers come first
  itemsFromCareers.forEach((item, idx) => {
    items[idx] = item;
  });

  items[itemsFromCareers.length] = `${roll3d6() * 10} coins`;

  // Spellbooks from intelligence come after
  const intelligence = generateAbilityScore("int");
  for (let i = 0; i < intelligence; i++) {
    const nextIdx = i + itemsFromCareers.length + 1;
    if (nextIdx < items.length) {
      items[nextIdx] = `${rollOnTable("spellbooks")} (spellbook)`;
    }
  }

  // Add remaining items randomly
  const nextItemIndex = items.findIndex((item) => item === undefined);
  const remainingSlots = items.length - nextItemIndex;
  const slotsToFill = rolldN(remainingSlots);

  for (let i = 0; i < slotsToFill; i++) {
    items[nextItemIndex + i] = rollOnTable("generalItems");
  }

  const hp = rolld6();

  return {
    id: crypto.randomUUID(),
    name,
    str: generateAbilityScore("str"),
    dex: generateAbilityScore("dex"),
    con: con,
    int: intelligence,
    wis: generateAbilityScore("wis"),
    cha: generateAbilityScore("cha"),
    level: 1,
    xp: 0,
    items,
    curHp: hp,
    maxHp: hp,
    firstCareer: careerName(firstCareer),
    secondCareer: careerName(secondCareer),
    saved: false,
  };
}

export function upsertKnave(knave: Knave) {
  const knaves = localStorage.getItem(LOCAL_STORAGE_KEY_KNAVES);

  if (!knaves) {
    createKnave([], knave);
    return;
  }

  const parsedKnaves: Knave[] = JSON.parse(knaves);

  if (parsedKnaves.find((pred) => pred.id === knave.id)) {
    updateKnave(parsedKnaves, knave);
    return;
  } else {
    createKnave(parsedKnaves, knave);
    return;
  }
}

function createKnave(knaves: Knave[], knave: Knave) {
  const newKnaves = [{ ...knave }, ...knaves];
  localStorage.setItem(LOCAL_STORAGE_KEY_KNAVES, JSON.stringify(newKnaves));
}

export function readKnaves(): Knave[] {
  const knaves = localStorage.getItem(LOCAL_STORAGE_KEY_KNAVES);

  if (!knaves) {
    return [];
  }

  return JSON.parse(knaves);
}

function updateKnave(knaves: Knave[], knave: Knave) {
  const idx = knaves.findIndex((pred) => pred.id === knave.id);
  if (idx === -1) return;

  knaves[idx] = { ...knave };

  localStorage.setItem(LOCAL_STORAGE_KEY_KNAVES, JSON.stringify(knaves));
}

export function deleteKnave(uuid: string) {
  const knaves = localStorage.getItem(LOCAL_STORAGE_KEY_KNAVES);
  if (!knaves) return;

  localStorage.setItem(
    LOCAL_STORAGE_KEY_KNAVES,
    JSON.stringify(
      JSON.parse(knaves).filter((knave: Knave) => knave.id !== uuid),
    ),
  );
}
