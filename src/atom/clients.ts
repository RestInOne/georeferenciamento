import { atom, selector } from "recoil";
import { Filters } from "../enums/filter";
import { IClient } from "../interfaces/client";
import { ICondition } from "../interfaces/condition";


export const clients = atom<IClient[]>({
    key: 'clients',
    default: []
})

export const filter = atom<ICondition[]>({
  key: 'filter',
  default: [{ name: Filters.EVERY }]
})

export const filteredGeolocationClients = selector<IClient[] | null>({
  key: 'filteredGeolocationClients',
  get: ({ get }) => {
    const client = get(clients)
    const filters = get(filter)

    let filteredGeolocationClients : IClient[] = []

    if (filters[0].name === Filters.EVERY){
      filteredGeolocationClients = client    
    }
    else {
      client.forEach((client, index, clientsArray) => {
      for (let i = 0; i < filters.length; i++){
        if (clientsArray[index].condition.some((condition) => condition.name === filters[i].name)) {
          filteredGeolocationClients.push(clientsArray[index])
        } 
      }
      })
    }

    return filteredGeolocationClients
  }
  }
)