export const generateImage = () => {
  // Generate avatar randomly

  const random = Math.floor(Math.random() * 50);

  return `https://i.pravatar.cc/150?img=${random}`;
};

export const formatDate = (d: Date) => {
  const date = new Date(d);

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Avr",
    "Mai",
    "Juin",
    "Juil",
    "Aout",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${day <= 9 ? `0${day}` : day} ${months[month]} ${year}`;
};

/**
 * Format a date instance in the form day/month/year
 * @param d
 * @returns
 */
export const formatDateBySlash = (d: Date): string => {
  const date = new Date(d);

  console.log({
    d,
    date,
  });

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${day <= 9 ? `0${day}` : day}/${
    month <= 9 ? `0${month}` : month
  }/${year}`;
};
