const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			characters: [

			],
			planets: [

			],
			vehicles: [

			],
			starships: [

			],
			favorites: [

			],
			dictionary: [

			]
		},
		actions: {
			asyncFetch: async (url) => {
				try {
					const resp = await fetch(url)
					if (!resp.ok) {
						throw new Error('Error occurred:', resp.status)
					} else {
						const data = resp.json()
						return data
					}
				} catch (error) {
					console.log(error)
				}
			},
			getData: async () => {
				Object.keys(getStore()).forEach(async (key, index) => {
					let localStoreData = localStorage.getItem(key)
					if (localStoreData !== null && getStore()[key].length === 0) {
						localStoreData = JSON.parse(localStoreData)
						setStore({ [key]: localStoreData });
					}
					if (getStore()[key].length === 0) {
						if (key !== 'favorites' && key !== 'dictionary') {
							const url = key === 'characters' ? 'https://www.swapi.tech/api/people' : `https://www.swapi.tech/api/${key}`
							const apiResults = await getActions().asyncFetch(url)
							await apiResults.results.map(async (item, idx) => {
								try {
									const newItem = await getActions().asyncFetch(item.url);
									const currentItems = getStore()[key]
									const tempItems = currentItems.toSpliced(idx, 0, newItem)
									setStore({ [key]: tempItems })
									const currentDict = getStore().dictionary;
									const tempDict = currentDict.toSpliced(currentDict.length, 0, newItem)
									setStore({ dictionary: tempDict })
								} catch (error) {
									return { ...item, error };
								}
							})
						}
					}
				})
			},
			deleteFavorite: (item) => {
				const currentFavorites = getStore().favorites;
				const newFavorites = currentFavorites.filter((fav) => fav.result.properties.name !== item.result.properties.name)
				setStore({ favorites: newFavorites })
			},
			toggleFavorite: async (item, category, idx) => {
				const thisFavorite = getStore()[category][idx]
				const currentFavorites = getStore().favorites
				const currentFavoriteNames = []
				getStore().favorites.map((fav) => {
					if (!currentFavoriteNames.includes(fav.result.properties.name)) {
						currentFavoriteNames.push(fav.result.properties.name)
					}
				})
				if (currentFavoriteNames.includes(thisFavorite.result.properties.name)) {
					const newFavorites = await currentFavorites.filter((fav) => fav.result.properties.name !== item.result.properties.name)
					setStore({ favorites: newFavorites })
				} else {
					const newFavorites = await getStore().favorites.toSpliced(getStore().favorites.length, 0, thisFavorite)
					setStore({ favorites: newFavorites })
				}
			}
		}
	};
};

export default getState;







