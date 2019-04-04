import React, { Component } from "react";
import { FaInfoCircle } from "react-icons/fa";
import Popup from "reactjs-popup";

import "./Cup.scss";

import { createRound } from "utils/cup";

const fakePlayers = ["James", "Mike", "Gary", "Will", "Sandy"];
const STARTING_ROUND = 1;

const Card = ({ title }) => (
  <div className="card">
    <div className="header">{title}</div>
    <div className="content">
      <p>
        Tasoituskierros pelataan, jos pelaajia ei ole tasamäärää kakkosen
        potensseja (1, 2, 4, 8, 16, 32, 64, jne).
      </p>
      <p>Tasoituskierroksella osa pelaajista pääsee jatkoon pelaamatta.</p>
    </div>
  </div>
);

class CupPage extends Component {
  constructor() {
    super();
    this.state = {
      originalPlayers: fakePlayers,
      rounds: {}
    };
  }

  componentDidMount() {
    this.createRound(this.state.originalPlayers, STARTING_ROUND);
  }

  createRound = (players, roundNro) => {
    const { games, byes } = createRound(players);

    const newRound = {
      games: games.map(game => ({
        home: game.home,
        away: game.away,
        result: "",
        extra: null,
        frozen: false
      })),
      byes: byes,
      frozen: false
    };

    const newRounds = {
      ...this.state.rounds,
      [roundNro]: newRound
    };

    this.setState({
      rounds: newRounds
    });
  };

  editRound = roundNro => {
    //TODO: Add an alert prompt
    const { rounds } = this.state;
    const pastRounds = Object.keys(rounds).filter(round => round > roundNro);

    pastRounds.forEach(roundIdx => {
      delete rounds[roundIdx];
    });

    const currentRound =
      rounds[Object.keys(rounds).filter(round => round === roundNro)[0]];

    currentRound.frozen = false;

    currentRound.games.forEach(game => {
      game.frozen = false;
    });

    this.setState({
      rounds: {
        ...rounds,
        [roundNro]: currentRound
      }
    });
  };

  isValidResult = result => {
    return result && result.match(/\d+-\d+/);
  };

  isRoundResultValid = roundNro => {
    const { rounds } = this.state;
    const round = rounds[roundNro];

    return round.games.every(game => !!this.isValidResult(game.result));
  };

  saveRoundResults = currentRoundNro => {
    currentRoundNro = parseInt(currentRoundNro);
    const { rounds } = this.state;
    const round = rounds[currentRoundNro];
    const { games, byes } = round;

    const winners = games.map(game => {
      const [homeScore, awayScore] = game.result.split("-");

      game.frozen = true;

      // TODO: Validate that there won't be ties
      if (homeScore > awayScore) {
        return game.home;
      } else {
        return game.away;
      }
    });

    round.frozen = true;

    this.setState({
      rounds: {
        ...rounds,
        [currentRoundNro]: round
      }
    });

    this.createRound(winners.concat(byes), currentRoundNro + 1);
  };

  changeResult = (result, round, roundNro) => {
    const { rounds } = this.state;
    const { games, byes } = rounds[roundNro];

    const newGames = games.map(game => {
      if (game.home === round.home && game.away === round.away) {
        game.result = result;
      }
      return game;
    });

    this.setState({
      rounds: {
        ...rounds,
        [roundNro]: {
          games: newGames,
          byes
        }
      }
    });
  };

  render() {
    return (
      <div className="cup-page">
        <h2> Cup </h2>
        <details>
          <summary>Osallistuvat pelaajat (klikkaa nähdäksesi listan)</summary>
          <ul className="cup-player-list">
            {this.state.originalPlayers.map((player, i) => (
              <li>
                {i + 1}. {player}
              </li>
            ))}
          </ul>
        </details>

        {Object.keys(this.state.rounds)
          .sort()
          .map(roundNro => {
            const round = this.state.rounds[roundNro];
            const { games, byes } = round;
            if (round.games.length > 0) {
              return (
                <section>
                  {round.byes.length > 0 ? (
                    <div className="round-heading">
                      <strong>Tasoituskierros</strong>, {byes.length} suoraan
                      jatkoon
                      <Popup
                        trigger={<FaInfoCircle />}
                        position="left center"
                        on="hover"
                      >
                        <Card title="Tasoituskierros" />
                      </Popup>
                    </div>
                  ) : (
                    <div className="round-heading">
                      <strong>Kierros {roundNro}</strong>
                    </div>
                  )}
                  <form>
                    <table>
                      <tbody>
                        {games.map(game => (
                          <tr>
                            <td>{game.home}</td>
                            <td> - </td>
                            <td>{game.away}</td>
                            <td>
                              {game.frozen ? (
                                <div>{game.result}</div>
                              ) : (
                                <input
                                  type="text"
                                  placeholder="1-0"
                                  onChange={ev =>
                                    this.changeResult(
                                      ev.target.value,
                                      game,
                                      roundNro
                                    )
                                  }
                                  value={game.result}
                                />
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <button
                      onClick={() => this.saveRoundResults(roundNro)}
                      disabled={
                        round.frozen || !this.isRoundResultValid(roundNro)
                      }
                    >
                      Tallenna
                    </button>
                    <button
                      onClick={() => this.editRound(roundNro)}
                      disabled={!round.frozen}
                    >
                      Muokkaa
                    </button>
                    <div className="clear" />
                  </form>
                </section>
              );
            } else {
              return (
                <section>
                  <h3>Voittaja: {round.byes[0]}</h3>
                </section>
              );
            }
          })}
      </div>
    );
  }
}

export default CupPage;
