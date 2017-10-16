import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../styles/todoList.css';



class Li extends Component {
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
            <div class="flex"  onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                <div  class="checkbox flex1">
                    <input type="checkbox"  checked={checkbox}  />
                </div>
                <div  class="checkbox-label flex12">
                    <label >{this.props.text}</label>
                </div>
            </div>
        );
    }
}

class Empty extends React.Component {
    render() {
        return (
            <div></div>
        )
    }
}

// TODO
// *** bug with close button inside Todo tab (see comments below toggleVisibility())

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
        arr.unshift(this.state.inputText)
        this.setState({ todoArr: arr })
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

    // there is a bug here cause I have to double click on Todo button in main page
    // to reopen the Todos tab.  So how do i send a message to the main page (App.js) and toggle
    // of this visibility: true, 
    // I have to import a function from the parent class I think..
    toggleVisibility = () => {
        return ReactDOM.render(<Empty />, document.getElementById('todo'));
    }
    // get the index of the todo element which is clicked
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
        var displayArr;
        if (this.state.isInTodoTab) {
            displayArr = (
                <div >
                    <br />
                    <br />
                    {this.state.todoArr.map( (elm, i) => 
                        <div class="flex">
                            <div class="flex12" onClick={this.todoElmMoveDoneTab.bind(this, i)}>
                                <Li text={elm} />
                            </div>
                            <div class="flex1 hover_img" onClick={this.todoElmMoveTop.bind(this, i)}>
                                <span>
                                    <img class="imgMoveUp" src={require('../assets/move_waiting_up_grey.png')} alt="move elm up"/>
                                </span>
                            </div>
                        </div>
                    )} 
                </div>
            )
        } else {
            displayArr = (
                <div>
                    <a class="aClearTodoList" onClick={this.clearDoneList}>Clear to do list</a> 
                    <br />
                    <br />
                    {this.state.doneArr.map( (elm, i) => 
                        <div class="flex">
                            <div class="flex12" onClick={this.doneElmMoveTodoTab.bind(this, i)}>
                                <Li text={elm} />
                            </div>
                            <div class="flex1 hover_img" onClick={this.doneElmDelete.bind(this, i)}>
                                <span>
                                    <img class="imgDelete" src={require('../assets/trash_full.png')} alt="delete one element" />
                                </span>
                            </div>
                        </div>
                    )} 
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
                    <button className='exitButton' onClick={this.toggleVisibility}>X</button>
                    <h1 className='Todos-Title-Text'>Todos</h1>
                </div>

                <div className='Todos-Body'>
                    <form onSubmit={this.handleSubmit}>
                        <input class="input-box" type="text" placeholder="What to do next?" 
                            value={this.state.value} onChange={this.handleChange} />
                    </form>

                    <div class="flex">
                        <div class="flex1"></div>
                            <h2 class={TodoButton} onClick={this.clickTodo}>
                                Todo
                            </h2>
                            <h2 class={DoneButton} onClick={this.clickDone}>
                                Done 
                            </h2>
                        <div class="flex1"></div>
                    </div>

                    <div class="Todo-list">
                        { displayArr }
                    </div>
                    
                </div> 

            </div>
        );
    }
}

