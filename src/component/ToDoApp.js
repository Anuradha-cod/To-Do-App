import React, { useState } from "react";
import AppData from "./App.json";
import Text from "./Text";

const ToDoApp = () => {
  const [count, setCount] = useState(1);
  const [hashtags, setHashtags] = useState();
  // let count = 1;
  const [toDoList, setToDoList] = useState([]);
  const [addLine, setAddLine] = useState();

  const onKeyUp = (ele) => {
    if (ele.key === "Enter") {
      handleAdd();
    }
  };
  const handleChange = (e) => {
    console.log("handleChange");
    setAddLine(e.target.value);
  };

  const handleAdd = () => {
    console.log(count);
    console.log("handle Add");
    if (addLine) {
      setToDoList([
        { id: count, title: addLine, state: "active" },
        ...toDoList,
      ]);
      setAddLine("");
      setCount((count) => count + 1);
    }
  };
  const handleClick = (id) => {
    console.log("handleClick");
    const index = toDoList.findIndex((ele) => ele.id === id);
    console.log(toDoList);
    if (index > -1) {
      const item = toDoList[index];
      item.state = "completed";
      const newToDoList = [
        ...toDoList.slice(0, index),
        { ...item },
        ...toDoList.slice(index + 1),
      ];
      console.log(newToDoList);
      setToDoList(newToDoList);
    }
  };
  const handleReset = () => {
    setToDoList([]);
  };

  const onHashTagClick = (word) => {};

  return (
    <div className="TodoApp">
      <div className="TodoSubmit">
        <input
          className="TodoInput"
          placeholder="Search"
          onChange={handleChange}
          value={addLine}
          onKeyPress={onKeyUp}
        ></input>
        <button className="TodoSubmite" onClick={handleAdd}>
          Submit
        </button>
        <button className="TodoReset" onClick={handleReset}>
          Reset
        </button>
      </div>
      <div>
        {toDoList
          .filter((ele) => ele.state === "active")
          .map((ele) => {
            return (
              <div
                onClick={() => handleClick(ele.id)}
                className={`${ele.state === "active" ? "active" : "completed"}`}
              >
                <Text text={ele.title} onHashTagClick={onHashTagClick} />
              </div>
            );
          })}
        {toDoList
          .filter((ele) => ele.state === "completed")
          .map((ele) => {
            return (
              <div
                onClick={() => handleClick(ele.id)}
                className={`${ele.state === "active" ? "active" : "completed"}`}
              >
                <Text text={ele.title} onHashTagClick={onHashTagClick} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ToDoApp;
