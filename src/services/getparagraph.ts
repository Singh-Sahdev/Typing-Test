import axios from "axios";

export async function getParagraph(number:number) {

  try {
    const {data} = await axios.get(`https://random-word-api.herokuapp.com/word?number=${number}`,{
      method:'GET'
    });

    return data.join(' ')
  } catch (error) {
    console.error(error);
  }
  return ''
}