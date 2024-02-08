import React, { useState } from 'react';
import { z } from 'zod';

import { formSchema } from '../../schema/formSchema';

type FormValues = z.infer<typeof formSchema>;

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormValues>({
    name: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: new Date(),
    password: '',
    subscribe: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name, checked } = event.target;

    setFormData({
      ...formData,
      [name]: value,
      subscribe: checked,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    try {
      formSchema.parse(formData); // Validate using Zod
      // Handle successful validation (e.g., submit data to server)
    } catch (error) {
      setErrors(
        error.issues.reduce((acc, issue) => {
          acc[issue.path[0]] = issue.message;
          return acc;
        }, {})
      );
    }
  };

  return (
    <main className="bg-gray-100 w-full min-h-full mx-auto flex flex-col justify-center items-center">
      <h1 className="text-2xl text-gray-500">React Form Validation with Zod</h1>

      <form onSubmit={handleSubmit} className="mt-4 w-[400px] max-w-[90%]">
        <div className="mb-6">
          <label
            htmlFor="name"
            className="font-semibold text-lg mb-1 block capitalize"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            className="p-1 w-full border border-black rounded"
            onChange={handleChange}
          />
          {/* Form fields with error display */}
          {errors.name && <span className="text-red-500">{errors.name}</span>}
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="font-semibold text-lg mb-1 block capitalize"
          >
            email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            className="p-1 w-full border border-black rounded"
            onChange={handleChange}
          />
          {errors.email ? <p className="text-red-500">{errors.email}</p> : null}
        </div>

        <div className="mb-6">
          <label
            htmlFor="phone"
            className="font-semibold text-lg mb-1 block capitalize"
          >
            phone number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            className="p-1 w-full border border-black rounded"
            onChange={handleChange}
          />
          {errors.phone ? <p className="text-red-500">{errors.phone}</p> : null}
        </div>

        <div className="mb-6">
          <label
            htmlFor="address"
            className="font-semibold text-lg mb-1 block capitalize"
          >
            address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            className="p-1 w-full border border-black rounded"
            onChange={handleChange}
          />
          {errors.address ? (
            <p className="text-red-500">{errors.address}</p>
          ) : null}
        </div>

        <div className="mb-6">
          <label
            htmlFor="dateOfBirth"
            className="font-semibold text-lg mb-1 block capitalize"
          >
            age
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            className="p-1 w-full border border-black rounded"
            onChange={handleChange}
          />
          {errors.dateOfBirth ? (
            <p className="text-red-500">{errors.dateOfBirth}</p>
          ) : null}
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="font-semibold text-lg mb-1 block capitalize"
          >
            password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            className="p-1 w-full border border-black rounded"
            onChange={handleChange}
          />
          {errors.password ? (
            <p className="text-red-500">{errors.password}</p>
          ) : null}
        </div>

        <div className="">
          <input
            type="checkbox"
            id="newsletter-subscription"
            name="subscribe"
            checked={formData.subscribe}
            className="mr-2 w-6 h-6 checked:bg-blue-600 border-blue-800 rounded-lg align-middle"
            onChange={handleChange}
          />
          <label htmlFor="newsletter-subscription" className="">
            <strong>Yes,</strong> I would like to subscribe for the newsletter.
          </label>
        </div>

        <button
          type="submit"
          className="px-[175px] py-2 capitalize bg-blue-500 text-white rounded-md hover:bg-blue-400 mt-6"
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default RegistrationForm;
