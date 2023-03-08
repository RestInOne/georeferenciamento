import { atom } from "recoil";
import { IClient } from "../../domain/entities/client";

export const clientOnModal = atom<IClient | null>({
    key: 'clientOnModal',
    default: null
})

export const modalIsActive = atom<boolean>({
    key: 'modalIsActive',
    default: false
})