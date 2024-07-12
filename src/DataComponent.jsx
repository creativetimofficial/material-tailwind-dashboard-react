import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataComponent = () => {
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({ name: '', age: '' });

  useEffect(() => {
    // Fetch data from the backend
    axios.get('http://localhost:3000/api/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/data', formData)
      .then(response => {
        console.log(response.data);
        // Fetch the updated data
        axios.get('http://localhost:3000/api/data')
          .then(response => {
            setData(response.data);
          })
          .catch(error => {
            console.error('There was an error fetching the data!', error);
          });
      })
      .catch(error => {
        console.error('There was an error posting the data!', error);
      });
  };

  return (
    <div>
      <h1>Data from Backend:</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}

      <h2>Submit Data</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            Age:
            <input type="number" name="age" value={formData.age} onChange={handleInputChange} />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DataComponent;
