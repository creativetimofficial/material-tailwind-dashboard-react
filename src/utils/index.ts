export const generateImage = () => {
  // Generate avatar randomly

  const random = Math.floor(Math.random() * 50);

  return `https://i.pravatar.cc/150?img=${random}`; 
}

export const formatDate = (d) => {
  const date = new Date(d);

  console.log({
    d,
    date
  })

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const months = ["Jan", "Fev", "Mar", "Avr", "Mai", "Juin", "Juil", "Aout", "Sept", "Oct", "Nov", "Dec"]

  return `${day <= 9 ? `0${day}` : day} ${months[month]} ${year}`;
}