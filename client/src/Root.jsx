import { Outlet } from "react-router-dom";
import styled from "styled-components";
const Container = styled.div`
  width: min(100% - 3rem);
  margin-inline: auto;
`;

function Root() {
  return (
    <>
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default Root;
