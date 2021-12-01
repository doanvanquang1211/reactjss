const app = document.querySelector(".root");

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            listTodo: [],

        }
    }
    onchangeTask = (text) => {

        this.setState({
            text: text.target.value
        })
        // console.log(text);
    }
    clickButton = () => {
        let itemTask = {
            id: Date.now(),
            taskTodo: this.state.text
        }

        // console.log(itemTask);
        this.setState({
            listTodo: this.state.listTodo.concat([itemTask]),
            text: "",
        })

    }
    buttonClear = () => {

        this.setState({ listTodo: [] })
    }
    deleteTask = (id) => {
        let user = [...this.state.listTodo]
        let userDelete = user.filter(item => item.id != id)
        this.setState({
            listTodo: userDelete
        })

    }

    render() {
        const { text, listTodo } = this.state

        return (
            <div className="wrapper">
                <header>Todo App</header>
                <div className="inputField">
                    <input type="text" placeholder="Add new Task" onChange={this.onchangeTask} value={text} />
                    <button disabled={!this.state.text} className={this.state.text ? 'button' : ""} onClick={this.clickButton}>Add Task</button>

                </div>
                {this.state.listTodo.map((item, index) => {
                    return <TodoApp key={index} item={item} deleteTask={() => this.deleteTask(item.id)} />
                })}


                <div className="footer">
                    <p className="content">You have <span className="pendingTask">{this.state.listTodo.length}</span> pending task</p>
                    <button className={this.state.listTodo.length ? 'buttonClears' : ""} onClick={this.buttonClear}>Clear all</button>
                </div>
            </div>

        );
    }
}


class TodoApp extends React.Component {

    render() {

        return (
            < ul className="todoList" >
                <li >
                    {this.props.item.taskTodo}
                    {<span onClick={this.props.deleteTask} className="icon" ><i className="fas fa-trash-alt"></i>
                    </span>}
                </li>

            </ul >
        );
    }
}

ReactDOM.render(<App />, app)