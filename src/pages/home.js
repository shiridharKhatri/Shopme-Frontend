import Category from "@/components/Category";
import Feature from "@/components/Feature";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Recommended from "@/components/Recommended";
import React from "react";
import Head from "next/head";
export default function home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Navbar />
      <Header />
      <Category />
      <Recommended />
      <Feature />
      <Footer />
    </>
  );
}
