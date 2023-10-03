import { useEffect, useRef } from 'react';
import styles from './CellarForm.module.scss';
import { useAddCellarMutation } from '../../store';
import { PropTypes } from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/InputTextarea';
import { Toast } from 'primereact/toast';

function CellarForm({ onHide, user }) {
	CellarForm.propTypes = {
		onHide: PropTypes.func,
		user: PropTypes.object
	};

	const defaultValues = {
		cellar_description: '',
		cellar_name: ''
	};

	const {
		control,
		formState: { errors },
		handleSubmit,
		reset
	} = useForm({ defaultValues });

	const [addCellar, results] = useAddCellarMutation();

	const toast = useRef(null);

	const onSubmit = (data) => {
		data = {
			...data,
			user_auth: user.signInUserSession.idToken.jwtToken,
			user_id: user.username
		};

		addCellar(data);

		reset();
	};

	const getFormErrorMessage = (name) => {
		return (
			errors[name] && (
				<small className="p-error">{errors[name].message}</small>
			)
		);
	};

	useEffect(() => {
		if (results.isSuccess) {
			onHide();
		}
	}, [onHide, results.isSuccess]);

	useEffect(() => {
		results.error &&
			toast.current.show({
				detail: 'An error occurred while creating your cellar. Please try again.',
				severity: 'error',
				sticky: true,
				summary: 'Error'
			});
	}, [results.error]);

	return (
		<form
			className={styles.form}
			onSubmit={handleSubmit(onSubmit)}
		>
			<Toast ref={toast} />

			<div className="field">
				<span className="p-float-label">
					<Controller
						control={control}
						name="cellar_name"
						rules={{
							required: 'A cellar name is required.'
						}}
						render={({ field, fieldState }) => (
							<InputText
								autoComplete="off"
								autoFocus
								className={classNames({
									'p-invalid': fieldState.invalid
								})}
								id={field.name}
								{...field}
							/>
						)}
					/>
					<label
						className={classNames({ 'p-error': errors.name })}
						htmlFor="cellar_name"
					>
						Name
					</label>
				</span>

				{getFormErrorMessage('name')}
			</div>

			<div className="field">
				<span className="p-float-label">
					<Controller
						control={control}
						name="cellar_description"
						render={({ field, fieldState }) => (
							<InputTextarea
								className={classNames({
									'p-invalid': fieldState.invalid
								})}
								id={field.name}
								{...field}
							/>
						)}
					/>
					<label
						className={classNames({ 'p-error': errors.name })}
						htmlFor="cellar_description"
					>
						Description
					</label>
				</span>

				{getFormErrorMessage('name')}
			</div>

			<Button
				disabled={results.isLoading}
				icon="pi pi-plus"
				label="Create Cellar"
			/>
		</form>
	);
}

export default CellarForm;
