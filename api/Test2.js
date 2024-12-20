import axios from "axios";

async function getSolvedProblems(handle) {
    const apiUrl = `https://codeforces.com/api/user.status?handle=${handle}`;
    try {
        // Fetch user submissions
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.status !== "OK") {
            console.error("Error: ", data.comment);
            return;
        }

        const submissions = data.result;

        // Use a Set to track unique solved problems
        const solvedProblems = new Set();

        submissions.forEach((submission) => {
            if (submission.verdict === "OK") {
                const problem = submission.problem;
                const problemKey = `${problem.contestId}${problem.index}`;
                solvedProblems.add(problemKey);
            }
        });

        console.log(`Total Problems Solved by ${handle}: ${solvedProblems.size}`);
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

// Example usage
const username = "tourist"; // Replace with the desired username
getSolvedProblems(username);
