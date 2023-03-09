import { atom, selector } from "recoil";
import { IClient } from "../../domain/entities/client";
import { ConditionName, ICondition } from "../../domain/entities/condition";


export const clients = atom<IClient[]>({
    key: 'clients',
    default: []
})

export const filter = atom<ConditionName[]>({
  key: 'filter',
  default: []
})

export const filteredGeolocationClients = selector<IClient[] | null>({
  key: 'filteredGeolocationClients',
  get: ({ get }) => {
    const client = get(clients)
    const filters = get(filter)

    let filteredGeolocationClients : IClient[] = []

    if (!filters.length){
      filteredGeolocationClients = client    
    }
    else {
      client.forEach((client, index, clientsArray) => {
      for (let i = 0; i < filters.length; i++){
        if (clientsArray[index].condition.some((condition) => condition.name === filters[i])) {
          filteredGeolocationClients.push(clientsArray[index])
        } 
      }
      })
    }

    return filteredGeolocationClients
  }
  }
)