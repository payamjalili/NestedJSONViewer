export default function getJSON() {
  return fetch('data.json', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })

    .catch((error) => {
      console.error(error);
    });
}
