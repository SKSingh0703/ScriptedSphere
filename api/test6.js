async function postContestStats(username) {
  const url = "https://leetcode.com/graphql"; // Replace with actual GraphQL endpoint
  const query = `
    query userContestRankingInfo($username: String!) {
  userContestRanking(username: $username) {
    attendedContestsCount
    rating
    globalRanking
    totalParticipants
    topPercentage
    badge {
      name
    }
  }
  userContestRankingHistory(username: $username) {
    attended
    trendDirection
    problemsSolved
    totalProblems
    finishTimeInSeconds
    rating
    ranking
    contest {
      title
      startTime
    }
  }
}
  `;

  const variables = {
    username: username
  };

  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_ACCESS_TOKEN", // If authentication is needed
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        query: query,
        variables: variables
      })
    });

    const data = await response.json();
    console.log(data);
    

    if (response.ok) {
      const totalContests = data.data.userContestRanking.attendedContestsCount;
      return totalContests;
      
    } else {
      console.error("Error:", data.errors);
      return null;
    }
  } catch (error) {
    console.error("Request failed:", error);
  }
}
const h = "SKSingh0703";
postContestStats(h);