import React, { useState, createContext, useEffect } from 'react'
import App from '../App'


const storeLocalStorageData = createContext()

const Main = () => {
  function getItem () {
    const list = localStorage.getItem('items')
    // console.log(list)
    if (list) {
      return JSON.parse(list)
    } else {
      return []
    }
  }
  const [savedata, setSaveData] = useState(getItem())

  function saveDatahandler (saveItems) {
    console.log('saveDatahandler')
    setSaveData([...saveItems])
  }

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(savedata))
  }, [savedata])

  return (
    <>
      <storeLocalStorageData.Provider value={savedata}>
        
        <App handleSaveData={saveDatahandler} />
      </storeLocalStorageData.Provider>
    </>
  )
}

export default Main

export { storeLocalStorageData }
