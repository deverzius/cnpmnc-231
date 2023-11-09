function formatDate(dateString) {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);

    // Convert month to title case
    const [month, day, year] = formattedDate.split(' ');
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

    return `${capitalizedMonth}. ${day} ${year}`;
}
export {formatDate}