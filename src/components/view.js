import { useEffect, useState } from "react";
import axios from "axios";
import Tasks from "./tasks";
import { Link } from 'react-router-dom';

function View() {

    // set the background colour of the page
    document.body.style.background = "#1f1f1f";

    const [data, setData] = useState([]);

    // get task details from the server
    useEffect(
        () => {

            axios.get('http://localhost:4000/api/tasks')
                .then(
                    (response) => {
                        setData(response.data)
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                    }
                )

        }, []
    );

    // reload task data
    const ReloadData = (e) => {
        axios.get('http://localhost:4000/api/tasks')
            .then(
                (response) => {
                    setData(response.data)
                }
            )
            .catch(
                (error) => {
                    console.log(error);
                }
            )
    }

    return (
        <div>
            <h1 style={{ color: 'white' }}>To-Do List:</h1>
            <Link to='/add/' className='btn btn-success'>Create Task</Link>
            <Tasks myTasks={data} Reload={ReloadData}></Tasks>
        </div>
    );

}
// export the view component
export default View;