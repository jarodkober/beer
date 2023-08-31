import { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import BeerForm from './BeerForm';

function BeerButton() {
	const [visible, setVisible] = useState(false);

	return (
		<>
			<Button
				icon="pi pi-plus"
				label="Add Beer"
				onClick={() => setVisible(true)}
			/>
			<Dialog
				header="Add a Beer to My Cellar"
				visible={visible}
				style={{ width: '50vw' }}
				onHide={() => setVisible(false)}
			>
				<BeerForm onHide={() => setVisible(false)} />
			</Dialog>
		</>
	);
}

export default BeerButton;
