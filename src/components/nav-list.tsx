import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks';
import { AuthorizationStatus, AppRoute, PRIVATE_ROUTES } from '../const';
import { logoutAction } from '../store/api-action';

function NavList(): JSX.Element {
  const authorizationStatusLogged = useAppSelector((state) => state.authorizationStatus);
  const user = useAppSelector((state) => state.user);

  const isLogged = authorizationStatusLogged === AuthorizationStatus.Auth;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = () => {
    dispatch(logoutAction());

    if (PRIVATE_ROUTES.includes(pathname)) {
      navigate(AppRoute.Main);
    }
  };

  return (
    <nav className="header__nav">
      {isLogged ? (
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <NavLink
              className="header__nav-link header__nav-link--profile"
              to={AppRoute.Favorites}
            >
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__user-name user__name">
                {user?.email}
              </span>
              <span className="header__favorite-count">3</span>
            </NavLink>
          </li>
          <li className="header__nav-link resetStyleButton">
            <button className="header__nav-link"
              onClick={handleClick}
            >
              <span className="header__signout">Sign out</span>
            </button>
          </li>
        </ul>
      ) : (
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link
              className="header__nav-link header__nav-link--profile"
              to={AppRoute.Login}
              state={{ from: pathname }}
            >
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default NavList;
