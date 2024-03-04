import { useEffect, useReducer } from "react";
import ButtonNext from "./components/ButtonNext";
import Error from "./components/Error";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Main from "./components/Main";
import ProgressBar from "./components/ProgressBar";
import Question from "./components/Question";
import StartScreen from "./components/StartScreen";
import Timer from "./components/Timer";
import { useQuiz } from "./contexts/quizContext";

function App() {
  const {
    status,
    dispatch,
  } = useQuiz();

  useEffect(() => {
    fetch("https://react-concept-crackerz-backend.vercel.app/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      //   catch
      .catch((err) => dispatch({ type: "dataFailed", payload: err }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <ProgressBar />
            <Question />
            <Footer>
              <Timer />
              <ButtonNext />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;
