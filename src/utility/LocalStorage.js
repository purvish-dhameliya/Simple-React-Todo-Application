import {useEffect} from 'react'

const LocalStorage = (props) => {
    const {items} = props;


    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items))
      }, [items])
};

export default LocalStorage