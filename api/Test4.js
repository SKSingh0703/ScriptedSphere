import axios from 'axios';
import {load} from 'cheerio';

const getProblemsSolvedGFG = async (username) => {
    try {
      const url = `https://www.codechef.com/users/${username}`;
      const { data } = await axios.get(url);
      const $ = load(data);
      
      
      const contestRating = $('.rating-number').eq(0).text().match(/\d+/); 
      const problemsSolved = $('.problems-solved h3').filter((i, el) => $(el).text().includes('Total Problems Solved')).text().match(/\d+/);  
            
      const result={
        problemsSolved:problemsSolved[0],
        contestRating:contestRating[0]
      }
      console.log(result);
      
  
      if (problemsSolved) {
        console.log(`${username} has solved: ${problemsSolved[0]} problems`);
      } else {
        console.log(`${username} has no problem solved count found.`);
      }
    } catch (error) {
      console.error('Error fetching data from GeeksforGeeks:', error);
    }
  };

  getProblemsSolvedGFG('sksingh0703');