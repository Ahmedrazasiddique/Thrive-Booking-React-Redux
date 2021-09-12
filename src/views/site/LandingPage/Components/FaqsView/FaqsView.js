import React from 'react'
import Faqs from "./Components";

export const FaqsView = () => {
  const faqs = [
    {
      question: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry?',
      answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
    {
      question: 'Where does it come from Porem Ipsum is simply dummy text?',
      answer: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.'
    },
    {
      question: 'Why do we use Lorem Ipsum is simply dummy text?',
      answer: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ‘Content here, content here’, making it look like readable English.'
    },
    {
      question: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry?',
      answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
  ]
  return (
    <div className="faqs wrapper">
      <h1 className="heading pb-3">FAQ’s</h1>
      {faqs.map((faq, index) => (
        <Faqs key={index} faqs={faq} active={index === 1} />
      ))}
    </div>
  )
}
