

import axios from 'axios';
import {createContext, useContext, useState} from 'react'

export const DataContext = createContext(null);

export const DataProvider = ({children})=>{
    const [data,setData] = useState()
//https://dummyjson.com/products/category/mobile-accessories
    const fetchAllProducts = async ()=>{

        try {
            const res = await axios.get("https://dummyjson.com/products?limit=150")
            // console.log(res);

            const productsData =res.data.products;
            setData(productsData)
        } catch (error) {
         console.log(error);
            
        }

    }

        const getUniqueCatagory = (data,property)=>{
          let newVal = data?.map((curElem)=>{
            return curElem[property]
          })
           newVal = [...new Set(newVal)]
          return newVal
        }
    
        const categoryOnlyData = getUniqueCatagory(data,"category")
        const brandOnlyData = getUniqueCatagory(data,"brand")

    return <DataContext.Provider value={{data,setData,fetchAllProducts,categoryOnlyData,brandOnlyData}}>
{children}
    </DataContext.Provider>
}

export const getData = ()=> useContext(DataContext);
    


