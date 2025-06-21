import React, { useState } from 'react';

const UserForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    phone: '',
  });

  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
    if (!formData.age || isNaN(formData.age) || formData.age <= 0)
      newErrors.age = 'Valid age is required';
    if (!emailRegex.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setUsers([...users, formData]);
      setFormData({
        firstName: '',
        lastName: '',
        age: '',
        email: '',
        phone: '',
      });
      setErrors({});
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6">User Registration Form</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md space-y-4"
      >
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full px-4 py-2 border rounded-md"
        />
        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}

        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full px-4 py-2 border rounded-md"
        />
        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}

        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
          className="w-full px-4 py-2 border rounded-md"
        />
        {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-md"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full px-4 py-2 border rounded-md"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>

      {/* Display all submitted users */}
      {users.length > 0 && (
        <div className="mt-8 w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-4">
          {users.map((user, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow border border-blue-200"
            >
              <h3 className="text-lg font-semibold mb-2">User #{index + 1}</h3>
              <p><strong>First Name:</strong> {user.firstName}</p>
              <p><strong>Last Name:</strong> {user.lastName}</p>
              <p><strong>Age:</strong> {user.age}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserForm;
