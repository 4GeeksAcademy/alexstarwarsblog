import React, { useContext, useEffect, useState } from "react";
import { Context } from '../store/appContext'
import { useNavigate } from "react-router";

const Card = (props) => {

    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const category = props.category;
    const idx = props.idx;
    const item = store[category][idx];
    const uid = item.result.uid;
    const imgUrl = `https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/${category}/${uid}.jpg`
    let [favorite, setFavorite] = useState(false)
    const favoriteNames = []

    if(item.result.properties.name === "Luke Skywalker") {
    }

    useEffect(() => {
        store.favorites.map((favorite) => {
            favoriteNames.push(favorite.result.properties.name)
        })
        if(favoriteNames.includes(item.result.properties.name)) {
            setFavorite(true)
        } else {
            setFavorite(false)
        }
    },[store.favorites])

    const clickHandler = () => {
        setFavorite(!favorite)
        actions.toggleFavorite(item, category, idx)
    }

    return (
        <div className="col-3 m-3">
            <div className="card h-100" style={{width: '18rem'}}>
                <img className="card-img-top" src={imgUrl}  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src='https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/big-placeholder.jpg';}} alt="Card Image"/>
                <div className="card-body">
                    <h5 className="card-title">{item.result.properties.name}</h5>
                    {category === 'characters' ? <p className="card-text">Gender: {item.result.properties.gender} <br/> Hair Color: {item.result.properties.hair_color} <br/> Eye-color: {item.result.properties.eye_color} </p> : 
                    category === 'planets' ? <p className="card-text">Population: {item.result.properties.population} <br/> Terrain: {item.result.properties.terrain} </p> :
                    <p className="card-text">Vehicle Model: {item.result.properties.model} <br/> Cost: {item.result.properties.cost_in_credits} credits</p>
                    }
                </div>
                <div className="d-flex justify-content-between card-footer">
                    <button className="btn btn-outline-primary" onClick={() => navigate(`/details/${category}/${item.result.uid}`)}>Learn more!</button>
                    <button className='btn btn-outline-warning favorite' onClick={clickHandler}>{favorite ? <i className="fa-regular fa-heart"></i> : <i className="fa-solid fa-heart"></i>}</button>
                </div>
            </div>
        </div>
    )

}

export default Card









