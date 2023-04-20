let addApp = Vue.createApp({
    data() {
        return {
            student: {
                sid: '',
                first_name: '',
                last_name: '',
                major: '',
                gpa_points: '',
                hrs_attempted: '',
            },
            status: '',
        };
    },
    methods: {
        async addStudentRecord() {
            try {
                const response = await fetch('/addStudentRecord', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.student),
                });
        
                if (response.status === 201) {
                    this.status = 'Student added successfully.';
                    this.resetForm();
                } else if (response.status === 409) {
                    this.status = 'Student ID already exists.';
                } else {
                    this.status = 'Error adding student.';
                }
            } catch (error) {
                console.log(error);
                this.status = 'Error adding student.';
            }
        },
            resetForm() {
            this.student = {
                sid: '',
                first_name: '',
                last_name: '',
                major: '',
                gpa_points: '',
                hrs_attempted: '',
            };
        },
    },
}).mount('#addApp');
