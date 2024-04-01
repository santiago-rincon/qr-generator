import { Footer } from "@components/Footer";
import { Form } from "@components/Form";
import { Navbar } from "@components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Form />
      </main>
      <Footer />
    </>
  );
}

export default App;
