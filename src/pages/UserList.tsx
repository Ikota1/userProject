import { useSelector } from 'react-redux';

import { usersApi } from '@features/users/usersApi';
import { selectUserFilterValue } from '@features/users/userFilterSelectors';

import classes from '@pages/UserList.module.css';
import Spinner from '@components/Spinner';
import Button from '@components/Button/Button';

export default function UserList() {
  const filterValue = useSelector(selectUserFilterValue);

  const { data, error, isLoading } = usersApi.useGetUsersQuery();

  const filteredUsers = data?.filter(
    (user) => user.name.indexOf(filterValue) !== -1
  );

  if (isLoading) return <Spinner />;

  if (error) return <div>Something went wrong!</div>;

  if (filteredUsers?.length === 0) return <div>No users found!</div>;

  return (
    <div className={classes.container}>
      <h1>Users</h1>

      <div className={classes.userList}>
        {filteredUsers?.map((user) => (
          <div key={user.id} className={classes.userCard}>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <Button link={`/users/${user.id}`} title='Details' />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
