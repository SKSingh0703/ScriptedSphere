async function postSkillStats(username) {
    const url = "https://leetcode.com/graphql"; // Replace with actual GraphQL endpoint
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
  
      if (response.ok) {
        console.log("Data received:", data);
  
        // Extract advanced, intermediate, and fundamental topics
        const advancedTopics = data?.data?.matchedUser?.tagProblemCounts?.advanced || [];
        const intermediateTopics = data?.data?.matchedUser?.tagProblemCounts?.intermediate || [];
        const fundamentalTopics = data?.data?.matchedUser?.tagProblemCounts?.fundamental || [];
  
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
        console.log(topics);
        
      } else {
        console.error("Error:", data.errors);
        return null;
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  }
  
  
  // Call the function with the username parameter
  postSkillStats("SKSingh0703");
  