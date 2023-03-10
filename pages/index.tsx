import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { getGeolocation } from '../src/infra/gateways/getGeolocation'
import { IClient } from '../src/domain/entities/client'
import Home from '../src/ui/screens/Home'
import { clients } from '../src/ui/context'
import { getClients } from '../src/infra/gateways/getClients'
import useFormatNameCondition from '../src/ui/hooks/useFormatNameCondition'
import { ConditionName } from '../src/domain'

export default function Index({ propClients, data } : InferGetServerSidePropsType<typeof getServerSideProps>) {

  const [newClients, setClients] = useRecoilState(clients)

  if(newClients.length === 0){
    setClients(propClients)
  }

  return (
    <>
      <Head>
        <title>Georeferenciamento</title>
        <meta name="description" content="Mapa de georeferenciamento de pacientes" />
      </Head>
      <Home/>
    </>
  )
}

export const getServerSideProps : GetServerSideProps = async () => {

  const data = await getClients()

  const propClients : IClient[] = [
    {
      id: "434324324",
      name: "Sandro Curió",
      cpf: "284549249",
      age: 17,
      exam: {
        id: "d02857589",
        conditions: [
          {
          name: ConditionName.LIGHT_RESISTENCE_INSULINE
          },
          {
          name: ConditionName.DIABETES
          }
        ],
        doctor_id: "123",
        patient_id: "434324324",
        date: '2023-03-09'
      },
      address: {
        street: "Rua Francisco Rodrigues Seckler",
        number: 111,
        city: "São Paulo",
        state: "São Paulo"
      },
      geolocation: await getGeolocation({street: "Rua Francisco Rodrigues Seckler", number: 111, city: "São Paulo"})
    },
    {
      id: "jfjfd8jd0g",
      name: "Carlos Simão",
      cpf: "339392495",
      age: 17,
      exam: {
        id: "d594039",
        conditions: [
          {
          name: ConditionName.MEDIUM_RESISTENCE_INSULINE
          }
        ],
        doctor_id: "123",
        patient_id: "jfjfd8jd0g",
        date: '2023-03-09'
      },
      address: {
        street: "Rua Virgínia Ferni",
        number: 400,
        city: "São Paulo",
        state: "São Paulo"
      },
      geolocation: await getGeolocation({street: "Rua Virgínia Ferni", number: 400, city: "São Paulo"})
    },
    {
      id: "kghkf8d830",
      name: "Samuel Cunha",
      cpf: "3983943948",
      age: 17,
      exam: {
        id: "d32d3d22d",
        conditions: [
          {
          name: ConditionName.MEDIUM_AMPUTATION_RISK
          },
          {
          name: ConditionName.OBESETY_LEVEL_ONE
          }
        ],
        doctor_id: "123",
        patient_id: "kghkf8d830",
        date: '2023-03-09'
      },
      address: {
        street: "Rua Apucarana",
        number: 300,
        city: "São Paulo",
        state: "São Paulo"
      },
      geolocation: await getGeolocation({street: "Rua Apucarana", number: 111, city: "São Paulo"})
    }
  ]

  return {
    props: {
      propClients,
      data
    }
  }
}
