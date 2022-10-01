<template>
    <div>
        <p>Укажите язык, с которого будете переводить</p>
        <button 
            @click="$emit('clickLng', 'word_variants_en')"
        >
            Английский
        </button>
        <button 
            @click="$emit('clickLng', 'word_variants_ru')"
        >
            Русский
        </button>    
    </div>
</template>

<script>
    export default {
        name: "LanguageSelectionBlock",
    }
</script>

<style scoped>
    
</style>
