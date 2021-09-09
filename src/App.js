import React, {Component} from 'react';
import './App.css';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';

class App extends Component {
  constructor() {
    super();

    this.state = {
      players: [],
      team: [],
      searchField: ''
    };
  }

  getSquads = async () => {
    try {
      const squadResponse = await fetch('https://api-football-v1.p.rapidapi.com/v3/players/squads?team=71', {
        headers: {
          'x-rapidapi-key': 'abd4e5ec3bmshc89644225bb0a91p1ca429jsn3d224bc0d117',
          'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
        },
      });
      const squadJson = await squadResponse.json();
      this.setState({
        players: squadJson.response[0].players,
        team: squadJson.response[0].team
      });
    } catch (err) {
      console.log('The error ' + err + ' was thrown.')
    }
  }

  componentDidMount() {
    this.getSquads()
  }

  render() {
    const { players, team, searchField } = this.state;
    const filteredPlayers = players.filter(player =>
      player.name.toLowerCase().includes(searchField.toLowerCase())
    )
    return (
      <div className="App">
        <h1>{team.name}</h1>
        <p><img src={team.logo} alt='logo'/></p>
        <p>
          {/* <input
          type='search'
          placeholder='Filter players'
          onChange={e => this.setState({ searchField: e.target.value })}
          /> */}
          <SearchBox
            placeholder='Filter players'
            handleChange={e => this.setState({ searchField: e.target.value })}
          />
        </p>
        <CardList
          players={filteredPlayers}
        />
        </div>
    )
  }
}

export default App;