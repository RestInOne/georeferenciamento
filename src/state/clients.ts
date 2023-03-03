import { atom, selector } from "recoil";
import { Filters } from "../enums/filter";
import getGeolocationByAddress from "../gateways/getGeolocation";
import { IClient } from "../interfaces/client";
import { ICondition } from "../interfaces/condition";
import { IGeolocation } from "../interfaces/geolocation";


export const clients = atom<IClient[]>({
  key: 'clients',
  default: [{
    id: "434324324",
    name: "Algum Nome",
    cpf: "434234324324",
    bornYear: 2005,
    age: 17,
    condition: [{
      name: Filters.ADHD,
    }],
    address: {
      street: "Rua Victório Santim",
      number: 3086
    }
  }]
})

export const clientGeolocation = selector<IGeolocation[]>({
  key: 'clientGeolocation',
  get: async ({ get }) => {
    const client = get(clients)
    let geolocation: IGeolocation[] = []
    for (let i = 0; i < client.length; i++) {
      geolocation.push(await getGeolocationByAddress(client[i].address.street, client[i].address.number))
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
  get: async ({ get }) => {
    const client = get(clients)
    const filters = get(filter)

    let geolocation: IGeolocation[] = []

    const filteredClients = client.filter(client => client.condition === filters)


    if (filters[0].name === Filters.EVERY) {
      for (let i = 0; i < client.length; i++) {
        geolocation.push(await getGeolocationByAddress(client[i].address.street, client[i].address.number))
      }
    } else {
      for (let i = 0; i < filteredClients.length; i++) {
        geolocation.push(await getGeolocationByAddress(filteredClients[i].address.street, filteredClients[i].address.number))
      }
    }


    return geolocation
  }
})