export function getApiImageUrl(filename, subfolder = '/products') {
  return `http://localhost:3000/img${subfolder}/${filename}`;
}
