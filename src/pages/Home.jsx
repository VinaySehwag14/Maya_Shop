import React from "react";
import Annoucement from "../components/Announcement/Annoucement";
import Categories from "../components/Categories";
import Navbar from "../components/Navbar/Navbar";
import Slider from "../components/Slider";

const Home = () => {
  return (
    <div>
      <Annoucement />
      <Navbar />
      <Slider />
      <Categories />
    </div>
  );
};

export default Home;