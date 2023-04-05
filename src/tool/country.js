
const countryMap = new Map().set('United States', 'USA')

export const countryPath = (country) => {
  if (countryMap.has(country)) {
    return countryMap.get(country)
  }
}
