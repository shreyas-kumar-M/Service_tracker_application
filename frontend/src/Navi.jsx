import React, { useState } from 'react';


function Navigation({ logout, onSearch, onReset }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
        setSearchTerm(''); // Clear the input field after search
    };

    return (
        <nav className="navigation">
            <form className="nav-form" onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    placeholder='search'
                    name="search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button type="submit">Search</button>
                <button
                    type="button"
                    onClick={onReset}
                    style={{ marginLeft: '0.5rem' }}
                >
                    Reset
                </button>
            </form>
            <button className="logout-btn" onClick={logout}>Logout</button>
        </nav>
    );
}

export default Navigation;