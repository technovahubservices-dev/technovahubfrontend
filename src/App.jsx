import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Navbar from "./Components/Header/Header";
import TermsAndCondition from "./pages/TermsAndCondition";
import Footer from "./Components/Footer/Footer";
import AdminLogin from "./pages/admin/adminlogin/AdminLogin";
import Contact from "./pages/Contact";
import About from "./pages/Aboutpage/About";
import LayoutDashboard from "./Components/admin/layout/LayoutDashboard";
import VerifyCertificate from "./pages/verifyCertificate/VerifyCertificate";

import Courses from "./pages/Courses/Courses";

import GalleryPages from "./pages/Gallery/GalleryPages";
import WhatsAppButton from "./Components/whatappsup/WhatsAppButton";
import ChatWindow from "./Components/chatbot/ChatWindow";

import PosterPopup from "./Components/popup/PosterPopup";
import ProtectedRoute from "./Components/protectRoutes/ProtectedRoute";
import Backtop from "./Components/Backtop/Backtop";
import Softwaresol from "./pages/softwareSolutions/Softwaresol";
import ScrollToTop from "./Components/ScrollToTop";
import Homeseven from "./pages/Homeseven";
import Sevenhome from "./pages/Sevenhome";
import ProductPage from "./pages/Product/ProductPage";
import NeuroSciencePage from "./pages/Career/NeuroSciencePage";
import FacilitiesPage from "./pages/Career/FacilitiesPage";




import YoungInnovator from "./pages/YoungInnovator";


// Wrapper to use location
const Layout = ({ children }) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const hideHeaderFooterRoutes = new Set([
    "/product/nexion",
    "/product/trackpulse",
    "/product/biz_connect",
    "/product/techno_biz_connect",
    "/career/neuro-science",
  ]);
  const hideHeaderFooter =
    location.pathname.startsWith("/admin") ||
    hideHeaderFooterRoutes.has(location.pathname);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const updateViewport = (event) => {
      setIsMobile(event.matches);
    };

    updateViewport(mediaQuery);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateViewport);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(updateViewport);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", updateViewport);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(updateViewport);
      }
    };
  }, []);

  const handleChatToggle = () => {
    setChatOpen((prev) => !prev);
  };
  const handleChatClose = () => {
    setChatOpen(false);
  };

  return (
    <div>
      {!hideHeaderFooter && <Navbar />}
      {/* {!hideHeaderFooter && <Cursor />} */}


      {children}
      {!hideHeaderFooter && <Footer />}
      {!hideHeaderFooter && <Backtop />}
      {!hideHeaderFooter && (
        <>
          <WhatsAppButton />
          {typeof document !== "undefined" && createPortal(
            <ChatWindow open={chatOpen} onClose={handleChatClose} onToggle={handleChatToggle} autoAcceptTnc isMobile={isMobile} />,
            document.body
          )}
        </>
      )}
      {!hideHeaderFooter && <PosterPopup />}
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/verifyCertificate" element={<VerifyCertificate />} />
          <Route path="/gallery" element={<GalleryPages />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/softwaresolutions" element={<Softwaresol />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/career/neuro-science" element={<NeuroSciencePage />} />
          <Route path="/career/facilities" element={<FacilitiesPage />} />
          <Route path="/7Days-AI-innovation" element={<Homeseven />} />
          <Route path="/young-innovator" element={<YoungInnovator />} />

          <Route path="/7Days-AI-innovation/welcome" element={<Sevenhome />} />



          <Route path="/termsandCondition" element={<TermsAndCondition />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin */}
          <Route path="/adminlogin" element={<AdminLogin />} />

          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <LayoutDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;

