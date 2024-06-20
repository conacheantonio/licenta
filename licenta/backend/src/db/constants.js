
const ACCOUNT_STATUSES = {
    active: 'ACTIVE',
    waiting: 'WAITING FOR APPROVE',
    banned: 'BANNED'
}

const ORDER_STATUSES = {
    approved: 'APPROVED',
    processing: 'PROCESSING',
    denied: 'DENIED'
}

const EXTEND_STATUSES = {
    // this can also be null
    approved: 'APPROVED',
    processing: 'WAITING FOR APPROVE',
    denied: 'DENIED'
}

const USER_ROLES = {
    reader: 'READER',
    admin: 'ADMIN'
}

module.exports = {
    ACCOUNT_STATUSES,
    ORDER_STATUSES,
    EXTEND_STATUSES,
    USER_ROLES
}
