import React, {Component} from 'react';
import NavBar from "./navbar/NavBar";
import {DOINGCONST, DONECONST, TODOCONST} from "../constant/ToDoAppConstant";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {updateTask} from "../action/index";
import "../style/common.css";

class Index extends Component {
    constructor(props){
        super(props);

        this.state={
            tasks:[]
        };
    }

    componentDidMount(){
        this.setState({
            tasks:this.props.tasks
        });
    }

    createList(filter){
        return this.state.tasks
            .filter((task)=>task.status === filter)
            .map((task)=>
                <a key={task.id}
                   draggable={true}
                   onDragStart={(event)=>this.onDragStart(event,task.id)}
                   className="list-group-item list-group-item-action">
                    {task.name}
                </a>
            );
    }

    onDragOver=(event)=>{
        event.preventDefault();
    };

    onDragStart = (event,id)=>{
        console.log("id",id);
        event.dataTransfer.setData("id",id);
    };

    onDrop=(event, category)=>{
        let id= event.dataTransfer.getData("id");

        let tasks = this.state.tasks.filter((task)=>{
            if(parseInt(id,10) === task.id){
                task.status = category;
            }
            return task;
        });

        console.log(tasks)
        this.props.updateTask(tasks);
    };

    render() {
        return (
            <div className="container fullbox">
                <NavBar/>
                <div className="row" style={{marginTop:'80px'}}>
                    <div className="col categoryBox"
                         onDragOver={(event)=>this.onDragOver(event)}
                         onDrop={(e)=>this.onDrop(e,TODOCONST)}
                    >
                        <h2 className="center">To Do</h2>
                        <div className="list-group center">
                            {this.createList(TODOCONST)}
                        </div>
                    </div>

                    <div className="col categoryBox"
                         onDrop={(e)=>this.onDrop(e,DOINGCONST)}
                         onDragOver={(e)=>this.onDragOver(e)}
                    >
                        <h2 className="center">In Progress</h2>
                        <div className="list-group center">
                            {this.createList(DOINGCONST)}
                        </div>
                    </div>

                    <div className="col categoryBox"
                         onDrop={(e)=>this.onDrop(e,DONECONST)}
                         onDragOver={(e)=>this.onDragOver(e)}
                    >
                        <h2 className="center">Completed</h2>
                        <div className="list-group center">
                            {this.createList(DONECONST)}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        tasks:state.tasks
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateTask:updateTask
    },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Index);