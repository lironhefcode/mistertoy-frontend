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
    getToyLabels,
    getToysData,
    getStockData,
    getAll,
    addMsg
}

async function query(filterBy = {}) {
    const test =  await httpService.get(BASE_URL, filterBy)
 
    return test

}
function getAll(){
    return httpService.get(BASE_URL + 'all')
}

async function getById(toyId) {
    const toy = await httpService.get(BASE_URL+toyId)
    return toy
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
async function addMsg(toyId,msg){
  
    const txt = {txt:msg}
    return  await httpService.post(BASE_URL+toyId+'/msg',txt)
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

function getToysData(toys){
 
                return toys.reduce((acc,toy) =>{
                    toy.labels.forEach(label => {
                        acc[label] = (acc[label] || 0) + 1
                    });
        
                    return acc
            },{})

            
}
function getStockData(toys){
   
                return toys.reduce((acc,toy) =>{
                    if(!toy.inStock) return acc

                    toy.labels.forEach(label => {
                        acc[label] = (acc[label] || 0) + 1
                    });
        
                    return acc
            },{})
}
