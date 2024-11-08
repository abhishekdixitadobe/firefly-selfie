// src/utils/sharepointAPI.js
import axios from 'axios';

const baseURL = 'https://<your-sharepoint-site-url>/sites/<your-site>/';
//${baseURL}${apiEndpoint}
//const apiEndpoint = '_api/web/lists/getbytitle(\'Profiles\')/items'; // Adjust this to your list's endpoint
const apiEndpoint = 'https://adobe.sharepoint.com/sites/AcrobatSignPS/Shared%20Documents/Forms/AllItems.aspx?id=%2Fsites%2FAcrobatSignPS%2FShared%20Documents%2FFirefly%20Selfie%20Studio&viewid=0b0593d6%2D0925%2D4e52%2Db04b%2D3cc8fd094d22';

export const fetchProfileImages = async () => {
  try {
    const response = await axios.get(`${apiEndpoint}`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    return response.data.value;
  } catch (error) {
    console.error('Error fetching profile images:', error);
    return [];
  }
};
