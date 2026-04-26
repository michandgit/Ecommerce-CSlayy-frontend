import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../store/AuthContextProvider';
import axiosInstance from '../apis/axiosInstance';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user?.name?.split(' ')[0] || '',
        lastName: user?.name?.split(' ')[1] || '',
        email: user?.email || '',
        phone: user?.phone || '',
        street: user?.address || '',
        city: user?.city || '',
        state: user?.state || '',
        zipCode: user?.zipCode || '',
        country: user?.country || 'India'
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName) {
      setError('Please enter your full name');
      return false;
    }
    if (!formData.email) {
      setError('Please enter your email');
      return false;
    }
    if (!formData.phone || formData.phone.length < 10) {
      setError('Please enter a valid phone number (10 digits)');
      return false;
    }
    if (!formData.street) {
      setError('Please enter your street address');
      return false;
    }
    if (!formData.city) {
      setError('Please enter your city');
      return false;
    }
    if (!formData.state) {
      setError('Please enter your state');
      return false;
    }
    if (!formData.zipCode) {
      setError('Please enter your zip code');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post('/auth/update-profile', {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country
      });

      if (response.data.success) {
        setUser(response.data.user);
        setSuccess(true);
        setIsEditing(false);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(response.data.message || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Profile update error:', err);
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="w-full min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your personal information and address</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Profile updated successfully!
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white shadow-md rounded-lg p-8">
          
          {/* Edit Toggle Button */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              {isEditing ? 'Edit Profile' : 'Profile Information'}
            </h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-orange-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-500 transition"
              >
                Edit
              </button>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            
            {/* Personal Information Section */}
            <div className="mb-8 border-b border-gray-200 pb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition ${
                      isEditing ? 'bg-white cursor-text' : 'bg-gray-50 cursor-not-allowed'
                    }`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition ${
                      isEditing ? 'bg-white cursor-text' : 'bg-gray-50 cursor-not-allowed'
                    }`}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition ${
                      isEditing ? 'bg-white cursor-text' : 'bg-gray-50 cursor-not-allowed'
                    }`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone Number (10 digits)"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    pattern="[0-9]{10}"
                    className={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition ${
                      isEditing ? 'bg-white cursor-text' : 'bg-gray-50 cursor-not-allowed'
                    }`}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Address Information</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address *
                </label>
                <textarea
                  name="street"
                  placeholder="Street Address"
                  value={formData.street}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows="3"
                  className={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none transition ${
                    isEditing ? 'bg-white cursor-text' : 'bg-gray-50 cursor-not-allowed'
                  }`}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    name="city"
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition ${
                      isEditing ? 'bg-white cursor-text' : 'bg-gray-50 cursor-not-allowed'
                    }`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    name="state"
                    type="text"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition ${
                      isEditing ? 'bg-white cursor-text' : 'bg-gray-50 cursor-not-allowed'
                    }`}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code *
                  </label>
                  <input
                    name="zipCode"
                    type="text"
                    placeholder="ZIP Code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition ${
                      isEditing ? 'bg-white cursor-text' : 'bg-gray-50 cursor-not-allowed'
                    }`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <input
                    name="country"
                    type="text"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition ${
                      isEditing ? 'bg-white cursor-text' : 'bg-gray-50 cursor-not-allowed'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-orange-400 text-white py-3 rounded-lg font-semibold hover:bg-orange-500 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            )}

          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
