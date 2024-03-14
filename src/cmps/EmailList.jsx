import { EmailPreview } from "./EmailPreview"

export function EmailList({ emails, emailDetails }) {
  
  return (
    <table className='email-list'>
        <tbody>
            {emails?.map((email) =>
                <EmailPreview key={email.id}
                    emailPreview={email}
                    onOpenMailDetails={emailDetails}
                />
            )}
        </tbody>
    </table>
  )
}
