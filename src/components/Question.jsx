import { useQuiz } from "../contexts/quizContext";
import Options from "./Options";

function Question() {
  const {questions, answer, dispatch, currentQuestionIndex}=useQuiz()
  const question = questions[currentQuestionIndex]
 
  return (
    <div>
      <h4>{question?.question}</h4>
      {/* {
        question.options.map((option, index)=><Options key={option} question={question} option={option} index={index} onDispatch={onDispatch} />)
      } */}
       <Options  />
      
    </div>
  );
}

export default Question;
