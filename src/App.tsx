import React, { 
   useState } from 'react'
import './App.css'

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
                subOptions: []
              },
              {
                name: 'Cayenne',
                id: 'cayenne-id',
                subOptions: []
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
 type ICheckbox = {
   selected: any,
    label:string,
     onChange:any
 }
 
 // Dumb checkbox component, completly controlled by parent
 const Checkbox = (props:ICheckbox) => {
   const { selected, label, onChange } =props
   return (
     <div>
       <div
         className="checkbox" 
         onClick={() => onChange(!selected)} 
       /> 
       <div className="label">{label}</div>
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
        onChange={(selectedOptions:any) => setState({selectedOptions})}
        selectedOptions={state.selectedOptions} 
      />
    </div>
  )
}
export default App;




// Actual Code

const App2 = () => {
  const [state, setState]= useState<any>({
    selectedOptions: {},
    codeShowing: false,
    debug: false
  })
 function button(){
    return (
      <div className="data-structure-button">
            <div onClick={() => setState({...state, codeShowing: !state.codeShowing})} 
             className={'fa fa-2x fa-code actual active-button'}>
           </div>
      </div>

      )
  }
  function debugButton(){
    return (
      <div className="debug-button">
        <div onClick={() => setState({...state,debug: !state.debug})} 
          // className={classNames(
          //   'fa',
          //   'fa-2x',
          //   'fa-bug',
          //   'actual-debug',
          //   this.state.codeShowing && 'active-debug-button',
          //   this.state.debug && 'is-debugging')}
            >
        </div>
      </div>
    )
  }
  function getDataStructureDisplay(){
    return (

        <pre className="data-structure"><code className="json">{JSON.stringify(state.selectedOptions, null, 3)}</code></pre>
    )
  }
  
  return (
       <div className="container">
         <div className="wrapper">
           <h1>Toppings</h1>
           <OptionsList2 
             options={toppingOptions} 
             onChange={(selectedOptions:any) => {
               if(state.debug){
                 alert(`App Component:\n\nSetting selectedOptions state to\n\n${JSON.stringify(selectedOptions, null, 3)}\n\nThen re-rendering!`)
               }
               setState({selectedOptions})
             }}
             selectedOptions={state.selectedOptions} 
             isFirst={true}
             debug={state.debug}
             />
           {button()}
           {debugButton()}
           
           {state.codeShowing && getDataStructureDisplay()}
         </div>
       </div>
     )
}
type IOption2 = {
  options: any,
  selectedOptions?: any,
  onChange?: any,
  isFirst?: any,
  debug?: any
}


const OptionsList2 = (props: IOption2) => {
 const { options, selectedOptions, onChange, isFirst, debug } = props
  const handleCheckboxClicked = (selectedOptionId: any) => {
    let additionalText = `${selectedOptionId} is already selected, to deselect it we'll remove it from the current selectedOptions structure\n\n${JSON.stringify(selectedOptions, null, 3)}`;
    if(selectedOptions[selectedOptionId]){
      delete selectedOptions[selectedOptionId];
    } else {
      selectedOptions[selectedOptionId] = {}
      additionalText = `${selectedOptionId} is not currently selected, to select it we'll add "${selectedOptionId}: {}" to the current selectedOptions structure\n\n${JSON.stringify(selectedOptions, null, 3)}`;
    }
    if(debug){
      alert(`handleCheckboxClicked():\n\nClicked ${selectedOptionId} checkbox\n\n${additionalText}\n\nThen we'll call the current OptionList's onChange() function with the updated selectedOptions structure`);
    }
    onChange(selectedOptions)
  }

  const handleSubOptionsListChange = (optionId:any,subSelections:any) => {
    if(debug){
      alert(`handleSubOptionsListChange():\n\nThe onChange() function of ${optionId} was just called with the following sub options\n\n${JSON.stringify(subSelections, null, 3)}\n\nWe'll set "${optionId}" equal to that and pass the entire subOption structure at this level up to the parent.\n\n${JSON.stringify(selectedOptions, null, 3)}`);
    }
    selectedOptions[optionId] = subSelections;
    onChange(selectedOptions);
  }
  
  return (
    <div>
      {options.map((option:any) => (
          <ul className={isFirst && "firstUL"}>
            <Checkbox2 
              selected={selectedOptions[option.id]} 
              label={option.name} 
              onChange={() => {handleCheckboxClicked(option.id)}}
            />
            {(option.subOptions.length > 0 && selectedOptions[option.id]) &&
              <OptionsList2 
                options={option.subOptions} 
                selectedOptions={selectedOptions[option.id]} 
                onChange={(subSelections:any) => handleSubOptionsListChange(option.id, subSelections)}
                debug={debug}
              />
            }
          </ul>
        )
      )}
    </div>
  )
}
type ICheckbox2 ={ 
  selected: any,
  label: any, 
  onChange: any
 }
const Checkbox2 = (props:ICheckbox2) => {
  const {selected, label, onChange} = props
  return (
      <div className="checkbox">
      <div 
        // className={classNames('fa', 'fa-2x', 'checkbox__icon', selected ? 'fa-check-square' : 'fa-square')}
           onClick={() => onChange(!selected)}></div>    
      <div className="checkbox__label">{label}</div>
    </div>
  )
}
// ReactDOM.render(<App2 />, document.querySelector('#app'))
