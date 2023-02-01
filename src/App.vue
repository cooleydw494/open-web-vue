<template>
  <div class="page">
    <div class="flex-center">
      <img class="logo" :class="{'rotate': submittingQuery}" src="../src/assets/images/logo.jpeg" alt="Open Web Logo">
      <div class="search-container">
        <input v-model="searchValue" :placeholder="placeholder" @keyup.enter="submitQuery" :disabled="submittingQuery" />
      </div>
      <div class="response" v-if="searchResponse && !submittingQuery">
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
      submittingQuery: false,
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
      this.submittingQuery = true
      if (window.location.hostname === 'localhost') {
        await this.sleep(1500)
        this.searchResponse = this.testResponse
        this.submittingQuery = false
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
      this.submittingQuery = false
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

  .flex-center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    place-items: center;
    height: 100%;
    width: 100%;
    max-width: 46rem;
    margin: 0 1rem;

    @media(max-width: 768px) {
      max-width: 100%;
    }


    .logo {
      width: 16rem;
      margin-bottom: 2rem;

      &.rotate {
        animation: pulse 1s ease-in-out infinite;
        @keyframes pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.25;
          }
          100% {
            opacity: 1;
          }
        }
      }
    }

    .search-container {
      width: 100%;

      @media(max-width: 768px) {
        width: 100%;
      }

      input {
        border-radius: .5rem;
        width: 100%;
        height: 2rem;
        padding: .5rem;
        font-size: medium;
      }
    }

    .response {
      margin-top: 1rem;
      border-radius: .5rem;
      width: 100%;
      padding: .5rem;
      font-size: medium;
      font-weight: bold;
      background-color: #42b983;
      color: black;

      @media(max-width: 768px) {
        width: 100%;
      }
    }
  }

  .page {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
}

</style>
