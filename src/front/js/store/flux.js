const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			user: null,
			movies: [],
			specificMovie: null,
			popularMovies: [],
			movieComments: [],
			message: null,
			randomMovie: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			setToken: () => {
				const token = sessionStorage.getItem('token')
				const user = JSON.parse(sessionStorage.getItem('user'))
				setStore({ ...getStore(), user: user, token: token })
			},
			login: async (emailOrUsername, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/login/",
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json"
							},
							body: JSON.stringify({ email_or_username: emailOrUsername, password: password })
						});

					if (response.status !== 201) {
						console.log("There has been some error");
						return false;
					}

					const data = await response.json()
					sessionStorage.setItem("token", data.token)
					sessionStorage.setItem("user", JSON.stringify(data.user))
					setStore({ ...getStore(), token: data.token, user: data.user })
					return true

				} catch (error) {
					console.log("error catch:", error)
				}
			},
			signin: async (username, email, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/signin/",
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json"
							},
							body: JSON.stringify({
								username: username,
								email: email,
								password: password
							})
						})
					if (!response.status) {
						console.log("Error creating user", response.status)
						return false
					}

					const data = await response.json()
					setStore({ user: data.user })
					return true

				} catch (error) {
					console.log("Error!", error)
				}
			},
			getMovies: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/movies")

					if (response.status !== 200) {
						console.log("Error! No movies", response.status)
						return;
					}

					const data = await response.json()
					console.log("This is the data", data)
					setStore({ movies: data })

				} catch (error) {
					console.log("Error!", error)
				}
			},
			getMovie: async (id) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + `/api/movies/${id}`);
					if (!response.ok) {
						console.log("Error! No movie found", response.status);
					}
					const data = await response.json();
					setStore({ specificMovie: data });
				} catch (error) {
					console.log("Error!", error);
				}
			},
			logout: async () => {
				sessionStorage.removeItem("token")
				setStore({ ...getStore(), token: null, user: null })
			},
			getPopularMovies: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/popular")
					if (response.status !== 200) {
						console.log("Wait nothing popular here", response.status)
					}

					const data = await response.json()
					console.log("Here are your popular movies", data)
					setStore({ popularMovies: data })

				} catch (error) {
					console.log("Something is wrong", error)
				}
			},
			getMovieComments: async (movie_id) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/comments/" + movie_id)

					if (response.status !== 200) {
						console.log("Error! No movies", response.status)
						return;
					}

					const data = await response.json()
					console.log("This is the data", data)
					setStore({ ...getStore(), movieComments: data })

				} catch (error) {
					console.log("Error!", error)
				}
			},
			createMovieComment: async (movie_id, content) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/comments/" + movie_id,
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
								"Authorization": "Bearer " + sessionStorage.getItem('token')
							},
							body: JSON.stringify({ content })
						})
					if (!response.status) {
						console.log("Error creating user", response.status)
						return false
					}

					const data = await response.json()
					return true

				} catch (error) {
					console.log("Error!", error)
					return false;
				}
			},
			getRandomMovie: async (genreId = 0) => {
				setStore({ ...getStore(), randomMovie: null })
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/movies/random/" + genreId)

					if (response.status !== 200) {
						console.log("Error! No movies", response.status)
						return;
					}

					const data = await response.json()
					console.log("This is the random movie", data)
					setStore({ ...getStore(), randomMovie: data })


				} catch (error) {
					console.log("Error!", error)
				}
			}
		}
	};
};

export default getState;
