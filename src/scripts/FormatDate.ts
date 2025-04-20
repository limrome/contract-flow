export const formatDate = (dateString: string) => {
    const newDateString = dateString.split('T')[0];
    return (
        `${newDateString.split('-')[2]}.${newDateString.split('-')[1]}.${newDateString.split('-')[0]}`
    );
};
