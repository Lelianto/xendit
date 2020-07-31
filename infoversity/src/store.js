import createStore from 'unistore';
import axios from 'axios';
import swal from 'sweetalert';
import firebaseDb from './firebase';

const initialState = { 
	endpoint: 'http://universities.hipolabs.com',
	infoData: [],
	email: '',
	password: '',
	typeText: 'password',
	dataUser: {},
	status: false,
	token:'',
	count:0,
	userData: {},
	successRegitration: false
}

export const store = createStore(initialState)

export const actions = store => ({
	checkUserData: async (state, userId) => {
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
				})
				if(count===0) {
					localStorage.removeItem('userAuth')
					store.setState({
						token: ''
					})
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
	getUniversity : async (state, variable) => {
		let city = ''
		let randomCity = ['Jakarta','Bandung','London','Manchester','Tokyo','Seoul']
		let index = Math.floor(Math.random()*randomCity.length)
		if(variable) {
			city = variable
		} else {
			city = randomCity[index]
			index = Math.floor(Math.random()*randomCity.length)
		}
		const req = {
			method: "get",
			url: state.endpoint+"/search?name="+ city,
			headers: {
				"Content-Type": "application/json"
			}
		};
		await axios(req)
			.then(response => {
				if (response.status===200) {
					store.setState({
						infoData: response.data
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
			swal("Gagal", "Email tidak boleh kosong...", "error");
			return 0
		} else if ( password === '' ) {
			swal("Gagal", "Password tidak boleh kosong...", "error");
			return 0
		} else {
			firebaseDb.child('users').on('value', snapshot=>{
				if(snapshot.val()!==null) {
					store.setState({
						dataUser: snapshot.val()
					})
					let result = snapshot.val()
					Object.keys(result).map((id)=>{
						if(email===result[id].email&&password===result[id].password) {
							store.setState({
								token: id,
								userData: result[id]
							})
							localStorage.setItem('userAuth', id)
						}
					})
				}
			})
		}
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
					console.log('error',err)
				} else {
					console.log('sukses', obj)
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
			swal("Gagal", "Email tidak boleh kosong...", "error");
		} else if ( password === '' ) {
			swal("Gagal", "Password tidak boleh kosong...", "error");
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
							swal("Gagal", "Email ini telah terdaftar", "error");
						}
						hasChecked = true
					})
					if(notInDatabase&&hasChecked&&store.getState().count===0) {
						store.setState({
							count:1
						})
						firebaseDb.child('users').push(
							obj,
							err => {
								if(err) {
									console.log('masuk error', err)
									swal("Gagal", "Terjadi kesalahan, muat ulang browser Anda", "error");
								} else {
									swal("Selamat!", "Anda berhasil terdaftar!", "success");
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
								console.log('masuk error', err)
								swal("Gagal", "Terjadi kesalahan, muat ulang browser Anda", "error");
							} else {
								swal("Selamat!", "Anda berhasil terdaftar!", "success");
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