import { useEffect, useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router';

import { EmailList } from "./EmailList.jsx";
import { MainHeader } from './MainHeader.jsx';

export function Main({ emails, filterByStatus, handleIconClicked }) {
    const [emailDetails, setEmailDetails] = useState(null)
    const [selectedEmails, setSelectedEmails] = useState([])
    const [isToggle, setIsToggle] = useState(null)
    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams()
    

    useEffect(() => {
        setEmailDetails(null)
    }, [emails, isToggle])
    function onEmailDetails(email, isToggle, checked) {
        if (isToggle) {

        } else {
            setEmailDetails(email)
            navigate(`${location.pathname}/${email.id}`)
        }
    }

    function handleBack() {
        setEmailDetails(null)
    }


    return (
        <div className='main'>
            <MainHeader onSelected={filterByStatus} onIconClicked={handleIconClicked} showActions={selectedEmails.length} />
            {!emails?.length && (<div>No emails found</div>)}
            {!params.emailId && <EmailList emails={emails} emailDetails={onEmailDetails} />}

            <Outlet />
        </div>
    )
}