import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useState, useRef, useEffect } from 'react';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

export const ArticleParamsForm = () => {
	// ОТКРЫВАЕМ И ЗАКРЫВАЕМ ФОРМУ
	const [isOpen, setIsOpen] = useState(false);
	const sideRef = useRef<HTMLElement>(null);

	// закрываем при нажатии мимо открывшейся формы
	useEffect(() => {
		// при монтировнии следим за нажатием
		const handleClickOutsideForm = (event: MouseEvent) => {
			if (sideRef.current && !sideRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutsideForm);
		// при размонтировнии убирает слушатель
		return () => {
			document.removeEventListener('mousedown', handleClickOutsideForm);
		};
	}, []);

	// ИЗМЕНЯЕМ СОДЕРЖИМОЕ ФОРМЫ
	// const [font, setFont] = useState(defaultArticleState.fontFamilyOption);
	// const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption);
	// const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	// const [bgColor, setBgColor] = useState(defaultArticleState.backgroundColor);
	// const [width, setWidth] = useState(defaultArticleState.contentWidth);

	const [form, setForm] = useState(defaultArticleState);
	const handleChangeInForm =
		(field: keyof typeof defaultArticleState) => (value: OptionType) => {
			setForm((prev) => ({ ...prev, [field]: value }));
		};

	// СБРАСЫВАЕМ НАСТРОЙКИ ФОРМЫ
	const handleResetForm = (event: React.FocusEvent<HTMLFormElement>) => {
		event.preventDefault();
		setForm(defaultArticleState);
	};

	// ОТПРАВЛЯЕМ ФОРМУ
	const handleSubmitForm = (event: React.FocusEvent<HTMLFormElement>) => {
		event.preventDefault();
		// TODO: логика для смены настроек
		setIsOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				ref={sideRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onReset={handleResetForm}
					onSubmit={handleSubmitForm}>
					<Text uppercase={true} as='h1' weight={800} size={31}>
						Задайте параметры
					</Text>
					{/* <Select
						selected={font}
						title='шрифт'
						options={fontFamilyOptions}
						onChange={(selected) => setFont(selected)}></Select> */}
					<Select
						selected={form.fontFamilyOption}
						title='шрифт'
						options={fontFamilyOptions}
						onChange={handleChangeInForm('fontFamilyOption')}></Select>
					{/* <RadioGroup
						selected={fontSize}
						title='размер шрифта'
						name='размер шрифта'
						options={fontSizeOptions}
						onChange={(selected) => setFontSize(selected)}></RadioGroup> */}
					<RadioGroup
						selected={form.fontSizeOption}
						title='размер шрифта'
						name='размер шрифта'
						options={fontSizeOptions}
						onChange={handleChangeInForm('fontSizeOption')}></RadioGroup>
					{/* <Select
						selected={fontColor}
						title='цвет шрифта'
						options={fontColors}
						onChange={(selected) => setFontColor(selected)}></Select> */}
					<Select
						selected={form.fontColor}
						title='цвет шрифта'
						options={fontColors}
						onChange={handleChangeInForm('fontColor')}></Select>
					<Separator />
					{/* <Selects
						selected={bgColor}
						title='цвет фона'
						options={backgroundColors}
						onChange={(selected) => setBgColor(selected)}></Selects> */}
					<Select
						selected={form.backgroundColor}
						title='цвет фона'
						options={backgroundColors}
						onChange={handleChangeInForm('backgroundColor')}></Select>
					{/* <Select
						selected={width}
						title='ширина контента'
						options={contentWidthArr}
						onChange={(selected) => setWidth(selected)}></Select> */}
					<Select
						selected={form.contentWidth}
						title='ширина контента'
						options={contentWidthArr}
						onChange={handleChangeInForm('contentWidth')}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
