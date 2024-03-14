
import { emailService } from '../services/email.service'
import path from "../services/image-path"
import { Icon } from './Icon'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'



export function EmailCompose() {
    const [form, setForm]= useState(emailService.createEmail())
    const navigate = useNavigate()

    useEffect(() =>{

    },[form])

    async function onSubmit(ev) {
        ev.preventDefault()
        await emailService.save(form)
        navigate(-1)
    }

    function handleChange(ev) {
        let { value, name: field, type } = ev.target
        value = type === 'number' ? +value : value
        setForm(prev => ({ ...prev, [field]: value }))

    }

  return (
    <div className='email-compose'>
        <div>
            <div className='header-container'>
                <header >New Message</header>
                <span onClick={() => navigate(-1)} >
                    <Icon iconData={{ src: path.x }} />
                </span>
            </div>
            <form action="" onSubmit={(ev) => onSubmit(ev)}>
                <label htmlFor="from" >
                    <input type="text" name='from' value={form.from}
                        onChange={handleChange}
                        disabled placeholder='From Liron Dahan <liron.d28@gmail.com>' />
                </label>
                <label htmlFor="to" >
                    <input required type="text" onChange={handleChange}
                        name='to' value={form.to} placeholder='To' />
                </label>
                <label htmlFor="subject">
                    <input required type="text" onChange={handleChange}
                        name='subject' value={form.subject} placeholder='Subject' />
                </label>
                <textarea required name="body" onChange={handleChange}
                    id="" cols="100" value={form.body} rows="40"></textarea>
                <button>Send</button>
            </form>
        </div>
    </div>
  )
}

