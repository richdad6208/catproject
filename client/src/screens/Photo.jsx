import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getRandomImage } from "../api/random";
import { useEffect, useState } from "react";
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .image-container {
    img {
      object-fit: cover;
    }
  }
`;

function Photo() {
  const [imageUrl, setImageUrl] = useState("");
  const { data, refetch } = useQuery({
    queryKey: ["random"],
    queryFn: getRandomImage,
  });
  useEffect(() => {
    if (data) {
      setImageUrl(data[0].url);
    }
  }, [data]);
  return (
    <Wrapper>
      <p>이미지 클릭시 다음 이미지로 넘어갑니다</p>
      <div className="image-container">
        <img src={imageUrl} alt="" onClick={() => refetch()} />
      </div>
    </Wrapper>
  );
}
export default Photo;
