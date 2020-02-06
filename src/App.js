import React, { useState, useEffect, useRef } from 'react';
import ListItem from './components/ListItem';
import AddForm from './components/AddForm';
import { getLocalStorage, setLocalStorage } from './utilities/helpers';
import './App.css';

const App = props => {
  const [name, setName] = useState('');
  const [initiative, setInitiative] = useState(undefined);
  const [characters, setCharacters] = useState([]);

  const nameInput = useRef(null);

  useEffect(() => {
    const storedCharacters = getLocalStorage();
    if (storedCharacters) setCharacters(storedCharacters);
  }, []);

  useEffect(
    () => {
      setLocalStorage(characters);
    },
    [characters]
  );

  const setInputFocus = () => {
    nameInput.current.focus();
  };

  const onChange = e => {
    const { name: inputName, value } = e.target;
    console.log(inputName, value);
    switch (inputName) {
      case 'name':
        setName(value);
        break;
      case 'initiative':
        setInitiative(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const character = {
      name,
      initiative,
    };

    if (character.name && character.initiative) {
      setCharacters(prevState => [...prevState, character]);
      setName('');
      setInitiative(undefined);
      setInputFocus();
    }
  };

  const editItem = (editName, editInitiative) => {
    const charactersList = characters.filter(
      character =>
        character.name !== editName && character.initiative !== editInitiative
    );

    setName(editName);
    setInitiative(editInitiative);
    setCharacters(charactersList);

    setInputFocus();
  };

  return (
    <div className="container">
      <div className="App">
        <AddForm
          name={name}
          initiative={initiative}
          onChange={onChange}
          submit={handleSubmit}
          inputRef={nameInput}
        />
        {characters.length ? (
          <div className="initiative-list">
            {characters
              .sort((a, b) => b.initiative - a.initiative)
              .map((character, index) => (
                <ListItem
                  key={index}
                  name={character.name}
                  initiative={character.initiative}
                  onClick={editItem}
                />
              ))}
          </div>
        ) : null}
        {characters.length ? (
          <input
            type="button"
            value="Reset"
            onClick={() => setCharacters([])}
          />
        ) : null}
      </div>
      <div className="footer">
        <a href="https://github.com/thedeany/initiative-tracker">Github</a>
      </div>
    </div>
  );
};

export default App;
