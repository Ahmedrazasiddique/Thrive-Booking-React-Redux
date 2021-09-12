import React from 'react'
import ProofComma from '../../../../../assets/images/proof-c.png'
import ProofOne from '../../../../../assets/images/proof-1.png'
import ProofTwo from '../../../../../assets/images/proof-2.png'
import ProofThree from '../../../../../assets/images/proof-3.png'
import SocialProof from "../Schedule/Components";

export const SocialProofView = () => {
  const proofs = [
    {
      cover: ProofComma,
      comment: '“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s”',
      userImg: ProofOne,
      userName: 'John Smith',
      userJob: 'CEO, ABC Company',
    },
    {
      cover: ProofComma,
      comment: '“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s”',
      userImg: ProofTwo,
      userName: 'John Smith',
      userJob: 'CEO, ABC Company',
    },
    {
      cover: ProofComma,
      comment: '“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s”',
      userImg: ProofThree,
      userName: 'John Smith',
      userJob: 'CEO, ABC Company',
    },
  ]
  return (
    <div className="social-proof wrapper">
      <h1 className="heading pb-2">Social Proof</h1>
      <div className="row">
        {proofs.map((proof, index) => (
          <SocialProof proofs={proof} key={index}/>
        ))}
      </div>
    </div>
  )
}

