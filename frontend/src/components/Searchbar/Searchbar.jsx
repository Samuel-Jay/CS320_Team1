import react from 'react'

const Searchbar = () => {
    return (
        <form action="/" method="get">
        <label htmlFor="header-search">
            <span className="visually-hidden">Search tasks</span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="Search tasks"
            name="s" 
        />
        <button type="submit">Search</button>
    </form>
    )

}

export default Searchbar
