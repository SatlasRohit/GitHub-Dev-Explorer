import { Routes, Route, Link } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import Home from "./pages/Home";
import DeveloperDetails from "./pages/DeveloperDetails";

function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/">
            GitHub Dev Explorer
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="pb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dev/:username" element={<DeveloperDetails />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
