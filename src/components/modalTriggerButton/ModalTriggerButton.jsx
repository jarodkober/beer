import { cloneElement, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

function ModalTriggerButton({
	buttonLabel,
	modalBodyComponent,
	modalHeader,
	user
}) {
	ModalTriggerButton.propTypes = {
		buttonLabel: PropTypes.string,
		modalBodyComponent: PropTypes.element,
		modalHeader: PropTypes.string,
		user: PropTypes.object
	};

	const [visible, setVisible] = useState(false);

	const modalBodyComponentWithProps = cloneElement(modalBodyComponent, {
		onHide: () => setVisible(false),
		user
	});

	return (
		<div>
			<Button
				icon="pi pi-plus"
				label={buttonLabel}
				onClick={() => setVisible(true)}
			/>
			<Dialog
				header={modalHeader}
				visible={visible}
				style={{ width: '50vw' }}
				onHide={() => setVisible(false)}
			>
				{modalBodyComponentWithProps}
			</Dialog>
		</div>
	);
}

export default ModalTriggerButton;
