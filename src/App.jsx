import About from './components/About/About';
import Header from './components/Header/Header';
import './App.scss';
import './bootstrap.scss';
import './font-awesome.scss'
import Profile from './components/Profile/Profile';
import Portfolio from './components/Portfolio/Portfolio';
import Services from './components/Services/Services';
import Stats from './components/Stats/Stats';
import Footer from './components/Footer/Footer';

const App = () => {

  return (
    <>
      <div className="app">
        <Header />
        <About />
        <Profile />
        <Portfolio />

        {/*  */}

        <section 
          className="styleshout text-bg-dark bg-gradient p-6 text-center"
        >
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1>Shoutout to StyleShout</h1>
                <hr className="w-25 mx-auto" />
                  <p className="lead mb-5">
                    Styleshout is a place for Free HTML5 Templates and Free Wordpress. This design was inspired by one of their templates. Check them out for templates to use and get inspiration from.
                  </p>
                  <a
                    href="https://styleshout.com"
                    target="_blank"
                    className="btn btn-primary btn-lg text-uppercase px-5 mx-3 my-2"
                  >
                    Visit StyleShout
                  </a>
                </div>
              </div>
              </div>
          </section>
          {/*  */}

        <Services />

        <Stats />

        
		{/* <!-- Contact --> */}
		<section className="contact text-bg-dark bg-gradient py-5">
			<div className="container">
				<div className="row">
					<div className="col-md-8 offset-md-2">
						<div className="text-center mb-5">
							<h4 className="text-uppercase fw-bold text-primary">Contact</h4>
							<hr className="w-25 mx-auto" />
							<h2 className="mb-4">I'd love to hear from you.</h2>
							<p className="lead">
								If you have any questions or would like to work together, please
								contact me with the form below.
							</p>
						</div>

						{/* <!-- Form --> */}
						<form
							name="contact"
							// netlify
						>
							<div className="mb-5">
								<input
									type="text"
									className="form-control bg-transparent border-top-0 border-start-0 border-end-0 rounded-0 border-muted text-white"
									name="name"
									placeholder="Name"
								/>
							</div>
							<div className="mb-5">
								<input
									type="email"
									className="form-control bg-transparent border-top-0 border-start-0 border-end-0 rounded-0 border-muted text-white"
									name="email"
									placeholder="Email"
								/>
							</div>
							<div className="mb-5">
								<textarea
									className="form-control bg-transparent border-top-0 border-start-0 border-end-0 rounded-0 border-muted text-white"
									name="message"
									placeholder="Message"
								></textarea>
							</div>
							<div className="mb-5 d-grid">
								<button
									type="submit"
									className="btn btn-primary"
								>
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
	

        <Footer/>
  
			</div>
		</section>




        </div>

    </>
  )};

export default App;

// 1) make AppLayout
// 2) Navbar & SideNav
// --NavBar shows when scrolling up or at top only
// --can I use a checkbox for the state to show the SideNav
// --NavLogo with initials
// 3) AppContext
// --user
// --currentPost for blog session
// 4) Posts/What I'm Learning section/Blog
// --Typing Text for Hero section of Page
// --paginated list of posts
// --keyword filtering of posts(?)
// --ability to make comments
// captcha to prevent spam

// --social icons in footer? Fixed position at bottom?
// --copyright where?
// contact me floating button?: captcha to prevent spam
// lightbox alt for images
// fonts via google fonts in scss