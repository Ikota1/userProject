import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserFilterValue } from './userFilterSelectors';
import { update as updateUserFilter } from './userFilterSlice'; // Corrected import

const UserFilter = () => {
  const dispatch = useDispatch();
  const userFilter = useSelector(selectUserFilterValue);
  const [inputValue, setInputValue] = useState(userFilter);

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(updateUserFilter(inputValue));
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue, dispatch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className='create-me'>
      <input
        type='text'
        placeholder='Search users...'
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default UserFilter;
