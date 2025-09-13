import { errorHandler } from "../utils/error.js";
import fetch from "node-fetch";
import {load} from 'cheerio';
import axios from "axios";
import User from "../models/user.model.js";

const LEETCODE_GRAPHQL = "https://leetcode.com/graphql";

const  leetcodeData = async (req) => {
  try {
    if(!req.user.leetcode){
        console.log("Leetcode url not found");
        return null;
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
        const topics =await postSkillStats(username);
        const totalContest = await postContestStats(username);
        data.topics = topics || [];
        data.totalContests = totalContest.totalContests || 0;
        data.rankingHistory = totalContest.rankingHistory || [];
        data.contestRating = totalContest.contestRating || 0;
        return data;
    }
    else{
        return null;
    }
    
  } catch (error) {
    console.log("Leetcode error");
    // console.log(error);
    return null;
  }
};

async function postSkillStats(username) {
  const url = "https://leetcode.com/graphql";
  const query = `
    query skillStats($username: String!) {
      matchedUser(username: $username) {
        tagProblemCounts {
          advanced {
            tagName
            tagSlug
            problemsSolved
          }
          intermediate {
            tagName
            tagSlug
            problemsSolved
          }
          fundamental {
            tagName
            tagSlug
            problemsSolved
          }
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

    if (response.ok && data?.data?.matchedUser?.tagProblemCounts) {

      // Extract advanced, intermediate, and fundamental topics
      const advancedTopics = data.data.matchedUser.tagProblemCounts.advanced || [];
      const intermediateTopics = data.data.matchedUser.tagProblemCounts.intermediate || [];
      const fundamentalTopics = data.data.matchedUser.tagProblemCounts.fundamental || [];

      // Combine all topics into a single array
      const allTopics = [
        ...advancedTopics,
        ...intermediateTopics,
        ...fundamentalTopics
      ];

      // Map them to the desired format
      const topics = allTopics.map(topic => ({
        topic: topic.tagName,
        count: topic.problemsSolved
      }));

      return topics;
      
    } else {
      console.error("Error:", data.errors);
      return null;
    }
  } catch (error) {
    console.error("Request failed:", error);
    return null;
  }
}

async function postContestStats(username) {
  const url = "https://leetcode.com/graphql";
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
    if (response.ok && data.data && data.data.userContestRanking) {
    const rating = Math.floor(data.data.userContestRanking.rating);
      const da = {
        contestRating:rating,
        totalContests : data.data.userContestRanking.attendedContestsCount,
        rankingHistory : data.data.userContestRankingHistory || []
      };
      return da;
      
    } else {
      console.error("Error:", data.errors);
      return null;
    }
  } catch (error) {
    console.error("Request failed:", error);
    return null;
  }
}
async function codeforcesContestHistory(handle){
  
  const apiUrl = `https://codeforces.com/api/user.rating?handle=${handle}`;
  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data.status !== "OK") {
        console.log("Codeforces1 error ");
        return null;
    }
    // console.log(data.result);

    const ratingData = data.result.map(item => ({
      contestId: item.contestId,
      rating: Math.round(item.newRating), // Convert rating to integer
      rank: item.rank,
      date: new Date(item.date * 1000).toLocaleDateString() // Convert date from Unix timestamp
    }));

    return ratingData;

    
  }catch (error) {
    console.log("CF 1 error");
    return null;
}
}

async function codeforcesTotal(req) {
    if (!req.user.codeforces) {
        console.log("Codeforces 1 url not found");
        return null;
    }
    

    const handle = req.user.codeforces.split("/").filter(Boolean).pop();
    const apiUrl = `https://codeforces.com/api/user.status?handle=${handle}`;
    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.status !== "OK") {
            // console.log(data.comment);
            console.log("Codeforces1 error ");
            return null;
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
        const history =await codeforcesContestHistory(handle);
        const rating = await codeforcesUserData(handle);
        const result = {
            totalSolved: solvedProblems.size,
            contestsAttended: contestsAttended.size,
            tags: tagsArray,
            totalActiveDays: activeDays.size,
            easy,medium,hard,totalSolved,
            contestRating:rating,
            rankingHistory:history
        };

        return result;
    } catch (error) {
        console.log("CF 1 error");
        // console.log(error);
        return null;
    }
}

async function codeforcesData(req) {
    if(!req.user.codeforces){
        console.log("Codeforces 2 url not found");
        return null;
    }
    const handle = req.user.codeforces.split("/").filter(Boolean).pop();
    const apiUrl = `https://codeforces.com/api/user.status?handle=${handle}`;
    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.status !== "OK") {
            console.log(data.comment);
            return null;
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
        return null;
    }
}

async function codeforcesUserData(handle) {
  
  const apiUrl = `https://codeforces.com/api/user.info?handles=${handle}`;
  try {
      const response = await axios.get(apiUrl);
      const data = response.data;

      if (data.status !== "OK") {
          console.log(data.comment);
          return null;
      }
      
      return data.result[0].rating;
  } catch (error) {
      console.log("CF 3");      
      return null;
  }
}

const codechefData = async (req) => {
    console.log("🔍 CodeChef function called!");
    const callId = Math.random().toString(36).substr(2, 9);
    console.log(`🔍 CodeChef Debug [${callId}] - User object:`, JSON.stringify(req.user, null, 2));
    console.log(`🔍 CodeChef Debug [${callId}] - Codechef URL:`, req.user.codechef);
    
    if(!req.user.codechef){
        console.log("Codechef url not found");
        return null;
    }
    
    const username = req.user.codechef.split("/").filter(Boolean).pop();
    console.log(`🔍 CodeChef Debug [${callId}] - Username:`, username);
    console.log(`🔍 CodeChef Debug [${callId}] - URL:`, req.user.codechef);
    
    try {
      // Construct full URL if only username is provided
      let url = req.user.codechef;
      if (!url.startsWith('http')) {
        url = `https://www.codechef.com/users/${username}`;
        console.log(`🔍 CodeChef Debug [${callId}] - Constructed URL:`, url);
      }
      console.log(`🔍 CodeChef Debug [${callId}] - Fetching URL:`, url);
      
      const { data } = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
        }
      });
      
      console.log(`🔍 CodeChef Debug [${callId}] - Response received, length:`, data.length);
      const $ = load(data);
      
      // Extract current rating
      const contestRating = $('.rating-number').first().text().trim();
      console.log("🔍 CodeChef Debug - Raw rating text:", contestRating);
      const ratingMatch = contestRating.match(/\d+/);
      const currentRating = ratingMatch ? parseInt(ratingMatch[0]) : 0;
      console.log("🔍 CodeChef Debug - Parsed rating:", currentRating);
      
      // Extract highest rating
      const highestRatingText = $('.rating-header small').text();
      console.log("🔍 CodeChef Debug - Raw highest rating text:", highestRatingText);
      const highestRatingMatch = highestRatingText.match(/Highest Rating (\d+)/);
      const highestRating = highestRatingMatch ? parseInt(highestRatingMatch[1]) : currentRating;
      console.log("🔍 CodeChef Debug - Parsed highest rating:", highestRating);
      
      // Extract problems solved from the problems solved section
      const problemsSolvedText = $('.problems-solved h3').filter((i, el) => 
        $(el).text().includes('Total Problems Solved')
      ).text();
      console.log("🔍 CodeChef Debug - Raw problems solved text:", problemsSolvedText);
      const problemsSolvedMatch = problemsSolvedText.match(/(\d+)/);
      const problemsSolved = problemsSolvedMatch ? parseInt(problemsSolvedMatch[1]) : 0;
      console.log("🔍 CodeChef Debug - Parsed problems solved:", problemsSolved);
      
      // Extract contest participation count
      const contestSection = $('.problems-solved h3').filter((i, el) => 
        $(el).text().includes('Contests')
      ).text();
      console.log("🔍 CodeChef Debug - Raw contest text:", contestSection);
      const contestMatch = contestSection.match(/(\d+)/);
      const contestsAttended = contestMatch ? parseInt(contestMatch[1]) : 0;
      console.log("🔍 CodeChef Debug - Parsed contests attended:", contestsAttended);
      
      // Extract division information
      const divisionText = $('.rating-header div').eq(1).text().trim();
      const division = divisionText.replace(/[()]/g, '').trim();
      
      // Extract country rank if available
      const countryRankText = $('.rating-header a[href*="Country"]').parent().text();
      const countryRankMatch = countryRankText.match(/(\d+)/);
      const countryRank = countryRankMatch ? parseInt(countryRankMatch[1]) : null;
      
      // Extract global rank if available
      const globalRankText = $('.global-rank').first().text().trim();
      const globalRank = globalRankText ? parseInt(globalRankText) : null;
      
      // Try to extract rating history from JavaScript data
      let ratingHistory = [];
      try {
        const scriptContent = $('script').text();
        const ratingDataMatch = scriptContent.match(/var all_rating = (\[.*?\]);/);
        if (ratingDataMatch) {
          const ratingData = JSON.parse(ratingDataMatch[1]);
          ratingHistory = ratingData.map(contest => ({
            contest: contest.name,
            rating: parseInt(contest.rating),
            rank: parseInt(contest.rank),
            date: contest.end_date,
            color: contest.color
          }));
        }
      } catch (e) {
        console.log("Could not parse rating history");
      }
      
      // Calculate difficulty breakdown (estimate based on rating)
      let easy = 0, medium = 0, hard = 0;
      if (problemsSolved > 0) {
        // Rough estimation based on rating level
        if (currentRating < 1200) {
          easy = Math.floor(problemsSolved * 0.6);
          medium = Math.floor(problemsSolved * 0.4);
        } else if (currentRating < 1600) {
          easy = Math.floor(problemsSolved * 0.3);
          medium = Math.floor(problemsSolved * 0.5);
          hard = Math.floor(problemsSolved * 0.2);
        } else {
          easy = Math.floor(problemsSolved * 0.2);
          medium = Math.floor(problemsSolved * 0.4);
          hard = Math.floor(problemsSolved * 0.4);
        }
      }
      
      const result = {
        problemsSolved: problemsSolved,
        contestRating: currentRating,
        highestRating: highestRating,
        numberOfContestAttended: contestsAttended,
        division: division,
        countryRank: countryRank,
        globalRank: globalRank,
        ratingHistory: ratingHistory,
        easy: easy,
        medium: medium,
        hard: hard,
        totalActiveDays: Math.max(contestsAttended, Math.floor(problemsSolved / 3)) // Estimate
      };
      
      console.log(`🔍 CodeChef Debug [${callId}] - Final result:`, JSON.stringify(result, null, 2));
      return result;
      
    } catch (error) {
      console.log(`🔍 CodeChef error [${callId}]:`, error.message);
      console.log(`🔍 CodeChef error stack [${callId}]:`, error.stack);
      return null;
    }
};

const geekforgeeksData = async (req) => {
    if(!req.user.geekforgeeks){
        console.log("Geekforgeeks url not found");
        return null;
    }
    
    try {
      // Extract username from the GeeksforGeeks profile URL
      const username = req.user.geekforgeeks.split("/").filter(Boolean).pop();
      
      // Use the GeeksforGeeks API endpoint
      const apiUrl = `https://authapi.geeksforgeeks.org/api-get/user-profile-info/`;
      
      const { data } = await axios.get(apiUrl, {
        params: {
          handle: username,
          article_count: false,
          redirect: true
        },
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0',
          'Accept': '*/*',
          'Accept-Language': 'en-US,en;q=0.9,en-IN;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Origin': 'https://www.geeksforgeeks.org',
          'Referer': `https://www.geeksforgeeks.org/user/${username}/`,
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-site',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      // Check if API response is successful
      if (data.message !== "data retrieved successfully" || !data.data) {
        console.log("GeeksforGeeks API returned error or no data");
        return null;
      }
      
      const userData = data.data;
      
      // Extract data from the API response
      const problemsSolved = userData.total_problems_solved || 0;
      const codingScore = userData.score || 0;
      const monthlyScore = userData.monthly_score || 0;
      const instituteName = userData.institute_name || null;
      const instituteRank = userData.institute_rank || null;
      const longestStreak = userData.pod_solved_longest_streak || 0;
      const globalLongestStreak = userData.pod_solved_global_longest_streak || 0;
      const isCampusAmbassador = userData.is_campus_ambassador || false;
      const createdDate = userData.created_date || null;
      
      // Calculate difficulty breakdown (estimate based on score and problems solved)
      let easy = 0, medium = 0, hard = 0;
      if (problemsSolved > 0) {
        // Rough estimation based on coding score level
        if (codingScore < 100) {
          easy = Math.floor(problemsSolved * 0.7);
          medium = Math.floor(problemsSolved * 0.3);
        } else if (codingScore < 500) {
          easy = Math.floor(problemsSolved * 0.5);
          medium = Math.floor(problemsSolved * 0.4);
          hard = Math.floor(problemsSolved * 0.1);
        } else {
          easy = Math.floor(problemsSolved * 0.3);
          medium = Math.floor(problemsSolved * 0.4);
          hard = Math.floor(problemsSolved * 0.3);
        }
      }
      
      // Estimate total active days based on problems solved and streak
      const totalActiveDays = Math.max(
        Math.floor(problemsSolved / 2), // Estimate based on problems
        longestStreak, // At least the longest streak
        Math.floor(problemsSolved / 3) // Fallback estimation
      );
      
      const result = {
        codingScore: codingScore,
        problemsSolved: problemsSolved,
        monthlyScore: monthlyScore,
        instituteName: instituteName,
        instituteRank: instituteRank,
        longestStreak: longestStreak,
        globalLongestStreak: globalLongestStreak,
        isCampusAmbassador: isCampusAmbassador,
        createdDate: createdDate,
        easy: easy,
        medium: medium,
        hard: hard,
        totalActiveDays: totalActiveDays,
        // For backward compatibility, use codingScore as contestRating
        contestRating: codingScore
      };
      
      console.log("GeeksforGeeks data extracted:", result);
    return result;

    } catch (error) {
      console.log("GeeksforGeeks API error:", error.message);
      return null;
    }
  };

  const getAllData = async (req, res, next) => {
    try {
      let allData = {};
      
  
      const leetcodeResult = await leetcodeData(req);
      allData.leetcode = leetcodeResult;
  
      const codeforcesResult = await codeforcesData(req);
      allData.codeforces = codeforcesResult;
  
      const codeforcesTotalResult = await codeforcesTotal(req);
      allData.codeforcesTotal = codeforcesTotalResult;
  
      console.log("🔍 About to call codechefData function (getAllData)");
      const codechefResult = await codechefData(req);      
      console.log("🔍 CodeChef Result from function (getAllData):", JSON.stringify(codechefResult, null, 2));
      allData.codechef = codechefResult;
      // Create a summary version for logging (limit LeetCode and Codeforces data)
      const logData = {
        ...allData,
        leetcode: allData.leetcode ? {
          data: allData.leetcode.data,
          topics: allData.leetcode.topics ? allData.leetcode.topics.slice(0, 3) : [],
          totalContests: allData.leetcode.totalContests,
          contestRating: allData.leetcode.contestRating,
          rankingHistory: allData.leetcode.rankingHistory ? allData.leetcode.rankingHistory.slice(0, 5) : []
        } : allData.leetcode,
        codeforces: allData.codeforces ? {
          ...allData.codeforces,
          contestHistory: allData.codeforces.contestHistory ? allData.codeforces.contestHistory.slice(0, 5) : []
        } : allData.codeforces
      };
      console.log("🔍 AllData after adding codechef (getAllData):", JSON.stringify(logData, null, 2));
  
      const geekforgeeksResult = await geekforgeeksData(req);
      allData.geekforgeeks = geekforgeeksResult;
  


    const data = {
        totalQuestions:0,
        totalContests:0,
        totalActiveDays:0,
        easy:0,
        medium:0,
        hard:0,
        topics:[],
        leetcodeRating:0,
        geekforgeeksRating:0,
        codechefRating:0,
        codeforcesRating:0,
        leetcodeRankingHistory:[],
        codeforcesRankingHistory:[],
        codechefRankingHistory:[],
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
      allData.leetcode.topics.forEach((tag) => {
        data.topics.push({ topic: tag.topic, count: tag.count });
      });
      data.totalContests+=allData.leetcode.totalContests;
      data.leetcodeRankingHistory = allData.leetcode.rankingHistory;
      data.leetcodeRating = allData.leetcode.contestRating
    }

    // Codeforces Data Aggregation
    if (allData.codeforcesTotal) {
      data.totalContests += allData.codeforcesTotal.contestsAttended;
      data.easy += allData.codeforcesTotal.easy;
      data.medium += allData.codeforcesTotal.medium;
      data.hard += allData.codeforcesTotal.hard;
      data.totalActiveDays += allData.codeforcesTotal.totalActiveDays;
      data.totalQuestions += allData.codeforcesTotal.easy + allData.codeforcesTotal.medium + allData.codeforcesTotal.hard;

      // Aggregating tags/topics
      // allData.codeforcesTotal.tags.forEach((tag) => {
      //   data.topics.push({ topic: tag.topic, count: tag.count });
      // });
      allData.codeforcesTotal.tags.forEach((tag) => {
        const existingTopic = data.topics.find((t) => t.topic === tag.topic);
        if (existingTopic) {
          existingTopic.count += tag.count; // Add counts if topic already exists
        } else {
          data.topics.push({ topic: tag.topic, count: tag.count });
        }
      });
      // data.codeforcesRating=allData.codeforces.contestRating;
      data.codeforcesRating=allData.codeforcesTotal.contestRating
      data.codeforcesRankingHistory = allData.codeforcesTotal.rankingHistory
    }

    // Codechef Data Aggregation
    if (allData.codechef) {
      console.log("🔍 CodeChef Aggregation - Raw codechef data:", JSON.stringify(allData.codechef, null, 2));
      data.codechefRating = allData.codechef.contestRating;
      console.log("🔍 CodeChef Aggregation - Set codechefRating to:", data.codechefRating);
      data.totalQuestions += allData.codechef.problemsSolved || 0;
      data.easy += allData.codechef.easy || 0;
      data.medium += allData.codechef.medium || 0;
      data.hard += allData.codechef.hard || 0;
      data.totalContests += allData.codechef.numberOfContestAttended || 0;
      data.totalActiveDays += allData.codechef.totalActiveDays || 0;
      
      // Add CodeChef rating history if available
      if (allData.codechef.ratingHistory && allData.codechef.ratingHistory.length > 0) {
        data.codechefRankingHistory = allData.codechef.ratingHistory;
      }
    } else {
      console.log("🔍 CodeChef Aggregation - No codechef data found in allData");
    }

    // GeekforGeeks Data Aggregation
    if (allData.geekforgeeks) {
      data.geekforgeeksRating = allData.geekforgeeks.contestRating;
      data.totalQuestions += allData.geekforgeeks.problemsSolved || 0;
      data.easy += allData.geekforgeeks.easy || 0;
      data.medium += allData.geekforgeeks.medium || 0;
      data.hard += allData.geekforgeeks.hard || 0;
      data.totalActiveDays += allData.geekforgeeks.totalActiveDays || 0;
    }

    console.log("🔍 Final Data Being Sent to Frontend:", JSON.stringify(data, null, 2));
    
      
      res.status(200).json(data);
    } catch (error) {
      return next(error);
    }
  };


// Helper function to check if cache is valid (24 hours)
const isCacheValid = (lastUpdated) => {
  if (!lastUpdated) return false;
  const now = new Date();
  const cacheAge = now - lastUpdated;
  const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  return cacheAge < twentyFourHours;
};

// Helper function to transform data to cache format
const transformToCacheFormat = (data) => {
  return {
    leetcode: {
      rating: data.leetcodeRating || 0,
      rankingHistory: data.leetcodeRankingHistory || [],
      problemsSolved: data.leetcode ? (data.leetcode.data?.matchedUser?.submitStats?.acSubmissionNum?.find(stat => stat.difficulty === "All")?.count || 0) : 0,
      easy: data.easy || 0,
      medium: data.medium || 0,
      hard: data.hard || 0,
      topics: data.topics || []
    },
    codeforces: {
      rating: data.codeforcesRating || 0,
      rankingHistory: data.codeforcesRankingHistory || [],
      problemsSolved: data.codeforcesTotal ? data.codeforcesTotal.totalSolved : 0,
      easy: data.codeforcesTotal ? data.codeforcesTotal.easy : 0,
      medium: data.codeforcesTotal ? data.codeforcesTotal.medium : 0,
      hard: data.codeforcesTotal ? data.codeforcesTotal.hard : 0,
      topics: data.codeforcesTotal ? data.codeforcesTotal.tags : []
    },
    codechef: {
      rating: data.codechefRating || 0,
      rankingHistory: data.codechefRankingHistory || [],
      problemsSolved: data.codechef ? parseInt(data.codechef.problemsSolved) || 0 : 0,
      easy: data.codechef ? data.codechef.easy || 0 : 0,
      medium: data.codechef ? data.codechef.medium || 0 : 0,
      hard: data.codechef ? data.codechef.hard || 0 : 0,
      topics: []
    },
    geekforgeeks: {
      rating: data.geekforgeeksRating || 0,
      rankingHistory: [],
      problemsSolved: data.geekforgeeks ? data.geekforgeeks.problemsSolved || 0 : 0,
      easy: data.geekforgeeks ? data.geekforgeeks.easy || 0 : 0,
      medium: data.geekforgeeks ? data.geekforgeeks.medium || 0 : 0,
      hard: data.geekforgeeks ? data.geekforgeeks.hard || 0 : 0,
      topics: []
    },
    totalQuestions: data.totalQuestions || 0,
    totalContests: data.totalContests || 0,
    totalActiveDays: data.totalActiveDays || 0,
    lastUpdated: new Date(),
    cacheExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
  };
};

// Helper function to transform cache to response format
const transformFromCacheFormat = (cache) => {
  if (!cache) return null;
  
  return {
    totalQuestions: cache.totalQuestions || 0,
    totalContests: cache.totalContests || 0,
    totalActiveDays: cache.totalActiveDays || 0,
    easy: (cache.leetcode?.easy || 0) + (cache.codeforces?.easy || 0) + (cache.codechef?.easy || 0) + (cache.geekforgeeks?.easy || 0),
    medium: (cache.leetcode?.medium || 0) + (cache.codeforces?.medium || 0) + (cache.codechef?.medium || 0) + (cache.geekforgeeks?.medium || 0),
    hard: (cache.leetcode?.hard || 0) + (cache.codeforces?.hard || 0) + (cache.codechef?.hard || 0) + (cache.geekforgeeks?.hard || 0),
    topics: [
      ...(cache.leetcode?.topics || []),
      ...(cache.codeforces?.topics || []),
      ...(cache.codechef?.topics || []),
      ...(cache.geekforgeeks?.topics || [])
    ],
    leetcodeRating: cache.leetcode?.rating || 0,
    codeforcesRating: cache.codeforces?.rating || 0,
    codechefRating: cache.codechef?.rating || 0,
    geekforgeeksRating: cache.geekforgeeks?.rating || 0,
    leetcodeRankingHistory: cache.leetcode?.rankingHistory || [],
    codeforcesRankingHistory: cache.codeforces?.rankingHistory || []
  };
};

// New cached data controller
const getCachedPlatformData = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    // Get user with cached data
    const user = await User.findById(userId).select('platformDataCache');
    
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }

    const cache = user.platformDataCache;
    const hasValidCache = cache && isCacheValid(cache.lastUpdated);
    
    // If we have valid cache, return it immediately
    if (hasValidCache) {
      const cachedData = transformFromCacheFormat(cache);
      
      // Start background refresh (don't await)
      refreshPlatformDataInBackground(userId);
      
      return res.status(200).json({
        success: true,
        data: cachedData,
        fromCache: true,
        lastUpdated: cache.lastUpdated
      });
    }
    
    // If no valid cache, fetch fresh data
    const freshData = await getAllDataInternal(req);
    
    if (freshData) {
      // Save to cache
      const cacheData = transformToCacheFormat(freshData);
      await User.findByIdAndUpdate(userId, { platformDataCache: cacheData });
      
      console.log("🔍 Fresh Data Being Sent to Frontend:", JSON.stringify(freshData, null, 2));
      return res.status(200).json({
        success: true,
        data: freshData,
        fromCache: false,
        lastUpdated: new Date()
      });
    }
    
    // If no data available, return empty data
    return res.status(200).json({
      success: true,
      data: {
        totalQuestions: 0,
        totalContests: 0,
        totalActiveDays: 0,
        easy: 0,
        medium: 0,
        hard: 0,
        topics: [],
        leetcodeRating: 0,
        codeforcesRating: 0,
        codechefRating: 0,
        geekforgeeksRating: 0,
        leetcodeRankingHistory: [],
        codeforcesRankingHistory: []
      },
      fromCache: false,
      lastUpdated: null
    });
    
  } catch (error) {
    console.error('Error in getCachedPlatformData:', error);
    return next(error);
  }
};

// Background refresh function
const refreshPlatformDataInBackground = async (userId) => {
  try {
    console.log(`Starting background refresh for user ${userId}`);
    
    // Get user data
    const user = await User.findById(userId);
    if (!user) return;
    
    // Create a mock req object for the existing functions
    const mockReq = { user };
    
    // Fetch fresh data
    const freshData = await getAllDataInternal(mockReq);
    
    if (freshData) {
      // Transform and save to cache
      const cacheData = transformToCacheFormat(freshData);
      await User.findByIdAndUpdate(userId, { platformDataCache: cacheData });
      console.log(`Background refresh completed for user ${userId}`);
    }
  } catch (error) {
    console.error(`Background refresh failed for user ${userId}:`, error);
  }
};

// Internal function to get all data (extracted from getAllData)
const getAllDataInternal = async (req) => {
  try {
    let allData = {};
    
    const leetcodeResult = await leetcodeData(req);
    allData.leetcode = leetcodeResult;

    const codeforcesResult = await codeforcesData(req);
    allData.codeforces = codeforcesResult;

    const codeforcesTotalResult = await codeforcesTotal(req);
    allData.codeforcesTotal = codeforcesTotalResult;

      console.log("🔍 About to call codechefData function");
      const codechefResult = await codechefData(req);      
      console.log("🔍 CodeChef Result from function:", JSON.stringify(codechefResult, null, 2));
      console.log("🔍 CodeChef Result type:", typeof codechefResult);
      console.log("🔍 CodeChef Result is null?", codechefResult === null);
      allData.codechef = codechefResult;
      // Create a summary version for logging (limit LeetCode and Codeforces data)
      const logData = {
        ...allData,
        leetcode: allData.leetcode ? {
          data: allData.leetcode.data,
          topics: allData.leetcode.topics ? allData.leetcode.topics.slice(0, 3) : [],
          totalContests: allData.leetcode.totalContests,
          contestRating: allData.leetcode.contestRating,
          rankingHistory: allData.leetcode.rankingHistory ? allData.leetcode.rankingHistory.slice(0, 5) : []
        } : allData.leetcode,
        codeforces: allData.codeforces ? {
          ...allData.codeforces,
          contestHistory: allData.codeforces.contestHistory ? allData.codeforces.contestHistory.slice(0, 5) : []
        } : allData.codeforces
      };
      console.log("🔍 AllData after adding codechef:", JSON.stringify(logData, null, 2));

    const geekforgeeksResult = await geekforgeeksData(req);
    allData.geekforgeeks = geekforgeeksResult;

    const data = {
        totalQuestions:0,
        totalContests:0,
        totalActiveDays:0,
        easy:0,
        medium:0,
        hard:0,
        topics:[],
        leetcodeRating:0,
        geekforgeeksRating:0,
        codechefRating:0,
        codeforcesRating:0,
        leetcodeRankingHistory:[],
        codeforcesRankingHistory:[],
        codechefRankingHistory:[],
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
      allData.leetcode.topics.forEach((tag) => {
        data.topics.push({ topic: tag.topic, count: tag.count });
      });
      data.totalContests+=allData.leetcode.totalContests;
      data.leetcodeRankingHistory = allData.leetcode.rankingHistory;
      data.leetcodeRating = allData.leetcode.contestRating
    }

    // Codeforces Data Aggregation
    if (allData.codeforcesTotal) {
      data.totalContests += allData.codeforcesTotal.contestsAttended;
      data.easy += allData.codeforcesTotal.easy;
      data.medium += allData.codeforcesTotal.medium;
      data.hard += allData.codeforcesTotal.hard;
      data.totalActiveDays += allData.codeforcesTotal.totalActiveDays;
      data.totalQuestions += allData.codeforcesTotal.easy + allData.codeforcesTotal.medium + allData.codeforcesTotal.hard;

      allData.codeforcesTotal.tags.forEach((tag) => {
        const existingTopic = data.topics.find((t) => t.topic === tag.topic);
        if (existingTopic) {
          existingTopic.count += tag.count;
        } else {
          data.topics.push({ topic: tag.topic, count: tag.count });
        }
      });
      data.codeforcesRating=allData.codeforcesTotal.contestRating
      data.codeforcesRankingHistory = allData.codeforcesTotal.rankingHistory
    }

    // Codechef Data Aggregation
    if (allData.codechef) {
      console.log("🔍 CodeChef Aggregation - Raw codechef data:", JSON.stringify(allData.codechef, null, 2));
      data.codechefRating = allData.codechef.contestRating;
      console.log("🔍 CodeChef Aggregation - Set codechefRating to:", data.codechefRating);
      data.totalQuestions += allData.codechef.problemsSolved || 0;
      data.easy += allData.codechef.easy || 0;
      data.medium += allData.codechef.medium || 0;
      data.hard += allData.codechef.hard || 0;
      data.totalContests += allData.codechef.numberOfContestAttended || 0;
      data.totalActiveDays += allData.codechef.totalActiveDays || 0;
      
      // Add CodeChef rating history if available
      if (allData.codechef.ratingHistory && allData.codechef.ratingHistory.length > 0) {
        data.codechefRankingHistory = allData.codechef.ratingHistory;
      }
    } else {
      console.log("🔍 CodeChef Aggregation - No codechef data found in allData");
    }

    // GeekforGeeks Data Aggregation
    if (allData.geekforgeeks) {
      data.geekforgeeksRating = allData.geekforgeeks.contestRating;
      data.totalQuestions += allData.geekforgeeks.problemsSolved || 0;
      data.easy += allData.geekforgeeks.easy || 0;
      data.medium += allData.geekforgeeks.medium || 0;
      data.hard += allData.geekforgeeks.hard || 0;
      data.totalActiveDays += allData.geekforgeeks.totalActiveDays || 0;
    }

    return data;
  } catch (error) {
    console.error('Error in getAllDataInternal:', error);
    return null;
  }
};

// Trigger platform data refresh for a user
export const refreshUserPlatformData = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('leetcode codeforces codechef geekforgeeks');
    
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }

    // Check if user has any platform URLs
    const hasPlatforms = user.leetcode || user.codeforces || user.codechef || user.geekforgeeks;
    if (!hasPlatforms) {
      return res.status(200).json({ 
        success: true, 
        message: 'No platform URLs found. Please add your coding platform profiles first.',
        data: null 
      });
    }

    // Create mock request for getAllDataInternal
    const mockReq = {
      user: {
        id: userId,
        leetcode: user.leetcode,
        codeforces: user.codeforces,
        codechef: user.codechef,
        geekforgeeks: user.geekforgeeks
      }
    };

    // Fetch fresh platform data
    const freshData = await getAllDataInternal(mockReq);
    
    if (freshData) {
      const cacheData = transformToCacheFormat(freshData);
      await User.findByIdAndUpdate(userId, { 
        platformDataCache: cacheData 
      });
      
      return res.status(200).json({ 
        success: true, 
        message: 'Platform data refreshed successfully',
        data: freshData,
        fromCache: false,
        lastUpdated: new Date()
      });
    } else {
      return res.status(200).json({ 
        success: true, 
        message: 'Unable to fetch platform data. Please check your platform URLs.',
        data: null 
      });
    }
  } catch (error) {
    console.error('Error in refreshUserPlatformData:', error);
    return next(error);
  }
};

  export { leetcodeData, codeforcesData, codeforcesTotal, codechefData, geekforgeeksData, getAllData, getCachedPlatformData, getAllDataInternal, transformToCacheFormat };