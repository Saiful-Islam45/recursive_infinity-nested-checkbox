import React, { useState } from 'react'
// import './App.css'

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
type IOption = {
  options: any,
  selectedOptions: any,
  onChange:any
}
type ICheckbox = {
  selected: any,
   label:string,
    onChange:any
}

const OptionsList = (props:IOption) => {
  const { options, selectedOptions, onChange }=props
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
   
   const handleSubOptionsListChange = (optionId:string, subSelections:any) => {
     // add sub selections to current optionId
     selectedOptions[optionId] = subSelections;
     // call onChange function given by parent
     onChange(selectedOptions);
   }
   
   return (
     <div>
       {options.map((option:any) => (
         <ul>
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
               onChange={(subSelections:any) => handleSubOptionsListChange(option.id, subSelections)}
              />
           }
         </ul>
       ))}
     </div>
   )
 }
 
 
 // Dumb checkbox component, completly controlled by parent
 const Checkbox = (props:ICheckbox) => {
   const { selected, label, onChange } =props
   return (
     <div>
        <input type="checkbox" id={`${Math.floor(Math.random()*100)}`} name="vehicle1" onClick={() => onChange(!selected)}/>
        <label htmlFor="vehicle1"> {label}</label><br/>
     </div>
   )
 }
// Root component -> Manages all app state

const App = () => {
  const [state, setState] = useState({ selectedOptions: {}})
  console.log(state)
  return (
    <div>
      <h1>Toppings</h1>
      <OptionsList 
        options={toppingOptions} 
        onChange={(selectedOptions:any) => setState({selectedOptions})}
        selectedOptions={state.selectedOptions} 
      />
    </div>
  )
}
export default App;