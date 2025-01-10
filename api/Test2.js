import axios from "axios";

async function codeforcesContestHistory(handle){
    const apiUrl = `https://codeforces.com/api/user.rating?handle=${handle}`;
    try {
      const response = await axios.get(apiUrl);
      const data = response.data;
  
      if (data.status !== "OK") {
          console.log("Codeforces1 error ");
          return;
      }
    //   console.log(data.result);

    const ratingData = data.result.map(item => ({
        contestId: item.contestId,
        rating: Math.round(item.newRating), // Convert rating to integer
        rank: item.rank,
        date: new Date(item.date * 1000).toLocaleDateString() // Convert date from Unix timestamp
      }));

    console.log(ratingData);
    
      
    }catch (error) {
      console.log("CF 1 error");
      console.log(error);
      return;
  }
  }
const h = "tourist";

async function codeforcesUserData(handle) {
  
  const apiUrl = `https://codeforces.com/api/user.info?handles=${handle}`;
  try {
      const response = await axios.get(apiUrl);
      const data = response.data;

      if (data.status !== "OK") {
          console.log(data.comment);
          return;
      }
      console.log(data.result[0].rating);
      
      
      return data.result;
  } catch (error) {
      console.log("CF 3");      
      return;
  }
}
  codeforcesUserData(h);