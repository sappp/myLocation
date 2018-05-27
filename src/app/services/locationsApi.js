export const getLocations = () => {
  return new Promise((resolve, reject) => {
    // initial locations
    if (!localStorage.locations) {
      localStorage.setItem("locations", JSON.stringify([]))
    } else {
      addCategoryObjectToLocation()
    }
    setTimeout(() => {
        resolve(JSON.parse(localStorage.locations));
    }, 250)
  })
}

export const addLocation = (locObj) => {
  return new Promise((resolve, reject) => {
    let locations = JSON.parse(localStorage.locations)

    const lastItem = (
      locations.length > 0 ? locations[locations.length - 1] : {id: -1}
    )

    const getId = (Number(lastItem.id) + 1)

    locations.push({
      id: getId,
      ...locObj
    })
    localStorage.locations = JSON.stringify(locations)
    assignLocationToCategory(locObj.category.id)
    setTimeout(() => {
      resolve(JSON.parse(localStorage.locations));
    }, 250)
  }) 
}

export const removeLocation = (locId) => {
  let locations = JSON.parse(localStorage.locations)
  const locationCategory = (
    locations.filter(loc => Number(loc.id) === Number(locId))[0].category
  )
  localStorage.locations = JSON.stringify((
    locations.filter(loc => loc.id !== locId)
  ))
  removeLocationFromCategory(locationCategory.id)
}

export const editLocation = (newLocObj) => {
  return new Promise((resolve, reject) => {
    const locations = JSON.parse(localStorage.locations)

    localStorage.locations = JSON.stringify((
      locations.map((loc) => {
        if (Number(loc.id) === Number(newLocObj.id)) {
          return ({
            ...newLocObj
          })
        } else {
          return loc
        }
      })
    ))

    const currentLocationCategory = (
      locations.filter(loc => Number(loc.id) === Number(newLocObj.id))[0].category
    )

    const newLocationCategory = newLocObj.category

    if (Number(currentLocationCategory.id) !== Number(newLocationCategory.id)) {
      assignLocationToCategory(newLocationCategory.id)
      removeLocationFromCategory(currentLocationCategory.id)
    }

    setTimeout(() => {
      resolve(JSON.parse(localStorage.locations));
    }, 250)
  })
  
}

const addCategoryObjectToLocation = () => {
  if (localStorage.categories && localStorage.locations) {
    const categories = JSON.parse(localStorage.categories)
    const locations = JSON.parse(localStorage.locations)

    localStorage.locations = JSON.stringify(
      locations.map(loc => {
        const thisCat = categories.filter(cat => Number(cat.id) === Number(loc.category.id))[0];
        loc.category.name = thisCat.categoryName
        return loc
      })
    )
  }
}



const assignLocationToCategory = (categoryId) => {
  if (localStorage.categories && localStorage.locations) {
    const categories = JSON.parse(localStorage.categories)
    localStorage.categories = JSON.stringify(
      categories.map(cat => {
        if (Number(cat.id) === Number(categoryId)) {
          cat.total += 1
        }
        return cat
      })
    )
  }
}

const removeLocationFromCategory = (categoryId) => {
  if (localStorage.categories && localStorage.locations) {
    const categories = JSON.parse(localStorage.categories)

    localStorage.categories = JSON.stringify(
      categories.map(cat => {
        if (Number(cat.id) === Number(categoryId)) {
          cat.total -= 1
        }
        return cat
      })
    )
  }
}



