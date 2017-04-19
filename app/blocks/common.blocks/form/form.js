'use strict';
import $ from 'jquery';
require('fetch-polyfill');

export default class SendForms {
	/**
	 * @description Класс Голосований и авторизации
	 */

	/**
	 *
	 * @param {strig} block - id формы
	 * @param {strig} elem - css класс
	 * @param {strig} mod - css модификатор класса
	 */
	constructor(elem) {
		this.reload = false;
		this.href = null;
		this.block = null;
		this.env = 'development';
		this.elem = elem;
		this.messages = {
			user_email: `<span class="${elem}__error">Не валидный email</span>`,
			user_name: `<span class="${elem}__error">Не может быть пустым</span>`,
			user_tel: `<span class="${elem}__error">Не керректный номер</span>`,
			successMsg: `<div class="${elem}__success"><p>Спасибо за обращение!</p><p>Ответ будет отправлен  на вашу электронную почту</p> </div>`,
		};
	}

	/**
	 * @description консольные сообщения в режиме разработки
	 * @param {string} info сообщение
	 */
	dabugInfo(info) {
		if (this.env == 'development') {
			console.log(info);
		}
	}

	/**
	 * @description Обработчик открытия/закрытия формы
	 * @param {string} showBtn selector - кнопка открытия
	 * @param {string} hideBtn selector - кнопка закрытия
	 * @return {undefined}
	 */
	showHideForm(showBtn = '__show', hideBtn = '__close') {

		let self = this;
		$(`.${self.elem}${showBtn}`).on('click', function (e) {
			e.preventDefault();
			$('.form__overlay').hide();
			let targetForm = $(`.${$(this).data('target-form')}`);
			self.block = this.getAttribute('data-target-form').slice(5) + 'Form';
			targetForm.find('.form__success').remove();
			targetForm.fadeIn(300, function () {
				targetForm.find('form').fadeIn(300)
			});
		});
		$(`.${self.elem}${hideBtn}`).on('click', function (e) {
			e.preventDefault();
			let targetForm = $(`.${$(this).data('target-form')}`);
			targetForm.find('.form__success').remove();
			targetForm.fadeOut(300, function () {
				targetForm.find('form').fadeOut(100);
				self.block = null;
			});
			self.resetForm();
		});
	}


	/**
	 * @description Очистка формы формы
	 * @param {string} form selector - форма
	 */
	resetForm(form = this.block) {
		document.getElementById(form).reset();
		// $('#formStepFirst').show();
		// $('#formStepSecond').hide();
		$('#' + form).find('.form__title').show();
		$('#' + form).find('.form__body').show();
		$('#' + form + ' .form__error').remove()
		$('#' + form + ' .form__success').remove()

	}


	/**
	 * @description loader
	 * @param {string} elem - селектор
	 * @param {boolean} noelem - тип действия
	 * @param {string} act - тип действия
	 */
	loaderEnable(noelem = false, elem, act) {
		this.dabugInfo('loaderEnable');
		let loader = (noelem) ?
			document.querySelector(`${elem}`) :
			document.querySelector(`${this.elem}${elem}`);
		loader.style.display = (act === 'show') ? 'block' : 'none';
	}


	/**
	 * @description обработчик кликов по кнопкам
	 * @param {string} btn - ID 1 кнопки
	 */
	buttonHandler(btn = '.form__submit') {
		let submitBtns = document.querySelectorAll(`${btn}`);
		if (submitBtns.length === 0) {
			return false;
		} else {
			for (let i = 0; i < submitBtns.length; i++) {
				let currentForm = submitBtns[i].getAttribute('data-form-id');
				submitBtns[i].addEventListener('click', () => this.sendForm(currentForm), false);
			}
		}
	}


	/**
	 * @description получает json результатов авторизации
	 * @form {number}  ID формы
	 */
	sendForm(form = 'callbackForm') {
		// $("#"+form).submit(function(e) {
		// 	e.preventDefault();
		// });
		document.getElementById(form).onsubmit = function() {
			return false;
		};
		console.log(form);
		let formData = new FormData(document.getElementById(form));
		this.loaderEnable(true, '#' + form + ' .form__loader', 'show');
		//formData.append('action', formAction);
		fetch('/forms/index.php', {
			method: 'POST',
			body: formData,
		})
			.then((response) => {
				this.dabugInfo(response);
				if (response.status === 200) {
					return response.json();
				} else {
					alert('Bad request');
				}
			})
			.then((response) => {
				this.dabugInfo(response);
				let status = response.status;
				$('#' + form + ' .form__error').remove();
				if (status === false) {
					let errors = response.errors;
					for (let key in errors) {
						if ({}.hasOwnProperty.call(errors, key)) {
							let $errInput = $(`[name=${key}]`);
							$errInput.after('<span class="form__error">' + errors[key] + '</span>');
						}
					}
				} else {
					$('#' + form + ' .form__error').remove();
					$('#' + form).append('<div class="form__success">' + response.msg + '</div>');
				}
				return status;
			})
			.then((status) => {
				console.log(status);
				setTimeout(() => {
					this.loaderEnable(true, '#' + form + ' .form__loader', 'hide');
					if (status) {
						$('#' + form).find('.form__title').hide();
						$('#' + form).find('.form__body').hide();
						$('#' + form).find('.form__success').show();
					}
				}, 200);

			})
			.catch((e) => {
				console.log(`${e}`);
				//alert(`Некорректный ответ!!! ${e.message}`);
			});
	};


	/**
	 * @description Инициализация
	 */
	init() {
		this.showHideForm();
		this.buttonHandler();
	}

}


