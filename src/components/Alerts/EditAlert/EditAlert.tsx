import React from 'react';
import { Form, Field } from 'react-final-form';
import { gql, useMutation } from '@apollo/client';
import { AlertInterface } from '../Alerts';
import { UPDATE_ALERT } from '../../../graph/Mutations/alert';
import style from '../Alerts.module.scss';
import Close from '../../../assets/RoomDelete.svg';

interface editAlertProps {
  edit: number;
  alert: AlertInterface;
  setEdit: (id: number) => void;
}

// create container component
const EditAlert = ({ edit, alert, setEdit }: editAlertProps) => {
  const close = () => {
    setEdit(0);
  };

  const [updateAlert] = useMutation(UPDATE_ALERT, {
    update(cache, { data: { updatedAlert } }) {
      cache.modify({
        fields: {
          alerts(existingAlerts: any[] = []) {
            const newAlertsRef = cache.writeFragment({
              data: updatedAlert,
              fragment: gql`
                fragment AlertInput on Alert {
                  id
                  color
                  name
                  textColor
                }
              `,
            });
            return [...existingAlerts, newAlertsRef];
          },
        },
      });
    },
  });

  const updAlert = (editId: number, newAlert: AlertInterface) => {
    console.log(`Id: ${editId} Alert: ${newAlert}`);
    updateAlert({
      variables: {
        id: editId,
        newAlert,
      },
    }).then((a) => {
      console.log('New alert', a);
      setEdit(0);
    });
  };

  const onSubmit = (formData: AlertInterface) => {
    updAlert(edit, formData);
  };

  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <div className={style.closeButtonWrapper}>
          <img className={style.closeButton} onClick={close} src={Close} alt="" />
        </div>
        <span className={style.createAlertText}>Edit alert</span>
        <Form
          initialValues={{ name: alert.name, color: alert.color }}
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form className={style.createFormWrapper} onSubmit={handleSubmit}>
              <Field name="name">
                {({ input, meta }) => (
                  <div className={style.createFormNameWrapper}>
                    <span className={style.nameText}>Name: </span>
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
              <Field name="color">
                {({ input, meta }) => (
                  <div className={style.createFormNameWrapper}>
                    <span className={style.nameText}>Color: </span>
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
              <button className={style.saveButton} id="submitBtn" type="submit">
                Save
              </button>
            </form>
          )}
        />
      </div>
      <div onClick={close} className={style.modalCloser} />
    </div>
  );
};

export default EditAlert;
