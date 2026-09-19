import { useState, Fragment } from 'react';
function TodoList() {
    const [items, setItems] = useState([]);

    const handleAdd = () => {
        const tempItem = [...items];
        tempItem.push("new item");
        setItems(tempItem);
    };

    const handleDelete = (index) => {
        const tempItem = [...items];
        tempItem.splice(index, 1);
        setItems(tempItem);
    };

    return (
        <div className="p-8">
            <button onClick={handleAdd}>Add Item</button>
            <ul>
                {items.map((item, index) => (
                    <div className="flex">
                        <li key={index}>{index}.{item}</li>
                        <button onClick={() => handleDelete(index)}>Delete</button>
                    </div>
                ))}
            </ul>
        </div>
    )
};

export default TodoList;