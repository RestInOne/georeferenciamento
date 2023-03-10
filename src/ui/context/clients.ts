import { atom, selector } from "recoil";
import { IAddress } from "../../domain";
import { IClient } from "../../domain/entities/client";
import { ConditionName, ICondition } from "../../domain/entities/condition";


export const clients = atom<IClient[]>({
    key: 'clients',
    default: []
})

export const clientAddresses = selector<IAddress[]>({
  key: 'clientAddresses',
  get: ({get}) => {
    const client = get(clients)

    let clientAddresses : IAddress[] = []

    client.forEach((client) => {
      clientAddresses.push(client.address)
    })

    return clientAddresses
  }
})

export const conditionFilter = atom<ConditionName[]>({
  key: 'conditionFilter',
  default: []
})

export const filteredConditionClients = selector<IClient[] | null>({
  key: 'filteredConditionClients',
  get: ({ get }) => {
    const client = get(clients)
    const filters = get(conditionFilter)

    let filteredConditionClients : IClient[] = []

    if (!filters.length){
      filteredConditionClients = []   
    }
    else {
      client.forEach((client, index, clientsArray) => {
      for (let i = 0; i < filters.length; i++){
        if (clientsArray[index].exam.conditions.some((condition) => condition.name === filters[i])) {
          filteredConditionClients.push(clientsArray[index])
        } 
      }
      })
    }

    return filteredConditionClients
  }
  }
)

export const addressFilter = atom<string>({
  key: 'addressFilter',
  default: ''
})

export const runTimeAddressFilter = atom<string[]>({
  key: 'runTimeAddressFilter',
  default: []
})

export const filteredAddressClients = selector<IClient[]>({
  key: 'filteredAddressClients',
  get: ({get}) => {
    const client = get(clients)
    const filter = get(addressFilter)

    let filteredAddressClients : IClient[] = []

    if(!filter.length){
      filteredAddressClients = []
    } else {
      client.forEach((client, index, clientsArray) => {
          let keys = Object.keys(client.address)
          keys.forEach(key => {
            if (client.address[`${key}`] === filter){
              filteredAddressClients.push(clientsArray[index])  
            }
          })
     }  )
    }

    return filteredAddressClients
  }
})

export const filteredClients = selector<IClient[]>({
  key: 'filteredClients',
  get: ({get}) => {
    const client = get(clients)
    const conditions = get(filteredConditionClients)
    const addresses = get(filteredAddressClients)

    let filteredClients : IClient[] = []

    if(!conditions.length && !addresses.length){
      filteredClients = client
    } else {
      switch (true){
        case conditions.length !== 0 && !addresses.length:
          filteredClients = conditions
        break;
        case addresses.length !== 0  && !conditions.length:
          filteredClients = addresses
        break;
        case conditions.length !== 0 && addresses.length !== 0:
          let newClients = []
          for(let i = 0; i < conditions.length; i++){
            newClients.push(addresses.find(client => client === conditions[i]))
          }
          filteredClients = newClients
        break;
      }
    }

    return filteredClients
  }
})