import React, { useEffect, useState } from "react";
import axios from "axios";
import CharacterBox from "./components/CharacterBox";
import "./App.css";

const App = () => {
  const [simpsons, setSimpsons] = useState(); //----- = state = { simpsons: [] };
  const [userInput, setUserInput] = useState("");

  const getApiData = async () => {
    const results = await axios.get(
      `https://thesimpsonsquoteapi.glitch.me/quotes?count=10`
    ); //----- =   async componentDidMount() { const results = await axios.get(...)

    setSimpsons(results.data); //----- = this.setState({ simpsons: results.data });
  };

  useEffect(() => {
    getApiData();
  }, []); //----- using [] to run once // this has to be after get api data

  if (!simpsons) {
    return <div className="lds-ripple"></div>;
  }

  const onDelete = (quote) => {
    const index = simpsons.findIndex((simpsons) => simpsons.quote === quote);

    const _simpsons = [...simpsons];
    _simpsons.splice(index, 1);

    setSimpsons(_simpsons);
  };

  const onLike = (quote) => {
    const index = simpsons.findIndex((simpsons) => simpsons.quote === quote);

    const _simpsons = [...simpsons];
    _simpsons[index].like = !_simpsons[index].like; //----- make it opposite, can like or dislike

    setSimpsons(_simpsons);
  };
  // for onLike
  let total = 0;
  simpsons.forEach((simpsons) => {
    if (simpsons.like) {
      total += 1;
    }
  });

  const onSortAtoZ = () => {
    const _simpsons = [...simpsons];

    _simpsons.sort((item, nextItem) => {
      if (item.character < nextItem.character) return -1;
      if (item.character > nextItem.character) return 1;
      return 0;
    });

    setSimpsons(_simpsons);
  };

  const onSortZtoA = () => {
    const _simpsons = [...simpsons];

    _simpsons.sort((item, nextItem) => {
      if (item.character < nextItem.character) return 1;
      if (item.character > nextItem.character) return -1;
      return 0;
    });
    setSimpsons(_simpsons);
  };

  const newQuote = () => {
    getApiData();
  };

  const onInput = (e) => {
    const userInput = e.target.value;
    setUserInput(userInput);
  };
  // for onInput
  let filtered = simpsons;
  if (userInput) {
    filtered = simpsons.filter((simpsons) => {
      return (
        simpsons.character.toLowerCase().includes(userInput) ||
        simpsons.character.toUpperCase().includes(userInput)
      );
    });
  }

  // const onEdit = (quote, character) => {
  //   const index = simpsons.findIndex((simpsons) => simpsons.quote === quote);

  //   const _simpsons = [...simpsons];
  //   _simpsons[index].character = character;

  //   setSimpsons(_simpsons);
  // };

  return (
    <>
      <div className="menuBar">
        <div className="title">
          <h1>The Simpsons Quote</h1>
        </div>
        <div className="onInput">
          <input
            onInput={onInput}
            type="text"
            placeholder="Search by name"
          ></input>
        </div>
        <div className="menuButton newQuote">
          <button onClick={newQuote}>New Quote</button>
        </div>
        <div className="menuButton onSortAtoZ">
          <button onClick={onSortAtoZ}>Sort by A-Z</button>
        </div>
        <div className="menuButton onSortZtoA">
          <button onClick={onSortZtoA}>Sort by Z-A</button>
        </div>
      </div>

      <div className="likesBar">
        <h2>Total Likes: {total}</h2>
        <p>* Click image to like characters</p>
      </div>

      <div className="gridForCharacter">
        <CharacterBox
          simpsons={simpsons}
          onDelete={onDelete}
          filtered={filtered}
          onLike={onLike}
          // onEdit={onEdit}
        />
      </div>
    </>
  );
};

export default App;
