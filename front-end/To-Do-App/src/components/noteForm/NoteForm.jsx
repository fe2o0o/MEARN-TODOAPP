import  { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/fontawesome-free-solid'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
export default function NoteForm(props) {


  const notify = (msg) => {toast(msg)};
  
  const [mood, setMood] = useState('add')
  
  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    setMood(props.mood)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (mood == 'update') {
      // eslint-disable-next-line react/prop-types
      const { upDateId } = props
      axios.get(`http://localhost:3000/api/v1/toDo/${upDateId}`, { headers: { token: `${localStorage.getItem('Token')}` } }).then((res) => {
        console.log(res.data.data);
        setToDoForm({title:res.data.data.title , content:res.data.data.content})
      })
    }
  }, [mood])
  
  const [toDoForm, setToDoForm] = useState({
    title: '',
    content:''
  })

  const [toDoFormError, setToDoFormError] = useState({
    titleError: null,
    contentError: null,
    globalError:null
  })

  const exitOver = () => {
    // eslint-disable-next-line react/prop-types
    props.showOverLay()
  }


  const getData = () => {
    // eslint-disable-next-line react/prop-types
    props.getToDoData()
  }


  const handleChanges = (e) => {
    const fieldName = e.target.name
    switch (fieldName) {
      case 'title':
        setToDoForm({ ...toDoForm, title: e.target.value })
        setToDoFormError({...toDoFormError,titleError:e.target.value.trim().length === 0 ? "Title Is Required":null,globalError:null})
        break;
      case 'content':
        setToDoForm({ ...toDoForm, content: e.target.value })
        setToDoFormError({ ...toDoFormError, contentError: e.target.value.trim().length === 0 ? "Content Is Required" : null, globalError:null})
        break;
      default:
        break;
    }
  }


  const updateToDo = (e) => {
    e.preventDefault()
    if (toDoForm.title.trim().length == 0 || toDoForm.content.trim().length == 0) {
      return setToDoFormError({ ...toDoFormError, globalError: "All Data Is Required" })
    }

    // eslint-disable-next-line react/prop-types
    axios.put(`http://localhost:3000/api/v1/toDo/${props.upDateId}`, toDoForm, { headers: { token: `${localStorage.getItem('Token')}` } }).then(() => {
      notify("Your Task Up Dated")
      setToDoForm({ title: '', content: '' })
      getData()
      setMood('add')
    })
  }


  const addToDo = (e) => {
    e.preventDefault()
    if (toDoForm.title.trim().length == 0 || toDoForm.content.trim().length == 0) {
      return setToDoFormError({...toDoFormError,globalError:"All Data Is Required"})
    }


    axios.post('http://localhost:3000/api/v1/addToDo', toDoForm, { headers: { token: `${localStorage.getItem('Token')}` } }).then(() => {
      notify("Your Task Added")
      setToDoForm({ title: '', content: '' })
      getData()
    }).catch((err) => {
      setToDoFormError({...toDoFormError , globalError:err.data.message})
    })

  }


  return (
    <>


      <Toaster position='top-center' toastOptions={{
        className: '',
        duration: 2000,
        style: {
          width:'400px',
          background: 'green',
          color: '#fff',
        },
      }} />
      <div>
        <FontAwesomeIcon onClick={exitOver} icon={faPlus} className='exitNote p-1 rounded-circle text-bg-danger position-fixed z-3  ' />
      </div>
      <div className="addNots position-fixed top-0 bottom-0 start-0 end-0 bg-white bg-opacity-75">
        <div className="container h-100 d-flex justify-content-center align-items-center">
          <div className="form border p-3 rounded-3 shadow bg-white">
            <h6 className="text-center fs-4 fw-bolder">{mood == 'add' ? "Add" : "Up Date"} To Do </h6>
            <p className='text-danger fw-bolder text-center'>{toDoFormError.globalError }</p>
            <form  method='post'>
              <div className="form-group mb-3">
                <label htmlFor="title"  className='mb-1 fw-bold'>Title</label>
                <input value={toDoForm.title} onChange={handleChanges} type="text" name="title" placeholder='Task name' className={`form-control`} />
                <small className='text-danger fw-bold '>{ toDoFormError.titleError }</small>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="" className='mb-1 fw-bold'>Content</label>
                <textarea value={toDoForm.content} onChange={handleChanges}  name='content' placeholder='You Will Do ......' cols="20" rows="5" className='form-control'></textarea> 
                <small className='text-danger fw-bold '>{toDoFormError.contentError}</small>
              </div>
              {mood === 'add' && <button onClick={addToDo} className='btn btn-primary w-100'>Submit</button>}
              {mood === 'update' && <button onClick={updateToDo}  className='btn btn-warning w-100'>UpDate</button>}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
