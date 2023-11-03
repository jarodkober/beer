import { useEffect } from 'react';
import styles from './BeerForm.module.scss';
import {
	useAddBeerMutation,
	useGetBreweriesQuery,
	useGetCellarsByUserQuery,
	useGetStylesQuery
} from '../../store';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Skeleton } from 'primereact/skeleton';
import { PropTypes } from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames';

function BeerForm({ onHide, toast, user }) {
	BeerForm.propTypes = {
		onHide: PropTypes.func,
		toast: PropTypes.object,
		user: PropTypes.object
	};

	const defaultValues = {
		beer_abv: '',
		beer_name: '',
		beer_quantity: '',
		beer_size: '',
		beer_style: '',
		beer_vintage: '',
		brewery_id: '',
		cellar_id: ''
	};

	const {
		control,
		formState: { errors },
		handleSubmit,
		reset
	} = useForm({ defaultValues });

	const {
		data: breweriesData,
		error: breweriesError,
		isLoading: breweriesIsLoading
	} = useGetBreweriesQuery({
		user_auth: user.signInUserSession.idToken.jwtToken
	});

	const {
		data: cellarsData,
		error: cellarsError,
		isLoading: cellarsIsLoading
	} = useGetCellarsByUserQuery({
		user_auth: user.signInUserSession.idToken.jwtToken,
		user_id: user.username
	});

	const {
		data: stylesData,
		error: stylesError,
		isLoading: stylesIsLoading
	} = useGetStylesQuery({
		user_auth: user.signInUserSession.idToken.jwtToken
	});

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

	const quantities = [...Array(24)]
		.map((_, i) => i + 1)
		.map((i) => ({ label: i, value: i }));

	const skeleton = [...Array(10)].map((e, i) => (
		<Skeleton
			height="3rem"
			key={i}
		/>
	));

	useEffect(() => {
		if (results.isSuccess) {
			onHide();
		}
	}, [onHide, results]);

	useEffect(() => {
		breweriesError &&
			toast.current.show({
				detail: 'An error occurred while loading the breweries. Please try again.',
				severity: 'error',
				sticky: true,
				summary: 'Error'
			});
	});

	useEffect(() => {
		cellarsError &&
			toast.current.show({
				detail: 'An error occurred while loading your cellars. Please try again.',
				severity: 'error',
				sticky: true,
				summary: 'Error'
			});
	});

	useEffect(() => {
		stylesError &&
			toast.current.show({
				detail: 'An error occurred while loading the beer styles. Please try again.',
				severity: 'error',
				sticky: true,
				summary: 'Error'
			});
	});

	return (
		<div className={styles.beerForm}>
			{breweriesIsLoading || cellarsIsLoading || stylesIsLoading ? (
				<div>{skeleton}</div>
			) : (
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
									<InputText
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
								className={classNames({
									'p-error': errors.name
								})}
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
											value <=
												new Date().getFullYear() + 1) ||
										'A vintage year is required.'
								}}
								render={({ field, fieldState }) => (
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
								)}
							/>
							<label
								className={classNames({
									'p-error': errors.name
								})}
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
								name="brewery_id"
								control={control}
								rules={{
									required: 'A brewery is required.'
								}}
								render={({ field, fieldState }) => (
									<Dropdown
										className={classNames({
											'p-invalid': fieldState.error
										})}
										id={field.name}
										onChange={(e) =>
											field.onChange(e.value)
										}
										optionLabel="brewery_name"
										optionValue="brewery_id"
										options={breweriesData}
										value={field.value}
									/>
								)}
							/>
							<label
								className={classNames({
									'p-error': errors.name
								})}
								htmlFor="brewery_id"
							>
								Brewery
							</label>
						</span>

						{getFormErrorMessage('brewery_id')}
					</div>

					<div className="field">
						<span className="p-float-label">
							<Controller
								name="beer_style_id"
								control={control}
								rules={{
									required: 'A beer style is required.'
								}}
								render={({ field, fieldState }) => (
									<Dropdown
										className={classNames({
											'p-invalid': fieldState.error
										})}
										filter
										id={field.name}
										onChange={(e) =>
											field.onChange(e.value)
										}
										optionLabel="beer_style"
										optionValue="beer_style_id"
										options={stylesData}
										value={field.value}
									/>
								)}
							/>
							<label
								className={classNames({
									'p-error': errors.name
								})}
								htmlFor="beer_style_id"
							>
								Style
							</label>
						</span>

						{getFormErrorMessage('beer_style_id')}
					</div>

					<div className="field">
						<span className="p-float-label">
							<Controller
								name="cellar_id"
								control={control}
								rules={{
									required: 'A beer cellar is required.'
								}}
								render={({ field, fieldState }) => (
									<Dropdown
										className={classNames({
											'p-invalid': fieldState.error
										})}
										id={field.name}
										onChange={(e) =>
											field.onChange(e.value)
										}
										optionLabel="cellar_name"
										optionValue="cellar_id"
										options={cellarsData}
										value={field.value}
									/>
								)}
							/>
							<label
								className={classNames({
									'p-error': errors.name
								})}
								htmlFor="cellar_id"
							>
								Cellar
							</label>
						</span>

						{getFormErrorMessage('cellar_id')}
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
								)}
							/>
							<label
								className={classNames({
									'p-error': errors.name
								})}
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
								)}
							/>
							<label
								className={classNames({
									'p-error': errors.name
								})}
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
								name="beer_cost"
								control={control}
								render={({ field, fieldState }) => (
									<InputNumber
										id={field.name}
										inputClassName={classNames({
											'p-invalid': fieldState.invalid
										})}
										maxFractionDigits={2}
										minFractionDigits={2}
										onBlur={field.onBlur}
										onValueChange={(e) => field.onChange(e)}
										prefix="$"
										ref={field.ref}
										useGrouping={false}
										value={field.value}
									/>
								)}
							/>
							<label
								className={classNames({
									'p-error': errors.name
								})}
								htmlFor="beer_cost"
							>
								Cost
							</label>
						</span>

						{getFormErrorMessage('beer_cost')}
					</div>

					<div className="field">
						<span className="p-float-label">
							<Controller
								name="beer_quantity"
								control={control}
								rules={{
									required: 'A quantity is required.'
								}}
								render={({ field, fieldState }) => (
									<Dropdown
										className={classNames({
											'p-invalid': fieldState.error
										})}
										id={field.name}
										onChange={(e) =>
											field.onChange(e.value)
										}
										options={quantities}
										value={field.value}
									/>
								)}
							/>
							<label
								className={classNames({
									'p-error': errors.name
								})}
								htmlFor="beer_quantity"
							>
								Quantity
							</label>
						</span>

						{getFormErrorMessage('beer_quantity')}
					</div>

					<Button
						disabled={results.isLoading}
						icon="pi pi-plus"
						label="Add Beer"
					/>
				</form>
			)}
		</div>
	);
}

export default BeerForm;
