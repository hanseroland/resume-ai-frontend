export const formatDate = (dateString) => {
    if (!dateString) return "Date inconnue";

    const date = new Date(dateString);

    // Format : 25 octobre 2023 
    return new Intl.DateTimeFormat('fr-FR', {
        day: 'numeric',
        month: 'long', // 'long' pour octobre, '2-digit' pour 10
        year: 'numeric'
    }).format(date);
};