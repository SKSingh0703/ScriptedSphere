// async function postContestStats(username) {
//   const url = "https://leetcode.com/graphql"; // Replace with actual GraphQL endpoint
//   const query = `
//     query userContestRankingInfo($username: String!) {
//   userContestRanking(username: $username) {
//     attendedContestsCount
//     rating
//     globalRanking
//     totalParticipants
//     topPercentage
//     badge {
//       name
//     }
//   }
//   userContestRankingHistory(username: $username) {
//     attended
//     trendDirection
//     problemsSolved
//     totalProblems
//     finishTimeInSeconds
//     rating
//     ranking
//     contest {
//       title
//       startTime
//     }
//   }
// }
//   `;

//   const variables = {
//     username: username
//   };

//   const headers = {
//     "Content-Type": "application/json",
//     "Authorization": "Bearer YOUR_ACCESS_TOKEN", // If authentication is needed
//   };

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: headers,
//       body: JSON.stringify({
//         query: query,
//         variables: variables
//       })
//     });

//     const data = await response.json();
//     console.log(data);
    

//     if (response.ok) {
//       const totalContests = data.data.userContestRanking.attendedContestsCount;
//       return totalContests;
      
//     } else {
//       console.error("Error:", data.errors);
//       return null;
//     }
//   } catch (error) {
//     console.error("Request failed:", error);
//   }
// }
// const h = "SKSingh0703";
// postContestStats(h);

const h = "tourist";
fetchRatingData(h);

const fetchRatingData = async (userHandle) => {
  try {
    // Fetching the rating data from the Codeforces API
    const res = await fetch(`https://codeforces.com/api/user.rating?handle=${userHandle}`);
    
    // Checking if the response is successful
    if (!res.ok) {
      throw new Error('Failed to fetch data from API');
    }

    // Parsing the response as JSON
    const data = await res.json();

    console.log(data);
    
    
    // Checking if the API response status is OK
    if (data.status === "OK") {
      // Successfully fetched rating data, now processing it
      const ratingData = data.result.map(item => ({
        contestId: item.contestId,
        rating: Math.round(item.newRating), // Convert rating to integer
        rank: item.rank,
        date: new Date(item.date * 1000).toLocaleDateString() // Convert date from Unix timestamp
      }));

      // Set the rating data (assuming you have a state like setRatingData)
      // setRatingData(ratingData);

      console.log(ratingData);
      
    } else {
      throw new Error('Failed to fetch rating data');
    }
  } catch (error) {
    // Handling any errors that occur during the fetch process
    console.error('Error fetching rating data:', error.message);
    // setError(error.message);  // Set an error state to display on the UI
  }
};
