import axios from 'axios';
// import {load} from 'cheerio';

// const getProblemsSolvedCodechef = async (username) => {
//     try {
//       const url = `https://www.codechef.com/users/${username}`;
//       const { data } = await axios.get(url);
//       const $ = load(data);
      
      
//       const contestRating = $('.rating-number').eq(0).text().match(/\d+/); 
//       const problemsSolved = $('.problems-solved h3').filter((i, el) => $(el).text().includes('Total Problems Solved')).text().match(/\d+/); 
      
//       const numberOfContestAttendedText = $('.contest-participated-count').text();
//       const numberOfContestAttended = numberOfContestAttendedText.match(/\d+/);
            
//       const result={
//         problemsSolved:problemsSolved[0],
//         contestRating:contestRating[0],
//         numberOfContestAttended:numberOfContestAttended[0]
//       }
//       console.log(result);
      
  
//       if (problemsSolved) {
//         console.log(`${username} has solved: ${problemsSolved[0]} problems`);
//       } else {
//         console.log(`${username} has no problem solved count found.`);
//       }
//     } catch (error) {
//       console.error('Error fetching data from GeeksforGeeks:', error);
//     }
//   };
// const axios = require('axios');

const handle = "SKSingh0703";
getLeetcodeContests(handle);

async function getLeetcodeContests(handle) {
  const apiUrl = `https://leetcode.com/graphql/`;

  const query = {
    query: `
       query {
      userContestHistory(username: "SKSingh0703") {
        contestId
        name
        startTime
      }
    }
    `,
    variables: {
      username: handle
    }
  };

  try {
    const response = await axios.post(apiUrl, query);
    const contests = response.data.data.userContestHistory;
    console.log(contests);
    
    return contests.length; // return the total number of contests attended
  } catch (error) {
    console.error("Error fetching contests data",error);
    return null;
  }
}


  // getProblemsSolvedGFG('sksingh0703');