export const getRandomImage = async () => {
  const data = await fetch("https://api.thecatapi.com/v1/images/search").then(
    (res) => res
  );
  const response = await data.json();
  return response;
};
