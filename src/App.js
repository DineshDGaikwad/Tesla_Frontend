
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Homepage'; 
import CoursesPage from './pages/Coursespage';
import LoginPage from './pages/LoginPage'; // Import the Login component
import RegisterPage from './pages/RegisterPage';
import AboutusPage from './pages/AboutusPage';
import AdminPage from './pages/AdminPage';
import ForumPage from './pages/ForumPage';
import EnquiryFormPage from './pages/EnquiryFormPage';
import AdminEnquiry from './admin/AdminEnquiry';
import Chatbot from './components/Chatbot';
import PrivateRoute from './components/PrivateRoute'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/courses" element={<PrivateRoute element={<CoursesPage />} />} />
                <Route path="/login" element={<LoginPage />} />  {/* Add the route for Login page */}
                <Route path="/registerPage" element={<RegisterPage/>} />  {/* Add the route for Register page */}
                <Route path='/admin' element={<AdminPage/>}/>
                <Route path='/aboutus' element={<AboutusPage/>}/>
                <Route path='/forum' element={<ForumPage/>}/>
                <Route path='/enquiry' element={<EnquiryFormPage/>}/>
                <Route path="/admin/enquiries" element={<AdminEnquiry />}/>
                <Route path="/chatbot" element={<Chatbot />} />
            </Routes>
        </Router>
    );
}

export default App;
