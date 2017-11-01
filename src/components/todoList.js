import React, { Component } from 'react';
import '../styles/todoList.css';

class TodoListElem extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            mouseHover: false,
        };
    }	
    onMouseEnter = () => {
        this.setState({mouseHover: true});
    }
    onMouseLeave = () => {
        this.setState({mouseHover: false});
    }
    render() {
        // check the checkbox when mouse hover over
        var checkbox;
        if (this.state.mouseHover) {
            checkbox = "checked"
        }
        else {
            checkbox = ""
        }

        return (
            <div className="todo-control-group"  onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                <label className="todo-control todo-control--checkbox blue">{this.props.text}
                    <input type="checkbox" checked={checkbox}/>
                    <div className="todo-control__indicator"></div>
                </label>
            </div>
        );
    }
}


class DoneListElem extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            mouseHover: false,
        };
    }	
    onMouseEnter = () => {
        this.setState({mouseHover: true});
    }
    onMouseLeave = () => {
        this.setState({mouseHover: false});
    }
    render() {
        // check the checkbox when mouse hover over
        var checkbox;
        var label;
        if (this.state.mouseHover) {
            checkbox = ""
            label = "done-control done-control--checkbox ";
        }
        else {
            checkbox = "checked"
            label = "done-control done-control--checkbox line";
        }

        return (
            <div className="done-control-group"  onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                <label className={label}>{this.props.text}
                    <input type="checkbox" checked={checkbox}/>
                    <div className="done-control__indicator"></div>
                </label>
            </div>
        );
    }
}

export class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            inputText: "",
            value: "",
            // if this is true I am in the Todo tab else I am in Done tab
            isInTodoTab: true,
            todoArr: JSON.parse(localStorage["todoData-todoArr"] || JSON.stringify([
                "Welcome to Todo tab!", 
                "write in input bar to add new Todo",
                "click marked item to move to Done tab",
                "move mouse to right and click icon to move item to top" ]) ),
            doneArr: JSON.parse(localStorage["todoData-doneArr"] || JSON.stringify([
                "Welcome to Done tab!", 
                "click marked item to move back to Todo tab",
                "move mouse to right and click icon to delete one item",
                "click link at top to delete all items" ]) ),
        };
    }
    addTodo = () => {
        var arr = this.state.todoArr.slice()
        arr.unshift(this.state.inputText);
        this.setState({ todoArr: arr });
        localStorage.setItem("todoData-todoArr", JSON.stringify(arr));
        // focus Todo tab after write in input bar in Done tab
        if ( !this.state.isInTodoTab ) {
            this.setState({isInTodoTab: true});
        }
    }
    clickTodo = () => {
        this.setState({isInTodoTab: true});
    }
    clickDone = () => {
        this.setState({isInTodoTab: false});
    }
    // used to get text from input bar in todoTab
    handleChange = (event) => {
        this.setState({value: event.target.value});
        this.setState({inputText: event.target.value});
    }
    handleSubmit = (event) => {
        this.addTodo();
        this.setState({value: ''});
        event.preventDefault();
    }
    clearDoneList = () => {
        this.setState({doneArr: [] });
        localStorage.setItem("todoData-doneArr", JSON.stringify([]));
    }
    // move Todo elm to Done tab
    todoElmMoveDoneTab = (i, event) => {
        var elmToMove = this.state.todoArr[i];
        // remove the Todo element at index i
        var arr = this.state.todoArr.slice();
        arr.splice(i, 1);
        localStorage.setItem("todoData-todoArr", JSON.stringify(arr));
        this.setState({todoArr: arr });
        // and then add the removed element to the Done array
        arr = this.state.doneArr.slice();
        arr.unshift(elmToMove);
        localStorage.setItem("todoData-doneArr", JSON.stringify(arr));
        this.setState({ doneArr: arr });
        event.preventDefault();
    }
    // move Done elm to Todo tab
    doneElmMoveTodoTab = (i, event) => {
        var elmToMove = this.state.doneArr[i];
        // remove the Done element at index i
        var arr = this.state.doneArr.slice();
        arr.splice(i, 1);
        localStorage.setItem("todoData-doneArr", JSON.stringify(arr));
        this.setState({doneArr: arr });
        // and then add the removed element to the Done array
        arr = this.state.todoArr.slice();
        arr.unshift(elmToMove);
        localStorage.setItem("todoData-todoArr", JSON.stringify(arr));
        this.setState({ todoArr: arr });
        event.preventDefault();
    }
    // get the index of the done element which is clicked
    doneElmDelete = (i, event) => {
        // remove the Todo element at index i
        var arr = this.state.doneArr.slice();
        arr.splice(i, 1);
        localStorage.setItem("todoData-doneArr", JSON.stringify(arr));
        this.setState({doneArr: arr });
    }
    // move Todo elm to top of list 
    todoElmMoveTop = (i, event) => {
        var elmToMove = this.state.todoArr[i];
        // remove the Todo element at index i
        var arr = this.state.todoArr.slice();
        arr.splice(i, 1);
        // and then add the removed element to the Todo array at front
        arr.unshift(elmToMove);
        localStorage.setItem("todoData-todoArr", JSON.stringify(arr));
        this.setState({ todoArr: arr });
    }
    render() {
        // toogle between display Todo list or Done list
        document.getElementById('todoQty').innerHTML = Number.parseInt(this.state.todoArr.length);
        var displayArr;
        if (this.state.isInTodoTab) {
            displayArr = (
                <div >
                    <br />
                    <br />
                    {this.state.todoArr.map( (elm, i) => 
                        <div className="flex">
                            <div className="flex12" onClick={this.todoElmMoveDoneTab.bind(this, i)}>
                                <TodoListElem text={elm} />
                            </div>
                            <div className="flex1 hover_img" onClick={this.todoElmMoveTop.bind(this, i)}>
                                <span>
                                    <img className="imgMoveUp" src={require('../assets/Up Button@2x.png')} alt="move elm up"/>
                                </span>
                            </div>
                        </div>
                    )} 
                </div>
            )
        } else {
            displayArr = (
                <div>
                    {/* <a className="aClearTodoList" onClick={this.clearDoneList}>Clear to do list</a> 
                    <br />
                    <br /> */}
                    {this.state.doneArr.map( (elm, i) => 
                        <div className="flex">
                            <div className="flex12" onClick={this.doneElmMoveTodoTab.bind(this, i)}>
                                <DoneListElem text={elm} />
                            </div>
                            <div className="flex1 hover_img" onClick={this.doneElmDelete.bind(this, i)}>
                                <span>
                                    <img className="imgDelete" src={require('../assets/trash.png')} alt="delete one element" />
                                </span>
                            </div>
                        </div>
                    )} 
                    <a className="aClearTodoList" onClick={this.clearDoneList}>Clear to do list</a> 
                    <br />
                    <br />
                </div>
            )
        }
        // change color of Todo Done button if selected or not
        var TodoButton;
        var DoneButton;
        if ( this.state.isInTodoTab) {
            TodoButton = 'Todo-heading-selected'
            DoneButton = 'Done-heading'
        } else {
            TodoButton = 'Todo-heading'
            DoneButton = 'Done-heading-selected'
        }

        return (
            <div>
                <div className='Todos-Header'>
                    <button className='exitButton' onClick={this.props.closeHandler}>X</button>
                    <h1 className='Todos-Title-Text'>Todos</h1>
                </div>

                <div className='Todos-Body'>
                    <form className="Todos-Background" onSubmit={this.handleSubmit}>
                        <input className="input-box inputBoxText" type="text" placeholder="What to do next?" 
                            value={this.state.value} onChange={this.handleChange} />
                    </form>

                    <div className="flex">
                        <div className="flex1"></div>
                            <h2 className={TodoButton} onClick={this.clickTodo}>
                                <div className="TodoButtonHover">
                                Todo
                                </div>
                            </h2>
                            <h2 className={DoneButton} onClick={this.clickDone}>
                                <div className="DoneButtonHover">
                                Done 
                                </div>
                            </h2>
                        <div className="flex1"></div>
                    </div>

                    <div className="Todo-list">
                        { displayArr }
                    </div>

                    
                </div> 

            </div>
        );
    }
}

