import { atom, selector } from "recoil";
import { IAddress } from "../../domain";
import { IClient } from "../../domain/entities/client";
import { ConditionName } from "../../domain/entities/condition";


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
    if (!filters.length) return [];
    client.forEach((client, index, clientsArray) => {
      for (const filter of filters){
        const haveSomeConditionInClient = clientsArray[index].exam.conditions.some((condition) => condition.name === filter);
        if (haveSomeConditionInClient) return filteredConditionClients.push(clientsArray[index])
      }
    })
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

    return addressesInArray.filter(data => !!data.match(runTime)?.length)
  }
})

export const filteredAddressClients = selector<IClient[]>({
  key: 'filteredAddressClients',
  get: ({get}) => {
    const client = get(clients)
    const filters = get(matchedAddresses)

    let filteredAddressClients : IClient[] = []
    if(!filters.length) return [];

    client.forEach((client, index, clientsArray) => {
      Object.keys(client.address).forEach(key => {
        const clientAddress = client.address[key];
        const IncludesClientInFilteredAddressClients = filteredAddressClients.includes(clientsArray[index]);
        for (const filter of filters) {
          if (clientAddress !== filter) return [];
          if(!IncludesClientInFilteredAddressClients){
            filteredAddressClients.push(clientsArray[index])  
          } else {
            const foundedIndex = filteredAddressClients.findIndex(address => address === clientsArray[index])
            filteredAddressClients.splice(foundedIndex, 1)
          }
        }
      })
    })
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