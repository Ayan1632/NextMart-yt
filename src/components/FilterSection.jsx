import React from 'react'
import { getData } from '../context/DataContext'

function FilterSection({search,setSearch,brand,setBrand,category,setCategory,priceRange,setPriceRange,handleBrandChange,handleCaregoryChange}) {
    const {categoryOnlyData,brandOnlyData} = getData()
//    console.log("search =", search)
// console.log("brand =", brand)
// console.log("category =", category)
// console.log("priceRange =", priceRange)
// console.log(handleBrandChange);

    
  return (
    <div className='bg-gray-100 mt-10 p-4 rounded-md h-max hidden md:block'>
        <input type="text " placeholder='Search..' value={search} onChange={(e)=>setSearch(e.target.value)} className='bg-white p-2 rounded-md border-gray-400 border-2' />
        <h1 className='mt-5 font-semibold text-xl'>Category</h1>

        {/* Category Data  */}
        <div className='flex flex-col gap-2 mt-3'>
            {
                categoryOnlyData?.map((item,index)=>{
                    return <div key={index} className='flex gap-2 '>
                        <input type="checkbox" name={item} checked={category===item} value={item} onChange={handleCaregoryChange} />
                        <button className='cursor-pointer uppercase'>{item}</button>

                    </div>
                })
            }
        </div>
        {/* Brand Wise Data */}
           <h1 className='mt-5 font-semibold text-xl mb-2'>Brand</h1>
        <select name="" id="" className='bg-white w-full p-2 border-gray-200 border-2 rounded-md ' value={brand} onChange={handleBrandChange} >
            {
                brandOnlyData?.map((item,index)=>{
                //   console.log(brand);
                    
                    return <option key={index} value={item}>{item}</option>
                })
            }
        </select>
        {/* Price Range */}
        <h1 className='mt-5 font-semibold text-xl mb-2'>Price Range</h1>
        <div>
            <label htmlFor="">Price Rance : ${priceRange[0]} - ${priceRange[1]}</label>
            <input type="range" name='' min="0" max="5000" value={priceRange[1]} onChange={(e)=>setPriceRange([priceRange[0],Number(e.target.value)])} />
        </div>
        <button className='bg-red-500 text-white rounded-md px-3 py-1 mt-5 cursor-pointer'
             onClick={()=>{setSearch(''); setCategory('All'); setBrand('All'); setPriceRange([0,5000])}}
             >Reset Filters</button>
    </div>
  )
}

export default FilterSection
