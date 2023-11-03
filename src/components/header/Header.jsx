import { useState } from 'react';
import styles from './Header.module.scss';
import { PropTypes } from 'prop-types';
import { PiBeerStein } from 'react-icons/pi';
import { NavLink } from 'react-router-dom';
import { Button } from 'primereact/button';

function Header({ signOut }) {
	Header.propTypes = {
		signOut: PropTypes.func
	};

	const [showMobileNavMenu, setShowMobileNavMenu] = useState(false);

	return (
		<header className={styles.header}>
			<div className={styles.brand}>
				<NavLink to="/">
					<PiBeerStein /> My Beer Fridge
				</NavLink>
			</div>

			<button
				className={styles['mobile-nav-menu']}
				aria-controls="navigation-menu"
				aria-expanded={showMobileNavMenu}
				onClick={() => {
					setShowMobileNavMenu(!showMobileNavMenu);
				}}
			>
				<span className="sr-only">Menu</span>
				{showMobileNavMenu ? (
					<i className="pi pi-times"></i>
				) : (
					<i className="pi pi-bars"></i>
				)}
			</button>

			<nav>
				<ul
					className="flex"
					data-visible={showMobileNavMenu}
					id="navigation-menu"
				>
					<li>
						<NavLink
							onClick={() => {
								showMobileNavMenu &&
									setShowMobileNavMenu(false);
							}}
							to="/"
						>
							Beers
						</NavLink>
					</li>
					<li>
						<NavLink
							onClick={() => {
								showMobileNavMenu &&
									setShowMobileNavMenu(false);
							}}
							to="/breweries"
						>
							Breweries
						</NavLink>
					</li>
					<li>
						<NavLink
							onClick={() => {
								showMobileNavMenu &&
									setShowMobileNavMenu(false);
							}}
							to="/cellars"
						>
							Cellars
						</NavLink>
					</li>
					<li>
						<Button
							label="Sign Out"
							onClick={signOut}
							outlined
							size="small"
						></Button>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
