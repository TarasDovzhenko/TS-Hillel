"use strict";
// type User = {
//     username: string;
//     password: string;
// };
//
// type Guest = {
//     sessionId: string;
// };
//
// type Admin = {
//     username: string;
//     password: string;
//     role: "admin";
// };
//
// type ExternalUser = {
//     oauthToken: string;
// };
//
// function isUser(entity: any): entity is User {
//     return entity.username !== undefined && entity.password !== undefined;
// }
//
// function isGuest(entity: any): entity is Guest {
//     return entity.sessionId !== undefined;
// }
//
// function isAdmin(entity: any): entity is Admin {
//     return entity.username !== undefined &&
//         entity.password !== undefined &&
//         entity.role === "admin";
// }
//
// function isExternalUser(entity: any): entity is ExternalUser {
//     return entity.oauthToken !== undefined;
// }
//
// function login(entity: User | Guest | Admin | ExternalUser): void {
//     if (isAdmin(entity)) {
//         console.log(`Admin: ${entity.username}`);
//     } else if (isUser(entity)) {
//         console.log(`User: ${entity.username}`);
//     } else if (isGuest(entity)) {
//         console.log(`Guest: ${entity.sessionId}`);
//     } else if (isExternalUser(entity)) {
//         console.log(`ExternalUser: ${entity.oauthToken}`);
//     } else {
//         throw new Error("Error");
//     }
// }
//
// login({ username: "Taras", password: "12345" });
// login({ sessionId: "123" });
// login({ username: "Tar", password: "1234", role: "admin" });
// login({ oauthToken: "token" });
