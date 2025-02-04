import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'
const labels = [
    'On wheels',
    'Box game',
    'Art',
    'Baby',
    'Doll',
    'Puzzle',
    'Outdoor',
    'Battery Powered',
  ]
export const toyService = {
    query,
    getById,
    save,
    remove,
    getRandomCar,
    getDefaultFilter,
    getEmptyToy,
    getToyLabels
}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)

}

function getById(toyId) {
    return httpService.get(BASE_URL+toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return httpService.delete(BASE_URL+toyId)
}


function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL +toy._id,toy)
    } else {
        // when switching to backend - remove the next line
        
        return httpService.post(BASE_URL, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: 0,
        inStock:true,
        labels:[],
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
    return { txt: '',labels: [], inStock: 'all', sortBy:'name',pageIdx:0 }
}
function getToyLabels() {
    return [...labels]
}