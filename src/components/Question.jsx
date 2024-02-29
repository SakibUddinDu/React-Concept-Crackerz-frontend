import Options from "./Options";

function Question({question, answer, onDispatch}) {

  return (
    <div>
      <h4>{question?.question}</h4>
      {/* {
        question.options.map((option, index)=><Options key={option} question={question} option={option} index={index} onDispatch={onDispatch} />)
      } */}
       <Options question={question} onDispatch={onDispatch} answer={answer} />
      
    </div>
  );
}

export default Question;
