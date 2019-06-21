const url = `http://localhost:3000`;
const picture = PictureInput
const app = new Vue({
  el: "#app",
  data: {
    tags: [],
    show: {
      myImage: false,
      allImage: true,
      islogin: false,
      image: false
    },
    register: {
      name: "",
      email: "",
      password: ""
    },
    login: {
      email: "",
      password: ""
    },
    error: {
      register: "",
      login: "",
      fetch: ""
    },
    images: [],
    userImages: []
  },
  components: {
    "picture-input": PictureInput
  },

  methods: {
    showImage() {
      if (this.show.image == false) {
        this.show.image = true;
      } else if (this.show.image == true) {
        this.show.image = false;
      }
    },
    userRegister() {
      this.error.register = "";
      axios({
        method: "POST",
        url: `${url}/signup`,
        data: {
          name: this.register.name,
          email: this.register.email,
          password: this.register.password
        }
      })
        .then(({ data }) => {
          this.register.name = "";
          this.register.email = "";
          this.register.password = "";
        })
        .catch(error => {
          this.error.register = `Error: ${error.response.data.message}`;
        });
    },
    userLogin() {
      this.errorLogin = "";
      axios({
        method: "POST",
        url: `${url}/signin`,
        data: {
          email: this.login.email,
          password: this.login.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          this.findAll();
          console.log(localStorage);
          this.show.islogin = true;
        })
        .catch(error => {
          this.error.login = `Error: ${error}`;
        });
    },
    logout() {
      localStorage.clear();
      this.show.islogin = false;
    },
    findAll() {
      axios({
        method: "GET",
        url: `${url}/image`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.images = data;
          console.log(data);
        })
        .catch(error => {
          this.error.login = `Error: ${error}`;
        });
    },
    findUserImage() {
      axios({
        method: "GET",
        url: `${url}/image?find=user`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.userImages = data;
          console.log(data);
        })
        .catch(error => {
          this.error.login = `Error: ${error}`;
        });
    },
    tes() {
      console.log(this.$refs.pictureInput)
      console.log(this.$refs.pictureInput.file);
      console.log(this.tags);

      let newImage = new FormData();
      newImage.append("image", this.$refs.pictureInput.file);
      newImage.append("tags", this.tags);
      console.log(newImage);

      axios({
        url: `${url}/image`,
        method: "post",
        data: newImage,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.show.image = false
          this.showAllImage = true
          this.findAll();
    
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    showMyImage() {
      this.show.allImage = false;
      this.show.myImage = true;
      this.show.image = false;
      this.findUserImage()
    },
    showAllImage() {
      this.show.allImage = true;
      this.show.myImage = false;
      this.show.image = false;
      this.findAll();
    }
  },

  computed: {},

  created() {
    if (localStorage.getItem("token")) {
      console.log(this.$refs.pictureInput)
      this.show.islogin = true;
      this.findAll();
    }
  }
});
