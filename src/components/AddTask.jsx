import React, {Component} from 'react';
import {addTask} from "../action/index";
import {TODOCONST} from "../constant/ToDoAppConstant";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import NavBar from "./navbar/NavBar";

class AddTask extends Component {
    constructor(props){
        super(props);

        this.state={
            name:'',
            description:'',
            deadline:null,
            status:TODOCONST
        };

        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    handleSubmit(event){
        event.preventDefault();

        let task={
            id:this.props.tasks.length+1,
            name:this.state.name,
            description:this.state.description,
            status:this.state.status,
            deadline:this.state.deadline
        };

        console.log("id",task.id);

        this.props.addTask(task);

        this.setState({
            name:'',
            description:'',
            date:null
        });

        event.target.reset();
    }

    render() {
        return (
            <div className="container">
                <NavBar/>
                <form onSubmit={this.handleSubmit} style={{marginTop:'80px'}}>
                    <div className="form-group">
                        <label htmlFor="name">Task Name :</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            onChange={this.handleChange}
                            placeholder="Enter Task Name"
                            name="name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            className="form-control"
                            id="description"
                            rows="5"
                            onChange={this.handleChange}
                            placeholder="Enter Description"
                            name="description"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="deadline">Deadline :</label>
                        <input
                            type="date"
                            className="form-control"
                            id="deadline"
                            onChange={this.handleChange}
                            name="deadline"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addTask:addTask
    },dispatch);
}

function mapStateToProps(state) {
    return {
        tasks:state.tasks
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddTask);