import React, { createContext, useState, useContext } from 'react';

const FormSectionsContext = createContext();

export const FormSectionsProvider = ({ children }) => {
  const [sections, setSections] = useState([
    'PersonalDetailForm',
    'SummaryForm',
    'SkillForm',
    'ExperienceForm',
    'EducationForm',
    'LanguageForm'
  ]);

  const addSection = (section) => {
    setSections((prevSections) => [...prevSections, section]);
  };

  const removeSection = (section) => {
    setSections((prevSections) => prevSections.filter((s) => s !== section));
  };

  return (
    <FormSectionsContext.Provider value={{ sections, addSection, removeSection }}>
      {children}
    </FormSectionsContext.Provider>
  );
};

export const useFormSections = () => useContext(FormSectionsContext);