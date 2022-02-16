import {useState, useEffect} from "react";

function useLocalStorageLocation (key, firstValue = false) {
    const initialValue = localStorage.getItem(key) || firstValue;
  
    const [item, setItem] = useState(initialValue);
  
    useEffect(function setKeyInLocalStorage() {
      console.debug("hooks useLocalStorage useEffect", "item=", item);
  
      if (item === true) {
        localStorage.setItem(key, item);
      } else {
        localStorage.removeItem(key);
      }
    }, [key, item]);
  
    return [item, setItem];
  }
  
  export default useLocalStorageLocation;