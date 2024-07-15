import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Modal from '@root/components/Modal/Modal';
import { usersApi } from '@features/users/usersApi';
import { postsApi } from '@features/posts/postsApi';
import { Post } from '@features/posts/types';
import classes from './UserDetails.module.css';
import Spinner from '@components/Spinner';

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = usersApi.useGetUserQuery(parseInt(id!));
  const { data: userPosts } = postsApi.useGetPostsQuery(parseInt(id!));

  const [deletePost] = postsApi.useDeletePostMutation();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleApply = (post: Post) => {
    setSelectedPost(post);
    setUpdateModalOpen(true);
  };

  const handleModalClose = () => {
    setUpdateModalOpen(false);
    setSelectedPost(null);
  };

  useEffect(() => {
    if (updateModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [updateModalOpen]);

  if (isLoading) return <Spinner />;

  if (error) return <div>Something went wrong!</div>;

  return (
    <div className={classes.card}>
      {updateModalOpen && (
        <Modal closeModal={handleModalClose} userPost={selectedPost} />
      )}
      <div>
        <h2>User Details</h2>
        <p>
          <strong>Name:</strong> {data?.name}
        </p>
        <p>
          <strong>Email:</strong> {data?.email}
        </p>
        <p>
          <strong>Company:</strong> {data?.company?.name}
        </p>
      </div>
      <div>
        <h2>Articles</h2>
        {userPosts?.map((post) => (
          <div key={post.id} className={classes.userCard}>
            <h3>Title</h3>
            <p>{post.title}</p>
            <h3>Description</h3>
            <p>{post.body}</p>
            <div className={classes.postButtonGroup}>
              <button onClick={() => deletePost(post.id)}>Delete Post</button>
              <button onClick={() => handleApply(post)}>Edit Post</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDetails;
