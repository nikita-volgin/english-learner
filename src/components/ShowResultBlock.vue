<template>
    <div>
        {{ dataWithUserTranslation }}
        {{ wordsToTranslate }}
        {{ verifiedData }}
        {{ translationWords}}

        <div class="words">
            <div class="words-to-translate">
                <p v-for="(word, index) in wordsToTranslate" :key="index"></p>
            </div>
            <div class="words-with-user-translate">

            </div>
        </div>
        <div v-for="(value, index) in dataWithUserTranslation" :key="index">
            <div class="words">
                <div class="words-to-translate">
                    <p>{{ wordsToTranslate[index] }}</p>
                </div>
                <div class="words-with-user-tranlastion">
                    <p 
                        :class="{
                            'correct-translate': verifiedData[index].passed,
                            'wrong-translate': !verifiedData[index].passed

                        }"
                    >
                        {{ dataWithUserTranslation[index].translation }}
                    </p>
                </div>
            </div>
        </div>
            
        </div>
</template>

<script>
export default {
    name: 'ShowResultBlock',
    props: {
        wordsToTranslate: Array,
        dataWithUserTranslation: Array,
        verifiedData: Array,
        translationWords: Array,

    }
}
</script>

<style>
    .show-words {
        display: flex;
        gap: 4px;
    }
</style>