import React from 'react';
import {assistantsInterface} from "./Assistants";
import style from '../../Stuff.module.scss';
import Trash from '../../../../assets/Trash.svg'
import Edit from '../../../../assets/EditPen.svg'

interface assistantProps {
    assistant: assistantsInterface
    setEdit: (id: number) => void
    setDeleteId: (id: number) => void
}

const Assistant = ({assistant, setEdit, setDeleteId}: assistantProps) => {

    const editAssistant = () => {
        setEdit(assistant.id);
    }

    const deleteAssistant = () => {
        setDeleteId(assistant.id);
    }

    return (
        <div className={style.personWrapper}>
            <div className={style.person}>
                <span className={style.personId}>{assistant.id}</span>
                <span className={style.doctorName}>{assistant.fullname}</span>
                <span className={style.doctorLogin}>{assistant.login}</span>
                <span>{assistant.phone}</span>
                <div className={style.buttonWrapper}>
                    <img className={style.button} onClick={editAssistant} src={Edit} alt=""/>
                    <img className={style.button} onClick={deleteAssistant} src={Trash} alt=""/>
                </div>
            </div>
        </div>
    );
};

export default Assistant;