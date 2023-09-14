import styles from './Header.module.scss';
import { PropTypes } from 'prop-types';
import { Button } from 'primereact/button';

function Header({ signOut, user }) {
	Header.propTypes = {
		signOut: PropTypes.func,
		user: PropTypes.object
	};

	return (
		<header className={styles.header}>
			<h1>Beer Cellar Management</h1>
			<Button onClick={signOut}>
				Sign Out <br />
				{user.attributes.email}
			</Button>
		</header>
	);
}

export default Header;
