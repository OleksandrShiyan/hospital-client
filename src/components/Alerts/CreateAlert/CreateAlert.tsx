import React from 'react';
import { Form, Field } from 'react-final-form';
import { useMutation } from '@apollo/client';
import { AlertInterface } from '../Alerts';
import { CREATE_ALERT } from '../../../graph/Mutations/alert';
import { GET_ALL_ALERTS } from '../../../graph/Query/alert';
import style from '../Alerts.module.scss';
import Close from '../../../assets/RoomDelete.svg';

interface createAlertProps {
  setCreate: (create: number) => void;
}

// create container component
const CreateAlert = ({ setCreate }: createAlertProps) => {
  const [createAlert] = useMutation(CREATE_ALERT);

  const close = () => {
    setCreate(0);
  };

  const crtAlert = (alert: AlertInterface) => {
    createAlert({
      variables: {
        alert,
      },
      refetchQueries: [{ query: GET_ALL_ALERTS }],
    }).then(() => {
      close();
    });
  };

  const onSubmit = (formData: AlertInterface) => {
    crtAlert(formData);
  };

  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <div className={style.closeButtonWrapper}>
          <img className={style.closeButton} onClick={close} src={Close} alt="" />
        </div>
        <span className={style.createAlertText}>Create alert</span>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form className={style.createFormWrapper} onSubmit={handleSubmit}>
              <Field name="name">
                {({ input, meta }) => (
                  <div className={style.createFormNameWrapper}>
                    <span className={style.nameText}>Name</span>
                    <input
                      {...input}
                      className={style.nameInput}
                      id="name"
                      type="text"
                      placeholder="name"
                    />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <div>
                <Field name="color">
                  {({ input, meta }) => (
                    <div className={style.createFormNameWrapper}>
                      <span className={style.nameText}>Color</span>
                      <input
                        {...input}
                        className={style.nameInput}
                        id="color"
                        type="text"
                        placeholder="color"
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
              <div>
                <Field name="textColor">
                  {({ input, meta }) => (
                    <div className={style.createFormNameWrapper}>
                      <span className={style.nameText}>Text Color</span>
                      <input
                        {...input}
                        className={style.nameInput}
                        id="textColor"
                        type="text"
                        placeholder="textColor"
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
              <button className={style.saveButton} id="submitBtn" type="submit">
                Save
              </button>
            </form>
          )}
        />
      </div>
      <div onClick={close} className={style.modalCloser}/>
    </div>
  );
};

export default CreateAlert;
