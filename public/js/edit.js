let app = Vue.createApp({
    data() {
        return {
            allStudents: [],
            student: {
                sid: '',
                first_name: '',
                last_name: '',
                major: '',
                gpa_points: '',
                hrs_attempted: '',
            },
            idx: 0,
            maxIdx: 0,
            status: '',
        };
    },
    created() {
        this.getStudents().then(() => {
            // Set the initial values of the input fields
            this.student = this.allStudents[0];
            this.maxIdx = this.allStudents.length - 1;
        });
    },
    methods: {
        async getStudents() {
            try {
                const response = await fetch('/getStudents');
                const allStudents = await response.json();
                this.allStudents = allStudents;
            } catch (error) {
                console.log(error);
            }
        },
        prevStudent() {
            console.log("prevStudent")
            if (this.idx > 0) {
                this.idx--;
                this.student = this.allStudents[this.idx];
            }
        },
        nextStudent() {
            console.log("nextStudent")
            if (this.idx < this.maxIdx) {
                this.idx++;
                this.student = this.allStudents[this.idx];
            }
        },
        async updateStudentRecord() {
            sid = this.student.sid;
            major = this.student.major;
            gpa = this.student.gpa_points;
            hrs = this.student.hrs_attempted;
            //console.log(major, gpa, hrs);
           
            try {
                const response = await fetch('/updateStudent', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ sid: sid, major: major, gpa_points: gpa, hrs_attempted: hrs }),
                });
                
                if (response.ok) {
                    this.status = 'Student record updated successfully.';
                } else {
                    this.status = 'An error occurred while updating the student record.';
                }

                
            } catch (error) {
                console.log(error);
            }
        },
        async deleteStudentRecord() {
            const sid = this.student.sid;
        
            try {
                const response = await fetch(`/deleteStudent/${sid}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    this.status = 'Student record deleted successfully.';
                } else {
                    this.status = 'An error occurred while deleting the student record.';
                }
        
                // this.status = await response.text();
                this.getStudents().then(() => {
                    this.idx = 0;
                    this.student = this.allStudents[this.idx];
                    this.maxIdx = this.allStudents.length - 1;
                });
            } catch (error) {
                console.log(error);
            }
        },
        
    },
}).mount('#editApp');
