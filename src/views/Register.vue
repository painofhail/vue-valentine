<template>
	<form class="card auth-card" @submit.prevent="submitHandler">
		<div class="card-content">
			<span class="card-title">Домашняя бухгалтерия</span>

			<div class="input-field">
				<input id="email" type="text" v-model.trim="email" :class="{ invalid: emptyEmail || ifEmail }">
				<label for="email">Email</label>
				<small class="helper-text invalid" v-if="emptyEmail">
					Поле Email не должно быть пустым
				</small>
				<small class="helper-text invalid" v-else-if="ifEmail">
					Введите корректный e-mail
				</small>
			</div>

			<div class="input-field">
				<input id="password" type="password" v-model="password"	:class="{ invalid: emptyPassword || minPassword }">
				<label for="password">Пароль</label>
				<small class="helper-text invalid" v-if="emptyPassword">
					Введите пароль
				</small>
				<small class="helper-text invalid" v-else-if="minPassword">
					Длина пароля не может быть меньше {{passwordLength}} символов
				</small>
			</div>

			<div class="input-field">
				<input id="name" type="text" v-model.trim="name" :class="{ invalid: emptyName }">
				<label for="name">Имя</label>
				<small class="helper-text invalid" v-if="emptyName">
					Введите Ваше имя
				</small>
			</div>

			<p>
				<label>
					<input type="checkbox" v-model="agreeTerms"/>
					<span>С правилами согласен</span>
				</label>
			</p>
		</div>

		<div class="card-action">
			<div>
				<button	class="btn waves-effect waves-light auth-card__btn-sumbit" type="submit">
					<span class="color-white">Зарегистрироваться</span>
					<i class="material-icons right">send</i>
				</button>
			</div>

			<p class="center">
				<span>Уже есть аккаунт?</span>
				<router-link to="/auth"> Войти!</router-link>
			</p>
		</div>
	</form>
</template>

<script>
	import { email, required, minLength } from 'vuelidate/lib/validators';

	export default {
		name: 'Register',
		metaInfo () {
			return {
				title: 'Регистрация'
			}
		},
		data: () => ({
			email: '',
			password: '',
			name: '',
			agreeTerms: false
		}),
		validations: {
			email: { email, required },
			password: { required, minLength: minLength(6) },
			name: { required },
			agreeTerms: { checked: value => value }
		},
		computed: {
			passwordLength () {
				return this.$v.password.$params.minLength.min;
			},
			emptyEmail () {
				return this.$v.email.$dirty && !this.$v.email.required;
			},
			ifEmail () {
				return this.$v.email.$dirty && !this.$v.email.email;
			},
			emptyPassword () {
				return this.$v.password.$dirty && !this.$v.password.required;
			},
			minPassword () {
				return this.$v.password.$dirty && !this.$v.password.minLength;
			},
			emptyName () {
				return this.$v.name.$dirty && !this.$v.name.required;
			}
		},
		methods: {
			async submitHandler () {
				if (this.$v.$invalid) {
					this.$v.$touch()
					return;
				}

				const formData = {
					email: this.email,
					password: this.password,
					name: this.name
				};

				try {
					await this.$store.dispatch('register', formData);
					this.$router.push("/");
				} catch (e) {
					throw (e);
				}
			}
		}
	}

</script>
