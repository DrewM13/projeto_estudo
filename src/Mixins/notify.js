
export default {
  methods: {
    errorNotify (msg) {
      setTimeout(() => {
      this.$q.notify({
        message: msg,
        icon:'dangerous',
        color: 'red-6',
        position:'top',
        progress: true,
          })
        })
    },
     successNotify (msg) {
      setTimeout(() => {
      this.$q.notify({
        message: msg,
        icon:'check_circle',
        color: 'green-14',
        position:'top',
        progress: true,
          })
        })
    }
  }
}
