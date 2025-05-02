// components/Footer.jsx
const Footer = ({ darkMode }) => {
    const currentYear = new Date().getFullYear();
  
    return (
      <footer className={`py-4 px-6 border-t ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'}`}>
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              &copy; {currentYear} E-Dawo Online Pharmacy. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              Terms of Service
            </a>
            <a href="#" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              Privacy Policy
            </a>
            <a href="#" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;