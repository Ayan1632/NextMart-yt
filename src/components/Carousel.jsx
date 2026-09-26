// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllProducts } from "../store/productSlice";

// function Carousel() {
//     const dispatch = useDispatch();

//     const { data, loading, error } = useSelector(
//         (state) => state.products
//     );

//     useEffect(() => {
//         dispatch(fetchAllProducts());
//     }, [dispatch]);

//     console.log("Products:", data);

//     if (loading) return <h2>Loading...</h2>;

//     if (error) return <h2>{error}</h2>;

//     return (
//         <div>
//             {/* <h2>Products</h2>

//             {data.map((product) => (
//                 <div key={product.id}>
//                     <h3>{product.title}</h3>
//                     <p>${product.price}</p>
//                 </div>
//             ))} */}
//         </div>
//     );
// }

// export default Carousel



import React, {  useEffect } from 'react'
import {  getData } from '../context/DataContext'
import "slick-carousel/slick/slick.css";
import SliderImport from 'react-slick';
import {AiOutlineArrowLeft,AiOutlineArrowRight} from 'react-icons/ai'

const Slider = SliderImport.default ?? SliderImport;
import "slick-carousel/slick/slick-theme.css";
import { Pause } from 'lucide-react';
import Category from './Category';
import { Link } from 'react-router-dom';

function Carousel() {
    const {data,fetchAllProducts} = getData()

    // console.log(data);
    

    useEffect(()=>{
        fetchAllProducts()
    },[])


const laptopData = data?.filter(
    (product) => product.category === "laptops" ||
        product.category === "smartphones"
)

// console.log(laptopData)

    const SamplePrevArrow = (props) => {
        const {className, style, onClick} = props;
        return (
            <div onClick={onClick} className={`arrow ${className}`} style={{zIndex:3}}>
                <AiOutlineArrowLeft className='arrows' style={{...style, display: "block", borderRadius:"50px", background:"#f53347" , color:"white" , position:"absolute", padding:"2px", left:"50px"}} />
            </div>
        )
    }
    const SampleNextArrow = (props) => {
        const {className, style, onClick} = props;
        return (
            <div onClick={onClick} className={`arrow ${className}`}>
                <AiOutlineArrowRight className='arrows' style={{...style, display: "block", borderRadius:"50px", background:"#f53347" , color:"white" , position:"absolute", padding:"2px", right:"50px"}} />
            </div>
        )
    }

    var settings = {
    dots: false,
     autoplay: true,
    autoplaySpeed:2000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    PauseOnHover:false,
      nextArrow: <SampleNextArrow to="next" />,
        prevArrow: <SamplePrevArrow to="prev" />,
  };

  return (
   <div>
          <Slider {...settings}>
              {
                  data
                      ?.filter((item) =>
                          item.category === "laptops" ||
                          item.category === "smartphones"
                      )
                      ?.slice(0, 10)?.map((item, index) => {
                          return <div key={index} className='bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] -z-10'>
                              <div className='flex flex-col md:flex-row gap-10 justify-center h-[600px] my-20 md:my-0 items-center px-4'>
                                  <div className='md:space-y-6 space-y-3'>
                                      <h3 className='text-red-500 font-semibold font-sans text-sm'>Powering Your World with the Best in Electronics</h3>
                                      <h1 className='md:text-4xl text-xl font-bold uppercase line-clamp-2 md:line-clamp-3 md:w-[500px] text-white'>{item.title}</h1>
                                      <p className='md:w-[500px] line-clamp-3 text-gray-400 pr-7'>{item.description}</p>
                                      <Link to={'/products'}><button className='bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-2 rounded-md cursor-pointer mt-2'>Shop Now</button></Link>
                                  </div>
                                  <div>
                                      <img src={item.thumbnail} alt={item.title} className='rounded-full w-[550px] hover:scale-105 transition-all shadow-2xl shadow-red-400' />
                                  </div>
                              </div>
                          </div>
                      })
              }
          </Slider>
        <Category/>
   </div>
  )
}

export default Carousel

