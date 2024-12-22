import { Container } from "react-bootstrap";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
// import HomeScreens from "./screens/HomeScreens";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          {/* <HomeScreens /> */}
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
