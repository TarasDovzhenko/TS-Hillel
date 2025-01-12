// // Academic performance: total credits, gpa
// // Person info: first name, last name, birth day, gender: male, female, other
// // Contact info = ...
// // Full person info = ...;
// enum Role {
//     Student = "student",
//     Teacher = "teacher",
// }
//
// enum Status {
//     Active = "active",
// }
//
// enum Gender {
//     Male = "male",
//     Female = "female",
//     Other = "other",
// }
//
// type StudentType = {
//     id: string | number;
//     name: string;
//     getAverageScore: () => number;
// };
//
// type PersonInfoType = {
//     firstName: string;
//     lastName: string;
//     birthDay: Date;
//     gender: Gender.Male | Gender.Female | Gender.Other;
//     email: string;
//     phone: string;
// };
//
// const defaultContact:{email: string; phone: string } = {
//     email: "info@university.com",
//     phone: "+380955555555",
// };
//
// class UniversityError extends Error {
//     constructor(message: string) {
//         super(message);
//         this.name = "UniversityError";
//     }
// }
//
// class University {
//     name: string;
//     courses: Array<string> = [];
//     groups: { course: string }[] = [];
//     people: { role: string }[] = [];
//
//     constructor(name: string) {
//         this.name = name;
//     }
//
//     addCourse(course: string): void {
//         this.courses.push(course);
//     }
//
//     addGroup(group: { course: string }): void {
//         this.groups.push(group);
//     }
//
//     addPerson(person: { role: string }): void {
//         this.people.push(person);
//     }
//
//     findGroupByCourse(course: string): { course: string } | undefined {
//         return this.groups.find((group: { course: string }) => group.course === course);
//     }
//
//     getAllPeopleByRole(role: string | object): { role: string } | object {
//         switch (role) {
//             case "student":
//                 return this.people.filter((person: { role: string }) => person.role === "student");
//             case "teacher":
//                 return this.people.filter((person: { role: string }) => person.role === "teacher");
//             default:
//                 return this.assertNeverRole(role);
//         }
//     }
//
//     assertNeverRole(role: string | object): never {
//         throw new Error(`Unhandled role: ${role}`);
//     }
// }
//
// class Course {
//     name: string;
//     credits: string;
//     discipline: string;
//
//     constructor(name: string, discipline: string, credits: string) {
//         this.name = name;
//         this.credits = credits;
//         this.discipline = discipline;
//     }
// }
//
// class Group {
//     name: string;
//     course: string;
//     teacher: string;
//     students:  Array<StudentType> = [];
//
//     constructor(name: string, course: string, teacher: string) {
//         this.name = name;
//         this.course = course;
//         this.teacher = teacher;
//     }
//
//     addStudent(student: StudentType): void {
//         if (this.students.includes(student)) {
//             throw new UniversityError("Student is already in the group");
//         }
//
//         this.students.push(student);
//     }
//
//     removeStudentById(id: string | number): void {
//         const index: number = this.students.findIndex((student) => student.id === id);
//
//         if (!~index) {
//             throw new UniversityError("Student not found in group");
//         }
//
//         this.students.splice(index, 1);
//     }
//
//     getAverageGroupScore(): number {
//         if (this.students.length) {
//             return 0;
//         }
//
//         const totalScore: number = this.students.reduce(
//             (sum, student) => sum + student.getAverageScore(),
//             0
//         );
//
//         return totalScore / this.students.length;
//     }
//
//     getStudents(): StudentType[] {
//         return [...this.students];
//     }
//
//     getStudentById(studentsId: string | number | Array<string | number>): StudentType | StudentType[] | null {
//         return Array.isArray(studentsId)
//             ? this.students.filter(student => studentsId.includes(student.id))
//             : this.students.find(student => student.id === studentsId) || null;
//         // Add the ability to pass a single identifier and an array of identifiers
//     }
// }
//
// class Person {
//     static nextId: number = 1;
//
//     firstName: string;
//     lastName: string;
//     birthDay: Date;
//     id: number;
//     gender: string;
//     contactInfo: object;
//     role: Role;
//
//     constructor(info: PersonInfoType, role: Role) {
//         const { firstName, lastName, birthDay, gender, email, phone } = info;
//
//         this.firstName = firstName;
//         this.lastName = lastName;
//         this.birthDay = birthDay;
//         this.id = Person.nextId++;
//         this.gender = gender;
//         this.contactInfo = { email, phone };
//         this.role = role;
//     }
//
//     get fullName(): string {
//         return `${this.lastName} ${this.firstName}`;
//     }
//
//     get age(): number {
//         const today: Date = new Date();
//         let age: number = today.getFullYear() - this.birthDay.getFullYear();
//         const monthDiff: number = today.getMonth() - this.birthDay.getMonth();
//
//         if (
//             monthDiff < 0 ||
//             (monthDiff === 0 && today.getDate() < this.birthDay.getDate())
//         ) {
//             age--;
//         }
//
//         return age;
//     }
// }
//
// class Teacher extends Person {
//     specializations: string[] = [];
//     courses: Array<{ name: string }> = [];
//
//     constructor(info: PersonInfoType, specializations: string[] = []) {
//         super(info, Role.Teacher);
//         this.specializations = specializations;
//     }
//
//     assignCourse(course: { name: string }): void {
//         this.courses.push(course);
//     }
//
//     removeCourse(courseName: string): void {
//         this.courses = this.courses.filter((course) => course.name !== courseName);
//     }
//
//     getCourses(): Array<{ name: string }> {
//         return [...this.courses];
//     }
// }
//
// class Student extends Person {
//     academicPerformance: { totalCredits: number; gpa: number;} = {
//         totalCredits: 0,
//         gpa: 0,
//     };
//     enrolledCourses: Array<{ name: string }> = [];
//     status: string;
//
//     constructor(info: PersonInfoType) {
//         super(info, Role.Student);
//         this.status = Status.Active;
//     }
//
//     enrollCourse(course: { name: string; credits: number }): void {
//         if (this.status !== "active") {
//             throw new UniversityError(
//                 "Cannot enroll: Student is not in active status"
//             );
//         }
//
//         this.enrolledCourses.push(course);
//         this.academicPerformance.totalCredits += course.credits;
//     }
//
//     getAverageScore(): number {
//         return this.academicPerformance.gpa;
//     }
//
//     updateAcademicStatus(newStatus: string): void {
//         this.status = newStatus;
//     }
//
//     getEnrolledCourses(): Array<{ name: string }> {
//         return [...this.enrolledCourses];
//     }
// }
