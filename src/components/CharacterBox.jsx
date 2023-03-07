import React from "react";

const CharacterBox = (props) => {
  const { filtered, onDelete, onLike } = props;

  return (
    <>
      {filtered.map((item) => (
        <div className="characterCard" key={item.quote}>
          <div>
            <button
              className="deleteButton"
              onClick={() => onDelete(item.quote)}
            >
              <i className="fa-solid fa-user-xmark"></i>
            </button>
          </div>

          <div className="character">
            <p>{item.character}</p>
          </div>

          <button className="imageButton">
            <img
              src={item.image}
              alt={item.character}
              onClick={() => {
                onLike(item.quote);
              }}
            ></img>
          </button>

          <div className="quote">
            <p>{item.quote}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default CharacterBox;

//----- note!
//----- line 12, the key is very important, it causes the delete button not working. Correct the error in console first, it might fix the bug.
