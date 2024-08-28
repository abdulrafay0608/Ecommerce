import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout = ({
  children,
  title = "Ecommerce App",
  description = "Mern Stack Ecommerce App",
  keyword = "mern, react, mongodb, ecommerce , node , next",
  author = "Abdul Rafay",
}) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keyword} />
        <meta name="author" content={author} />
        <title> {title}</title>
      </Helmet>
      <Header />
      <main>
        <Toaster />
        <h2 style={{ minHeight: "100vh" }}>{children}</h2>
      </main>
      <Footer />
    </>
  );
};

// Layout.defaultProps = {
//   tittle: "Ecommerce App",
//   description: "Mern Stack Ecommerce App",
//   keyword: "mern, react, mongodb, ecommerce , node , next",
//   author: "Abdul Rafay",
// };

export default Layout;
