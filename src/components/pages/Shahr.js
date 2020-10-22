import React, { useRef, useState } from 'react'

export default function Shahr() {
    const inputRef = useRef();
    const [values, setValues] = useState('');
    const [items, setItems] = useState([]);
    //console.log(inputRef.current.values)

    const handlePor = (id) => {
        setValues(id);
    }

    const handleRequest = async () => {
        // setValues(inputRef.current.values)
        console.log(inputRef.current.value)
        if (inputRef.current.value.length >=1) {
            const resp = await fetch(`http://localhost:8080/api/v1/city/sug?q=${inputRef.current.value}`, {
                method: 'Post',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                },
            })
            if (resp.ok) {
                setItems(await resp.json())
            }
        }
    }
    return (
        <div>
            <input ref={inputRef} onChange={handleRequest} />
            <hr />
            <ul style={{ display: "flex", justifyContent: "center", alignItems: "center",flexDirection:"column", width: "200px", height: "200px", background: "blue", overflow: "scroll" }}>
                {items.map(item => (
                    <a onClick={() => handlePor(item.id)}><li key={item.id}>{item.name}</li></a>
                ))}
            </ul>
            <hr />
            <input name="sug" value={values} />
        </div>
    )
}
