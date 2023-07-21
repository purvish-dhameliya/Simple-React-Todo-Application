import { useState, useContext, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import './App.css'
import ButtonField from './components/ButtonField'
import TodoListItem from './components/TodoListItem'
import Search from './components/Search'
//import LocalStorage from './utility/LocalStorage'
import { storeLocalStorageData } from './components/Main'


function App (props) {
  const [inputs, setInput] = useState('')
  const [submitTogle, setSubmitTogle] = useState(true)
  const [edit, setEdit] = useState(null)
  const [search, setSearch] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [selects, setSelect] = useState('All')

  const newItems = useContext(storeLocalStorageData)
  const [items, setItems] = useState(newItems)

  function handleInputs (e) {
    setInput(e.target.value)
    //console.log(e.target.value)
  }

  function handleAddItems (_item) {
    if (!inputs) {
      return
    } else if (inputs && !submitTogle) {
      setItems(
        items.map(elem => {
          if (elem.id === edit.id) {
            return { ...elem, text: inputs }
          }
          return elem
        })
      )
      setSubmitTogle(true)
      setInput('')
      setEdit(null)
    } else {
      let newList = {
        id: Math.random().toString(36).substring(2, 6),
        text: inputs,
        isComplete: false,
        createAt: startDate,
        DeleteAt: null
      }
      //    console.log(newList.id);

      setItems([...items, newList])
      setInput('')
    }
    props.handleSaveData(items)
  }

  useEffect(() => {
    props.handleSaveData(items)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

  function handleDeleteClick (index) {
    const cancel = items
    items.splice(index, 1)
    setItems([...cancel])
    props.handleSaveData(items)
  }

  function handleCompleteClick (_item) {
    const updtItems = items.map(item => {
      if (item.id === _item.id) {
        item.isComplete = true
      }
      return item
    })
    setItems(updtItems)
    props.handleSaveData(items)
  }

  function handleUpdateClick (item) {
    const findtodo = items.find(todo => todo.id === item.id)
    //console.log(findtodo);
    setSubmitTogle(false)
    setInput(findtodo.text)
    setEdit(item)
    props.handleSaveData(items)
  }
  function handleDateChange (date, item) {
    // const filteredItems = getItem().filter(item => {
    //   return item.createAt === startDate
    // })
    // setItems(filteredItems)
    setStartDate(date)

    // const dateData = items.filter((item)=>{
    //   return item.createAt === startDate;
    // })
    //  setItems(dateData)
    // setStartDate(date)
  }

  let droplist
  if (selects === 'All') {
    droplist = items
      // eslint-disable-next-line
      .filter(item => {
        if (search === ' ') {
          return item
        } else if (item.text.toLowerCase().includes(search.toLowerCase())) {
          return item
        }
      })
      .map((item, index) => {
        return (
          <TodoListItem
            key={index}
            index={index}
            item={item}
            handleCompleteClick={handleCompleteClick}
            handleDeleteClick={handleDeleteClick}
            handleUpdateClick={handleUpdateClick}
          />
        )
      })
  } else if (selects === 'Pending') {
    droplist = items

      .filter(item => item.isComplete === false)
      // eslint-disable-next-line
      .filter(item => {
        if (search === ' ') {
          return item
        } else if (item.text.toLowerCase().includes(search.toLowerCase())) {
          return item
        }
      })
      .map((item, index) => {
        return (
          <TodoListItem
            key={index}
            index={index}
            item={item}
            handleCompleteClick={handleCompleteClick}
            handleDeleteClick={handleDeleteClick}
            handleUpdateClick={handleUpdateClick}
          />
        )
      })
  } else if (selects === 'Already Done') {
    droplist = items

      .filter(item => item.isComplete === true)
      // eslint-disable-next-line
      .filter(item => {
        if (search === ' ') {
          return item
        } else if (item.text.toLowerCase().includes(search.toLowerCase())) {
          return item
        }
      })
      .map((item, index) => {
        return (
          <TodoListItem
            key={index}
            index={index}
            item={item}
            handleCompleteClick={handleCompleteClick}
            handleDeleteClick={handleDeleteClick}
            handleUpdateClick={handleUpdateClick}
          />
        )
      })
  }

  return (
    <div className='App'>
      <div className='container'>
        <div className='app-content'>
          <div className='row'>
            <div className='col-12'>
              <div className='d-flex p-2 m-2 justify-content-center align-items-lg-center'>
                <h2>TO-DO LIST</h2>
              </div>
              <div className='d-flex justify-content-left align-items-center'>
                <div className='row'>
                  <div className='d-flex justify-content-center align-items-center m-3'>
                    <div className='col-md-6 flex-start'>
                      <Search
                        value={search}
                        handleChange={e => setSearch(e.target.value)}
                      />
                    </div>
                    <div className='col-md-3 p-1 m-3'>
                      <DatePicker
                        showIcon
                        className='form-control'
                        selected={startDate}
                        onChange={handleDateChange}
                        minDate={new Date()}
                        dateFormat='dd-MM-yyyy'
                        showYearDropdown
                        calendarIcon
                      />
                    </div>
                    <div className='col-md-3'>
                      <select
                        value={selects}
                        onChange={e => {
                          setSelect(e.target.value)
                        }}
                        className='form-control'
                      >
                        <option value='All'>All</option>
                        <option value='Pending'>Pending</option>
                        <option value='Already Done'>Already Done</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='d-flex justify-content-center align-items-center'>
              <div className='col-md-10'>
                <input
                  type='text'
                  placeholder='Enter your Notes...'
                  className='mb-3 p-4 form-control d-flex justify-content-center align-items-center outline-none'
                  value={inputs}
                  onChange={handleInputs}
                />
              </div>
              <div className='col-md-2 pb-3 mr-3'>
                {submitTogle ? (
                  <ButtonField
                    label='Add'
                    varaint='warning'
                    handleClick={handleAddItems}
                  />
                ) : (
                  <ButtonField
                    variant='warning'
                    label='Edit'
                    handleClick={handleAddItems}
                  />
                )}
              </div>
            </div>
          </div>

          <div>
            {droplist}

            {/* <LocalStorage items={items} /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
