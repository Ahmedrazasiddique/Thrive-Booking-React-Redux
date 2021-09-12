import React from 'react'

const SocialProof = (props) => {
  const {proofs} = props;
  return (
    <div className="col-lg-4">
      <div className="proof">
        <img src={proofs.cover} />
        <p className="comment">{proofs.comment}</p>
        <img src={proofs.userImg} />
        <h1>{proofs.userName}</h1>
        <p>{proofs.userJob}</p>
      </div>
    </div>
  )
}

export default SocialProof
