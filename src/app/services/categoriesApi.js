export const getCategories = () => {
  return new Promise((resolve, reject) => {
    // initial categories
    if (!localStorage.categories) {
      localStorage.setItem("categories", JSON.stringify([]))
    }
  
    setTimeout(() => {
        resolve(JSON.parse(localStorage.categories));
    }, 250)
  })
}

export const addCategory = (catObj) => {
  return new Promise((resolve, reject) => {
    let cats = JSON.parse(localStorage.categories)
    const lastItem = (
      cats.length > 0 ? cats[cats.length - 1] : {id: 0, categoryName: null }
    )

    const getId = (Number(lastItem.id) + 1)
    const newCategory = {
      id: getId,
      ...catObj
    }
    cats.push(newCategory)
    localStorage.categories = JSON.stringify(cats)

    setTimeout(() => {
        resolve({ msg: `${newCategory.categoryName} successfully added!` });
    }, 250)
  })
}

export const removeCategory = (categoryId) => {
  let categories = JSON.parse(localStorage.categories)
  localStorage.categories = JSON.stringify((
    categories.filter(category => category.id !== categoryId)
  ))
}

export const editCategory = (categoryId, newFieldName) => {
  let categories = JSON.parse(localStorage.categories)
  localStorage.categories = JSON.stringify((
    categories.map((category) => {
      if (category.id === categoryId) {
        return ({
          ...category,
          categoryName: newFieldName
        }) 
      } else {
        return category
      }
    })
  ))
}


