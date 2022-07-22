import React, { useState } from 'react'

// Arbitrarily nested data
const toppingOptions = [
  {
    name: "Pepperoni",
    id: "pepperoni-id",
    subOptions: [
      {
        name: "Spicy",
        id: "spicy-id",
        subOptions: []
      },
      {
        name: "Regular",
        id: "regular-id",
        subOptions: []
      }
    ]
  },
  {
    name: "Chicken",
    id: "chicken-id",
    subOptions: [
      {
        name: "Buffalo",
        id: "buffalo-id",
        subOptions: [
          {
            name: "Mild",
            id: 'mild-id',
            subOptions: [],
          },
          {
            name: "Hot",
            id: 'hot-id',
            subOptions: [
              {
                name: 'Jalapeño',
                id: 'jalapeno-id',
                subOptions: [
                  {
                    name: 'Jaluuuuapeño',
                    id: 'jalapeno-id1',
                    subOptions: []
                  },
                  {
                    name: 'Jala',
                    id: 'jalapeno-id2',
                    subOptions: []
                  },
                ]
              },
              {
                name: 'Cayenne',
                id: 'cayenne-id',
                subOptions: [
                  {
                    name: 'Jalapeñjjjo',
                    id: 'jalapeno-id22',
                    subOptions: [
                      {
                        name: 'Jalapeñwwwo',
                        id: 'jalapeno-idwr',
                        subOptions: []
                      },
                    ]
                  },
                ]
              }
            ],
          },
        ]
      },
      {
        name: "BBQ",
        id: 'bbq-id',
        subOptions: [],
      }
    ]
  },
]

type SelectedOptionsType = {
  name: string
  id: string 
  subOptions: SelectedOptionsType[]
}
type SelectedOption =  {
  [key: string] : SelectedOption
}
interface IOption {
  options: SelectedOptionsType[]
  selectedOptions: SelectedOption,
  onChange:(value: SelectedOption) => void
}
interface ICheckbox  {
  selected: SelectedOption
  label:string
  onChange:(value: boolean) => void
}

const Checkbox = (props:ICheckbox) => {
  const { selected, label, onChange } =props;
  const name = `name${Math.floor(Math.random()*100)}`
  return (
    <div>
       <input type="checkbox" id={`${Math.floor(Math.random()*100)}`} name={name} onClick={() => onChange(!selected)}/>
       <label htmlFor={name}> {label}</label><br/>
    </div>
  )
}

const OptionsList = (props:IOption) => {
  const { options, selectedOptions, onChange }=props;
   const handleCheckboxClicked = (selectedOptionId: string) => {
     // is currently selected
     if(selectedOptions[selectedOptionId]){
       // remove selected key from options list
       delete selectedOptions[selectedOptionId]; 
     } else { // is not currently selected
       // Add selected key to optionsList
       selectedOptions[selectedOptionId] = {} 
     }
     // call onChange function given by parent
     onChange(selectedOptions) 
   }
   
   const handleSubOptionsListChange = (optionId:string, subSelections:SelectedOption) => {
     // add sub selections to current optionId
     selectedOptions[optionId] = subSelections;
     // call onChange function given by parent
     onChange(selectedOptions);
   }
   
   return (
     <div>
       {options.map((option:SelectedOptionsType, index: number) => (
         <ul key={`${option.id} + ${index}`}>
           <Checkbox 
             selected={selectedOptions[option.id]} 
             label={option.name} 
             onChange={() => {handleCheckboxClicked(option.id)}}
            />
           {/* Base Case */}
           {(option.subOptions.length > 0 && selectedOptions[option.id]) &&
             <OptionsList
               options={option.subOptions}
               selectedOptions={selectedOptions[option.id]} 
               onChange={(subSelections:SelectedOption) => handleSubOptionsListChange(option.id, subSelections)}
              />
           }
         </ul>
       ))}
     </div>
   )
 }
 
// Root component -> Manages all app state

const App = () => {
  const [state, setState] = useState({ selectedOptions: {}})
  return (
    <div>
      <h1>Toppings</h1>
      <OptionsList 
        options={toppingOptions} 
        onChange={(selectedOptions:SelectedOption) => setState({selectedOptions})}
        selectedOptions={state.selectedOptions} 
      />
    </div>
  )
}
export default App;