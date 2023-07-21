import React from 'react'
import ButtonField from './ButtonField'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'

function TodoListItem (props) {
  const {
    index,
    handleDeleteClick,
    handleCompleteClick,
    item,
    handleUpdateClick
  } = props
  return (
    <div className=''>
      <div className='row'>
        <div
          className='col-md-6 align-items-center d-flex justify-content-center'
          key={index}
        >
          {item.text}
        </div>

        <div className='col-md-2'>
          <ButtonField
            label={item.isComplete !== true ? 'Complete' : 'Done'}
            variant='dark'
            disabled={item.isComplete}
            handleClick={() => handleCompleteClick(item)}
          />
        </div>
        {!item.isComplete && (
          <div className='col-md-2'>
            <ButtonField
              label='Delete'
              variant='danger'
              handleClick={() => handleDeleteClick(index)}
            />
          </div>
        )}
        {!item.isComplete && (
          <div className='col-md-2 d-flex justify-content-start'>
            <ButtonField
              label='Edit'
              variant='warning'
              handleClick={() => handleUpdateClick(item)}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default TodoListItem
