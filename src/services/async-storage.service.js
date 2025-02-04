export const storageService = {
    query,
    get,
    post,
    put,
    remove,
}
//_createToys()
function query(entityType, delay = 500) {
    
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
  
    return new Promise(resolve => setTimeout(() => resolve(entities), delay))
}

function get(entityType, entityId) {
    return query(entityType).then(entities => {
        const entity = entities.find(entity => entity._id === entityId)
        if (!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        return entity
    })
}

function post(entityType, newEntity) {
    newEntity = {...newEntity}
    newEntity._id = _makeId()
    return query(entityType).then(entities => {
        entities.push(newEntity)
        _save(entityType, entities)
        return newEntity
    })
}

function put(entityType, updatedEntity) {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
        if (idx < 0) throw new Error(`Update failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        entities.splice(idx, 1, updatedEntity)
        _save(entityType, entities)
        return updatedEntity
    })
}

function remove(entityType, entityId) {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity._id === entityId)
        if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        entities.splice(idx, 1)
        _save(entityType, entities)
    })
}

// Private functions

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}
function _createToys(){
    const toys =  [  {
          _id: 't102',
          name: 'Speed Racer Car',
          price: 150,
          labels: ['On wheels', 'Battery Powered', 'Outdoor'],
          createdAt: 1631032801011,
          inStock: true,
        },
        {
          _id: 't103',
          name: 'Colorful Puzzle',
          price: 95,
          labels: ['Puzzle', 'Art'],
          createdAt: 1631033801011,
          inStock: true,
        },
        {
          _id: 't104',
          name: 'Soft Teddy Bear',
          price: 80,
          labels: ['Doll', 'Baby'],
          createdAt: 1631034801011,
          inStock: false,
        },
        {
          _id: 't105',
          name: 'Magnetic Building Blocks',
          price: 200,
          labels: ['Box game', 'Art'],
          createdAt: 1631035801011,
          inStock: true,
        },
        {
          _id: 't106',
          name: 'Mini Basketball Hoop',
          price: 175,
          labels: ['Outdoor', 'Baby'],
          createdAt: 1631036801011,
          inStock: true,
        },
        {
          _id: 't107',
          name: 'Electric Train Set',
          price: 250,
          labels: ['On wheels', 'Battery Powered'],
          createdAt: 1631037801011,
          inStock: false,
        }]
      _save('toyDB',toys)
  }