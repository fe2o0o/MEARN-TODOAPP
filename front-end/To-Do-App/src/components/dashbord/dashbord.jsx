import { useEffect, useState } from "react"
import NoteForm from "../noteForm/NoteForm";
import { faPlus, faTrash, faCheck, faUndo, faEdit } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';

export default function dashbord() {
    const notify = (mesg) => {toast(mesg)};

    const getToDoData = () => {
        axios.get('http://localhost:3000/api/v1/userToDo', { headers: { token: `${localStorage.getItem('Token')}` } }).then((res) => {
            setToDoData(res.data.data)
        })
    }
    


    const updateStatus = (id, isDone) => {
        console.log(isDone);
        axios.patch(`http://localhost:3000/api/v1/todo/${id}`, { isDone:!isDone }, { headers: { token: `${localStorage.getItem('Token')}` } }).then(() => {
            getToDoData()
        })
    }
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [mood, setMood] = useState('add');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [upDateId , setUpDateId] = useState(null)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [toDoData, setToDoData] = useState([])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        getToDoData()
    }, [])



    const deleteToDo = (id) => {
        axios.delete(`http://localhost:3000/api/v1/toDo/${id}`, { headers: { token: `${localStorage.getItem('Token')}` } }).then(() => {
            notify("Your Task Deleted")
            getToDoData()
        })
    }


    const showOverLay = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <Toaster   position='top-center' toastOptions={{
                className:'text-bg-danger',
                duration: 1000,
                style: {
                    width: '300px',
                },
            }} />
            <div className="container  py-5">
                <div className="row g-4">
                    {
                        toDoData.length != 0 ?
                        toDoData.map((e) => {
                            return (
                                // eslint-disable-next-line react/jsx-key
                                <div key={e._id} className="col-md-4">
                                    <div className="inner shadow p-3 rounded-3">
                                        <h6 className={`fw-bold ${e.isDone && 'text-decoration-line-through'}`}>{e.title}</h6>
                                        <p className={`${e.isDone && 'text-decoration-line-through'}`} >
                                            {e.content}
                                        </p>
                                        <div className="d-flex justify-content-between">
                                            <button onClick={() => { updateStatus(e._id, e.isDone) }} className="btn btn-success">{e.isDone ? <FontAwesomeIcon icon={faUndo} /> : <FontAwesomeIcon icon={faCheck} />}</button>
                                            {!e.isDone && <button onClick={() => { showOverLay(); setMood('update'); setUpDateId(e._id) }} className="btn btn-warning"><FontAwesomeIcon icon={faEdit} /></button>}
                                            <button onClick={() => { deleteToDo(e._id) }} className="btn btn-danger"><FontAwesomeIcon icon={faTrash} /></button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }): <h1 className="text-center">No Task Available </h1>
                    }
                    <div onClick={() => { showOverLay();  setMood('add')}} className="showNoteForm  text-bg-primary rounded-circle position-fixed">
                        <FontAwesomeIcon icon={faPlus} />
                    </div>
                </div>


            </div>
            {isOpen && <NoteForm upDateId={upDateId} mood={mood} showOverLay={showOverLay} getToDoData={getToDoData} />}
        </>
    )
}
