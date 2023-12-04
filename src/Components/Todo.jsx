import "./todo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import todoLogo from "../assets/todoLogo.png";
import { useState } from "react";
function Todo() {
    const [activity,setActivity]=useState({
        topic:"",
        description:"",
    });
    const [todo,setTodo]=useState([]);
    const adding=()=>{
        setTodo([...todo,{topic:activity.topic,description:activity.description}])
        setActivity({topic:"",description:""})
        
    }
    const deleteItem=(i)=>{
        const deleted=todo.filter((items,index)=>{
            return (i!==index)
        })
        setTodo(deleted);
    }
  return (
    <>
      <div className="wrapper">
       
        <div className="title ">ToDo List</div>
        <div className="addItem">
        <figure>
          <img src={todoLogo} alt="logo to todo List" className="logo" />
        </figure>
          <div className="inputWithIcon">
            <div className="todos">
                <input type="text" placeholder="enter topic" id="additem" value={activity.topic} onChange={(e)=>setActivity({...activity,topic:e.target.value})}/>
                <textarea type="text" placeholder="enter description" id="additem" value={activity.description} onChange={(e)=>setActivity({...activity,description:e.target.value})}/>
            </div>
            <div className="AddButton">
                <label className="plus"  htmlFor="additem" onClick={adding}>
                <FontAwesomeIcon icon={faPlus} size="xl"/>
                </label>
            </div>
          </div>
        </div>

        <div className="showItem">
        
                {
                    
                    todo.map((activities,i)=>{
                        return(
                            <>
                           
                            <div className="row eachActivity mb-2 mt-4">
                                <div className="col-9 rounded-left">
                                    <ul>
                                        <li><h5>{activities.topic}</h5></li>
                                    </ul>
                                    
                                    <p className="description">{activities.description}</p>
                                </div>
                                <div className="col-3 ml-auto rounded-right">
                                    <button className="delete fw-bold " onClick={()=>deleteItem(i)}>
                                        Delete 
                                        <FontAwesomeIcon icon={faTrash} style={{marginLeft:'10px', backgroundColor:'#009B4D'}} />
                                    </button>
                                </div>
                                
                                
                            </div>
                            </>
                        )
                    })
                }               
            </div>              
        </div>
    </>
  );
}
export default Todo;
