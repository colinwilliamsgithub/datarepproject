import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import React from 'react';
import axios from 'axios';

function Task(props) {

    return (
        <div className="Tasks">
            <Card style={{ backgroundColor: 'black', color: 'white' }}>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <h1 className={props.myTask.completed ? "complete" : ""}>Task: {props.myTask.title}</h1>
                        <p className={props.myTask.completed ? "complete" : ""}>Description: {props.myTask.description}</p>
                        <p className={props.myTask.completed ? "complete" : ""}>Deadline: {props.myTask.date}</p>
                    </blockquote>
                    <br></br>
                    {/* button to mark task as complete or incomplete */}
                    <Button variant='outline-warning' onClick={
                        (e) => {
                            axios.put('http://localhost:4000/api/task/' + props.myTask._id, {
                                completed: !props.myTask.completed,
                            })
                                .then((res) => {
                                    let reload = props.reload();
                                })
                                .catch();
                        }}>
                        {props.myTask.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    {/* button to navigate to the update page */}
                    <Link to={'/update/' + props.myTask._id} className='btn btn-outline-primary'>Edit</Link>
                    &nbsp;&nbsp;&nbsp;
                    {/* button to delete a task */}
                    <Button variant='outline-danger' onClick={
                        (e) => {
                            axios.delete('http://localhost:4000/api/task/' + props.myTask._id)
                                .then((res) => {
                                    let reload = props.reload();
                                })
                                .catch();
                        }
                    }>Delete</Button>
                </Card.Body>
            </Card>
        </div>
    );

}

// export the task component
export default Task;