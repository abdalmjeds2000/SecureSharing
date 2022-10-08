import axios from "axios"

export default async function NewShare(token, data) {

  try {
    let request = await axios(
      {
        method: 'POST',
        url: "https://salicapi.com/sharing/api/sharing/NewShare",
        headers: {
          "authorization": "Bearer " + token
        },
        data: data
      }
    )
    let response = request;
    return response

  } catch(err) {
    console.log("ERROR : GET Shared By : ", err.response)
    return(err.response)
  }
}