# distance-from-x

This is a simple SPA for calculating the distance between two geograpich points (Point A and Point B) in a straight line.
This can be achieved in three ways:

- by directly typing the coordinates into the fields for both points
- searching for a place using the search fields
- using the browser's geolocation

Once the coordinates are in place the user can then calculate the distance. If any errors (validation, Google API) occur, the user is also notified.

# Storybook

https://666fe71a68e95a40107cd295-ktfgulgoar.chromatic.com/

# TODOs

- [x] Refactor state -> `useReducer()`
- [x] Update search input with geocoding from browser's coords
- [ ] Add Playwright e2e tests
- [ ] Autocomplete keyboard support
- [ ] Copy coordinates to clipboard
- [ ] Review ESLint/Prettier rules
  - [ ] console.log
  - [ ] line columns size
