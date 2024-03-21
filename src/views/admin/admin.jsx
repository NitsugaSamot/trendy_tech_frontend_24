import { Container, Box } from "@mui/material";
import Nav from "../../components/nav/nav";
import UpdateProduct from "../../components/updateProduct/updateProduct";

export default function Admin() {
  return (
    <>
      <Nav />
      <Container>
        <Box>
          <UpdateProduct />
        </Box>
      </Container>
    </>
  );
}
