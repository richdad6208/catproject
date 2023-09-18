import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
const Wrapper = styled.div``;

function Photo() {
  const [image, setImage] = useState({});
  useEffect(() => {
    axios.get("https://api.thecatapi.com/v1/images/search").then((res) => {
      setImage(res.data[0]);
    });
  }, []);
  function choiceImage() {
    const rawBody = JSON.stringify({
      image_id: image.id,
      sub_id: "1",
    });
    console.log(rawBody);
    axios("https://api.thecatapi.com/v1/favourites", {
      method: "post",
      headers: { "x-api-key": import.meta.env.VITE_CAT_APIKEY },
      body: rawBody,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  function refreshImage() {
    axios
      .get("https://api.thecatapi.com/v1/images/search")
      .then((res) => setImage(res.data[0]));
  }
  return (
    <Wrapper>
      <img src={image.url} alt="" />
      <button onClick={refreshImage}>새로고침</button>
      <button onClick={choiceImage}>찜하기</button>
    </Wrapper>
  );
}
export default Photo;
