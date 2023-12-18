import "./todo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import todoLogo from "../assets/todoLogo.png";
import { useEffect, useState } from "react";
function Todo() {

  const [todo, setTodo] = useState([]);
  const [activity, setActivity] = useState({
    topic: "",
    description: "",
  });
  const [addIcon, setAddIcon] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const adding = () => {
    if (!activity) {
      console.log("empty")
      alert("Fill the box");
    } 
    else if (activity && !addIcon) {
      setTodo(
        todo.map((elem, index) => {
          if (index === isEditItem) {
            return {
              ...elem,
              topic: activity.topic,
              description: activity.description,
            };
          }
          return elem;
        })
      );
      setAddIcon(true);
      setActivity({ topic: "", description: "" });
      setIsEditItem(null);
    } 
    else {
      setTodo([
        ...todo,
        { topic: activity.topic, description: activity.description },
      ]);
      setActivity({ topic: "", description: "" });
    }
  };

  const deleteItem = (i) => {
    const deleted = todo.filter((items, index) => {
      return i !== index;
    });
    setTodo(deleted);
  };

  const editItem = (i) => {
    setAddIcon(false);
    let edited = todo[i];
    setActivity({ topic: edited.topic, description: edited.description });
    setIsEditItem(i);
  };
  
  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        adding();
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
    
  }, [adding]);

  return (
    <>
      <div className="title ">ToDo List</div>
      <div className="wrapper">
        <div className="addItem">
          <figure>
            <img src={todoLogo} alt="logo to todo List" className="logo" />
          </figure>
          <div className="inputWithIcon">
            <div className="todos">
              <input
                type="text"
                placeholder="enter topic"
                id="additem"
                value={activity.topic}
                onChange={(e) =>
                  setActivity({ ...activity, topic: e.target.value })
                }
              />
              <textarea
                type="text"
                placeholder="enter description"
                className="mb-4 p-2"
                value={activity.description}
                onChange={(e) =>
                  setActivity({ ...activity, description: e.target.value })
                }
              />
            </div>
            {addIcon === true ? (
              <div className="AddButton">
                <label className="plus" htmlFor="additem" onClick={adding}>
                  <FontAwesomeIcon
                    icon={faPlus}
                    style={{ color: "#ffffff" }}
                    size="xl"
                  />
                </label>
              </div>
            ) : (
              <div className="AddButton">
                <label className="plus" htmlFor="additem" onClick={adding}>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    size="xl"
                    style={{ color: "#ffffff" }}
                  />
                </label>
              </div>
            )}
          </div>
        </div>
        <div className="showItem">
          {todo.map((activities, i) => {
            return (
              <>
                <div className="row eachActivity mb-4 mt-2 ">
                  <div className="col-8 rounded-left">
                    <ul>
                      <li>
                        <h6>{activities.topic}</h6>
                      </li>
                    </ul>
                    <div className="description">{activities.description}</div>
                  </div>
                  <div className="col-4 rounded-right d-flex" >
                    <button
                      className="editButtons fw-bold  "
                      onClick={() => editItem(i)}
                    >
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        style={{
                          padding: "5px",
                        }}
                      />
                    </button>
                    <button
                      className="deleteButtons fw-bold me-4"
                      onClick={() => deleteItem(i)}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ padding: "5px" }}
                      />
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default Todo;
