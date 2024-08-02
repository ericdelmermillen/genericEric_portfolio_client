
// import './App.scss';
import Header from './components/Header/Header';
import './bootstrap.scss';
import './font-awesome.scss'

function App() {

  return (
    <>
    <Header />
      <div className="app">
        <h2 className='text-primary'>Primary</h2>
        <h2 className='text-secondary'>Secondary</h2>
        <h3 className='text-dark'>Dark</h3>
        <h3 className='text-light'>Light</h3>
        <button className="btn">Button</button>
      </div>
    </>
  )};

export default App;


// navbar that shows when you scroll down only
// lightbox alt for images
// fonts via google fonts in scss