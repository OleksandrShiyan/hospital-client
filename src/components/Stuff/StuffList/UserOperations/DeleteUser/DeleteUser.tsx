import React from 'react';
import { DocumentNode, useMutation } from '@apollo/client';
import { DELETE_USER } from '../../../../../graph/Mutations/user';
import { GET_ASSISTANTS, GET_DOCTORS, GET_RECEPTIONISTS } from '../../../../../graph/Query/stuff';
import style from '../../../Stuff.module.scss';
import Close from '../../../../../assets/RoomDelete.svg';

interface deleteUserProps {
  deleteId: number;
  setDeleteId: (id: number) => void;
  userRole: number;
}

const DeleteUser = ({ deleteId, setDeleteId, userRole }: deleteUserProps) => {
  const [deleteUser] = useMutation(DELETE_USER);

  const cancel = () => {
    setDeleteId(0);
  };

  const dltUser = (deleteId: number, query: DocumentNode) => {
    console.log('DeleteId: ', deleteId);
    deleteUser({
      variables: {
        id: deleteId,
      },
      refetchQueries: [{ query }],
    }).then(() => {
      setDeleteId(0);
    });
  };

  const cancelButton = () => {
    setDeleteId(0);
  };
  const deleteButton = () => {
    if (userRole === 2) {
      dltUser(deleteId, GET_DOCTORS);
    }
    if (userRole === 3) {
      dltUser(deleteId, GET_ASSISTANTS);
    }
    if (userRole === 4) {
      dltUser(deleteId, GET_RECEPTIONISTS);
    }
  };

  return (
    <div className={style.modal}>
      <div className={style.deleteWorkerWrapper}>
        <div className={style.closeButtonWrapper}>
          <img className={style.closeButton} onClick={cancel} src={Close} alt="" />
        </div>
        <div className={style.deleteFormWrapper}>
          <span className={style.editRoomText}>Delete Doctor</span>
          <div>Are you sure you want to delete this doctor?</div>
          <div className={style.deleteFormButtonsWrapper}>
            <button type="button" className={style.deleteButton} onClick={cancelButton}>
              Cancel
            </button>
            <button type="button" className={style.deleteButton} onClick={deleteButton}>
              Delete
            </button>
          </div>
        </div>
      </div>
      <div onClick={cancel} className={style.modalCloser}/>
    </div>
  );
};

export default DeleteUser;