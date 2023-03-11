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

export const addressFilter = atom<string[]>({
  key: 'addressFilter',
  default: []
})

export const runTimeAddressFilter = atom<string>({
  key: 'runTimeAddressFilter',
  default: ''
})

export const matchedAddresses = selector<string[]>({
  key: 'matchedAddresses',
  get: ({get}) => {
    const runTime = get(runTimeAddressFilter)
    const addresses = get(clientAddresses)
    if (!runTime) return []

    const addressesInArray : string[] = addresses.map(address => [address.city, address.number+'', address.state, address.street]).flat()

    return addressesInArray.filter(data => {
      return !!data.match(runTime)?.length
    })
  }
})

export const filteredAddressClients = selector<IClient[]>({
  key: 'filteredAddressClients',
  get: ({get}) => {
    const client = get(clients)
    const filter = get(matchedAddresses)

    let filteredAddressClients : IClient[] = []

    if (filter.length > 0){
      client.forEach((client, index, clientsArray) => {
        let keys = Object.keys(client.address)
        keys.forEach(key => {
          for (let i = 0; i < filter.length; i++) {
            if (client.address[`${key}`] === filter[i]){
              if(!filteredAddressClients.includes(clientsArray[index])){
              filteredAddressClients.push(clientsArray[index])  
             } else {
              if (filteredAddressClients.includes(clientsArray[index])){
                const foundedIndex = filteredAddressClients.findIndex(address => address === clientsArray[index])
                filteredAddressClients.splice(foundedIndex, 1)
              }
             }}
          }
        })
      })
    } else {
      filteredAddressClients = []
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
    const conditionsFilter = get(conditionFilter)

    let filteredClients : IClient[] = []
    if (!conditions.length && !addresses.length) return client   
    if (conditions.length && addresses.length) {
      for (const condition of conditions) {
        filteredClients.push(addresses.find((client) => client === condition));
      }
    } 
    if (!conditions.length && addresses.length && conditionsFilter.length) return []; 
    if (!conditions.length && addresses.length && !conditionsFilter.length) return addresses;    
    return conditions
  }
})