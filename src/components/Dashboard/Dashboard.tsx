import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_DOCTORS_WITH_ROOMS } from '../../graph/Query/dashboard';
import DoctorInfo from './DoctorInfo/DoctorInfo';
import { GET_ALL_ALERTS } from '../../graph/Query/alert';
import UpdateStatus from './UpdateStatus/UpdateStatus';
import style from './Dashboard.module.scss';

const Dashboard = () => {
  const { data } = useQuery(GET_DOCTORS_WITH_ROOMS);

  const { data: alertsData } = useQuery(GET_ALL_ALERTS);

  const [editStatus, setEditStatus] = useState(0);
  const [alerts, setAlerts] = useState();
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      fullname: 'init',
      rooms: [
        {
          id: 1,
          name: 'init',
          statusId: 1,
          status: {
            id: 1,
            name: 'init',
            color: 'init',
            textColor: 'init',
          },
        },
      ],
      specialization: {
        name: 'init',
      },
    },
  ]);

  useEffect(() => {
    if (data) {
      setDoctors(data.getDoctors);
    }
  }, [data]);

  useEffect(() => {
    if (alertsData) {
      setAlerts(alertsData.getAllAlerts);
    }
  }, [alertsData]);

  console.log('Doctors: ', doctors);
  // console.log('Alerts: ', alerts)
  // console.log("Editing room: ",editStatus)

    return (
    <div className={style.dashboard}>
      {doctors
        ? doctors.map((doctor) => (
            <DoctorInfo
              editStatus={editStatus}
              setEditStatus={setEditStatus}
              key={doctor.id}
                // @ts-ignore
              doctor={doctor}
            />
          ))
        : null}

      {editStatus ? (
        <UpdateStatus
          setDoctors={setDoctors}
          setEditStatus={setEditStatus}
          editStatus={editStatus}
            // @ts-ignore
          alerts={alerts}
        />
      ) : null}
    </div>
  );
};

export default Dashboard;
