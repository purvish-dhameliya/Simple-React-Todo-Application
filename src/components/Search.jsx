import React from 'react'

function Search ({ handleChange, value }) {
  return (
    <>
      <div>
        <input
          type='text'
          placeholder='Notes Search here...'
          className='mb-3 p-3 form-control d-flex justify-content-center align-items-center outline-none'
          value={value}
          onChange={handleChange}
        />
      </div>
    </>
  )
}

export default Search
