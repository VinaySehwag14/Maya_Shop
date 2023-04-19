import axios from "axios";
import { useEffect, useState } from "react";
import Product from "./Product";

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  //* using useEffect to fetch profucts when cat changes
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `https://maya-shop-backend.onrender.com/api/products?category=${cat}`
            : `https://maya-shop-backend.onrender.com/api/products`
        );
        setProducts(res.data);
        // console.log(products, "this is Prdopro");
        // console.log(filters, "this is filter");
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat]);

  //* useEffect for filtering products & also using object.entries for converting obj to array and checking if item includes that filter or not.

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [cat, filters, products]);

  //* using useEffect here for filtering asc , desc and new products and below that we are showing only 8 products using slice
  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <div className="p-[20px] flex flex-wrap justify-between ">
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item.id} />)}
    </div>
  );
};

export default Products;
