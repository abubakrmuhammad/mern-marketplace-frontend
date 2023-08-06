function isApiSuccessful(response) {
  return response.status.toString().startsWith('2');
}

export default isApiSuccessful;
