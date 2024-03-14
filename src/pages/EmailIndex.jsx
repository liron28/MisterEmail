import { useEffect, useState } from 'react'
import { useLocation, useNavigate, Outlet, useParams } from 'react-router-dom'

import { emailService } from '../services/email.service'

import { AppHeader } from '../cmps/AppHeader'
import { AppsGoogleSide } from '../cmps/AppsGoogleSide'
import { StatusFolders } from '../cmps/StatusFolders'
import { Main } from '../cmps/Main'

export function EmailIndex() {
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams()

  const [emails, setEmails] = useState(null)
  const [error, setError] = useState(null)
  const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter(location.pathname))

  useEffect(() => {
    loadEmails()
  }, [filterBy])

  useEffect(() => {
    onSetFilter(emailService.getDefaultFilter())
    // loadEmails()
  }, [params.mailStatus])

  function onSetFilter(fieldsToUpdate) {
    if (fieldsToUpdate.mail === 'compose') {
        navigate(`${location.pathname}/compose`)
    }
    setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }));
  }
  async function loadEmails() {
    try {
        const emails = await emailService.query({ ...filterBy, mail: params.mailStatus })
        setEmails(emails)
        // console.log(emails);
        setError(null)
    } catch (err) {
        setError(err)
    }
  }
  function handleIconClicked(type) {
  }

  if (error) return (<div>
    <h1>Oops... Somthing went wrong</h1>
    <p>{error}</p>
  </div>)

  return (
    <div className='email-index'>
      <AppHeader filterBy={filterBy} onSetFilter={onSetFilter} />
      <StatusFolders onSetFilter={onSetFilter} />
      <Main emails={emails} filterByStatus={onSetFilter} handleIconClicked={handleIconClicked} />
      <AppsGoogleSide />

    </div>
  )
}
