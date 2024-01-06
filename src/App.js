import { useState, useEffect } from "react";
// import Alert from "./Alert";
import "./App.css";
import ToDo from "./ToDo";
import { TextField } from "@mui/material";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim().length && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
    } else if (name.trim().length) {
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
      };
      setList([...list, newItem]);
      setName("");
    }
  };

  const clearList = () => {
    setList([]);
  };

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id)); // list filter always return a new array / if item Id matches to whatever idea passed into remove item, then don't return it from thos filter function. If item Id doesn't match, then it's going to be added to the new array
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id); // if the item Id matches, then return that item
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <>
      <div>
        <h2 className="heading">Just Do It...</h2>

        <section className="section-center">
          <form className="todo-form" onSubmit={handleSubmit}>
            {/* {alert.show && (
              <Alert {...alert} removeAlert={showAlert} list={list} />
            )}{" "} */}
            <div className="form-control">
              <TextField
                id="outlined-basic"
                label="Enter Task"
                variant="outlined"
                className="todo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <button type="submit" className="submit-btn">
                {isEditing ? "Edit" : "Add"}{" "}
              </button>
            </div>
          </form>
          {list.length > 0 && (
            <div className="todo-container">
              <ToDo items={list} removeItem={removeItem} editItem={editItem} />{" "}
              <button className="clear-btn" onClick={clearList}>
                Clear All
              </button>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default App;
