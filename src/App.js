import './App.css';
import {useCallback, useState} from 'react'
import DurationExercise from './components/DurationExercise';
import RepetitionExercise from './components/RepetitionExercise';
import MapsExercise from './components/Maps';

const MENU_SCREEN = "menu"
const EXERCISE_SCREEN = "exercise"
const DURATION_EXERCISE = "duration"
const REPETITION_EXERCISE = "repetition"
const MAPS_EXERCISE = "maps";


let exerciseList = [
  {type: DURATION_EXERCISE, name: "Running"},
  {type: DURATION_EXERCISE, name: "Bicycling"},
  {type: REPETITION_EXERCISE, name: "Jumping Jacks"},
  {type: REPETITION_EXERCISE, name: "Push Ups"},
  {type: REPETITION_EXERCISE, name: "Sit Ups"},
  {type: MAPS_EXERCISE, name: "Maps"},
]

function App() {
  let [currentScreen, setCurrentScreen] = useState(EXERCISE_SCREEN)
  let [currentExercise, setCurrentExercise] = useState(exerciseList[3])
  let screenComponent = undefined
  let buttonClick = useCallback((exercise) => {
    setCurrentExercise(exercise)
    setCurrentScreen(EXERCISE_SCREEN)
  })

  if(currentScreen === MENU_SCREEN) {
    screenComponent = <div>
      <h1>Go Do Something</h1>
      <p>Select an exercise</p>
      <ul>
        {exerciseList.map((exercise)=> {
        return <li key={exercise.name}>
          <button style={{width:"80vw", padding:"5px"}} onClick={() => buttonClick(exercise)}>{exercise.name}</button>
        </li>
        })}
      </ul>
    </div>
  } else if (currentScreen === EXERCISE_SCREEN) {
    switch(currentExercise.type) {
      case DURATION_EXERCISE: 
        screenComponent = <DurationExercise 
          exercise={currentExercise}
          setMenuScreen={()=>setCurrentScreen(MENU_SCREEN)} 
          />
      break;
      case MAPS_EXERCISE:
        screenComponent = (
          <MapsExercise
            exercise={currentExercise}
            setMenuScreen={() => setCurrentScreen(MENU_SCREEN)}
          />
        );
      break;
      case REPETITION_EXERCISE:
        screenComponent = <RepetitionExercise 
          exercise={currentExercise}
          setMenuScreen={()=>setCurrentScreen(MENU_SCREEN)} 
          />
      break;
      default: 
        screenComponent = undefined

    }
    
  }
  
  return (
    <div className="App">
      <header className="App-header">
         {screenComponent}
      </header>
    </div>
  );
}

export default App;

//Please add