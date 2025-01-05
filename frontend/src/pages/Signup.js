import React, { useState } from "react";

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
    contact: "",
    interests: [],
    newsletter: false,
  });
  const [errors, setErrors] = useState({});

  const steps = ["Personal Info", "Account Details", "Preferences"];
  const progressWidth = `${(currentStep / steps.length) * 100}%`;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateStep = () => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!formData.fullName) newErrors.fullName = "Full name is required.";
      if (!formData.email) newErrors.email = "Email is required.";
      if (!formData.phone) newErrors.phone = "Phone number is required.";
    } else if (currentStep === 2) {
      if (!formData.username) newErrors.username = "Username is required.";
      if (!formData.password) newErrors.password = "Password is required.";
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      alert("Form submitted successfully!");
      console.log("Form Data: ", formData);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-10 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            Account Setup Wizard
          </h1>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {steps.map((step, index) => (
                <span
                  key={index}
                  className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${
                    index < currentStep
                      ? "text-green-600 bg-green-200"
                      : "text-green-600 bg-green-200 opacity-50"
                  }`}
                >
                  {step}
                </span>
              ))}
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
              <div
                style={{ width: progressWidth }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-500 ease-in-out"
              ></div>
            </div>
          </div>

          {/* Form Steps */}
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`bg-gray-50 border ${
                      errors.fullName ? "border-red-500" : "border-gray-300"
                    } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`bg-gray-50 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`bg-gray-50 border ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                  />
                </div>
              </div>
            )}
            {/* Add Step 2 and Step 3 similarly */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={handlePrev}
                className={`px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 ${
                  currentStep === 1 ? "hidden" : ""
                }`}
              >
                Previous
              </button>
              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
