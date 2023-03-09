const useFormatNameCondition = () => {
    return (nameCondition: string) => {
        const words = nameCondition.split(' ');

        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            words[i] = word.charAt(0).toUpperCase() + word.slice(1);
        }

        return words.join(' ').replace(/_/g, ' ');
    }
}

export default useFormatNameCondition;