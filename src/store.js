import createStore from 'unistore';
import axios from 'axios';
import swal from 'sweetalert';
import firebaseDb from './firebase';
import xlsx from 'json-as-xlsx';

const initialState = { 
	endpoint: 'https://cors-anywhere.herokuapp.com/http://universities.hipolabs.com',
	endpointCountry: 'https://restcountries.eu/rest/v2/name/',
	infoData: [],
	email: '',
	countries: [],
	password: '',
	typeText: 'password',
	dataUser: {},
	status: false,
	token:'',
	count:0,
	userData: {},
	successRegitration: false,
	loading: true,
	emailList: {}
}

export const store = createStore(initialState)

export const actions = store => ({
	downloadSubs: async (state) => {
		firebaseDb.child('email_list').on('value', snapshot=>{
			if(snapshot.val()!==null) {
				let result = snapshot.val()
				let emailList = []
				Object.keys(result).map((id)=>{
					emailList.push({email: result[id].email})
					return id
				})
				console.log('email', emailList)
				const columns = [
					{ label: 'Email', value: 'email' }
				]
				const content = emailList
				const settings = {
					sheetName: 'Subscribers',
					fileName: 'Users',
					extraLength: 3
				}
				xlsx(columns, content, settings)
			}
		})
	},
	checkUserData: async (state, lengthData, dataId) => {
		let userId = dataId
		if (lengthData===0) {
			if(localStorage.getItem('userAuth')) {
				userId = localStorage.getItem('userAuth')
			} else if (store.getState().token) {
				userId = store.getState().token
			}
		} 
		firebaseDb.child('users').on('value', snapshot=>{
			if(snapshot.val()!==null) {
				store.setState({
					dataUser: snapshot.val()
				})
				let result = snapshot.val()
				let count = 0
				Object.keys(result).map((id)=>{
					if(userId===id&&count===0) {
						count+=1
						store.setState({
							token: id,
							userData: result[id]
						})
						localStorage.setItem('userAuth', id)
					}
					return id
				})
				if(count===0) {
					localStorage.removeItem('userAuth')
					store.setState({
						token: ''
					})
					return false
				}
			}
		})
	},
	Logout : async (state) => {
		localStorage.removeItem('userAuth')
		store.setState({
			token: ''
		})
	},
	getRecommendation : async (state, variable) => {
		const req = {
			method: "get",
			url: state.endpointCountry+ variable,
			headers: {
				"Content-Type": "application/json"
			}
		};
		await axios(req)
			.then(response => {
				let listCountry = []
				if (response.status===200) {
					response.data.forEach((item, index)=>{
						listCountry.push(item.name)
					})
				}
				store.setState({
					countries: listCountry
				})
			})
			.catch(error => {
				return false
		})
	},
	getUniversity : async (state, variable, additional) => {
		store.setState({
			loading: true
		})
		let randomName = ['Jakarta','Bandung','London','Manchester','Tokyo','Seoul']
		let index = Math.floor(Math.random()*randomName.length)
		let name = ''
		let country = ''
		if(variable) {
			if(additional==='name') {
				name = variable
			} else {
				country = variable
			}
		} else {
			name = randomName[index]
			index = Math.floor(Math.random()*randomName.length)
		}
		const req = {
			method: "get",
			url: state.endpoint+"/search?name="+ name+'&country='+country,
			headers: {
				"Content-Type": "application/json",
				"X-Requested-With": "XMLHttpRequest"
			}
		};
		await axios(req)
			.then(response => {
				if (response.status===200) {
					store.setState({
						infoData: response.data,
						loading: false
					})
				}
			})
			.catch(error => {
				return false
		})
	},
	/**
     * @function changeInput handling change user input in email and password  
     * @returns set email and password
     */
    changeInput : async (state,e) => {
			await store.setState({ [e.target.name]: e.target.value});
	},

	/**
	 * @function postLogin user sign in
	 *    a function to post user data to the database. 
	 *    here, the user enters a personal account. 
	 * @returns success login and ready to use web
	 */
	postLogin : async (state) => {
		const password= state.password    
		const email = state.email
		if ( email === '' ) {
			swal("Failed", "Email cannot be empty...", "error");
			return 0
		} else if ( password === '' ) {
			swal("Failed", "Password cannot be empty...", "error");
			return 0
		} else {
			firebaseDb.child('users').on('value', snapshot=>{
				if(snapshot.val()!==null) {
					store.setState({
						dataUser: snapshot.val()
					})
					let result = snapshot.val()
					let wrongData = true
					Object.keys(result).map((id)=>{
						if(email===result[id].email&&password===result[id].password) {
							wrongData = false
							if (store.getState().token==='') {
								swal("Congrats!", "You have successfully logged in!", "success");
							}
							store.setState({
								token: id,
								userData: result[id]
							})
							localStorage.setItem('userAuth', id)
						}
						return id
					})
					if (wrongData) {
						swal("Failed", "Silakan cek kembali email dan password Anda", "error");
					}
				}
			})
		}
	},

	postMail : async (state, email) => {
		let obj = {
			email : email
		}
		firebaseDb.child('email_list').push(
			obj,
			err => {
				if(err) {
					swal("Failed", "An error occurred, reload your browser", "error");
				} else {
					swal("Congrats!", "Anda berhasil berlangganan!", "success");
				}
			}
		)
	},

	favoriteUniversities : async (state, userId, univId) => {
		let user = store.getState().userData
		let obj = {
			email: user.email,
			password:user.password
		}
		let favoriteName = []
		if(user.favorite!==undefined) {
			if(user.favorite.length!==0) {
				let same = 0
				let newFavorite = []
				user.favorite.map((favUniv)=>{
					if(favUniv!==univId) {
						newFavorite.push(favUniv)
					} else {
						same=1
					}
					return same
				})
				if(same===0) {
					newFavorite.push(univId)
				}
				obj.favorite = newFavorite
			} else {
				favoriteName.push(univId)
				obj.favorite = favoriteName
			}
		} else {
			favoriteName.push(univId)
			obj.favorite = favoriteName
		}
		firebaseDb.child(`users/${userId}`).set(
			obj,
			err => {
				if(err) {
				} else {
					firebaseDb.child('users').on('value', snapshot=>{
						if(snapshot.val()!==null) {
							store.setState({
								dataUser: snapshot.val()
							})
							let result = snapshot.val()
							Object.keys(result).map((id)=>{
								if(user.email===result[id].email&&user.password===result[id].password) {
									store.setState({
										token: id,
										userData: result[id]
									})
								}
								return id
							})
						}
					})
				}
			}
		)
	},

	postRegister : async (state) => {
		const password= state.password    
		const email = state.email
		let notInDatabase = true
		let hasChecked = false
		if ( email === '' ) {
			swal("Failed", "Email cannot be empty...", "error");
		} else if ( password === '' ) {
			swal("Failed", "Password cannot be empty...", "error");
		} else {
			let obj = {
				email: email,
				password: password,
				favorite: []
			}
			firebaseDb.child('users').on('value', snapshot=>{
				if(snapshot.val()!==null) {
					store.setState({
						dataUser: snapshot.val()
					})
					let result = snapshot.val()
					Object.keys(result).map((id)=>{
						if(email===result[id].email&&notInDatabase&&store.getState().count===0) {
							notInDatabase=false
							swal("Failed", "This email has been registered", "error");
						}
						hasChecked = true
						return id
					})
					if(notInDatabase&&hasChecked&&store.getState().count===0) {
						store.setState({
							count:1
						})
						firebaseDb.child('users').push(
							obj,
							err => {
								if(err) {
									swal("Failed", "An error occurred, reload your browser", "error");
								} else {
									swal("Congrats!", "You have successfully registered!", "success");
									store.setState({
										successRegitration: true
									})
								}
							}
						)
					}
				} else {
					firebaseDb.child('users').push(
						obj,
						err => {
							if(err) {
								swal("Failed", "An error occurred, reload your browser", "error");
							} else {
								swal("Congrats!", "Anda berhasil terdaftar!", "success");
								store.setState({
									successRegitration: true
								})
							}
						}
					)
				}
			})
		}
	}
})