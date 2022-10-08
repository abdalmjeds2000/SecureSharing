import axios from "axios"

export default async function GetStatistics(token, id) {

  try {
    let request = await axios(
      {
        method: 'GET',
        url: `https://salicapi.com/sharing/api/sharing/statistics/${id}`,
        headers: {
          "authorization": "Bearer " + token
        }
      }
    )
    let response = request;
    return response

  } catch(err) {
    console.log("ERROR : Get Statistics : ", err.response)
    return(err.response)
  }
}