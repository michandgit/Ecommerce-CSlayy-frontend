import React from 'react'
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-10 border-t border-gray-200">
     
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left">
          
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-gray-900">Contact Us</h2>
            <div className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors">
              <Mail size={20} />
              <a 
                href="mailto:contact@vitefashionstore.com" 
                className="text-sm sm:text-base font-medium break-all"
              >
                contact@vitefashionstore.com
              </a>
            </div>
          </div>

        
          <div className="flex flex-col items-center md:items-end space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-gray-900">Follow Us</h2>
            <div className="flex gap-6">
              <a href="#" className="p-2 bg-white rounded-full shadow-sm text-gray-600 hover:text-blue-600 hover:shadow-md transition-all">
                <Facebook size={22} />
              </a>
              <a href="#" className="p-2 bg-white rounded-full shadow-sm text-gray-600 hover:text-pink-600 hover:shadow-md transition-all">
                <Instagram size={22} />
              </a>
              <a href="#" className="p-2 bg-white rounded-full shadow-sm text-gray-600 hover:text-blue-400 hover:shadow-md transition-all">
                <Twitter size={22} />
              </a>
            </div>
          </div>

        </div>
      </div>

      <div className="bg-gray-900 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} <span className="text-white font-semibold">Vite Fashion Store</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer