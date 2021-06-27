import React from 'react';

const HelpSection = (props) => {
  const { data } = props;
  return (
    <div className="help">
      <img src={data?.cover} />
      <h1>{data?.title}</h1>
      <p>{data?.desc}</p>
    </div>
  );
};

export default HelpSection;
