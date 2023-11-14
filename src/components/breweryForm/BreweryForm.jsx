import { useEffect } from 'react';
import styles from './BreweryForm.module.scss';
import { PropTypes } from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { useAddBreweryMutation } from '../../store';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import classNames from 'classnames';

function BreweryForm({ onHide, toast, user }) {
	BreweryForm.propTypes = {
		onHide: PropTypes.func,
		toast: PropTypes.object,
		user: PropTypes.object
	};

	const defaultValues = {
		brewery_name: ''
	};

	const {
		control,
		formState: { errors },
		handleSubmit,
		reset
	} = useForm({ defaultValues });

	const [addBrewery, results] = useAddBreweryMutation();

	const onSubmit = (data) => {
		data = {
			...data,
			user_auth: user.signInUserSession.idToken.jwtToken,
			user_id: user.username
		};

		addBrewery(data);

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
				detail: 'An error occurred while adding the brewery. This is most likely due to a cost-saving measure that pauses the database during periods of inactivity. Please try again in 30 seconds.',
				severity: 'error',
				sticky: true,
				summary: 'Error'
			});
	}, [results.error, toast]);

	return (
		<form
			className={styles.form}
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="field">
				<span className="p-float-label">
					<Controller
						control={control}
						name="brewery_name"
						rules={{
							required: 'A brewery name is required.'
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
						htmlFor="brewery_name"
					>
						Name
					</label>
				</span>

				{getFormErrorMessage('name')}
			</div>

			<Button
				disabled={results.isLoading}
				icon="pi pi-plus"
				label="Add Brewery"
			/>
		</form>
	);
}

export default BreweryForm;
