import React, { Component } from 'react';
import ListItem from './components/ListItem';
import AddForm from './components/AddForm';
import { getLocalStorage, setLocalStorage } from './utilities/helpers'
import './App.css';

class App extends Component {
  state = {
    name: '',
    initiative: undefined,
    characters: [],
  }
  componentWillMount() {
    const characters = getLocalStorage()
    this.setState({
      characters
    })
  }

  setInputFocus() {
    document.querySelector('#name').focus()
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()

    const character = {
      'name': this.state.name,
      'initiative': this.state.initiative
    }

    if (character.name && character.initiative) {
      this.setState({
        name: '',
        initiative: undefined,
        characters: [
          ...this.state.characters,
          character
        ]
      }, () => {
        setLocalStorage(this.state.characters)
        this.setInputFocus()
      })
    }
  }

  editItem(name, initiative) {
    const characters = this.state.characters.filter(character => {
      return character.name !== name && character.initiative !== initiative
    })

    this.setState({
      name,
      initiative,
      characters
    })

    this.setInputFocus()
  }

  resetList() {
    this.setState({
      characters: []
    }, () => {
      setLocalStorage(this.state.characters)
    })
  }

  render() {
    const { name, initiative, characters } = this.state
    return (
      <div className="App">
        <AddForm
          name={name}
          initiative={initiative}
          onChange={this.onChange.bind(this)}
          submit={this.handleSubmit.bind(this)}
        />
        <div className="initiative-list">
          {
            characters.sort((a, b) => {
              return b.initiative - a.initiative
            }).map((character, index) => {
              return <ListItem
                key={index}
                name={character.name}
                initiative={character.initiative}
                onClick={this.editItem.bind(this)}
              />
            })
          }
        </div>
        {
          characters.length
          ?
          <input type="button" value="Reset" onClick={this.resetList.bind(this)} />
          :
          null
        }
      </div>
    );
  }
}

export default App;
