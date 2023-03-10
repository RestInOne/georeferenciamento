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

export const runTimeAddressFilter = atom<string[]>({
  key: 'runTimeAddressFilter',
  default: []
})

export const matchedAddresses = selector<string[]>({
  key: 'matchedAddresses',
  get: ({get}) => {
    const runTime = get(runTimeAddressFilter)
    const addresses = get(clientAddresses)

    let matchedAddresses : string[] = []

    if(runTime.length > 0){
      const addressesInArray : string[] = []
      
      for(let indexCurrent = 0; indexCurrent < addresses.length; indexCurrent++) {
        addressesInArray.push(addresses[indexCurrent].city, addresses[indexCurrent].district, addresses[indexCurrent].number+'', addresses[indexCurrent].state, addresses[indexCurrent].street)
      }

      addressesInArray.forEach(value => {
        for(let i = 0; i < runTime.length; i++){
          let current = runTime[i]

          for (let index = 0; index < current.length; index++){
            if(value.at(index) === current.at(index)){
              if(!matchedAddresses.includes(value)){
                matchedAddresses.push(value)
              }} else {
                if (matchedAddresses.includes(value)){
                  const index = matchedAddresses.findIndex(address => address === value)
                  matchedAddresses.splice(index, 1)
                }
              }
            }
          }
      })
    }

    return matchedAddresses
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

    if (conditions.length > 0 || addresses.length > 0){

    if(conditions.length > 0 && addresses.length > 0){
      for(let i = 0; i < conditions.length; i++){
        filteredClients.push(addresses.find(client => client === conditions[i]))
      }
    } else if (!conditions.length && addresses.length > 0) {

      if(conditionsFilter.length > 0){
        filteredClients = []
      } else {
       filteredClients = addresses
      }
    } else {
      filteredClients = conditions
    }

   } else {
     filteredClients = client
   }

   return filteredClients
  }
})