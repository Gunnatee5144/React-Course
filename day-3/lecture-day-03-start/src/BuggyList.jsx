import { useState } from 'react';

function BuggyList() {
    const [items, setItems] = useState([
        { 
            id: 1,
            name: 'vercel/next.js'
        },
        { 
            id: 2,
            name: 'facebook/react'
        },
        { 
            id: 3,
            name: 'microsoft/typescript'
        }
    ]);

    const remove = (id) => {
        setItems(items.filter((i) => i.id !== id));
    }

    return (
        <ul>
            {items.map((item) => {
                return (
                    <li key={item.id}>
                        <input type="checkbox" />
                        {item.name}
                        <button onClick={ () => remove(item.id)}>ลบ</button>
                    </li>
                )
            })}
        </ul>
    );
}

export default BuggyList;