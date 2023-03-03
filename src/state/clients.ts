import { atom, selector } from "recoil";
import { Filters } from "../enums/filter";
import { getGeolocation } from "../gateways/getGeolocation";
import { IClient } from "../interfaces/client";
import { ICondition } from "../interfaces/condition";
import { IGeolocation } from "../interfaces/geolocation";


export const clients = atom<IClient[]>({
    key: 'clients',
    default: [ {
        id: "434324324",
        name: "Algum Nome",
        cpf: "434234324324",
        bornYear: 2005,
        age: 17,
        condition:[ {
          name: Filters.ADHD,
        }],
        address: {
          street: "Rua Francisco Rodrigues Seckler",
          number: 111,
          city: "São Paulo"
        }
      } ]
})

export const clientGeolocation = selector<IGeolocation[]>({
    key: 'clientGeolocation',
    get: async ({get}) => {
        const client = get(clients)
        let geolocation : IGeolocation[] = []
        for(let i = 0; i < client.length; i++){
            geolocation.push(await getGeolocation(client[i].address.street, client[i].address.number, client[i].address.city))
        }

        return geolocation
    }
})

export const filter = atom<ICondition[]>({
  key: 'filter',
  default: [{
              name: Filters.EVERY
            }]
})

export const filteredGeolocationClients = selector<IGeolocation[]>({
  key: 'filteredGeolocationClients',
  get: async ({get}) => {
      const client = get(clients)
      const filters = get(filter)

      let geolocation : IGeolocation[] = []

      const filteredClients = client.filter(client => client.condition === filters)


      if (filters[0].name === Filters.EVERY){
        for(let i = 0; i < client.length; i++){
          geolocation.push(await getGeolocation(client[i].address.street, client[i].address.number, client[i].address.city))
      }
      } else {
        for(let i = 0; i < filteredClients.length; i++){
          geolocation.push(await getGeolocation(filteredClients[i].address.street, filteredClients[i].address.number, filteredClients[i].address.city))
      }
      }
     

      return geolocation
  }
})