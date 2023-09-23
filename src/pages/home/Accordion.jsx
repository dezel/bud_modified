import React, { useState } from 'react';

const Accordion = () => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  const toggleAccordion = (accordionNumber) => {
    switch (accordionNumber) {
      case 1:
        setIsOpen1(!isOpen1);
        break;
      case 2:
        setIsOpen2(!isOpen2);
        break;
      case 3:
        setIsOpen3(!isOpen3);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h2>Accordion Example</h2>
      <div className="accordion-item">
        <button onClick={() => toggleAccordion(1)}>
          Toggle Accordion 1
        </button>
        {isOpen1 && (
          <div className="accordion-content">
            Content for Accordion 1
          </div>
        )}
      </div>
      <div className="accordion-item">
        <button onClick={() => toggleAccordion(2)}>
          Toggle Accordion 2
        </button>
        {isOpen2 && (
          <div className="accordion-content">
            Content for Accordion 2
          </div>
        )}
      </div>
      <div className="accordion-item">
        <button onClick={() => toggleAccordion(3)}>
          Toggle Accordion 3
        </button>
        {isOpen3 && (
          <div className="accordion-content">
            Content for Accordion 3
          </div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
