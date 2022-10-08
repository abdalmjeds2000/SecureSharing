import axios from "axios"

export default async function Auth() {

  const ItemDetails = JSON.parse(localStorage.getItem("SelectedRowDetails"));

  try {
    let request = await axios(
      {
        method: 'POST',
        url: 'https://salicapi.com/sharing/auth',
        data: `grant_type=password&username=${ItemDetails.UserEmail}&password=******&PrincipalId=39`
      }
    )
    let response = request;
    return response

  } catch(err) {
    console.log("AUTH Response : ", err.response)
    return(err.response)
  }
}