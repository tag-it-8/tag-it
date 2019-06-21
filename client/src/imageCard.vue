<template>
  <div class="container border">
    <!-- Social card -->
    <div class="row d-flex" style="justify-content: center">

      <div v-for="image in images" :key="image._id" class="card news-card col-3 m-2">
          <!-- Heading-->
          <div class="card-body">
            <div class="content">
              <div class="right-side-meta">
              </div>
            </div>
          </div>
          <!-- Card image-->
          <img class="card-img-top" v-bind:src="image.image" alt="Card image cap"> 
          <!-- Card content -->
          <div class="card-body">
            <div class="social-meta">
              <!-- <a href="" @click.prevent="" v-for="tag in image.tags" style="text-decoration: none"><small>#{{tag}} </small></a> -->
            </div>
            <hr>
            <a href="" @click.prevent=""><i class="fa fa-lg fa-thumbs-up"></i></a>
            <span class="ml-2">{{image.voters.length}} likes</span>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  }
}
</script>