import { useEffect } from 'react';
import { useAddBeerMutation } from '../store';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { PropTypes } from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames';

function BeerForm({ onHide }) {
	BeerForm.propTypes = {
		onHide: PropTypes.func
	};

	const defaultValues = {
		beer_abv: '',
		beer_name: '',
		beer_quantity: '',
		beer_size: '',
		beer_style: '',
		beer_vintage: '',
		brewery_name: '',
		cellar_name: ''
	};

	const {
		control,
		formState: { errors },
		handleSubmit,
		reset
	} = useForm({ defaultValues });

	const [addBeer, results] = useAddBeerMutation();

	const onSubmit = (data) => {
		addBeer(data);

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
	}, [onHide, results]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="field">
				<span className="p-float-label">
					<Controller
						name="beer_name"
						control={control}
						rules={{
							required: 'A beer name is required.'
						}}
						render={({ field, fieldState }) => (
							<>
								<InputText
									autoFocus
									className={classNames({
										'p-invalid': fieldState.invalid
									})}
									id={field.name}
									{...field}
								/>
							</>
						)}
					/>
					<label
						className={classNames({ 'p-error': errors.name })}
						htmlFor="beer_name"
					>
						Beer Name
					</label>
				</span>

				{getFormErrorMessage('beer_name')}
			</div>

			<div className="field">
				<span className="p-float-label">
					<Controller
						name="beer_vintage"
						control={control}
						rules={{
							validate: (value) =>
								(value >= 1900 &&
									value <= new Date().getFullYear() + 1) ||
								'Enter a valid year.'
						}}
						render={({ field, fieldState }) => (
							<>
								<InputNumber
									id={field.name}
									inputClassName={classNames({
										'p-invalid': fieldState.invalid
									})}
									maxLength={4}
									onBlur={field.onBlur}
									onValueChange={(e) => field.onChange(e)}
									ref={field.ref}
									useGrouping={false}
									value={field.value}
								/>
							</>
						)}
					/>
					<label
						className={classNames({ 'p-error': errors.name })}
						htmlFor="beer_vintage"
					>
						Vintage Year
					</label>
				</span>

				{getFormErrorMessage('beer_vintage')}
			</div>

			<div className="field">
				<span className="p-float-label">
					<Controller
						name="brewery_name"
						control={control}
						rules={{
							required: 'A brewery name is required.'
						}}
						render={({ field, fieldState }) => (
							<>
								<InputText
									className={classNames({
										'p-invalid': fieldState.invalid
									})}
									id={field.name}
									{...field}
								/>
							</>
						)}
					/>
					<label
						className={classNames({ 'p-error': errors.name })}
						htmlFor="brewery_name"
					>
						Brewery
					</label>
				</span>

				{getFormErrorMessage('brewery_name')}
			</div>

			<div className="field">
				<span className="p-float-label">
					<Controller
						name="beer_style"
						control={control}
						rules={{
							required: 'A beer style is required.'
						}}
						render={({ field, fieldState }) => (
							<>
								<InputText
									className={classNames({
										'p-invalid': fieldState.invalid
									})}
									id={field.name}
									{...field}
								/>
							</>
						)}
					/>
					<label
						className={classNames({ 'p-error': errors.name })}
						htmlFor="beer_style"
					>
						Style (Primary)
					</label>
				</span>

				{getFormErrorMessage('beer_style')}
			</div>

			<div className="field">
				<span className="p-float-label">
					<Controller
						name="cellar_name"
						control={control}
						rules={{
							required: 'A beer cellar location is required.'
						}}
						render={({ field, fieldState }) => (
							<>
								<InputText
									className={classNames({
										'p-invalid': fieldState.invalid
									})}
									id={field.name}
									{...field}
								/>
							</>
						)}
					/>
					<label
						className={classNames({ 'p-error': errors.name })}
						htmlFor="cellar_name"
					>
						Location
					</label>
				</span>

				{getFormErrorMessage('cellar_name')}
			</div>

			<div className="field">
				<span className="p-float-label">
					<Controller
						name="beer_abv"
						control={control}
						rules={{
							validate: (value) =>
								(value >= 0 && value <= 100) ||
								'Enter a valid percentage.'
						}}
						render={({ field, fieldState }) => (
							<>
								<InputNumber
									id={field.name}
									inputClassName={classNames({
										'p-invalid': fieldState.invalid
									})}
									maxFractionDigits={1}
									minFractionDigits={1}
									onBlur={field.onBlur}
									onValueChange={(e) => field.onChange(e)}
									ref={field.ref}
									suffix="%"
									useGrouping={false}
									value={field.value}
								/>
							</>
						)}
					/>
					<label
						className={classNames({ 'p-error': errors.name })}
						htmlFor="beer_abv"
					>
						ABV
					</label>
				</span>

				{getFormErrorMessage('beer_abv')}
			</div>

			<div className="field">
				<span className="p-float-label">
					<Controller
						name="beer_size"
						control={control}
						rules={{}}
						render={({ field, fieldState }) => (
							<>
								<InputNumber
									id={field.name}
									inputClassName={classNames({
										'p-invalid': fieldState.invalid
									})}
									onBlur={field.onBlur}
									onValueChange={(e) => field.onChange(e)}
									ref={field.ref}
									suffix=" ml"
									value={field.value}
								/>
							</>
						)}
					/>
					<label
						className={classNames({ 'p-error': errors.name })}
						htmlFor="beer_size"
					>
						Size
					</label>
				</span>

				{getFormErrorMessage('beer_size')}
			</div>

			<div className="field">
				<span className="p-float-label">
					<Controller
						name="beer_quantity"
						control={control}
						rules={{}}
						render={({ field, fieldState }) => (
							<>
								<InputNumber
									id={field.name}
									inputClassName={classNames({
										'p-invalid': fieldState.invalid
									})}
									min={1}
									onBlur={field.onBlur}
									onValueChange={(e) => field.onChange(e)}
									ref={field.ref}
									value={field.value}
								/>
							</>
						)}
					/>
					<label
						className={classNames({ 'p-error': errors.name })}
						htmlFor="beer_quantity"
					>
						Quantity
					</label>
				</span>

				{getFormErrorMessage('beer_quantity')}
			</div>

			<Button
				icon="pi pi-plus"
				label="Add Beer"
			/>
		</form>
	);
}

export default BeerForm;
