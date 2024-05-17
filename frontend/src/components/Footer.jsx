import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#1E3A8A] text-white dark:bg-[#1E3A8A] dark:text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mr-16">
            <h4 className="text-lg font-bold mb-4">About Us</h4>
            <p className="text-sm mb-2">HOW WE BUILT</p>
            <p className="text-sm mb-2">OFFERS</p>
          </div>
          <div className="mb-8 md:mr-16">
            <h4 className="text-lg font-bold mb-4">STAY HYDRATE</h4>
            <p className="text-sm mb-2">Order Status</p>
            <p className="text-sm mb-2">Your Orders</p>
            <p className="text-sm mb-2">Profile</p>
            <p className="text-sm">Assitance</p>
          </div>
          <div className="mb-8 md:mr-16">
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <p className="text-sm mb-2">JSQ , JERSEY CITY ,07306</p>
            <p className="text-sm mb-2">HELP@stayhydrate.com</p>
            <p className="text-sm mb-2">+1 (551)-208-8721</p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-white dark:text-white">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-white dark:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white dark:text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white dark:text-white">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-white dark:text-white">
          <p>&copy; STAY HYDRATE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;