import { Pool } from 'pg'

const dsn = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'db_webschool',
    port: '5432'
})

dsn.connect()
    .then(() => console.log('✅ Connected to PostgreSQL'))
    .catch(err => console.error('❌ Connection error:', err.stack));

export default dsn;