import React, { useContext, useEffect, useState } from "react";
import { Context } from '../store/appContext'
import "../../styles/home.css";
import Card from '../component/Card.jsx'
import { useNavigate, Link } from 'react-router-dom';

export const Home = () => {

	const navigate = useNavigate()
	const { store, actions } = useContext(Context);
	const categories = []
	const capitalizedCategories = []
		Object.keys(store).forEach(async (key, index) => {
			if(key !== 'favorites' && key !=='dictionary') {
				categories.push(key)
				let tempCategory = key.split('');
				tempCategory[0] = tempCategory[0].toUpperCase()
				const upperCaseCategory = tempCategory.join('')
				capitalizedCategories.push(upperCaseCategory)
			}
		})

	return (
		<div className="container pb-3">
			{categories.map((category, index) => {
				return (
				<div>
					<div className="row category">
						<h1>{capitalizedCategories[index]}</h1>
					</div>
					<div className="row flex-row flex-nowrap overflow-auto mb-3 pb-3">
						{store[category].map((data, idx) => {
							return <Card idx={idx} category={category}/>
						})}
					</div>
				</div>
				)
			})}
		</div>
	)
};













