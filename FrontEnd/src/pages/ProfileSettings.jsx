import { useState, useRef } from 'react';
import { FiUser, FiLock, FiMail, FiSave, FiCamera, FiShield } from 'react-icons/fi';

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@edawo.com',
    avatar: '/default-avatar.jpg',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: true,
    phoneNumber: '+1234567890'
  });
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const validate = () => {
    const newErrors = {};
    
    if (profile.newPassword && profile.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (profile.newPassword !== profile.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Profile updated successfully!');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Profile Settings</h1>
      
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column - Avatar and 2FA */}
          <div className="md:w-1/3 space-y-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <img 
                  src={profile.avatar} 
                  alt="Profile" 
                  className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow"
                />
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
                >
                  <FiCamera />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <h3 className="mt-4 text-lg font-medium">{profile.name}</h3>
              <p className="text-gray-500 dark:text-gray-400">Administrator</p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
              <h4 className="font-medium flex items-center">
                <FiShield className="mr-2" /> Two-Factor Authentication
              </h4>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm">
                  {profile.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="twoFactorEnabled"
                    checked={profile.twoFactorEnabled}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              {profile.twoFactorEnabled && (
                <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
                  <p className="text-sm text-yellow-700 dark:text-yellow-200">
                    Two-factor authentication is currently enabled via SMS to {profile.phoneNumber}
                  </p>
                  <button
                    type="button"
                    className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Change phone number
                  </button>
                </div>
              )}
              <button
                type="button"
                className="mt-4 w-full px-3 py-2 bg-gray-100 dark:bg-gray-600 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-500"
              >
                {profile.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
              </button>
            </div>
          </div>

          {/* Right Column - Form Fields */}
          <div className="md:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  <FiUser className="mr-2" /> Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  <FiMail className="mr-2" /> Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700"
                  required
                />
              </div>

              {/* Current Password */}
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  <FiLock className="mr-2" /> Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={profile.currentPassword}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700"
                  placeholder="Required for changes"
                />
              </div>

              {/* New Password */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  <FiLock className="mr-2" /> New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={profile.newPassword}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-lg dark:bg-gray-700 ${
                    errors.newPassword ? 'border-red-500' : ''
                  }`}
                  placeholder="Leave blank to keep current"
                />
                {errors.newPassword && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.newPassword}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  <FiLock className="mr-2" /> Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={profile.confirmPassword}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-lg dark:bg-gray-700 ${
                    errors.confirmPassword ? 'border-red-500' : ''
                  }`}
                  placeholder="Must match new password"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <FiSave /> <span>Update Profile</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;