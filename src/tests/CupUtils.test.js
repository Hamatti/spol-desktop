import { nearestUpperPow2, createRound } from "utils/cup";

function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
}

/* nearestUpperPow2 */
it("next pow2 is 2 with two players", () => {
  const players = ["Jack", "John"];
  const roundSize = nearestUpperPow2(players.length);

  expect(roundSize).toEqual(2);
});

it("next pow2 is 4 with three players", () => {
  const players = ["Jack", "John", "James"];
  const roundSize = nearestUpperPow2(players.length);

  expect(roundSize).toEqual(4);
});

it("next pow2 is 4 with four players", () => {
  const players = ["Jack", "John", "James", "Jim"];
  const roundSize = nearestUpperPow2(players.length);

  expect(roundSize).toEqual(4);
});

it("next pow2 is 8 with five players", () => {
  const players = ["Jack", "John", "James", "Jim", "Jonathan"];
  const roundSize = nearestUpperPow2(players.length);

  expect(roundSize).toEqual(8);
});

/* First round creation */

it("should create a round of 1 games and 3 byes with 5 players", () => {
  const participants = ["Jack", "John", "James", "Jim", "Jonathan"];
  const { games, byes } = createRound(participants);

  const playersInRounds = games
    .map(round => [round.home, round.away])
    .reduce((acc, val) => acc.concat(val), []);

  expect(games.length).toEqual(1);
  expect(byes.length).toEqual(3);

  byes.forEach(player => {
    expect(playersInRounds.includes(player)).toBe(false);
  });
});

it("should create a round of 3 games and 5 byes with 11 players", () => {
  const participants = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const { games, byes } = createRound(participants);

  const playersInRounds = games
    .map(round => [round.home, round.away])
    .reduce((acc, val) => acc.concat(val), []);

  expect(games.length).toEqual(3);
  expect(byes.length).toEqual(5);

  byes.forEach(player => {
    expect(playersInRounds.includes(player)).toBe(false);
  });
});

it("should create a round of 16 games and 0 byes with 32 players", () => {
  const participants = range(1, 32);
  const { games, byes } = createRound(participants);

  const playersInRounds = games
    .map(round => [round.home, round.away])
    .reduce((acc, val) => acc.concat(val), []);

  expect(games.length).toEqual(16);
  expect(byes.length).toEqual(0);

  byes.forEach(player => {
    expect(playersInRounds.includes(player)).toBe(false);
  });
});

it("should create a round of 0 games and 1 byes with 1 players", () => {
  const participants = ["James"];
  const { games, byes } = createRound(participants);

  const playersInRounds = games
    .map(round => [round.home, round.away])
    .reduce((acc, val) => acc.concat(val), []);

  expect(games.length).toEqual(0);
  expect(byes.length).toEqual(1);

  byes.forEach(player => {
    expect(playersInRounds.includes(player)).toBe(false);
  });
});
