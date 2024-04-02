import React, { useContext, useState } from "react";
import { Context } from '../store/appContext'
import { Link } from "react-router-dom";

export const Navbar = () => {

    const { store, actions } = useContext(Context);
    const [value, setValue] = useState('')

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const deleteHandler = (idx) => {
        actions.deleteFavorite(idx)
    }

	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<img className="starWarsLogo m-2 ms-5" src='https://www.freepnglogos.com/uploads/star-wars-logo-31.png' />
            <div className="searchContainer">
                <div className="searchInner">
                    <input placeholder='Search' type='text' value={value} onChange={onChange}/>
                </div>
                <div className="searchDropdown">
                    {store.dictionary.filter((item)=> {
                        const searchTerm = value.toLowerCase();
                        const name = item.result.properties.name.toLowerCase()
                        return searchTerm !== '' && name.startsWith(searchTerm)
                    }).map((item) => (
                        <div className="searchDropdownRow" onClick={() => search(item)}>
                            <Link className="link" to={`/details/${item.result.description.slice(2, 8) == 'person' ? 'characters' : item.result.description.slice(2, 8) == 'planet' ? 'planets' : item.result.description.slice(2, 9) === 'vehicle' ? 'vehicles' : 'starships'}/${item.result.uid}`}>{item.result.properties.name}</Link>
                        </div>
                        )
                    )}
                </div>
            </div>
            <div className="dropdown me-3">
                <button className="btn btn-primary dropdown-toggle m-3 me-5" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Favorites <span>{store.favorites.length}</span>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    {store.favorites.length > 0 ? store.favorites.map((favorite, idx) => {
                            return (
                            <li className="d-flex">
                                <Link className="dropdown-item link" to={`/details/${favorite.result.description.slice(2, 8) == 'person' ? 'characters' : favorite.result.description.slice(2, 8) == 'planet' ? 'planets' : favorite.result.description.slice(2, 9) === 'vehicle' ? 'vehicles' : 'starships'}/${favorite.result.uid}`}>{favorite.result.properties.name}</Link>
                                <button className="delete rounded" onClick={() => deleteHandler(favorite)}>
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </li>
                            )
                    }) : <li><p className="dropdown-item">Empty!</p></li>}
                </ul>
            </div>
		</nav>
	);
};









