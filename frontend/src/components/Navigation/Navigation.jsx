import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from './sweet-stay-logo.png'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <header className='header-container'>
      <NavLink to='/' className='home-link'>
        <div className='header-left'>
          <img className='logo' src={logo}></img>
          <h2 className='page-title'>SweetStay</h2>
        </div>
      </NavLink>
      <div className='header-right'>
        {sessionUser && (
          <span>
            <NavLink to="/spots/new" className='create-link'>Create a New Spot</NavLink>
          </span>
        )}
        {isLoaded && (
          <span>
            <ProfileButton user={sessionUser} />
          </span>
        )}
      </div>
    </header>
  );
}

export default Navigation;
