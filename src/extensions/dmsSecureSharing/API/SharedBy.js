import axios from "axios"

export default async function SharedBy(token) {
  const ItemDetails = JSON.parse(localStorage.getItem("SelectedRowDetails"));

  try {
    let request = await axios(
      {
        method: 'GET',
        url: `https://salicapi.com/sharing/api/sharing/sharedby?id=${ItemDetails.UniqueId}`,
        headers: {
          "authorization": "Bearer " + token
        }
      }
    )
    let response = request;
    return response

  } catch(err) {
    console.log("ERROR : GET Shared By : ", err.response)
    return(err.response)
  }
}