let app = Vue.createApp({
    data() {
        return {
            major: '',
            students: [],
            showTable: false

        }
    },
    methods: {
        async getStudentsByMajor() {
            if (this.major === "") {
              this.showTable = false;
            } else {
              try {
                this.showTable = true;
                let url = '/getStudentsByMajor';
                if (this.major !== "all") {
                  url += '?major=' + this.major;
                } else {
                  url += '?major=all';
                }
                const response = await fetch(url);
                this.students = await response.json();
              } catch (error) {
                console.log(error);
                this.students = [];
                this.showTable = false;
              }
            }
          },
          
        
        
        
        
        
}
}).mount('#main');
