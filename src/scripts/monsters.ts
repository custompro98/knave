import { rollOnTable } from "knave-2e-generator";
import { rolld8, rolldN } from "./roll";

export interface Monster {
  id: string;
  name: string;
  level: number;
  curHp: number;
  maxHp: number;
  scent: string;
  texture: string;
  morale: number;
  attacks: number;
  powers: string[];
  tactics: string[];
  weaknesses: string[];
}

rollOnTable("monsters");

const LOCAL_STORAGE_KEY_MONSTERS = "monsters";

export function rollMonster(level: number): Monster {
  const powers = [];
  const tactics = [];
  const weaknesses = [];
  let attacks = 0;
  let morale = 7;

  if (1 <= level && level < 3) {
    tactics.push(rollOnTable("tactics"));

    weaknesses.push(rollOnTable("weaknesses"));
    weaknesses.push(rollOnTable("weaknesses"));
    weaknesses.push(rollOnTable("weaknesses"));

    attacks = 1;
    morale = 5;
  } else if (3 <= level && level < 6) {
    tactics.push(rollOnTable("tactics"));
    tactics.push(rollOnTable("tactics"));

    weaknesses.push(rollOnTable("weaknesses"));
    weaknesses.push(rollOnTable("weaknesses"));
    weaknesses.push(rollOnTable("weaknesses"));

    attacks = 2;
    morale = 7;
  } else if (6 <= level && level < 10) {
    tactics.push(rollOnTable("tactics"));
    tactics.push(rollOnTable("tactics"));
    tactics.push(rollOnTable("tactics"));

    weaknesses.push(rollOnTable("weaknesses"));
    weaknesses.push(rollOnTable("weaknesses"));

    powers.push(rollOnTable("powers"));

    attacks = 3;
    morale = 10;
  } else if (10 <= level && level < 15) {
    tactics.push(rollOnTable("tactics"));
    tactics.push(rollOnTable("tactics"));
    tactics.push(rollOnTable("tactics"));

    weaknesses.push(rollOnTable("weaknesses"));

    powers.push(rollOnTable("powers"));
    powers.push(rollOnTable("powers"));

    attacks = 3;
    morale = 13;
  } else {
    tactics.push(rollOnTable("tactics"));
    tactics.push(rollOnTable("tactics"));
    tactics.push(rollOnTable("tactics"));

    weaknesses.push(rollOnTable("weaknesses"));

    powers.push(rollOnTable("powers"));
    powers.push(rollOnTable("powers"));
    powers.push(rollOnTable("powers"));

    attacks = 4;
    morale = 17;
  }

  const hp = [...Array(level)].reduce((acc) => acc + rolld8(), 0);

  return {
    id: crypto.randomUUID(),
    name: rollOnTable("monsters"),
    curHp: hp,
    maxHp: hp,
    level: level,
    scent: rollOnTable("scents"),
    texture: rollOnTable("textures"),
    morale: morale,
    attacks: attacks,
    powers: powers,
    tactics: tactics,
    weaknesses: weaknesses,
  };
}

export function upsertMonster(monster: Monster) {
  const monsters = localStorage.getItem(LOCAL_STORAGE_KEY_MONSTERS);

  if (!monsters) {
    createMonster([], monster);
    return;
  }

  const parsedMonsters: Monster[] = JSON.parse(monsters);

  if (parsedMonsters.find((pred) => pred.id === monster.id)) {
    updateMonster(parsedMonsters, monster);
    return;
  } else {
    createMonster(parsedMonsters, monster);
    return;
  }
}

function createMonster(monsters: Monster[], monster: Monster) {
  const newMonsters = [{ ...monster }, ...monsters];
  localStorage.setItem(LOCAL_STORAGE_KEY_MONSTERS, JSON.stringify(newMonsters));
}

export function readMonsters(): Monster[] {
  const monsters = localStorage.getItem(LOCAL_STORAGE_KEY_MONSTERS);

  if (!monsters) {
    return [];
  }

  return JSON.parse(monsters);
}

function updateMonster(monsters: Monster[], monster: Monster) {
  const idx = monsters.findIndex((pred) => pred.id === monster.id);
  if (idx === -1) return;

  monsters[idx] = { ...monster };

  localStorage.setItem(LOCAL_STORAGE_KEY_MONSTERS, JSON.stringify(monsters));
}

export function deleteMonster(uuid: string) {
  const monsters = localStorage.getItem(LOCAL_STORAGE_KEY_MONSTERS);
  if (!monsters) return;

  localStorage.setItem(
    LOCAL_STORAGE_KEY_MONSTERS,
    JSON.stringify(
      JSON.parse(monsters).filter((monster: Monster) => monster.id !== uuid),
    ),
  );
}
