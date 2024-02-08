// useForm.ts
import { useState } from 'react';
import { z } from 'zod';

// Define your form schema using Zod
const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  // Add more fields as needed
});

type FormValues = z.infer<typeof formSchema>;

export const useForm = () => {
  const [data, setData] = useState<FormValues>({ name: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange =
    (field: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setData((prevData) => ({ ...prevData, [field]: e.target.value }));
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      formSchema.parse(data); // Validate data against schema
      // Handle form submission (e.g., send data to server)
      alert('User submitted!');
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.flatten());
      }
    }
  };

  return { data, errors, handleChange, handleSubmit };
};
