import React from "react";

export default function Category() {
  const category = [
    {
      name: "Mobile&Accessories",
      src: "/category/Mobile.png",
    },
    {
      name: "Laptop&Accessories",
      src: "/category/laptop.png",
    },
    {
      name: "Clothings",
      src: "/category/clothing.png",
    },
    {
      name: "Sneakers",
      src: "/category/sneaker.png",
    },
    {
      name: "Skin care",
      src: "/category/skinCare.png",
    },
    {
      name: "Watches",
      src: "/category/watch.png",
    },
    {
      name: "Eye Wear",
      src: "/category/glasses.png",
    },
    {
      name: "Kids Clothing",
      src: "/category/kids.png",
    },
  ];
  return (
    <section className="Categories">
      <h1>Categories</h1>
      <p className="catP">
        Ecommerce websites offer a wide range of products in various categories
        for online shoppers.
      </p>
      <div className="grid-display">
        {category.map((elems, index) => {
          return (
            <div className="items">
              <img src={elems.src} alt={elems.name} key={index}/>
              <p>{elems.name}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
