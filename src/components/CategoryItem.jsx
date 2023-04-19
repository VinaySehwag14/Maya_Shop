import { Link } from "react-router-dom";

const CategoryItem = ({ item }) => {
  return (
    <div className="flex-1 m-[3px] h-[70vh] relative">
      <Link to={`/products/${item.cat}`}>
        <img
          className="relative w-full h-[30vh] object-cover sm:h-full border"
          src={item.img}
          alt="catIMg"
        />
        <div className="absolute h-full w-full top-0 left-0 flex items-center justify-center flex-col ">
          <h1 className="font-semibold text-white mb-[20px] text-xl ">
            {item.title}
          </h1>
          <button
            className="p-[10px] text-sm bg-white text-gray-500 cursor-pointer
          font-semibold "
          >
            SHOP NOW
          </button>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
