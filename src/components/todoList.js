import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../styles/todoList.css';



class Li extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            mouseHover: false,
        };
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    }	
    onMouseEnter(){
        this.setState({mouseHover: true});
    }
    onMouseLeave(){
        this.setState({mouseHover: false});
    }
    render() {
        // check the checkbox when mouse hover over
        let checkbox;
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
// *** Have to have a local storage so the Todo is remembered when I close the tab
// *** bug with close button inside Todo tab (see comments below toggleVisibility())


export class TodoList extends Component {
    // thoughts do I really need this state thing.. in this class? 
    constructor(props) {
        super(props);
        this.state = { 
            mouseHover: false,
            inputText: "",
            value: "",
            // if this is true I am in the Todo tab else I am in Done tab
            isInTodoTab: true,
            // rename this arr to todoArr
            arr:    [<Li text="Welcome to Todo tab!" />, 
                        <Li text="write in input bar to add new Todo" />,
                        <Li text="click marked item to move to Done tab" />,
                        <Li text="move mouse to right and click icon to move item to top" />
                        ],
            doneArr: [<Li text="Welcome to Done tab!" />, 
                        <Li text="click marked item to move back to Todo tab" />,
                        <Li text="move mouse to right and click icon to delete one item" />,
                        <Li text="click link at top to delete all items" />
                        ],
        };
        this.addTodo = this.addTodo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clickTodo = this.clickTodo.bind(this);
        this.clickDone = this.clickDone.bind(this);
        this.clearTodoList = this.clearTodoList.bind(this);
        this.todoElmMoveDoneTab = this.todoElmMoveDoneTab.bind(this);
        this.todoElmMoveTop = this.todoElmMoveTop.bind(this);
        this.doneElmDelete = this.doneElmDelete.bind(this);
        this.doneElmMoveTodoTab = this.doneElmMoveTodoTab.bind(this);
    }
    addTodo() {
        var arr = this.state.arr.slice()
        arr.unshift(<Li text={this.state.inputText}/>)
        this.setState({ arr: arr })
        // focus Todo tab after write in input bar in Done tab
        if ( !this.state.isInTodoTab ) {
            this.setState({isInTodoTab: true});
        }
    }
    clickTodo() {
        this.setState({isInTodoTab: true});
    }
    clickDone() {
        this.setState({isInTodoTab: false});
    }
    // used to get text from input bar in todoTab
    handleChange(event) {
        this.setState({value: event.target.value});
        this.setState({inputText: event.target.value});
    }
    handleSubmit(event) {
        this.addTodo();
        this.setState({value: ''});
        event.preventDefault();
    }
    clearTodoList(){
        this.setState({doneArr: [] });
    }

    // there is a bug here cause I have to double click on Todo button in main page
    // to reopen the Todos tab.  So how do i send a message to the main page (App.js) and toggle
    // of this visibility: true, 
    // I have to import a function from the parent class I think..
    toggleVisibility(){
        return ReactDOM.render(<Empty />, document.getElementById('todo'));
    }
    // get the index of the todo element which is clicked
    todoElmMoveDoneTab(i, event) {
        var elmToMove = this.state.arr[i];
        // remove the Todo element at index i
        var array = this.state.arr;
        array.splice(i, 1);
        this.setState({arr: array });
        // and then add the removed element to the Done array
        var arr = this.state.doneArr.slice();
        arr.unshift(elmToMove);
        this.setState({ doneArr: arr });
    }
    // move Done elm to Todo tab
    doneElmMoveTodoTab(i, event) {
        var elmToMove = this.state.doneArr[i];
        // remove the Todo element at index i
        var array = this.state.doneArr;
        array.splice(i, 1);
        this.setState({doneArr: array });
        // and then add the removed element to the Done array
        var arr = this.state.arr.slice();
        arr.unshift(elmToMove);
        this.setState({ arr: arr });
    }
    // get the index of the done element which is clicked
    doneElmDelete(i, event) {
        // remove the Todo element at index i
        var array = this.state.doneArr;
        array.splice(i, 1);
        this.setState({arr: array });
    }
    // move Todo elm to top of list 
    todoElmMoveTop(i, event) {
        var elmToMove = this.state.arr[i];
        // remove the Todo element at index i
        var array = this.state.arr;
        array.splice(i, 1);
        this.setState({arr: array });
        // and then add the removed element to the Todo array at front
        var arr = this.state.arr.slice();
        arr.unshift(elmToMove);
        this.setState({ arr: arr });
    }
    render() {
        // toogle between display Todo list or Done list
        let displayArr;
        if (this.state.isInTodoTab) {
            displayArr = (
                <div >
                    <br />
                    <br />
                    {this.state.arr.map( (elm, i) => 
                        <div class="flex">
                            <div class="flex12" onClick={this.todoElmMoveDoneTab.bind(this, i)}>
                                <div >{elm}</div>
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
                    <a class="aClearTodoList" onClick={this.clearTodoList}>Clear to do list</a> 
                    <br />
                    <br />
                    {this.state.doneArr.map( (elm, i) => 
                        <div class="flex">
                            <div class="flex12" onClick={this.doneElmMoveTodoTab.bind(this, i)}>
                                <div >{elm}</div>
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
        let TodoButton;
        let DoneButton;
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

