import { useEffect, useState } from "react"

const PREFIX = 'whatsapp-clone-'

export default function useLocalStorage(key, initialValue) {
    const prefixedKey = PREFIX + key
    
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey)
        if (jsonValue) return JSON.parse(jsonValue)
        
        // can't leave value undefined
        if (typeof initialValue === 'function') return initialValue()
        return initialValue
    })

    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value])

    return [value, setValue] //setValue, which is setId is passed to Login to use
}