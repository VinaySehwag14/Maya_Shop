import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import { mobile } from "../responsive";
import Announcement from "../components/Announcement";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;
const ProductList = () => {
  const location = useLocation();
  //* getting category with the help of useLocation
  const cat = location.pathname.split("/")[2];

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    // console.log(e, "this is evetn");
    // console.log(e.target, "this is target");
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
    // console.log(filters, "this are filters");
  };

  return (
    <div className="">
      <Navbar />
      <Announcement />
      <h1 className="m-[20px] font-semibold text-2xl ">{cat}</h1>
      <div className="flex justify-between ">
        <div className="mx-[20px] sm:m-[20px] flex flex-col sm:block ">
          <span className="text-[20px] sm:mr-[20px] font-semibold ">
            Filter Products:
          </span>
          <select
            name="color"
            onChange={handleFilters}
            className="p-[10px] my-[10px] sm:my-0 sm:mr-[20px] outline-none "
          >
            <option disabled value="">
              Color
            </option>
            <option value="White">White</option>
            <option value="Black">Black</option>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="Brown">Brown</option>
            <option value="Yellow">Yellow</option>
            <option value="Green">Green</option>
          </select>
          <select
            name="size"
            onChange={handleFilters}
            className="p-[10px] my-[10px] sm:my-0 sm:mr-[20px] outline-none "
          >
            <option disabled value="">
              Size
            </option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>
        <div className="mx-[20px] sm:m-[20px] flex flex-col sm:block ">
          <span className="text-[20px] sm:mr-[20px] font-semibold ">
            Sort Products:
          </span>

          <select
            onChange={(e) => setSort(e.target.value)}
            className="p-[10px] my-[10px] sm:my-0 sm:mr-[20px] outline-none "
          >
            <option value="newest">Newest</option>
            <option value="asc">Price (asc)</option>
            <option value="desc">Price (desc)</option>
          </select>
        </div>
      </div>
      <Products cat={cat} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default ProductList;
