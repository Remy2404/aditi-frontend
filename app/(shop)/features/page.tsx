import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const page = () => {
  return (
    <div>
      <Navbar />
      <main className="h-screen bg-white"></main>
      <Footer />
    </div>
  );
};

export default page;
