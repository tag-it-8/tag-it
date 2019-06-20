const app = new Vue({
  el: "#app",
  data: {
    tags: [],
  },
  components: {
    'picture-input': PictureInput
  },

  methods : {
    tes() {
      console.log(this.$refs.pictureInput.file)
      console.log(this.tags)

      let newImage = new FormData()
      newImage.append('image', this.$refs.pictureInput.file)
      newImage.append('tags', this.tags)
      console.log(newImage)

      axios({
        url: `http://localhost:3000/image`,
        method: 'post',
        data : newImage, 
        headers : {
          token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMGI3ZGRjNTBkMjBjMzJkMzdkNDA4ZiIsImVtYWlsIjoidm9sQG1haWwuY29tIiwibmFtZSI6IlZvbGRlbW9ydCIsImlhdCI6MTU2MTAzOTM1MH0.GqimOBmQZr8ydnBYzBDuhzxVkKUkK-KXyPtUjAf0bds'
        }
      })
      .then(({data}) => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
    }
  },

  computed : {

  },
  
  created() {
    
  },
})
