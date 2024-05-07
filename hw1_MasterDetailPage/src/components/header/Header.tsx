import { Link } from "react-router-dom"

import './Header.css'

const Header = () => {
    return (
        <div className='header'>
            <nav className='navbar'>
                <div className='title'>DisplayMart</div>

                <div className='links'>
                    <div>
                        <Link to='/' className='link'>
                            List monitors
                        </Link>
                    </div>

                    <div>
                        <Link to='/addMonitor' className='link'>
                            Add monitor
                        </Link>
                    </div>

                    <div>
                        <Link to="/filterMonitors" className='link'>
                            Filter monitors
                        </Link>
                    </div>

                    <div>
                        <Link to="/monitorsChart" className='link'>
                            Chart
                        </Link>
                    </div>

                    <div>
                        <Link to="/reviews" className='link'>
                            Reviews
                        </Link>
                    </div>

                    <div>
                        <Link to="/addReview" className='link'>
                            Add review
                        </Link>
                    </div>

                </div>
            </nav>
        </div>
    )
}

export { Header };