import types from './types'

// const fetchHierarchy = () => ({
//   type: types.FETCH_HIERARCHY
// })

// const fetchHierarchyCompleted = data => ({
//   type: types.FETCH_HIERARCHY_COMPLETED,
//   payload: { data }
// })

const goHome = () => ({
  type: 'HOME'
})

const goSearch = query => ({
  type: 'SEARCH',
  payload: { query }
})

// const goProductType = (category, productType) => ({
//   type: 'PRODUCT_TYPE',
//   payload: { category, productType }
// })

// const goNotFound = () => ({
//   type: NOT_FOUND
// })

export {
  goHome,
  goSearch
}
