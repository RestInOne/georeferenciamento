import { atom, selector } from "recoil";
import getGeolocationByAddress from "../gateways/getGeolocation";
import { IClient } from "../interfaces/client";
import { IGeolocation } from "../interfaces/geolocation";


export const clients = atom<IClient[]>({
    key: 'clients',
    default: [ {
        id: "434324324",
        name: "Algum Nome",
        cpf: "434234324324",
        bornYear: 2005,
        age: 17,
        condition: {
          name: "Depressão",
          color: "Roxo"
        },
        address: {
          street: "Rua Francisco Rodrigues Seckler",
          number: 111
        }
      } ]
})

export const clientGeolocation = selector<IGeolocation[]>({
    key: 'clientGeolocation',
    get: async ({get}) => {
        const client = get(clients)
        let geolocation : IGeolocation[] = []
        for(let i = 0; i < client.length; i++){
            geolocation.push(await getGeolocationByAddress(client[i].address.street, client[i].address.number))
        }

        return geolocation
    }
})