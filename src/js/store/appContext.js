import React, { useState, useEffect } from "react";
import getState from "./flux.js";

// Don't change, here is where we initialize our context, by default it's just going to be null.
export const Context = React.createContext(null);

// This function injects the global store to any view/component where you want to use it, we will inject the context to layout.js, you can see it here:
// https://github.com/4GeeksAcademy/react-hello-webapp/blob/master/src/js/layout.js#L35
const injectContext = PassedComponent => {
	const StoreWrapper = props => {
		//this will be passed as the contenxt value
		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore =>
					setState({
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions }
					})
			})
		);

		useEffect(() => {
			state.actions.getData()
		}, []);


		useEffect(() => {
			localStorage.setItem('characters', JSON.stringify(state.store.characters));
			localStorage.setItem('planets', JSON.stringify(state.store.planets));
			localStorage.setItem('vehicles', JSON.stringify(state.store.vehicles));
			localStorage.setItem('starships', JSON.stringify(state.store.starships));
			localStorage.setItem('favorites', JSON.stringify(state.store.favorites));
			localStorage.setItem('dictionary', JSON.stringify(state.store.dictionary));
		}, [state.store.characters, state.store.planets, state.store.vehicles, state.store.starships, state.store.favorites, state.store.dictionary])
		// The initial value for the context is not null anymore, but the current state of this component,
		// the context will now have a getStore, getActions and setStore functions available, because they were declared
		// on the state of this component
		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreWrapper;
};

export default injectContext;









