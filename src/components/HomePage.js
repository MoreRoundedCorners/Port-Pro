import React from "react";

const HomePage = ({ user }) => {
  return (
    <div>
      {user && <p>Welcome {user.name}</p>}
      <p>above me is supposed to be the name of user</p>
    </div>
  );
};

export default HomePage;
