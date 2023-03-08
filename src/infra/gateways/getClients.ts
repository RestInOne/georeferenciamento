import axios from "axios"

const apiURL = 'https://biotriagem.digitaloak.com.br/patients'
const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNmMDE4YmZiLTdlNjctNDcyYi1iMjJlLWY4ZDZmNjQzYWI3ZiIsImlhdCI6MTY3ODMwMzE4NSwiZXhwIjoxNjc5MTY3MTg1fQ.nFJP9iNzin4SVfPZDlxaYaMn2Z7bPfkb8rRyeEDghGo"

interface IResponseClient {
    cpf: string,
    id: string,
    name: string
}

export const getClients = async () => {

        let data : IResponseClient[] = []

        const response = await axios.get(
            apiURL,
            {
                headers: {
                    Authorization: `Bearer ${accessToken ? accessToken : ""}`
                }
            }
        )

        data = response.data

        let clientId = data[8].id
        
        const insulineResponse = await axios.get(
            `https://biotriagem.digitaloak.com.br/insulin-resistance/${clientId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken ? accessToken : ""}`,
                },
            }
        )

        const insulineData = insulineResponse.data

        return {insulineData, data}
}