import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../styles/todoList.css';


class Li extends Component {
  constructor(props) {
        super(props);
        this.state = { 
          mouseHover: false
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
    <form>
        <div class="flex" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
          <div  class="checkbox">
            <input type="checkbox"  checked={checkbox}  />
    
          </div>
          <div  class="checkbox-label">
            <label >{this.props.text}</label>
          </div>
        </div>
    </form>
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
// *** when click a Todo element it should be moved to the Done tab
// *** Have to have a local storage so the Todo is remembered when I close the tab
// *** bug with close button inside Todo tab (see comments below toggleVisibility())
// *** should be able to move the elements inside the Todo tab list.  And add some icon for that.


export class TodoList extends Component {
  // thoughts do I really need this state thing and how do we store variables when tab close
  constructor(props) {
        super(props);
        this.state = { 
          index: 0,
          titleInput: "",
          value: "",
          // if this is true I am in the Todo tab else I am in Done tab
          clickTodo: true,
          // rename this arr to todoArr
          arr: [<Li text="test Todo and yes you can write in input field to add more!" />, <Li text="test Todo" />],
          doneArr: [<Li text="test Done" />, <Li text="test Done" />],
          };
        this.addTodo = this.addTodo.bind(this);
        this.doneEvent = this.doneEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clickTodo = this.clickTodo.bind(this);
        this.clickDone = this.clickDone.bind(this);
        this.clearTodoList = this.clearTodoList.bind(this);
  }
  addTodo() {
    var arr = this.state.arr.slice()
    arr.unshift(<Li text={this.state.titleInput}/>)
    this.setState({ arr: arr })
    // focus Todo tab after write in input bar in Done tab
    if ( !this.state.clickTodo ) {
        this.setState({clickTodo: true});
    }

  }
  clickTodo() {
    this.setState({clickTodo: true});
    // alert("work in progress. not finish");
  }
  clickDone() {
    this.setState({clickTodo: false});
    // alert("work in progress. not finish");
  }
  // NOTE this is not in use just now
  doneEvent() {
    var array = this.state.arr;
    // Use splice(index,howmany)
    array.splice(-1, 1);
    this.setState({arr: array });
  }
  // used to get text from input bar in todoTab
  handleChange(event) {
    this.setState({value: event.target.value});
    this.setState({titleInput: event.target.value});
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
  toggleVisibility(){
    // alert("work in progress. not finish");
    return ReactDOM.render(<Empty />, document.getElementById('todo'));

  }
  render() {
    // toogle between display Todo list or Done list
    let displayArr;
    if (this.state.clickTodo) {
      displayArr = (
      <div >
          <br />
          <br />
        {this.state.arr.map(elm => <div> {elm} </div>)} 
      </div>
      )
    } else {
      displayArr = (
<div>
        <a class="aClearTodoList" onClick={this.clearTodoList}>Clear to do list</a> 
        <br />
        <br />
      <div >
        {this.state.doneArr.map(elm => <div> {elm} </div>)} 
      </div>
</div>
      )
    }
    // change color of Todo Done button if selected or not
    let TodoButton;
    let DoneButton;
    if ( this.state.clickTodo) {
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
      <input class="input-box" type="text" placeholder="What to do next?" value={this.state.value} onChange={this.handleChange} />
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

