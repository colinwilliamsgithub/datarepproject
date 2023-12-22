import Task from "./task";

function Tasks(props) {

    return props.myTasks.map(
        (task) => {
            return <Task myTask={task} key={task._id} reload={() => { props.Reload(); }}></Task>
        }
    );

}
//export the tasks component
export default Tasks;