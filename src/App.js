import _ from 'lodash';
import React,{useState} from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import "./App.css"

const item ={
    id:uuidv4(),
    name:"Clean the House"
}

const item2 = {
    id:uuidv4(),
    name:"Cokplte Assingments"
}

const App = () => {
    const [text,setText] = useState("");
    const [state, setState] = useState({
        todo:{
            title:"Todo",
            items:[item]
        },
        inProgess:{
            title:"In Progress",
            items:[item2]

        },
        Completed:{
            title:"Completed!",
            items:[]

        }
    })


    function handleDragEnd({destination,source}){
        console.log("from",source)
        console.log("to",destination)
        if(!destination) return ;

        if(destination.index === source.index &&
             destination.droppableId === source.droppableId){
                 console.log("dropped in same place")
             }


      const itemCopy ={ ...state[source.droppableId].items[source.index]}
      setState(prev =>{
          prev = {...prev}
          prev[source.droppableId].items.splice(source.index,1)

          prev[destination.droppableId].items.splice(destination.inedex,0,itemCopy)


          return prev
      })




    }

    const handleOnClick = () =>{
        setState(prev => {
            return{
                ...prev,todo:{
                    title:'Todo',
                    items:[
                        {
                            id:uuidv4(),
                            name:text
                        },
                        ...prev.todo.items
                    ]
                }
            }
        })
        setText("")
    }

    


    return (
        <div className="App">
            <div className="inputpanel">
                <input type="text"value={text} onChange={(e) => setText(e.target.value)}/>
                <button onClick={handleOnClick}>Add</button>
            </div>
            
            <DragDropContext onDragEnd={handleDragEnd}>
                {_.map(state,(data,key) =>{
                    return (
                        <div key={key} className={"column"}>
                            <h3>{data.title}</h3>
                      <Droppable droppableId={key}>
                       {(provided,snapshot) =>{
                           return(
                               <div
                               ref={provided.innerRef}
                               {...provided.droppableProps}
                               className={"droppable-col"}
                               
                               >
                                {data.items.map((element,index) =>{
                                    return(
                                        <Draggable draggableId={element.id} key={element.id} index = {index} >

                                            {(provided,snapshot) =>{
                                              return  <div className={`item ${snapshot.isDragging && "dragging"}`}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                >
                                                    {element.name}

                                                </div>
                                            }}
                                        </Draggable>
                                    )
                                })}
                                {provided.placeholder}
                               </div>
                           )
                       }}

                      </Droppable>
                      </div>
                        ) 
                })}
             

            </DragDropContext>
            
            
        </div>

    )
}

export default App;
