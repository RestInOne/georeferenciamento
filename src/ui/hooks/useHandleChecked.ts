import React from 'react';
import { useRecoilState } from 'recoil';
import { conditionFilter } from '../context/clients';

const useHandleChecked = () => {
    const [filters, setFilters] = useRecoilState(conditionFilter);
    return (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.checked) {
            setFilters(old => [...old, (event.target.value as any)])
          } else {
            const newFilters = [...filters]
            newFilters.splice(newFilters.findIndex((item: any) => item === event.target.value), 1)
            setFilters(newFilters)
          }
    }
}

export default useHandleChecked;