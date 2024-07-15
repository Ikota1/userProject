import classes from './Header.module.css';
import Logo from './Logo';
import { usersApi } from '@features/users/usersApi';
import UserFilter from '@features/users/UserFilter';
import Button from '@components/Button/Button';
import Spinner from '@components/Spinner';

interface HeaderProps {
  isUsersPage: boolean;
}

export default function Header({ isUsersPage }: HeaderProps) {
  const { data, error, isLoading } = usersApi.useGetUsersQuery();

  if (isLoading) return <Spinner />;

  if (error) return <div>Something went wrong!</div>;

  return (
    <header className={classes.header}>
      <Logo />
      {isUsersPage && <UserFilter />}
      <div className={classes.availableUsers}>
        {isUsersPage ? (
          <>
            <div className={classes.availableUsersNumber}>
              <h2 className={classes.users}>{data?.length ?? 'unknown'}</h2>
              <h3 className={classes.usersTitle}>Available users</h3>
            </div>
          </>
        ) : (
          <>
            <Button link='/users' title='Back' />
          </>
        )}
        <div>
          <Button link='/users/create' title='Create new user' />
        </div>
      </div>
    </header>
  );
}
