
import './App.scss'
import CustomButton from './lib/components/atoms/CustomButton'
// import '../src/styles/theme.scss'
// import '../src/styles/_variables.scss'
import './index.scss'
import iconpath from '../public/Icons/sprite.svg'
import { Icon } from './lib'
function App() {

  return (
    <>
     <Icon name='apple' className='' spritePath={iconpath} />
      <CustomButton
        label="Click Me"
        iconName="icon-home"
        iconPosition="left"
        size="large"
        onClick={() => alert('Button clicked!')}
        className=""
        iconPath="/assets/icons/sprite.svg"
      />
      <h2>hi this skdmkdk ccc</h2>
     
    </>
  )
}

export default App