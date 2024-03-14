import { useState } from "react"
import { Icon } from './Icon';
import path from '../services/image-path'
import { PrevMailActionBtn } from './PrevMailActionBtn';

export function EmailPreview({ emailPreview: email, onOpenMailDetails }) {
  const [isStarred, setIsStarred] = useState(email.isStarred)
  const [isHover, setIsHover] = useState(false)
  const [isSelected, setIsSelected] = useState(false)

  const starImg = isStarred ? path.starFillImg : path.starImg
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(email.sentAt)

  async function handleStarChange(ev){
    ev.stopPropagation()
    const email= {...email, isStarred: !email.isStarred}
  }
  function handleHoverToggle() {
    setIsHover(!isHover)
  }

function onHandleOpenMailDetails(ev, selected) {
    onOpenMailDetails(email, '')
  }
function onToggleSelectEmail(ev, selected) {
    setIsSelected(ev.target.checked)
    onOpenMailDetails(selected, 'checkboxSelected', ev.target.checked)
    ev.stopPropagation()
  }

  return (
    <tr className={[email.isRead ? '' : 'bold ', isSelected ? 'selected' : '']}
            onClick={(ev) => onHandleOpenMailDetails(ev, email)}
            onMouseEnter={handleHoverToggle}
            onMouseLeave={handleHoverToggle}
        >
            <td><input type="checkbox" onClick={(ev) => onToggleSelectEmail(ev, email)} /></td>
            <td onClick={handleStarChange}>
                <Icon iconData={{ src: starImg, style: 'remove-padding' }} /> </td>
            <td>{email.subject} </td>
            <td><div className='text-preview'>{email.body}</div> </td>
            <td>
                {!isHover ? <div>{formattedDate}</div> : <PrevMailActionBtn path={path} />}
            </td>
        </tr>
  )
}
