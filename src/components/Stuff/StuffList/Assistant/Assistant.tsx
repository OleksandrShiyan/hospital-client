import React from 'react';
import {assistantsInterface} from "./Assistants";

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
        <div>
            Id: {assistant.id} Login: {assistant.login} Phone: {assistant.phone} Fullname: {assistant.fullname}
            <button onClick={editAssistant}>Edit</button>
            <button onClick={deleteAssistant}>Delete</button>
        </div>
    );
};

export default Assistant;