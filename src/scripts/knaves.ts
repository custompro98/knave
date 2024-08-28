import { rollOnTable } from "knave-2e-generator";

export interface Knave {
  id: string;
  level: number;
  xp: number;
  curHp: number;
  maxHp: number;
  firstCareer: string;
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

const abilities = ["str", "dex", "con", "int", "wis", "cha"];

function makeAbilityScoreCounter(rolls: number[]) {
  return function (ability: (typeof abilities)[number]) {
    const targetIdx = abilities.indexOf(ability);

    return rolls.reduce((acc, roll) => {
      if (roll - 1 == targetIdx) {
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
    .map((item) => item.replace(/\)$/, "")); // ['item1', 'item2', 'item3']
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

  itemsFromCareer(firstCareer).forEach((item, idx) => {
    items[idx] = item;
  });

  const hp = rolld6();

  return {
    id: crypto.randomUUID(),
    name,
    str: generateAbilityScore("str"),
    dex: generateAbilityScore("dex"),
    con: con,
    int: generateAbilityScore("int"),
    wis: generateAbilityScore("wis"),
    cha: generateAbilityScore("cha"),
    level: 1,
    xp: 0,
    items,
    curHp: hp,
    maxHp: hp,
    firstCareer: careerName(firstCareer),
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

export function createKnave(knaves: Knave[], knave: Knave) {
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
      JSON.parse(knaves).filter(
        (knave: ReturnType<typeof rollKnave>) => knave.id !== uuid,
      ),
    ),
  );
}

function rolld6() {
  return Math.floor(Math.random() * 6) + 1;
}
