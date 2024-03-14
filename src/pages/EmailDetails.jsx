import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';

import { emailService } from '../services/email.service';

import { Icon } from '../cmps/Icon'
export function EmailDetails({ onBackBtnClick }) {
    const [email, setEmail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadEmail()
    }, [])

    async function loadEmail() {
        try {
            const email = await emailService.getById(params.emailId)
            setEmail(email)
            if (!email.isRead) { }//update mail
        } catch (err) {
            console.error(`Error in load email: ${err}`)
            navigate('/inbox')
        }
    }

    if (!email) return <div>Loading...</div>
    return (
        <div div className='email-details' >
            <Link to={`/${params.mailStatus}`}>
                <Icon iconData={{ src: 'https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/arrow_back_baseline_nv700_20dp.png' }} />
            </Link>
            <div className='email-details-header flex space-between align-center'>
                <h2 className='email-details-header-title'>{email.subject}</h2>
            </div>
            <div className='email-details-body'>
                <div className='img-container'>
                    <img src="https://lh3.googleusercontent.com/a/default-user=s40-p" alt="" />
                </div>
                <main>
                    <div className='mail-info'>
                        <p>{email.from}</p>
                        <p className='email-details-header-date'>{email.sentAt}</p>
                    </div>
                    <p>{email.body}</p>
                </main>
            </div>
        </div >
    )
}