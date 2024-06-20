const mysql = require('mysql2/promise')
const fs = require('fs')
const path = require('path')

class DB {
    constructor() {
        this.connection = null
    }

    async init() {
        this.connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'password',
            multipleStatements: true
        })
    }

    async populate() {
        await this.connection.connect()

        const setup = fs.readFileSync(path.join(__dirname, './0_create_database.sql')).toString()
        await this.connection.query(setup)

        const createTables = fs.readFileSync(path.join(__dirname, './1_create_tables.sql')).toString()
        await this.connection.query(createTables)

        const populateTables = fs.readFileSync(path.join(__dirname, './2_populate_tables.sql')).toString()
        await this.connection.query(populateTables)
    }
}

const database = new DB()

module.exports = {
    database
}
