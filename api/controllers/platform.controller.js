import { errorHandler } from "../utils/error.js";
import fetch from "node-fetch";
import {load} from 'cheerio';
import axios from "axios";

const LEETCODE_GRAPHQL = "https://leetcode.com/graphql";

const  leetcodeData = async (req) => {
  try {
    if(!req.user.leetcode){
        console.log("Leetcode url not found");
        return;
    }
    const username = req.user.leetcode.split("/").filter(Boolean).pop();
    const s = {
        "query": "query getUserProfile($username: String!) { matchedUser(username: $username) { username profile { realName aboutMe countryName reputation ranking company school websites skillTags } submitStats { acSubmissionNum { difficulty count submissions } totalSubmissionNum { difficulty count submissions } }  userCalendar { streak totalActiveDays  } contestBadge { displayName } } }",
        "variables": {
          "username": username
        }
      }
    
    const response = await fetch(LEETCODE_GRAPHQL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(s),
    });
    if(response.ok){
        const data = await response.json();
        return data;
    }
    else{
        return;
    }
    
  } catch (error) {
    console.log("Leetcode error");
    // console.log(error);
    return;
  }
};


async function codeforcesTotal(req) {
    if (!req.user.codeforces) {
        console.log("Codeforces 1 url not found");
        return;
    }

    const handle = req.user.codeforces.split("/").filter(Boolean).pop();
    const apiUrl = `https://codeforces.com/api/user.status?handle=${handle}`;
    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.status !== "OK") {
            // console.log(data.comment);
            console.log("Codeforces1 error ");
            return;
        }

        const submissions = data.result;

        const solvedProblems = new Set();
        const tagCount = {};
        const contestsAttended = new Set();

        const activeDays = new Set();
        
        let easy = 0, medium = 0, hard = 0;
        function categorizeProblem(problem) {
            const points = problem.points || 0;

            if (points < 1000) return "easy";
            if (points < 1500) return "medium";
            return "hard";
        }

        submissions.forEach((submission) => {
            if (submission.verdict === "OK") {
                const problem = submission.problem;
                const problemKey = `${problem.contestId}${problem.index}`;

                if (!solvedProblems.has(problemKey)) {
                    const category = categorizeProblem(problem);

                // Increment the respective counter
                    if (category === "easy") easy++;
                    else if (category === "medium") medium++;
                    else  hard++;
                }
                
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

            const date = new Date(submission.creationTimeSeconds * 1000);
            const formattedDate = date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
            activeDays.add(formattedDate);
        });
        const totalSolved = easy + medium + hard;
    
        const tagsArray = Object.entries(tagCount).map(([topic, count]) => ({ topic, count }));

        const result = {
            totalSolved: solvedProblems.size,
            contestsAttended: contestsAttended.size,
            tags: tagsArray,
            totalActiveDays: activeDays.size,
            easy,medium,hard,totalSolved
        };

        return result;
    } catch (error) {
        console.log("CF 1 error");
        // console.log(error);
        return;
    }
}

async function codeforcesData(req) {
    if(!req.user.codeforces){
        console.log("Codeforces 2 url not found");
        return;
    }
    const handle = req.user.codeforces.split("/").filter(Boolean).pop();
    const apiUrl = `https://codeforces.com/api/user.status?handle=${handle}`;
    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.status !== "OK") {
            console.log(data/comment);
            return;
        }
        
        const submissions = data.result;
        const solvedProblems = new Set();

        submissions.forEach((submission) => {
            if (submission.verdict === "OK") {
                const problem = submission.problem;
                const problemKey = `${problem.contestId}${problem.index}`;
                solvedProblems.add(problemKey);
            }
        });
        return solvedProblems.size;
    } catch (error) {
        console.log("CF 2");
        // console.log(error);        
        return;
    }
}

const codechefData = async (req) => {
    if(!req.user.codeforces){
        console.log("Codechef url not found");
        return;
    }
    const username = req.user.codeforces.split("/").filter(Boolean).pop();
    try {
      const url = `https://www.codechef.com/users/${username}`;
      const { data } = await axios.get(url);
      const $ = load(data);
      
      
      const contestRating = $('.rating-number').eq(0).text().match(/\d+/); 
      const problemsSolved = $('.problems-solved h3').filter((i, el) => $(el).text().includes('Total Problems Solved')).text().match(/\d+/); 
      
      const numberOfContestAttendedText = $('.contest-participated-count').text();
      const numberOfContestAttended = numberOfContestAttendedText.match(/\d+/);
            
      const result={
        problemsSolved:problemsSolved!=null?problemsSolved[0]:0,
        contestRating:contestRating!=null?contestRating[0]:0,
        numberOfContestAttended:numberOfContestAttended!=null?numberOfContestAttended[0]:0
      }

    return result;
    } catch (error) {
    // console.log(error);
    console.log("Codechef error");
    return;
    }
};

const geekforgeeksData = async (req) => {
    console.log(req.user.geekforgeeks);
    
    if(!req.user.geekforgeeks){
        console.log("Geekforgeeks url not found");
        return;
    }
    
    try {
      const url = `${req.user.geekforgeeks}`;
      const { data } = await axios.get(url);
      const $ = load(data);
      
      
      const problemsSolved = $('.scoreCard_head_left--score__oSi_x').eq(1).text().match(/\d+/); 
      const codingScore = $('.scoreCard_head_left--score__oSi_x').eq(0).text().match(/\d+/); 
      const contestRating = $('.scoreCard_head_left--score__oSi_x').eq(2).text().match(/\d+/);  
      
      const result={
        codingScore:codingScore!=null? codingScore[0]:0,
        problemsSolved:problemsSolved!=null?problemsSolved[0]:0,
        contestRating:contestRating!=null?contestRating[0]:0,
      }

    return result;

    } catch (error) {
    // console.log(error);
    console.log("GFG error");
    
    return;
    }
  };

  const getAllData = async (req, res, next) => {
    try {
      let allData = {};
      console.log(req.user);
      
  
      const leetcodeResult = await leetcodeData(req);
      allData.leetcode = leetcodeResult;
  
      const codeforcesResult = await codeforcesData(req);
      allData.codeforces = codeforcesResult;
  
      const codeforcesTotalResult = await codeforcesTotal(req);
      allData.codeforcesTotal = codeforcesTotalResult;
  
      const codechefResult = await codechefData(req);
      allData.codechef = codechefResult;
  
      const geekforgeeksResult = await geekforgeeksData(req);
      allData.geekforgeeks = geekforgeeksResult;
  
    //   console.log(allData);
    //   console.log(allData.leetcode);

    const data = {
        totalQuestions:0,
        totalContests:0,
        totalActiveDays:0,
        easy:0,
        medium:0,
        hard:0,
        topics:[]
    }
    
    //sum all
    // Leetcode Data Aggregation
    if (allData.leetcode && allData.leetcode.data) {
      const leetcodeData = allData.leetcode.data.matchedUser.submitStats.acSubmissionNum;
      data.totalQuestions += leetcodeData.find((stat) => stat.difficulty === "All")?.count || 0;
      data.easy += leetcodeData.find((stat) => stat.difficulty === "Easy")?.count || 0;
      data.medium += leetcodeData.find((stat) => stat.difficulty === "Medium")?.count || 0;
      data.hard += leetcodeData.find((stat) => stat.difficulty === "Hard")?.count || 0;
      data.totalActiveDays += allData.leetcode.data.matchedUser.userCalendar.totalActiveDays;
    }

    // Codeforces Data Aggregation
    if (allData.codeforcesTotal) {
      data.totalQuestions += allData.codeforcesTotal.totalSolved;
      data.totalContests += allData.codeforcesTotal.contestsAttended;
      data.easy += allData.codeforcesTotal.easy;
      data.medium += allData.codeforcesTotal.medium;
      data.hard += allData.codeforcesTotal.hard;
      data.totalActiveDays += allData.codeforcesTotal.totalActiveDays;

      // Aggregating tags/topics
      allData.codeforcesTotal.tags.forEach((tag) => {
        data.topics.push({ topic: tag.topic, count: tag.count });
      });
    }

    // Codechef Data Aggregation
    if (allData.codechef) {
      data.totalQuestions += parseInt(allData.codechef.problemsSolved) || 0;
      data.totalContests += parseInt(allData.codechef.numberOfContestAttended) || 0;
    }

    // GeekforGeeks Data Aggregation
    if (allData.geekforgeeks) {
      data.totalQuestions += parseInt(allData.geekforgeeks.problemsSolved) || 0;
    }

    console.log(data);
    
      
      res.status(200).json(data);
      
  
    } catch (error) {
      return next(error);
    }
  };


  export { leetcodeData, codeforcesData, codeforcesTotal, codechefData, geekforgeeksData ,getAllData};