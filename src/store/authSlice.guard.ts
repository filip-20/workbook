/*
 * Generated type guards for "authSlice.ts".
 * WARNING: Do not manually change this file.
 */
import { User } from "./authSlice";

export function isUser(obj: any, _argumentName?: string): obj is User {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.login === "string" &&
        typeof obj.avatarUrl === "string"
    )
}
