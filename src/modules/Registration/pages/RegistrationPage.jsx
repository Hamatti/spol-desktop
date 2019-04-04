import React, { Component } from "react";
import { Filter } from "modules/Registration/components/Filter";
import { Checkbox } from "modules/Registration/components/Checkbox";
import "./Registration.scss";

class RegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      display: [],
      series: {
        open: [],
        juniors: [],
        veterans: [],
        ladies: []
      },
      newPlayer: {
        name: "",
        series: {
          open: false,
          juniors: false,
          veterans: false,
          ladies: false
        }
      }
    };
  }

  componentDidMount() {
    fetch("http://localhost:3004/members")
      .then(res => {
        return res.json();
      })
      .then(data => {
        const players = data.map(datum => {
          return {
            name: datum.name,
            series: {
              open: false,
              juniors: false,
              veterans: false,
              ladies: false
            },
            isMember: datum.isMember
          };
        });
        this.setState({ members: players, display: players });
      });
  }

  filterDisplayList = query => {
    const filtered = this.state.members.filter(player =>
      player.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );
    this.setState({
      display: filtered
    });
  };

  addPlayerToSeries = (player, series, willAdd) => {
    player.series[series] = willAdd;
    if (willAdd) {
      this.setState({
        series: {
          ...this.state.series,
          [series]: [...this.state.series[series], player]
        }
      });
    } else {
      const newList = this.state.series[series].filter(
        p => p.name !== player.name
      );
      this.setState({
        series: { ...this.state.series, [series]: newList }
      });
    }
  };

  addPlayer = newPlayer => {
    const players = [...this.state.members, newPlayer];

    this.setState({
      members: players,
      display: players
    });

    // TODO: this needs to implement adding to series as well
  };

  clearNewPlayer = () => {
    this.setState({
      newPlayer: {
        name: "",
        series: {
          open: false,
          juniors: false,
          veterans: false,
          ladies: false
        }
      }
    });
  };

  render() {
    return (
      <div>
        <Filter onChangeHandler={this.filterDisplayList} />
        <div>
          <table className="registration">
            <thead>
              <tr>
                <th>Nimi</th>
                <th>Avoin ({this.state.series.open.length})</th>
                <th>Juniorit ({this.state.series.juniors.length})</th>
                <th>Veteraanit ({this.state.series.veterans.length})</th>
                <th>Naiset ({this.state.series.ladies.length})</th>
                <th>Jäsenyys?</th>
              </tr>
            </thead>
            <tbody>
              <tr className="add-player-row">
                <td>
                  <input
                    id="new-player"
                    onChange={ev =>
                      this.setState({
                        newPlayer: {
                          ...this.state.newPlayer,
                          name: ev.target.value
                        }
                      })
                    }
                    type="text"
                    value={this.state.newPlayer.name}
                  />
                </td>
                <td>
                  <Checkbox
                    player={this.state.newPlayer}
                    onChangeHandler={ev =>
                      this.setState({
                        newPlayer: {
                          ...this.state.newPlayer,
                          series: {
                            ...this.state.newPlayer.series,
                            open: ev.target.checked
                          }
                        }
                      })
                    }
                    series="open"
                  />
                </td>
                <td>
                  <Checkbox
                    player={this.state.newPlayer}
                    onChangeHandler={ev =>
                      this.setState({
                        newPlayer: {
                          ...this.state.newPlayer,
                          series: {
                            ...this.state.newPlayer.series,
                            juniors: ev.target.checked
                          }
                        }
                      })
                    }
                    series="juniors"
                  />
                </td>
                <td>
                  <Checkbox
                    player={this.state.newPlayer}
                    onChangeHandler={ev =>
                      this.setState({
                        newPlayer: {
                          ...this.state.newPlayer,
                          series: {
                            ...this.state.newPlayer.series,
                            veterans: ev.target.checked
                          }
                        }
                      })
                    }
                    series="veterans"
                  />
                </td>
                <td>
                  <Checkbox
                    player={this.state.newPlayer}
                    onChangeHandler={ev =>
                      this.setState({
                        newPlayer: {
                          ...this.state.newPlayer,
                          series: {
                            ...this.state.newPlayer.series,
                            ladies: ev.target.checked
                          }
                        }
                      })
                    }
                    series="ladies"
                  />
                </td>
                <td>
                  <button
                    onClick={ev => {
                      this.addPlayer(this.state.newPlayer);
                      this.clearNewPlayer();
                    }}
                  >
                    Lisää
                  </button>
                </td>
              </tr>
              {this.state.display.map(player => (
                <tr key={player.name}>
                  <td className="playerName">{player.name}</td>
                  <td className="playerOpenSeries">
                    <Checkbox
                      player={player}
                      onChangeHandler={ev =>
                        this.addPlayerToSeries(
                          player,
                          "open",
                          ev.target.checked
                        )
                      }
                      series="open"
                    />
                  </td>
                  <td className="playerJuniorSeries">
                    <Checkbox
                      player={player}
                      onChangeHandler={ev =>
                        this.addPlayerToSeries(
                          player,
                          "juniors",
                          ev.target.checked
                        )
                      }
                      series="juniors"
                    />
                  </td>
                  <td className="playerVeteranSeries">
                    <Checkbox
                      player={player}
                      onChangeHandler={ev =>
                        this.addPlayerToSeries(
                          player,
                          "veterans",
                          ev.target.checked
                        )
                      }
                      series="veterans"
                    />
                  </td>
                  <td className="playerLadiesSeries">
                    <Checkbox
                      player={player}
                      onChangeHandler={ev =>
                        this.addPlayerToSeries(
                          player,
                          "ladies",
                          ev.target.checked
                        )
                      }
                      series="ladies"
                    />
                  </td>
                  <td>{player.isMember ? "OK" : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default RegistrationPage;
