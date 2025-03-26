
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
import UserAdmissionPage from './pages/UserAdmissionPage';
import NotFoundPage from "./components/NotFoundPage";
import StudentDashboard from './pages/MyDashboard';
import PrivacyPolicy  from './pages/tncPages/PrivacyPolicy'
import RefundCancellation  from './pages/tncPages/RefundCancellation'
import  ReturnPolicy from './pages/tncPages/ReturnPolicy'
import TermsConditions  from './pages/tncPages/tnc'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/login" element={<LoginPage />} />  
                <Route path="/registerPage" element={<RegisterPage/>} /> 
                <Route path='/admin' element={<AdminPage/>}/>
                <Route path='/aboutus' element={<AboutusPage/>}/>
                <Route path='/forum' element={<ForumPage/>}/>
                <Route path='/enquiry' element={<EnquiryFormPage/>}/>
                <Route path="/admin/enquiries" element={<AdminEnquiry />}/>
                <Route path='admission-form' element={<UserAdmissionPage />} />
                <Route path="/chatbot" element={<Chatbot />} />
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/StudentDashboard" element={<StudentDashboard/>}/>
                <Route path="/terms" element={<TermsConditions />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/return" element={<ReturnPolicy />} />
                <Route path="/refund" element={<RefundCancellation />} />
            </Routes>
        </Router>
    );
}

export default App;
