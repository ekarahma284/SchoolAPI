import { Pool } from 'pg'

const dsn = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'adminsekolah',
    port: '5432'
})

dsn.connect()
    .then(() => console.log('✅ Connected to PostgreSQL'))
    .catch(err => console.error('❌ Connection error:', err.stack));

export default dsn;



