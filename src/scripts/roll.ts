export function rollZeroToN(n: number) {
  return Math.floor(Math.random() * (n + 1));
}

export function rolldN(n: number) {
  return Math.floor(Math.random() * n) + 1;
}

export function rolld6() {
  return rolldN(6);
}

export function roll3d6() {
  return rolld6() + rolld6() + rolld6();
}

export function rolld8() {
  return rolldN(8);
}
