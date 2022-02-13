<template>
	<form class="card auth-card" @submit.prevent="submitHandler">
		<div class="card-content">
			<span class="card-title">Введите почту и пароль</span>

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
		</div>

		<div class="card-action">
			<div>
				<button class="btn waves-effect waves-light auth-card__btn-sumbit" type="submit">
					<span class="color-white">Войти</span>
				</button>
			</div>
			<!-- <p class="center">
				<span>Нет аккаунта?</span>
				<router-link to="/register"> Зарегистрироваться</router-link>
			</p> -->
		</div>
	</form>
</template>

<script>
	import { email, required, minLength } from 'vuelidate/lib/validators';
	import messages from '@/utils/messages';

	export default {
		name: 'Auth',
		metaInfo () {
			return {
				title: 'Аутентификация'
			}
		},
		data: () => ({
			email: '',
			password: ''
		}),
		validations: {
			email: { email, required },
			password: { required, minLength: minLength(6) }
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
			}
		},
		mounted () {
			// Logout message
			if (messages[this.$route.query.message]) {
				this.$message(messages[this.$route.query.message]);
			}
		},
		methods: {
			async submitHandler() {
				if (this.$v.$invalid) {
					this.$v.$touch();
					return;
				}

				const formData = {
					email: this.email,
					password: this.password
				};

				try {
					await this.$store.dispatch('login', formData);
					this.$router.push("/");
				} catch (e) {
					throw (e);
				}
			}
		}
	}

</script>
