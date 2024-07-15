import { useState } from 'react';
import { usersApi } from '@features/users/usersApi';
import { User } from '@features/users/types';
import classes from './UserCreate.module.css';
import { useNavigate } from 'react-router-dom';

export default function UserCreate() {
  const navigate = useNavigate();
  const [createUser] = usersApi.useCreateUserMutation();
  const [formData, setFormData] = useState<Partial<User>>({
    name: '',
    email: '',
    company: { name: '' },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'company' ? { name: value } : value,
    }));
  };

  const handleCreate = async (data: Partial<User>) => {
    try {
      await createUser(data).unwrap();
      navigate('/users');
    } catch (err) {
      console.error('Failed to create user:', err);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCreate(formData);
  };

  const handleCancel = () => {
    navigate('/users');
  };

  return (
    <div className={classes.card}>
      <h2 className={classes.title}>New User Details</h2>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.formGroup}>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            id='name'
            name='name'
            className={classes.input}
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            className={classes.input}
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor='company'>Company:</label>
          <input
            type='text'
            id='company'
            name='company'
            className={classes.input}
            value={formData.company?.name}
            onChange={handleChange}
          />
        </div>
        <div className={classes.buttonGroup}>
          <button type='submit' className={classes.button}>
            Create User
          </button>
          <button onClick={handleCancel} className={classes.button}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
