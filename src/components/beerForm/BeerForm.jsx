import { useEffect } from 'react';
import styles from './BeerForm.module.scss';
import { useAddBeerMutation } from '../../store';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
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

	const quantities = [
		{ label: '1', value: 1 },
		{ label: '2', value: 2 },
		{ label: '3', value: 3 },
		{ label: '4', value: 4 },
		{ label: '5', value: 5 },
		{ label: '6', value: 6 },
		{ label: '7', value: 7 },
		{ label: '8', value: 8 },
		{ label: '9', value: 9 },
		{ label: '10', value: 10 },
		{ label: '11', value: 11 },
		{ label: '12', value: 12 }
	];

	// TODO: Shift the list of beer styles into a data file
	const beer_styles = [
		'Altbier',
		'Australian Sparkling Ale',
		'Barleywine - American',
		'Barleywine - English',
		'Barleywine - Other',
		'Belgian Blonde',
		'Belgian Dubbel',
		'Belgian Enkel / Patersbier',
		'Belgian Quadrupel',
		'Belgian Strong Dark Ale',
		'Belgian Strong Golden Ale',
		'Belgian Tripel',
		'Bitter - Best',
		'Bitter - Extra Special / Strong (ESB)',
		'Bitter - Session / Ordinary',
		'Bière de Champagne / Bière Brut',
		'Black & Tan',
		'Blonde Ale',
		'Bock - Doppelbock',
		'Bock - Eisbock',
		'Bock - Hell / Maibock / Lentebock',
		'Bock - Single / Traditional',
		'Bock - Weizenbock',
		'Bock - Weizendoppelbock',
		'Brett Beer',
		'Brown Ale - American',
		'Brown Ale - Belgian',
		'Brown Ale - English',
		'Brown Ale - Imperial / Double',
		'Brown Ale - Other',
		'California Common',
		'Chilli / Chile Beer',
		'Cider - Dry',
		'Cider - Graff',
		'Cider - Herbed / Spiced / Hopped',
		'Cider - Ice / Applewine',
		'Cider - Other Fruit',
		'Cider - Perry',
		'Cider - Rosé',
		'Cider - Sweet',
		'Cider - Traditional / Apfelwein',
		'Corn Beer / Chicha de Jora',
		'Cream Ale',
		'Dark Ale',
		'Farmhouse Ale - Bière de Coupage',
		'Farmhouse Ale - Bière de Garde',
		'Farmhouse Ale - Bière de Mars',
		'Farmhouse Ale - Grisette',
		'Farmhouse Ale - Other',
		'Farmhouse Ale - Sahti',
		'Farmhouse Ale - Saison',
		'Festbier',
		'Flavored Malt Beverage',
		'Freeze-Distilled Beer',
		'Fruit Beer',
		'Gluten-Free',
		'Golden Ale',
		'Grape Ale - Italian',
		'Grape Ale - Other',
		'Grodziskie / Grätzer',
		'Happoshu',
		'Hard Ginger Beer',
		'Hard Kombucha / Jun',
		'Hard Seltzer',
		'Historical Beer - Adambier',
		'Historical Beer - Berliner Braunbier',
		'Historical Beer - Burton Ale',
		'Historical Beer - Dampfbier',
		'Historical Beer - Gruit / Ancient Herbed Ale',
		'Historical Beer - Kentucky Common',
		'Historical Beer - Kottbusser',
		'Historical Beer - Lichtenhainer',
		'Historical Beer - Mumme',
		'Historical Beer - Other',
		'Historical Beer - Steinbier',
		'Historical Beer - Zoigl',
		'Honey Beer',
		'IPA - American',
		'IPA - Belgian',
		'IPA - Black / Cascadian Dark Ale',
		'IPA - Brett',
		'IPA - Brut',
		'IPA - Cold',
		'IPA - English',
		'IPA - Farmhouse',
		'IPA - Imperial / Double',
		'IPA - Imperial / Double Black',
		'IPA - Imperial / Double Milkshake',
		'IPA - Imperial / Double New England / Hazy',
		'IPA - Milkshake',
		'IPA - New England / Hazy',
		'IPA - New Zealand',
		'IPA - Other',
		'IPA - Quadruple',
		'IPA - Red',
		'IPA - Rye',
		'IPA - Session',
		'IPA - Sour',
		'IPA - Triple',
		'IPA - Triple New England / Hazy',
		'IPA - White / Wheat',
		'Kellerbier / Zwickelbier',
		'Koji / Ginjo Beer',
		'Kvass',
		'Kölsch',
		'Lager - Amber',
		'Lager - American',
		'Lager - American Amber / Red',
		'Lager - American Light',
		'Lager - Dark',
		'Lager - Dortmunder / Export',
		'Lager - Helles',
		'Lager - IPL (India Pale Lager)',
		'Lager - Japanese Rice',
		'Lager - Leichtbier',
		'Lager - Mexican',
		'Lager - Munich Dunkel',
		'Lager - Pale',
		'Lager - Red',
		'Lager - Strong',
		'Lager - Vienna',
		'Lager - Winter',
		'Lambic - Faro',
		'Lambic - Framboise',
		'Lambic - Fruit',
		'Lambic - Gueuze',
		'Lambic - Kriek',
		'Lambic - Other',
		'Lambic - Traditional',
		'Malt Beer',
		'Malt Liquor',
		'Mead - Acerglyn / Maple Wine',
		'Mead - Bochet',
		'Mead - Braggot',
		'Mead - Cyser',
		'Mead - Melomel',
		'Mead - Metheglin',
		'Mead - Other',
		'Mead - Pyment',
		'Mead - Session / Short',
		'Mead - Traditional',
		'Mild - Dark',
		'Mild - Light',
		'Mild - Other',
		'Märzen',
		'Non-Alcoholic Beer - IPA',
		'Non-Alcoholic Beer - Lager',
		'Non-Alcoholic Beer - Other',
		'Non-Alcoholic Beer - Pale Ale',
		'Non-Alcoholic Beer - Porter / Stout',
		'Non-Alcoholic Beer - Shandy / Radler',
		'Non-Alcoholic Beer - Sour',
		'Non-Alcoholic Beer - Wheat Beer',
		'Non-Alcoholic Cider / Perry',
		'Non-Alcoholic Mead',
		'Old Ale',
		'Pale Ale - American',
		'Pale Ale - Australian',
		'Pale Ale - Belgian',
		'Pale Ale - English',
		'Pale Ale - Milkshake',
		'Pale Ale - New England / Hazy',
		'Pale Ale - New Zealand',
		'Pale Ale - Other',
		'Pale Ale - XPA (Extra Pale)',
		'Pilsner - Czech',
		'Pilsner - German',
		'Pilsner - Imperial / Double',
		'Pilsner - Italian',
		'Pilsner - Other',
		'Porter - American',
		'Porter - Baltic',
		'Porter - Coffee',
		'Porter - English',
		'Porter - Imperial / Double',
		'Porter - Imperial / Double Baltic',
		'Porter - Imperial / Double Coffee',
		'Porter - Other',
		'Pumpkin / Yam Beer',
		'Rauchbier',
		'Red Ale - American Amber / Red',
		'Red Ale - Imperial / Double',
		'Red Ale - Irish',
		'Red Ale - Other',
		'Roggenbier',
		'Root Beer',
		'Rye Beer',
		'Rye Wine',
		'Schwarzbier',
		'Scotch Ale / Wee Heavy',
		'Scottish Ale',
		'Scottish Export Ale',
		'Shandy / Radler',
		'Smoked Beer',
		'Sorghum / Millet Beer',
		'Sour - Berliner Weisse',
		'Sour - Flanders Oud Bruin',
		'Sour - Flanders Red Ale',
		'Sour - Fruited',
		'Sour - Fruited Berliner Weisse',
		'Sour - Fruited Gose',
		'Sour - Other',
		'Sour - Other Gose',
		'Sour - Smoothie / Pastry',
		'Sour - Traditional Gose',
		'Specialty Grain',
		'Spiced / Herbed Beer',
		'Stout - American',
		'Stout - Coffee',
		'Stout - English',
		'Stout - Foreign / Export',
		'Stout - Imperial / Double',
		'Stout - Imperial / Double Coffee',
		'Stout - Imperial / Double Milk',
		'Stout - Imperial / Double Oatmeal',
		'Stout - Imperial / Double Pastry',
		'Stout - Imperial / Double White / Golden',
		'Stout - Irish Dry',
		'Stout - Milk / Sweet',
		'Stout - Oatmeal',
		'Stout - Other',
		'Stout - Oyster',
		'Stout - Pastry',
		'Stout - Russian Imperial',
		'Stout - White / Golden',
		'Strong Ale - American',
		'Strong Ale - English',
		'Strong Ale - Other',
		'Table Beer',
		'Traditional Ale',
		'Ukrainian Golden Ale',
		'Wheat Beer - American Pale Wheat',
		'Wheat Beer - Dunkelweizen',
		'Wheat Beer - Hefeweizen',
		'Wheat Beer - Hefeweizen Light / Leicht',
		'Wheat Beer - Hopfenweisse',
		'Wheat Beer - Kristallweizen',
		'Wheat Beer - Other',
		'Wheat Beer - Wheat Wine',
		'Wheat Beer - Witbier / Blanche',
		'Wild Ale - American',
		'Wild Ale - Other',
		'Winter Ale',
		'Winter Warmer'
	];

	useEffect(() => {
		if (results.isSuccess) {
			onHide();
		}
	}, [onHide, results]);

	return (
		<form
			className={styles.beerForm}
			onSubmit={handleSubmit(onSubmit)}
		>
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
						render={({ field }) => (
							<Dropdown
								filter
								id={field.name}
								onChange={(e) => field.onChange(e.value)}
								options={beer_styles}
								value={field.value}
							/>
						)}
					/>
					<label
						className={classNames({ 'p-error': errors.name })}
						htmlFor="beer_style"
					>
						Style
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
						render={({ field }) => (
							<Dropdown
								id={field.name}
								onChange={(e) => field.onChange(e.value)}
								options={quantities}
								value={field.value}
							/>
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
				disabled={results.isLoading}
				icon="pi pi-plus"
				label="Add Beer"
			/>
		</form>
	);
}

export default BeerForm;
