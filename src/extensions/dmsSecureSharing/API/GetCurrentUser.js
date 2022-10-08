import axios from "axios";

export default async function GetCurrentUser(email) {
  try {
    let request = await axios(
      {
        method: 'GET',
        url: `https://salicapi.com/api/User/GetUserByEmail?Expand=manager&Email=${email}`,
      }
    )
    let response = request;
    return response

  } catch(err) {
    console.log(err.response)
    return(err.response)
  }
}