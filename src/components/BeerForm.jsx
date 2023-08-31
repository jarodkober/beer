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
		abv: '',
		brewery: '',
		location: '',
		name: '',
		quantity: '',
		size: '',
		stylePrimary: '',
		styleSecondary: '',
		vintage: ''
	};

	const {
		control,
		formState: { errors },
		handleSubmit,
		reset,
		watch
	} = useForm({ defaultValues });

	console.log(watch('name'));

	console.log(watch('vintage'));

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
						name="name"
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
						htmlFor="name"
					>
						Beer Name
					</label>
				</span>

				{getFormErrorMessage('name')}
			</div>

			<div className="field">
				<span className="p-float-label">
					<Controller
						name="vintage"
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
						htmlFor="vintage"
					>
						Vintage Year
					</label>
				</span>

				{getFormErrorMessage('vintage')}
			</div>

			<div className="field">
				<span className="p-float-label">
					<Controller
						name="brewery"
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
						htmlFor="brewery"
					>
						Brewery
					</label>
				</span>

				{getFormErrorMessage('brewery')}
			</div>

			<div className="field">
				<span className="p-float-label">
					<Controller
						name="stylePrimary"
						control={control}
						rules={{
							required: 'A primary beer style is required.'
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
						htmlFor="stylePrimary"
					>
						Style (Primary)
					</label>
				</span>

				{getFormErrorMessage('stylePrimary')}
			</div>

			<div className="field">
				<span className="p-float-label">
					<Controller
						name="styleSecondary"
						control={control}
						rules={{
							required: 'A secondary beer style is required.'
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
						htmlFor="styleSecondary"
					>
						Style (Secondary)
					</label>
				</span>

				{getFormErrorMessage('styleSecondary')}
			</div>

			<div className="field">
				<span className="p-float-label">
					<Controller
						name="location"
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
						htmlFor="location"
					>
						Location
					</label>
				</span>

				{getFormErrorMessage('location')}
			</div>

			<div className="field">
				<span className="p-float-label">
					<Controller
						name="abv"
						control={control}
						rules={{}}
						render={({ field, fieldState }) => (
							<>
								<InputNumber
									id={field.name}
									inputClassName={classNames({
										'p-invalid': fieldState.invalid
									})}
									maxFractionDigits={2}
									minFractionDigits={2}
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
						htmlFor="abv"
					>
						ABV
					</label>
				</span>

				{getFormErrorMessage('abv')}
			</div>

			<div className="field">
				<span className="p-float-label">
					<Controller
						name="size"
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
						htmlFor="size"
					>
						Size
					</label>
				</span>

				{getFormErrorMessage('size')}
			</div>

			<div className="field">
				<span className="p-float-label">
					<Controller
						name="quantity"
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
						htmlFor="quantity"
					>
						Quantity
					</label>
				</span>

				{getFormErrorMessage('quantity')}
			</div>

			<Button
				icon="pi pi-plus"
				label="Add Beer"
			/>
		</form>
	);
}

export default BeerForm;
