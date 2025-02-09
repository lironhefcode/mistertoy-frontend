// import { storageService } from "./storage.service.js"
import { httpService } from './http.service.js'



export const userService = {
    addActivity,
    getLoggedinUser,
    updateUserPreffs,
    updateBalance,
    query,
    signup,
    getById,
    logout,
    login,
    getDefaultPrefs
}
const USER_URL = 'user/'
const AUTH_URL = 'auth/'
const STORAGE_KEY_LOGGEDIN = 'user'
// login({username: 'muki', password: 'muki1'})

function query() {
    return httpService.query(USER_URL)
}

function getById(userId) {
    return storageService.get(USER_URL + userId)
}

async function login(cerds ) {
    try {
        const user = await httpService.post(AUTH_URL+'login',{...cerds})
        if (user) return _setLoggedinUser(user)
    } catch {
        console.log('Invalid login')
    }
}

function signup({ username, password, fullname }) {
    const user = { username, password, fullname, balance: 100, pref: getDefaultPrefs() }
    return httpService.post(AUTH_URL + 'signup', user)
        .then(_setLoggedinUser)
}

async function logout() {
   await httpService.post(AUTH_URL + 'logout')
   
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function updateUserPreffs(userToUpdate) {
    const loggedinUserId = getLoggedinUser()._id
    return getById(loggedinUserId)
        .then(user => {
            user.fullname = userToUpdate.fullname
            user.pref.color = userToUpdate.color
            user.pref.bgColor = userToUpdate.bgColor
            return storageService.put(STORAGE_KEY, user)
                .then((savedUser) => {
                    _setLoggedinUser(savedUser)
                    return savedUser
                })
        })
}

function updateBalance(diff) {
    return
    const loggedinUser = getLoggedinUser()
    if (!loggedinUser) return
    return getById(loggedinUser._id)
        .then(user => {
            user.balance += diff
            return storageService.put(STORAGE_KEY, user)
                .then((user) => {
                    _setLoggedinUser(user)
                    return user.balance
                })
        })
}

function getDefaultPrefs() {
    return { color: '#eeeeee', bgColor: "#191919" }
}


function addActivity(type, todoId) {
    const activity = {
        txt: `${type} a Todo with id : ${todoId}`,
        at: Date.now()
    }
    const loggedinUser = getLoggedinUser()
    if (!loggedinUser) return
    return getById(loggedinUser._id)
        .then(user => {
            if (!user.activities) user.activities = []
            user.activities.unshift(activity)
            return user
        })
        .then(userToUpdate => {
            return storageService.put(STORAGE_KEY, userToUpdate)
                .then((savedUser) => {
                    _setLoggedinUser(savedUser)
                    return savedUser
                })
        })
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, isAdmin: user.isAdmin || false }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

// signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// login({username: 'muki', password: 'muki1'})