import axios from 'axios';

export const getExercisesFromAPI = async (muscle) => {
  const api_url = `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`;
  try {
    const response = await axios.get(api_url, {
      headers: {
        'X-Api-Key': 'DIPsRHPESoUC2bCJ8qjDvw==0CkuC18ovLG4RD1a',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
