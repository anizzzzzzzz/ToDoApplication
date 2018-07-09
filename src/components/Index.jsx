import React, {Component} from 'react';
import NavBar from "./navbar/NavBar";
import {DOINGCONST, DONECONST, TODOCONST} from "../constant/ToDoAppConstant";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {selectTask, updateStatus} from "../action/index";
import "../style/common.css";
import {Link} from "react-router-dom";

class Index extends Component {
    constructor(props){
        super(props);

        this.state={
            tasks:[],
        };
    }

    componentDidMount(){
        this.setState({
            tasks:this.props.tasks
        });
    }

    createList(filter){
        return this.props.tasks
            .filter((task)=>task.status === filter)
            .sort((a,b)=>a.movedDate>b.movedDate)
            .map((task)=>
                <div key={task.id} className="row" style={{marginTop:'10px'}}>
                    <div className="col-1"/>
                    <a draggable={true}
                       onDragStart={(event)=>this.onDragStart(event,task.id)}
                       onClick={(e)=>{this.handleClick(e,task)}}
                       className="list-group-item list-group-item-action col-8">
                        {task.name}
                    </a>
                    <a
                        className="list-group-item list-group-item-action col-2"
                        onClick={(e)=>this.handleDeleteTask(e,task)}>
                       <span className="fa fa-minus-square"/>
                    </a>
                    <div className="col-1"/>
                </div>
            );
    }

    onDragOver=(event)=>{
        event.preventDefault();
    };

    onDragStart = (event,id)=>{
        event.dataTransfer.setData("id",id);
    };

    onDrop=(event, category)=>{
        let id= event.dataTransfer.getData("id");

        let tasks = this.state.tasks.filter((task)=>{
            if(parseInt(id,10) === task.id){
                task.status = category;
                task.movedDate =  new Date().toString();
            }
            return task;
        });
        console.log(tasks);
        this.props.updateTaskStatus(tasks);
    };

    handleClick=(event,task)=>{
        event.preventDefault();

        this.props.selectTask(task);
        this.props.history.push({
            pathname:"/task"
        });
    };

    handleDeleteTask=(event,t)=>{
        event.preventDefault();

        let tasks = this.state.tasks.filter((task)=> {return task.id !== t.id});

        console.log("filtered",tasks);
        this.props.updateTaskStatus(tasks);
        this.setState({
            tasks:this.props.tasks
        });
    };

    render() {
        return (
            <div className="container">
                <NavBar/>
                <div className="row" style={{marginTop:'80px'}}>
                    <div className="col"
                         style={{borderRight:'1px solid black',height:'85vh'}}
                         onDragOver={(event)=>this.onDragOver(event)}
                         onDrop={(e)=>this.onDrop(e,TODOCONST)}
                    >
                        <h2 className="center">To Do</h2>
                        <div className="list-group center container">
                            {this.state.tasks.length === 0?
                                (<p>
                                    No Task Added.. <Link to="/add-task" className="nav-link">add here!</Link>
                                </p>):
                                this.createList(TODOCONST)
                            }
                        </div>
                    </div>

                    <div className="col"
                         style={{height:'85vh'}}
                         onDrop={(e)=>this.onDrop(e,DOINGCONST)}
                         onDragOver={(e)=>this.onDragOver(e)}
                    >
                        <h2 className="center">In Progress</h2>
                        <div className="list-group center">
                            {this.createList(DOINGCONST)}
                        </div>
                    </div>

                    <div className="col"
                         style={{borderLeft:'1px solid black',height:'85vh'}}
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
        updateTaskStatus:updateStatus,
        selectTask:selectTask
    },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Index);