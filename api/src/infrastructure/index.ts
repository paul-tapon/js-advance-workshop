import * as dotenv from 'dotenv';

dotenv.config();

// Create a configuration object to hold those environment variables.
const appConfig = {
    // JWT important variables
    jwt: {
        // The secret is used to sign and validate signatures.
        secret: process.env.JWT_SECRET_KEY,
        // The audience and issuer are used for validation purposes.
        audience: process.env.JWT_AUDIENCE,
        issuer: process.env.JWT_ISSUER,
        expiration : process.env.JWT_EXPIRATION_SECONDS+'s' || '900s'
    },
    // The basic API port and prefix configuration values are:
    port: process.env.PORT_NUMBER || 3000,
    database :
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
};

// Make our confirmation object available to the rest of our code.
export default appConfig;

