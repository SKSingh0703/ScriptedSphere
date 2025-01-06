import axios from 'axios';
import {load} from 'cheerio';

// const getProblemsSolvedGFG = async (username) => {
//     try {
//       const url = `https://auth.geeksforgeeks.org/user/${username}`;
//       const { data } = await axios.get(url);
//       const $ = load(data);
      
      
//       const problemsSolved = $('.scoreCard_head_left--score__oSi_x').eq(1).text().match(/\d+/); 
//       const codingScore = $('.scoreCard_head_left--score__oSi_x').eq(0).text().match(/\d+/); 
//       const contestRating = $('.scoreCard_head_left--score__oSi_x').eq(2).text().match(/\d+/);  
      
//       const result={
//         codingScore:codingScore[0],
//         problemsSolved:problemsSolved[0],
//         contestRating:contestRating[0],
//       }
      
  
//       if (problemsSolved) {
//         console.log(`${username} has solved: ${problemsSolved[0]} problems`);
//       } else {
//         console.log(`${username} has no problem solved count found.`);
//       }
//     } catch (error) {
//       console.error('Error fetching data from GeeksforGeeks:', error);
//     }
//   };
const username = "SKSingh0703";
const geekforgeeksData = async (username) => {
  // console.log(req.user.geekforgeeks);
  
  // if(!req.user.geekforgeeks){
  //     console.log("Geekforgeeks url not found");
  //     return;
  // }
  // const username = req.user.codeforces.split("/").filter(Boolean).pop();
  // console.log(username);
  
  try {
    const url = `https://www.geeksforgeeks.org/user/sachinkumarc4bc/`;
    const { data } = await axios.get(url);
    const $ = load(data);
    
    
    const problemsSolved = $('.scoreCard_head_left--score__oSi_x ').eq(1).text().match(/\d+/); 
    const codingScore = $('.scoreCard_head_left--score__oSi_x').eq(0).text().match(/\d+/); 
    const contestRating = $('.scoreCard_head_left--score__oSi_x').eq(2).text().match(/\d+/);  
    
    const result={
      codingScore:codingScore!=null? codingScore[0]:0,
      problemsSolved:problemsSolved!=null?problemsSolved[0]:0,
      contestRating:contestRating!=null?contestRating[0]:0,
    }
    console.log(result);
    
  return result;


  } catch (error) {
  console.log(error);
  console.log("GFG error");
  
  return;
  }
};
// geekforgeeksData(username);

  // getProblemsSolvedGFG('ajaysinghdeopa');
  const handle = "tourist";
  codeforcesTotal(handle);

  async function codeforcesTotal(handle) {
    // if (!req.user.codeforces) {
    //     console.log("Codeforces 1 url not found");
    //     return;
    // }

    // const handle = req.user.codeforces.split("/").filter(Boolean).pop();
    const apiUrl = `https://codeforces.com/api/user.status?handle=${handle}`;
    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.status !== "OK") {
            // console.log(data.comment);
            console.log("Codeforces1 error ");
            return;
        }
        // console.log(data);
        

        const submissions = data.result;

        const solvedProblems = new Set();
        const tagCount = {};
        const contestsAttended = new Set();

        submissions.forEach((submission) => {
            if (submission.verdict === "OK") {
                const problem = submission.problem;
                const problemKey = `${problem.contestId}${problem.index}`;
                
                // Add the solved problem to the set
                solvedProblems.add(problemKey);

                // Aggregate tags
                if (problem.tags && Array.isArray(problem.tags)) {
                    problem.tags.forEach((tag) => {
                        tagCount[tag] = (tagCount[tag] || 0) + 1;
                    });
                }

                // Track contests
                if (submission.contestId) {
                    contestsAttended.add(submission.contestId);
                }
            }
        });
    
        const tagsArray = Object.entries(tagCount).map(([topic, count]) => ({ topic, count }));

        const result = {
            totalSolved: solvedProblems.size,
            contestsAttended: contestsAttended.size,
            tags: tagsArray,
        };
        console.log(result);
        

        return result;
    } catch (error) {
        console.log("CF 1 error");
        // console.log(error);
        return;
    }
}