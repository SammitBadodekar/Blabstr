import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
  return <div>{params.id}</div>;
};

export default Page;
