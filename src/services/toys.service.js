import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'


const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getRandomCar,
    getDefaultFilter,
    getEmptyToy
}

function query(filterBy = {}) {
    console.log(filterBy)
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (!filterBy.txt) filterBy.txt = ''
            
      
            const regExp = new RegExp(filterBy.txt, 'i')
            toys = toys.filter(toy =>
                regExp.test(toy.name) && (filterBy.inStock === 'all' || filterBy.inStock === toy.inStock) )
            if(filterBy.sortBy === 'name'){
                toys = toys.sort((t1, t2) => t1.name.localeCompare(t2.name))

            }else if(filterBy.sortBy === 'price'){
                toys = toys.sort((t1, t2) => t1.price - t2.price)

            }else{
                toys = toys.sort((t1, t2) => t1.createdAt - t2.createdAt)
            }
            return toys
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}


function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        inStock:true
    }
}

function getRandomCar() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
        speed: utilService.getRandomIntInclusive(90, 200),
    }
}

function getDefaultFilter() {
    return { txt: '', inStock: 'all', sortBy:'name' }
}
