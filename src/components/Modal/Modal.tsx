import { useState } from 'react';
import { postsApi } from '@features/posts/postsApi';
import { Post } from '@features/posts/types';
import classes from './Modal.module.css';

interface ModalProps {
  closeModal: (arg: boolean) => void;
  userPost?: Post | null;
}

const Modal: React.FC<ModalProps> = ({ closeModal, userPost }) => {
  const [title, setTitle] = useState(userPost?.title || '');
  const [body, setBody] = useState(userPost?.body || '');

  const [updatePost, { isLoading }] = postsApi.useUpdatePostMutation();

  const handleUpdate = async () => {
    if (!userPost?.id) return;

    await updatePost({ id: userPost.id, title, body }).unwrap();
    closeModal(false);
  };

  return (
    <div className={classes.modalBackground}>
      <div className={classes.modalContainer}>
        <div className={classes.titleCloseBtn}>
          <button onClick={() => closeModal(false)}>X</button>
        </div>
        <div className={classes.body}>
          <form action='#' className={classes.form}>
            <label htmlFor='title'>Title:</label>
            <input
              type='text'
              name='title'
              id='title'
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor='body'>Description:</label>
            <textarea
              name='body'
              id='body'
              placeholder='Description'
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
            />
          </form>
        </div>
        <div className={classes.footer}>
          <button onClick={() => closeModal(false)}>Cancel</button>
          <button disabled={isLoading} onClick={handleUpdate}>
            {isLoading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
