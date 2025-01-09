"use strict";
function isUser(entity) {
    return entity.username !== undefined && entity.password !== undefined;
}
function isGuest(entity) {
    return entity.sessionId !== undefined;
}
function isAdmin(entity) {
    return entity.username !== undefined &&
        entity.password !== undefined &&
        entity.role === "admin";
}
function isExternalUser(entity) {
    return entity.oauthToken !== undefined;
}
function login(entity) {
    if (isAdmin(entity)) {
        console.log(`Admin: ${entity.username}`);
    }
    else if (isUser(entity)) {
        console.log(`User: ${entity.username}`);
    }
    else if (isGuest(entity)) {
        console.log(`Guest: ${entity.sessionId}`);
    }
    else if (isExternalUser(entity)) {
        console.log(`ExternalUser: ${entity.oauthToken}`);
    }
    else {
        throw new Error("Error");
    }
}
login({ username: "Taras", password: "12345" });
login({ sessionId: "123" });
login({ username: "Tar", password: "1234", role: "admin" });
login({ oauthToken: "token" });
