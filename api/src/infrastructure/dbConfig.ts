
function dbConfig()
 {
    const config = 
    {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        server: process.env.DB_SERVER ?? '', 
        database: process.env.DB_NAME,
        port : Number(process.env.DB_PORT),
        options: {
            trustServerCertificate: Boolean(process.env.DB_OPTIONS_TRUSTSERVERCERTIFICATE)
        }
    }

    return config;
}

export default dbConfig;