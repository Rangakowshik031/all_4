// ChildComponent.jsx
import React, { useState } from 'react';

const ChildComponent = ({ onDataFromChild }) => {
  const [dataToSend, setDataToSend] = useState('');

  const handleChange = (e) => {
    const newData = e.target.value;
    setDataToSend(newData);
  };

  const sendDataToParent = () => {
    // Call the callback function to send data to ParentComponent
    onDataFromChild(dataToSend);
  };

  return (
    <div>
      <h2>Child Component</h2>
      <input type="text" value={dataToSend} onChange={handleChange} />
      <button onClick={sendDataToParent}>Send Data to Parent</button>
    </div>
  );
};

export default ChildComponent;
