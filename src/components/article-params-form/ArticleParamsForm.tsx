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
	ArticleStateType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useClose } from 'src/hooks/useClose';

type ArticleParamsFormProps = {
	setSettings: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setSettings }: ArticleParamsFormProps) => {
	// ОТКРЫВАЕМ И ЗАКРЫВАЕМ ФОРМУ
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const formRef = useRef<HTMLElement>(null);

	useClose({
		isOpen: isMenuOpen,
		onClose: () => setIsMenuOpen(false),
		rootRef: formRef,
	});

	// ИЗМЕНЯЕМ СОДЕРЖИМОЕ ФОРМЫ
	const [form, setForm] = useState(defaultArticleState);
	const handleChangeInForm =
		(field: keyof typeof defaultArticleState) => (value: OptionType) => {
			setForm((prev) => ({ ...prev, [field]: value }));
		};

	// СБРАСЫВАЕМ НАСТРОЙКИ ФОРМЫ
	const handleResetForm = (event: React.FocusEvent<HTMLFormElement>) => {
		event.preventDefault();
		setForm(defaultArticleState);
		setSettings(defaultArticleState);
	};

	// ОТПРАВЛЯЕМ ФОРМУ
	const handleSubmitForm = (event: React.FocusEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSettings(form);
		setIsMenuOpen(false);
	};

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => setIsMenuOpen(!isMenuOpen)}
			/>
			<aside
				ref={formRef}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form
					className={styles.form}
					onReset={handleResetForm}
					onSubmit={handleSubmitForm}>
					<Text uppercase={true} as='h1' weight={800} size={31}>
						Задайте параметры
					</Text>
					<Select
						selected={form.fontFamilyOption}
						title='шрифт'
						options={fontFamilyOptions}
						onChange={handleChangeInForm('fontFamilyOption')}></Select>
					<RadioGroup
						selected={form.fontSizeOption}
						title='размер шрифта'
						name='размер шрифта'
						options={fontSizeOptions}
						onChange={handleChangeInForm('fontSizeOption')}></RadioGroup>
					<Select
						selected={form.fontColor}
						title='цвет шрифта'
						options={fontColors}
						onChange={handleChangeInForm('fontColor')}></Select>
					<Separator />
					<Select
						selected={form.backgroundColor}
						title='цвет фона'
						options={backgroundColors}
						onChange={handleChangeInForm('backgroundColor')}></Select>
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
