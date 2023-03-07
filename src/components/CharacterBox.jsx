import React from "react"; //, { useState }

const CharacterBox = (props) => {
  const { filtered, onDelete, onLike } = props; // simpsons,onEdit

  // const [edit, setEdit] = useState(false);
  // const [character, setCharacter] = useState("");

  // const onSave = () => {
  //   setEdit(false); //----- turn off edit

  //   onEdit(simpsons.quote, character); //----- call onEdit function
  // };

  // const onEditInput = (e) => {
  //   setCharacter(e.target.value);
  // };

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

          {/* {edit ? (
            <>
              <input onInput={onEditInput} type="text" />
              <button onClick={onSave}>Save</button>
            </>
          ) : (
            <button onClick={() => setEdit(!edit)}>Edit</button>
          )}
          if (edit?) edit is true, show (<>to</>), otherwise (:) show.... */}

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
