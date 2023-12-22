import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, addDays } from "date-fns";

function Add() {

    // set the background colour of the page
    document.body.style.background = "#1f1f1f";

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = (e) => {

        // if deadline is entered, format it as a string otherwise return null
        // prevents the date becoming 01/01/1970 if left blank
        const deadline = date ? format(date, "dd/MM/yyyy") : null;

        // print inputs to console for debugging
        console.log("Title: " + title +
            " Description: " + description +
            " Date: " + deadline);

        const task = {
            title: title,
            description: description,
            date: deadline
        };

        // send a post request to the server
        axios.post('http://localhost:4000/api/task', task)
            .then((res) => {
                navigate('/');
            })
            .catch(
                (error) => {
                    console.log(error)
                });
    }

    // minimum selectable date for the datepicker
    const minSelectableDate = addDays(new Date(), 1);

    return (
        <div>
            <h1 style={{ color: 'white' }}>Add Task:</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label style={{ color: 'white' }}>Add Title: </label>
                    <input type="text"
                        style={{ color: 'white', backgroundColor: 'black', textAlign: "center" }}
                        className="form-control"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label style={{ color: 'white' }}>Add Description: </label>
                    <input type="text"
                        style={{ color: 'white', backgroundColor: 'black', textAlign: "center" }}
                        className="form-control"
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label style={{ color: "white" }}>Select Deadline: </label>
                    <br></br>
                    <DatePicker
                        className="datepick"
                        selected={date}
                        onChange={(date) => setDate(date)}
                        dateFormat="dd/MM/yyyy"
                        minDate={minSelectableDate}
                    />
                </div>
                <div>
                    <br></br>
                    <Button variant='success' onClick={
                        (e) => {
                            handleSubmit()
                        }
                    }>Add Task</Button>
                </div>
                <div>
                    <br></br>
                    <Link to='/' className='btn btn-danger'>Return</Link>
                </div>
            </form>
        </div>
    );

}
//export the add component
export default Add;