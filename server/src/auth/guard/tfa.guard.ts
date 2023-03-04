import { AuthGuard } from "@nestjs/passport";

// This custom guard is a cleaner way of using AuthGuard("jwt") without
// having to put a string ("jwt") as this can create errors
// The super keyword is used to call the constructor of its parent class
// to access the parent's properties and methods
export class tfaGuard extends AuthGuard("jwtTFA") {
    constructor() {
        super();
    }
}