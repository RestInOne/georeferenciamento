import MapWithPin from "../src/components/map-pin";

const geolocation = {
    lat: -23.5518973,
    lon: -46.6344698
}

export default function Pin(){
    return <MapWithPin {...geolocation}/>
}