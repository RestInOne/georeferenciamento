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
      filteredConditionClients = client    
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

export const addressFilter = atom<string[]>({
  key: 'addressFilter',
  default: []
})

export const runTimeAddressFilter = atom<string[]>({
  key: 'runTimeAddressFilter',
  default: []
})

export const matchedFilterAddresses = selector<string[]>({
  key: 'matchedFilterAddresses',
  get: ({get}) => {
    const addressesAvailable = get(clientAddresses)
    const addressesOnFilter = get(runTimeAddressFilter)

    let matchedFilterAddresses : string[] = []

    addressesOnFilter.forEach((filterAddress) => {
      const lowercasedFilterAddress = filterAddress.toLowerCase()
        let lowercasedAvailableAddress : string[] = []
        addressesAvailable.forEach((information) => {
          let number = information.number+'';
          let street = information.street;
          let city = information.city;
          let district = '';
          let state = '';

          if(information.state){
              state = information.state
          }
          if(information.district){
              district = information.district
          }
          let all = `${street} ${district} ${city} ${state} ${number}`
          lowercasedAvailableAddress.push(all.toLowerCase())
        })

      for(let i = 0; i < lowercasedAvailableAddress.length; i++){
        if (lowercasedAvailableAddress[i].includes(lowercasedFilterAddress) && lowercasedFilterAddress !== ''){  
            matchedFilterAddresses.forEach(match => {
              if (!match.includes(lowercasedFilterAddress)){
                matchedFilterAddresses.push(lowercasedAvailableAddress[i].toUpperCase())
              }
            })     
        }
      }
    })

    return matchedFilterAddresses
  }
})

export const filteredAddressClients = selector<IClient[]>({
  key: 'filteredAddressClients',
  get: ({get}) => {
    const client = get(clients)
    const filters = get(addressFilter)

    let filteredAddressClients : IClient[] = []

    if(!filters.length){
      filteredAddressClients = client
    } else {
      client.forEach((client, index, clientsArray) => {
        for (let i = 0; i < filters.length; i++){
          if (Object.keys(client.address).some((information) => information === filters[i])) {
            filteredAddressClients.push(clientsArray[index])
          } 
        }
        })
    }

    return filteredAddressClients
  }
})