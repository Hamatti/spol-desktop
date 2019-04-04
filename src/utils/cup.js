export function createRound(players) {
  if (players.length === 0 || players.length === 1) {
    return { games: [], byes: players };
  }
  const fullRoundSize = nearestUpperPow2(players.length);
  players = shuffle(players);

  const byes = players.splice(0, fullRoundSize - players.length);
  const roundAmount = players.length / 2;

  let games = [];

  for (let i = 0; i < roundAmount; i++) {
    let game = {
      home: players[i],
      away: players[players.length - (1 + i)]
    };
    games.push(game);
  }

  return {
    games,
    byes
  };
}

export function nearestUpperPow2(v) {
  v--;
  v |= v >> 1;
  v |= v >> 2;
  v |= v >> 4;
  v |= v >> 8;
  v |= v >> 16;
  return v + 1;
}

function shuffle(arr) {
  const array = [...arr];
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
