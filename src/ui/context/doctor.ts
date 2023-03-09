import { atom } from 'recoil'
import { IDoctor } from '../../domain'

export const doctorLoggedIn = atom<IDoctor>({
    key: 'doctorLoggedIn',
    default: {
        id: "443442343fef",
        name: "Dr. Armando Coelho",
        clinic_id: "fmfmimf435"
    }
})