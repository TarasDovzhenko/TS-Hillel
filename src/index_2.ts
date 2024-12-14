// Roles: student, teacher
// Disciplines: Computer Science, Mathematics, Physics, Biology, Chemistry
// Academic status: active, academic leave, graduated, expelled

class UniversityError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UniversityError";
    }
}

class University {
    name: string;
    courses: object[] = [];
    groups: { course: string }[] = [];
    people: { role: string }[] = [];
    constructor(name: string) {
        this.name = name;
    }

    addCourse(course: object): void {
        this.courses.push(course);
    }

    addGroup(group: { course: string }): void {
        this.groups.push(group);
    }

    addPerson(person: { role: string }): void {
        this.people.push(person);
    }

    findGroupByCourse(course: string) {
        return this.groups.find((group: { course: string }) => group.course === course);
    }

    getAllPeopleByRole(role: string | object): object[] | void {
        switch (role) {
            case "student":
                return this.people.filter((person: { role: string }) => person.role === "student");
            case "teacher":
                return this.people.filter((person: { role: string }) => person.role === "teacher");
            default:
                return this.assertNeverRole(role);
        }
    }

    assertNeverRole(role: string | object) {
        throw new Error(`Unhandled role: ${role}`);
    }
}

class Course {
    name: string;
    credits: string;
    discipline: string;

    constructor(name: string, discipline: string, credits: string) {
        this.name = name;
        this.credits = credits;
        this.discipline = discipline;
    }
}

class Group {
    name: string;
    course: string;
    teacher: string;
    students: any = [];

    constructor(name: string, course: string, teacher: string) {
        this.name = name;
        this.course = course;
        this.teacher = teacher;
    }

    addStudent(student: object): void {
        if (this.students.includes(student)) {
            throw new UniversityError("Student is already in the group");
        }

        this.students.push(student);
    }

    removeStudentById(id: string) {
        const index = this.students.findIndex((student: any) => student.id === id);

        if (!~index) {
            throw new UniversityError("Student not found in group");
        }

        this.students.splice(index, 1);
    }

    getAverageGroupScore() {
        if (this.students.length) {
            return 0;
        }

        const totalScore = this.students.reduce(
            (sum: number, student: any) => sum + student.getAverageScore(),
            0
        );

        return totalScore / this.students.length;
    }

    getStudents() {
        return [...this.students];
    }
}

class Person {
    static nextId = 1;

    firstName:string;
    lastName:string;
    birthDay:any;
    id: number;
    gender:string;
    contactInfo: object;
    role:string;

    constructor(info: any, role: string) {
        const { firstName, lastName, birthDay, gender, email, phone } = info;

        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDay = birthDay;
        this.id = Person.nextId++;
        this.gender = gender;
        this.contactInfo = { email, phone };
        this.role = role;
    }

    get fullName() {
        return `${this.lastName} ${this.firstName}`;
    }

    get age() {
        const today: any = new Date();
        let age: number = today.getFullYear() - this.birthDay.getFullYear();
        const monthDiff: number = today.getMonth() - this.birthDay.getMonth();

        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < this.birthDay.getDate())
        ) {
            age--;
        }

        return age;
    }
}

class Teacher extends Person {
    specializations: object[] = [];
    courses: { name: string }[] = [];

    constructor(info: string, specializations = []) {
        super(info, "teacher");
        this.specializations = specializations;
    }

    assignCourse(course: { name: string }) {
        this.courses.push(course);
    }

    removeCourse(courseName: string) {
        this.courses = this.courses.filter((course) => course.name !== courseName);
    }

    getCourses() {
        return [...this.courses];
    }
}

class Student extends Person {
    academicPerformance = {
        totalCredits: 0,
        gpa: 0,
    };
    enrolledCourses: { name: string; credits: number; }[] = [];
    status: string;

    constructor(info: string) {
        super(info, "student");
        this.status = "active";
    }

    enrollCourse(course: any) {
        if (this.status !== "active") {
            throw new UniversityError(
                "Cannot enroll: Student is not in active status"
            );
        }

        this.enrolledCourses.push(course);
        this.academicPerformance.totalCredits += course.credits;
    }

    getAverageScore() {
        return this.academicPerformance.gpa;
    }

    updateAcademicStatus(newStatus: string) {
        this.status = newStatus;
    }

    getEnrolledCourses() {
        return [...this.enrolledCourses];
    }
}
