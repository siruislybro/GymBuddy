import axios from 'axios';

const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://edamam-recipe-search.p.rapidapi.com/search',
  params: {q: 'chicken'},
  headers: {
    'X-RapidAPI-Key': 'b93b9edcd6mshf6e4a58e937be71p1f7301jsn0edca6e8016a',
    'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}