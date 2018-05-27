import types from './types';

const sortNameOn = () => ({
  type: types.SORT_NAME_ON
})

const sortNameOff = () => ({
  type: types.SORT_NAME_OFF
})

const toggleSortAz = () => ({
  type: types.TOGGLE_SORT_BY_AZ
})

const filterByCategoryShowAll = () => ({
  type: types.FILTER_BY_CATEGORY_ALL
})

const filterByCategory = (categoryId) => ({
  type: types.FILTER_BY_CATEGORY,
  payload: { data: categoryId }
})

export {
  sortNameOn,
  sortNameOff,
  toggleSortAz,
  filterByCategoryShowAll,
  filterByCategory
}
