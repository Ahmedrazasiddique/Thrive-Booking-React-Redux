import React from 'react'
import clsx from "clsx";

const Faqs = (props) => {
  const {faqs} = props;
  return (
    <div className="question-answer">
      <div className="question">
        <h1 className="fill">Q.</h1>
        <h1 className="pl-1">{faqs.question}</h1>
      </div>
      <div className="answer">
        <h1 className="fill">A.</h1>
        <p>{faqs.answer}</p>
      </div>
    </div>
  )
}

export default Faqs
