import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@mui/icons-material";

const Footer = () => {
  return (
    <div className="flex flex-col sm:flex-row ">
      {/* left */}
      <div className="flex-1 flex flex-col p-[20px] ">
        <h1 className="font-semibold text-2xl ">MAYA</h1>
        <p className="my-[20px] ">
          MAYA is your ultimate online destination for the latest and trendiest
          fashion finds. Our ecommerce app offers a wide range of high-quality
          clothing items for men, women, and children, ensuring that every
          member of your family can find something they love. From chic dresses
          to comfortable loungewear, from stylish shoes to versatile
          accessories, we have it all.
        </p>
        {/* social */}
        <div className="flex space-x-[20px] ">
          <div
            className="w-[40px] h-[40px] rounded-full text-white bg-[#3b5999] flex
            items-center justify-center "
          >
            <Facebook />
          </div>
          <div
            className="w-[40px] h-[40px] rounded-full text-white bg-[#e4405f] flex
            items-center justify-center "
          >
            <Instagram />
          </div>
          <div
            className="w-[40px] h-[40px] rounded-full text-white bg-[#55acee] flex
            items-center justify-center "
          >
            <Twitter />
          </div>
          <div
            className="w-[40px] h-[40px] rounded-full text-white bg-[#e60023] flex
            items-center justify-center "
          >
            <Pinterest />
          </div>
        </div>
      </div>

      {/* center */}
      <div className="flex-1 p-[20px] hidden sm:block ">
        <h1 className="font-bold mb-[30px] text-xl ">Useful Links</h1>
        <ul className="flex flex-wrap ">
          <li className="w-1/2 mb-[10px] ">Home</li>
          <li className="w-1/2 mb-[10px] ">Cart</li>
          <li className="w-1/2 mb-[10px] ">Men's Fashion</li>
          <li className="w-1/2 mb-[10px] ">Women's Fashion</li>
          <li className="w-1/2 mb-[10px] ">Accessories</li>
          <li className="w-1/2 mb-[10px] ">My Account</li>
          <li className="w-1/2 mb-[10px] ">Order Tracking</li>
          <li className="w-1/2 mb-[10px] ">Wishlist</li>
          <li className="w-1/2 mb-[10px] ">Terms</li>
        </ul>
      </div>

      {/* right */}
      <div className="flex-1 p-[20px] bg-gray-50 sm:bg-white ">
        <h1 className="font-bold text-xl mb-[30px] ">Contact</h1>
        <div className="mb-[20px] flex items-center ">
          <Room className="mr-[10px] " />
          622, Canought Place , New Delhi 110037
        </div>
        <div className="mb-[20px] flex items-center ">
          <Phone className="mr-[10px] " />
          +91 88-510-39997
        </div>
        <div className="mb-[20px] flex items-center ">
          <MailOutline className="mr-[10px] " />
          contact@MAYA.com
        </div>
        <div className="relative w-full md:w-1/2 h-[30px] cursor-pointer ">
          <img
            src="https://i.ibb.co/Qfvn4z6/payment.png"
            layout="fill"
            objectFit="contain"
            alt="payment"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
