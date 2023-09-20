import styled from "styled-components";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  text-align: right;
  width: min(1200px, 90%);
  margin-inline: auto;
  Button {
    margin-block: 1rem;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
  margin-inline: auto;
  @media (min-width: 601px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1201px) {
    grid-template-columns: repeat(4, 1fr);
  }
  .image-wrapper {
    aspect-ratio: 1;
    img {
      object-fit: cover;
      object-position: center center;
      width: 100%;
      height: 100%;
    }
  }
`;

function Board() {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <Wrapper>
      <Link to="/upload">
        <Button content="Upload" />
      </Link>

      <ImageGrid>
        {arr.map((item, idx) => {
          return (
            <div className="image-wrapper" key={idx}>
              {<img src={`/images/cat-0${item}.jpg`} alt="" />}
            </div>
          );
        })}
      </ImageGrid>
    </Wrapper>
  );
}
export default Board;
