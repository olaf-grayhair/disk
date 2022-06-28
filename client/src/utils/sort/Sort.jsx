import React from 'react';

const Sort = ({setSort}) => {
    const sort = (e) => {
        setSort(e.target.value)
    }
    return (
        <div>
            <select onChange={sort}>
                <option value="name">Name</option>
                <option value="type">Type</option>
                <option value="date">Date</option>
                <option value="size">Size</option>
            </select>
        </div>
    );
}

export default Sort;
