<template>
    <form @submit.prevent>
        <div class="shopform__item"> 
            <h3>Ф.И.О</h3>
            <input
                v-model="userData.user" 
                type="text" 
                placeholder="Фамилия Имя Отчество" 
                required
            >
        </div>
        <div class="shopform__item"> 
            <h3>Адрес</h3>
            <input 
                v-model="userData.addr"
                type="text" 
                placeholder="Город Улица Дом" 
                required
            >
        </div>
        <div class="shopform__item"> 
            <h3>Контакты</h3>
            <input 
                v-model="userData.phone"
                type="tel" 
                placeholder="Тел." 
                required
            >
            <input
                v-model="userData.email" 
                type="email" 
                placeholder="Электронная почта" 
                required
            >
        </div>
        <div class="buy-btn">
            <button @click="prepOrder">Оформить заказ</button>
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            userData: {
                id: null,
                user: '',
                addr: '',
                phone: '',
                email: ''
            }
        }
    },
    methods: {
        prepOrder(){
            this.userData.id = Date.now();
            this.$emit('prepOrder', this.userData);
        }
    }
}
</script>