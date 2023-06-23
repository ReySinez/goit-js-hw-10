import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_rt1wYSlIf51pjo9ePicNMxiQhgni2amD89xWfEbeK7mq5sRTVG4Bj16W5LAWK9LT";

export const fetchBreeds = async () => {
  try {
    const response = await axios.get("https://api.thecatapi.com/v1/breeds");
    return response.data;
  } catch (error) {
    console.error("Error fetching cat breeds:", error);
    throw error;
  }
};

export const fetchCatByBreed = async (breedId) => {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching cat by breed:", error);
    throw error;
  }
};