export const template = (rounds, meta) => {
  meta = meta || {};
  const date = meta.date || today();
  const tournamentName = meta.name || "Cup-turnaus";
  return `<!doctype html>
        <html>
          <head>
            <title>${tournamentName} - ${date}</title>
          </head>
          <body>
            <div class="main">
              <h1>${tournamentName} - ${date}</h1>
              <hr>
              <div class="content">
                ${Object.keys(rounds)
                  .sort()
                  .map(round => roundTemplate(rounds[round], round))
                  .join("")}
            </div>
          </body>
        </html>`;
};

/* -------- Helpers ----------- */
const today = () => {
  const date = new Date();
  return `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`;
};

const roundTemplate = (round, roundNum) => {
  if (round.games.length > 0) {
    return `
    <section>
        <h2>Kierros: ${roundNum}</h2>
        <div class="round">
        <table class="round-games">
                <tbody>
            ${round.games.map(game => gameTemplate(game)).join("")}
               </tbody>
                  </table>
        </div>
        <hr>
    </section>

`;
  } else {
    return `<section>
      <h2>Voittaja: ${round.byes[0]}</h2></section>`;
  }
};

const gameTemplate = game => `
    <tr>
    <td>${game.home}</td>
    <td> - </td>
    <td>${game.away}</td>
    <td>
        ${game.result}
    </td>
    </tr>
`;
