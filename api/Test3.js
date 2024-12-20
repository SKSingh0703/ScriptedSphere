import axios from 'axios';
import {load} from 'cheerio';

const getProblemsSolvedGFG = async (username) => {
    try {
      const url = `https://auth.geeksforgeeks.org/user/${username}`;
      const { data } = await axios.get(url);
      const $ = load(data);
      
      
      const problemsSolved = $('.scoreCard_head_left--score__oSi_x').eq(1).text().match(/\d+/); 
      const codingScore = $('.scoreCard_head_left--score__oSi_x').eq(0).text().match(/\d+/); 
      const contestRating = $('.scoreCard_head_left--score__oSi_x').eq(2).text().match(/\d+/);  
      console.log(codingScore[0]);
      console.log(contestRating[0]);
      
      const result={
        codingScore:codingScore[0],
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

  getProblemsSolvedGFG('ajaysinghdeopa');