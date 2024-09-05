export interface Monster {
  id: string;
}

const LOCAL_STORAGE_KEY_MONSTERS = "monsters";

export function rollMonster(): Monster {
  console.log("roll monster");

  return {
    id: crypto.randomUUID(),
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
