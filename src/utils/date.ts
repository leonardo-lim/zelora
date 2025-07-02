const formatDate = (date: string) => {
    const d = new Date(date);

    const formattedDate = d.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    return formattedDate;
};

export { formatDate };