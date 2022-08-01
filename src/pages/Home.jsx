import React from "react";
import Annoucement from "../components/Announcement/Annoucement";
import Navbar from "../components/Navbar/Navbar";
import Slider from "../components/Slider";

const Home = () => {
  return (
    <div>
      <Annoucement />
      <Navbar />
      <Slider />
    </div>
  );
};

export default Home;
