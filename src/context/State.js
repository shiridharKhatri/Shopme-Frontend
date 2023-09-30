import Cookies from "js-cookie";
import Context from "./Context";
import React, { useEffect, useState } from "react";

export default function State(props) {
  const [suggestedProduct, setSuggestedProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [fetchCartData, setFetchcart] = useState([]);
  const [userData, setUserData] = useState([])
  const host = process.env.NEXT_PUBLIC_HOST;
  const fetchSuggestedProduct = async () => {
    const headers = {
      Accept: "application/json",
      // Add any other headers you need, such as authorization tokens
    };
    try {
      const response = await fetch(`${host}/api/fetchSuggestedProduct`, {
        method: "GET",
        headers,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSuggestedProduct(data);
    } catch (error) {
      // Handle any errors that occur during the API request
      console.error("Error fetching API:", error);
      // Optionally, you can also display a message to the user indicating the error
      // setErrorMessage("There was an error fetching the API.");
    }
  };

  // fetch all the products available
  const fetchAllProducts = async (page) => {
    try {
      const response = await fetch(`${host}/api/All?page=${page}`, {
        headers: {
          Accept: "*/*",
        },
      });

      // If the response is not OK, throw an error
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Parse the response data
      const data = await response.json();
      // If the response data indicates success, update the product state
      if (data.success) {
        setProducts(data.data);
        // console.log(data)
      } else {
        setError(data.message || "Unknown error");
      }
    } catch (error) {
      setError(error.message || "Unknown error");
    }
  };
  const fetchUserCart = async () => {
    let headersList = {
      Accept: "*/*",
      "auth-token": Cookies.get("token"),
    };

    let response = await fetch(`${host}/auth/fetchCart`, {
      method: "GET",
      headers: headersList,
    });
    let data = await response.json();
    setFetchcart(data);
  };
  const fetchUsers = async()=>{
    let headersList = {
      "Accept": "*/*",
      "auth-token": Cookies.get("token")
     }
     
     let response = await fetch(`${host}/auth/fetchusers`, { 
       method: "GET",
       headers: headersList
     });
     
     let data = await response.json();
     if(data.success === true){
      setUserData(data.user)
     }
  }
  // Call the fetchAllProducts function when the component mounts
  useEffect(() => {
    fetchAllProducts(1);
    fetchUserCart();
    fetchUsers()
  }, []);
  return (
    <Context.Provider
      value={{
        fetchSuggestedProduct,
        suggestedProduct,
        products,
        fetchAllProducts,
        fetchCartData,
        userData
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
