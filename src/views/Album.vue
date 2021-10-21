<template>
  <div id="album">
    <div>
      <div>
        <nav class="navbar navbar-dark bg-dark">
          <div
            class="d-flex justify-content-between"
            style="width: 100%; margin: 0 200px"
          >
            <div class="text-white" style="line-height: 40px">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-camera"
                viewBox="0 0 16 16"
              >
                <path
                  d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"
                />
                <path
                  d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"
                />
              </svg>
              Album
            </div>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarToggleExternalContent"
              aria-controls="navbarToggleExternalContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>
        </nav>
      </div>
      <div class="mt-5">
        <h1>Album example</h1>
        <p>hahahahahahahahahahaha</p>
        <button type="button" class="btn btn-primary mr-1">Main call to action</button>
        <button type="button" class="btn btn-secondary ml-1">Secondary action</button>
        <div style="margin: 100px 200px 0">
          <div class="row row-cols-1 row-cols-md-3 g-4">
            <div class="col mb-5" v-for="article in articles" :key="article.id">
              <div class="card h-100">
                <img :src="article.cover" class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">{{ article.title }}</h5>
                  <p class="card-text">
                    {{ article.desc }}
                  </p>
                </div>
                <div class="card-footer">
                  <small class="text-muted">{{ article.date }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-between" style="margin: 50px 200px">
        <div>
          <div>hahahahahahahahahahahahahahahaha</div>
          <div>hehehehehehehehehehehehehehehehe</div>
        </div>
        <div>
          <a href="">Back to top</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Album",
  data() {
    return {
      articles: [],
    };
  },
  created() {
    this.getArticles();
  },
  methods: {
    getArticles() {
      this.axios.get("/getArticleList").then((res) => {
        this.articles = res.list;
      });
    },
  },
};
</script>

<style></style>
