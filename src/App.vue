<template>
  <div class="page">
    <div class="flex-center">
      <img class="logo" src="../src/assets/images/logo.jpeg" alt="Open Web Logo">
      <div class="search-container">
        <input v-model="searchValue" :placeholder="placeholder" @keyup.enter="submitQuery" />
      </div>
      <div class="response" v-if="searchResponse">
        <p>{{ searchResponse }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchValue: "",
      searchResponse: "",
      randomPlaceholders: ["Are NFTs dead?",
        "Who is Gary Vee and how is he so good at drawing?",
        "How do you mint an NFT?",
        "How many Discords can a person join before they lose their mind?",
        "Who's active rn?", "What NFT collections does Yuga Labs own?",
          "Are NFTs illegal securities?", "What is 'decentralization'?",
          "How do I create an Algorand wallet?", "How do I create an Ethereum wallet?",
          "Is [x] a scam?",
      ],
      placeholder: "",
      testResponse: "The answer to that probably exists somewhere, but this is a generic test response, when hosted live this will come from the API."
    };
  },
  mounted() {
    this.placeholder = this.randomPlaceholder()
  },
  methods: {
    async submitQuery() {
      if (window.location.hostname === 'localhost') {
        this.searchResponse = this.testResponse
        return
      }
      try {
        const response = await fetch(`api/search?q=${encodeURI(this.searchValue)}`)
        const data = await response.json()
        if (data.success) {
          this.searchResponse = data.answer || 'Could not get answer from API response'
        } else {
          alert('Something went wrong')
        }
      } catch (err) {
        console.error(err)
      }
    },
    randomPlaceholder() {
      const randomIndex = Math.floor(Math.random() * this.randomPlaceholders.length)
      return this.randomPlaceholders[randomIndex]
    }
  }
};
</script>

<style lang="scss" scoped>

#app {

  .page {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .flex-center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    place-items: center;
    height: 100%;

    .logo {
      width: 16rem;
      margin-bottom: 2rem;
    }

    .search-container {
      display: flex;
      width: 42rem;
      justify-content: space-around;
      align-items: center;

      input {
        border-radius: .5rem;
        width: 36rem;
        height: 2rem;
        padding: 0 .5rem;
        font-size: medium;
      }
    }

    .response {
      margin-top: 1rem;
      border-radius: .5rem;
      width: 36rem;
      padding: .5rem;
      font-size: medium;
      font-weight: bold;
      background-color: #42b983;
      color: black;
    }
  }
}

</style>
