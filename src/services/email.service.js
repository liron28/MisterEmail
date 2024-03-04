import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    loggedinUser,
    createEmail,
}

const STORAGE_KEY = 'emails'

_createEmails()

async function query(filterBy) {
    const emails = await storageService.query(STORAGE_KEY)
    if (filterBy) {
        var { type, maxBatteryStatus, minBatteryStatus, model } = filterBy
        maxBatteryStatus = maxBatteryStatus || Infinity
        minBatteryStatus = minBatteryStatus || 0
        emails = emails.filter(robot => robot.type.toLowerCase().includes(type.toLowerCase()) && robot.model.toLowerCase().includes(model.toLowerCase())
            && (robot.batteryStatus < maxBatteryStatus)
            && robot.batteryStatus > minBatteryStatus)
    }
    return emails
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
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

function loggedinUser(){
    return{
        email: '',
        fullname: '',
    }
}
function getDefaultFilter() {
    return {
        status: '',
        txt: '', // no need to support complex text search
        isRead: null, // (optional property, if missing: show all)
    }
}

function createEmail(id = '',
    subject = '',
    body = '',
    isRead= false,
    isStarred= false,
    sentAt = '',
    removedAt = null, //for later use
    from= '',
    to= '') {
    return {
        id,
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
            sentAt : 1551133930594,
            removedAt : null, //for later use
            from: 'lili@lili.com',
            to: 'user@appsus.com'
             },
            { id: 'e103',
            subject: 'Hi you!',
            body: 'Hello',
            isRead: false,
            isStarred: false,
            sentAt : 1551133930594,
            removedAt : null, //for later use
            from: 'bobo@bobo.com',
            to: 'user2@appsus.com'
             },
            { id: 'e104',
            subject: 'Not now!',
            body: 'Not ready',
            isRead: false,
            isStarred: false,
            sentAt : 1551133930594,
            removedAt : null, //for later use
            from: 'mimi@mimi.com',
            to: 'user1@appsus.com'
             }
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}




