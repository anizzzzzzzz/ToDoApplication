import React, {Component} from 'react';
import NavBar from "./navbar/NavBar";
import {connect} from "react-redux";
import {TaskException} from "../exception/index";
import {bindActionCreators} from "redux";
import {updateStatus} from "../action/index";

class DisplayTask extends Component {
    constructor(props){
        super(props);

        this.state={
            id:null,
            name:'',
            description:'',
            deadline:'',
            status:'',
            disable:true,
            tasks:[]
        };

        this.handleChange=this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            tasks:this.props.tasks
        });

        try {
            if (this.props.task !== null) {
                this.setState({
                    id: this.props.task.id,
                    name: this.props.task.name,
                    description: this.props.task.description,
                    deadline: this.props.task.deadline,
                    status: this.props.task.status
                });
            }
            else {
                throw new TaskException();
            }
        }
        catch (e){
            if(e instanceof TaskException){
                console.log("Task is null");
            }
        }
    }

    handleChange(event){
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    handleOnEdit(event){
        event.preventDefault();
        this.setState({
            disable:false
        });
    }

    handleSubmit(event){
        event.preventDefault();

        let tasks = this.state.tasks.filter((task)=>{
            if(parseInt(this.state.id,10) === task.id){
                task.name = this.state.name;
                task.description=this.state.description;
                task.deadline=this.state.deadline;
                task.status=this.state.status;
            }
            return task;
        });

        console.log(tasks)
        this.props.updateTaskStatus(tasks);
        this.props.history.push({
            pathname:"/"
        });
    }

    render() {
        return (
            <div className="container">
                <NavBar/>
                <div className="row" style={{marginTop:'80px'}}>
                    <form className="col-10" onSubmit={(e)=>this.handleSubmit(e)}>
                        <div className="form-group">
                            <label htmlFor="name">Task Name :</label>
                            <input
                                type="text"
                                disabled={this.state.disable}
                                className="form-control"
                                value={this.state.name}
                                id="name"
                                onChange={this.handleChange}
                                name="name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description:</label>
                            <textarea
                                className="form-control"
                                id="description"
                                disabled={this.state.disable}
                                rows="5"
                                value={this.state.description}
                                onChange={this.handleChange}
                                name="description"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="deadline">Deadline :</label>
                            <input
                                type="date"
                                disabled={this.state.disable}
                                className="form-control"
                                id="deadline"
                                value={this.state.deadline}
                                onChange={this.handleChange}
                                name="deadline"/>
                        </div>
                        {!this.state.disable && (<button type="submit" className="btn btn-primary">Submit</button>)}
                    </form>

                    <div className="col-2">
                        {this.state.disable && (
                            <button
                                onClick={(e)=>{this.handleOnEdit(e)}}
                                className="btn btn-success"
                                style={{width:'100%'}}>Edit
                            </button>)}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        tasks:state.tasks,
        task:state.selectedTask,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateTaskStatus:updateStatus
    },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(DisplayTask);
