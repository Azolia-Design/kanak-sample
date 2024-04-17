import { createClient } from '@prismicio/client'

const repositoryName = 'kanak-sample'
const accessToken = 'MC5aY25QeVJBQUFDSUF2a3Ez.77-9OGBebe-_ve-_vVp277-9Ze-_ve-_vSfvv73vv711eEAB77-9eQpq77-977-9Vu-_vQDvv71s77-9'
const routes = [
  // Update to match your website's URL structure
  // { type: 'page', path: '/:uid' },
  { type: 'home', path: '/' },
]
const client = createClient(repositoryName)

export function getPage(slug) {
  let data = client.getSingle(slug);

  if (!data) return;
  return data;
}
export function getByUID(customType, uid) {
  let data = client.getByUID(customType, uid);

  if (!data) return;
  return data;
}
export function getAllByType(customType) {
  let data = client.getAllByType(customType);

  if (!data) return;
  return data;
}

export const htmlSerializer = {
  highlight: ({ children }) => `<span class="txt-green">${children}</span>`
}

