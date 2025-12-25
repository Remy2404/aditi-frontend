import React from "react";
import Navbar from "@/app/components/layout/Navbar";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";

const page = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <main className="h-screen bg-white"></main>
      <Footer />
    </div>
  );
};

export default page;
