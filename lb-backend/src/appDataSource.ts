import { DataSource } from "typeorm"

//Changed to true
const AppDataSource = new DataSource({
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "1234",
    "database": "lb-article",
    "entities": ["src/entity/*ts"],
    "logging": true,
    "synchronize": true
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.log("Error during Data Source initialization", err)
    })

export default AppDataSource