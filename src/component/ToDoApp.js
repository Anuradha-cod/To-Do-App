import React, { useState } from "react";
import Filter from "./Filter";
import Text from "./Text";

const ToDoApp = () => {
  const [count, setCount] = useState(1);
  const [hashtags, setHashtags] = useState([]);
  let list = localStorage.getItem("todoList");
  list = list ? JSON.parse(list) : [];
  console.log(list);
  const [toDoList, setToDoList] = useState(list);
  const [addLine, setAddLine] = useState();

  const onKeyUp = (ele) => {
    if (ele.key === "Enter") {
      handleAdd();
    }
  };
  const handleChange = (e) => {
    setAddLine(e.target.value);
  };

  const handleAdd = () => {
    if (addLine) {
      const list = [
        { id: count, title: addLine, state: "active" },
        ...toDoList,
      ];
      localStorage.setItem("todoList", JSON.stringify(list));
      setToDoList(list);
      setAddLine("");
      setCount((count) => count + 1);
    }
  };
  const handleClick = (id) => {
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
      localStorage.setItem("todoList", JSON.stringify(newToDoList));
      setToDoList(newToDoList);
    }
  };
  const handleReset = () => {
    setToDoList([]);
    localStorage.removeItem("todoList");
  };

  const onHashTagClick = (word) => {
    const index = hashtags.indexOf(word);
    if (index < 0) {
      setHashtags([...hashtags, word]);
    } else {
      setHashtags([...hashtags.slice(0, index), ...hashtags.slice(index + 1)]);
    }
  };

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
      <Filter filters={hashtags} />
      <div>
        {toDoList
          .filter((ele) => {
            if (ele.state === "active") {
              if (hashtags.length > 0) {
                return hashtags.some((hashtag) => {
                  return ele.title.includes(hashtag);
                });
              }
              return true;
            }
          })
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
          .filter((ele) => {
            if (ele.state === "completed") {
              if (hashtags.length > 0) {
                return hashtags.some((hashtag) => {
                  return ele.title.includes(hashtag);
                });
              }
              return true;
            }
          })
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
