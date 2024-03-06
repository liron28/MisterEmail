import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    createEmail,
    filterEmails,
    getDefaultFilter
}

const STORAGE_KEY = 'EMAILS'

_createEmails()

async function query(query) {
    let emails = await storageService.query(STORAGE_KEY)
    if (query) {
        let { searchStr, mail, status } = query
        mail = mail || ''
        searchStr = searchStr || ''
        status = status || ''
        emails = filterEmails(emails, mail, status)
        emails = emails?.filter(email => email.subject.toLowerCase().includes(searchStr.toLowerCase()))
    }
    return emails
}

async function getById(id) {
    const email = await storageService.get(STORAGE_KEY, id)
    email.isRead = true
    save(email)
    return email
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(emailToSave) {
    if (emailToSave.id) {
        return storageService.put(STORAGE_KEY, emailToSave)
    } else {
        emailToSave.isOn = false
        return storageService.post(STORAGE_KEY, emailToSave)
    }
}


function createEmail( subject = '', body = '', isRead= false, isStarred= false, sentAt = 0, removedAt = null, from= 'liron.d28@gmail.com',to= '') {
    return {
        subject,
        body,
        isRead,
        isStarred,
        sentAt,
        removedAt,
        from,
        to,
    }
}

function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length) {
        emails = [
            { id: 'e101',
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: false,
            isStarred: false,
            sentAt : 1551133930594,
            removedAt : null, //for later use
            from: 'momo@momo.com',
            to: 'user@appsus.com'
             },
            { id: 'e102',
            subject: 'Text me!',
            body: 'Whatsup',
            isRead: false,
            isStarred: false,
            sentAt : 1551558630594,
            removedAt : null, //for later use
            from: 'lili@lili.com',
            to: 'user@appsus.com'
             },
            { id: 'e103',
            subject: 'Hi you!',
            body: 'Hello',
            isRead: false,
            isStarred: false,
            sentAt : 9856413930594,
            removedAt : null, //for later use
            from: 'bobo@bobo.com',
            to: 'user2@appsus.com'
             },
            { id: 'e104',
            subject: 'Not now!',
            body: 'Not ready',
            isRead: false,
            isStarred: false,
            sentAt : 1332233930594,
            removedAt : null, //for later use
            from: 'mimi@mimi.com',
            to: 'user1@appsus.com'
             }
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}

function getDefaultFilter(route) {
    route = route?.includes('/') ? route.substring(1) : route
    return {
        searchStr: '',
        mail: route
    }
}

function filterEmails(emails, by, status) {
    let filterByStatus
    switch (status) {
        case 'read':
            filterByStatus = emails.filter(email => email.isRead)
            break
        case 'unread':
            filterByStatus = emails.filter(email => !email.isRead)
            break
        default:
            filterByStatus = emails
    }
    switch (by) {
        case 'inbox':
            return filterByStatus.filter(email => email.to === loggedinUser.email)
        case 'sent':
            return filterByStatus.filter(email => email.from === loggedinUser.email)
        case 'starred':
            return filterByStatus.filter(email => email.isStarred)
        case 'drafts':
            return filterByStatus.filter(email => !email.sentAt)
        case 'trash':
            return filterByStatus.filter(email => email.removedAt)
    }
}


