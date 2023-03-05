import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/User.entity";
import {
    Create42UserParams,
    CreateUserParams,
    UpdateUserParams,
    Update42UserParams,
} from "../utils/types";
//import { bigInt } from "big-integer";

@Injectable()
export class UsersService {
    // The argument (with name userRepository) has type Repository (generic type which accepts the entity User)
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}

    // defining the methods below that the users controller will need to invoke
    findAllUsers() {
        // find is asynchronous method (see further details on such methods below)
        return this.userRepository.find();
    }
    findUserByMail(email: string) {
        if (typeof email === "string") {
            return this.userRepository.findOne({
                where: { email: email },
            });
        }

        return undefined;
    }
    // Username is a unique field so can be used to identify user but perhaps should utilise id ??
    findUser(username: string) {
        if (typeof username === "string") {
            return this.userRepository.findOne({
                where: { username: username },
            });
        }

        return undefined;
    }

    findUserId(id: number) {
        //    if (typeof id === "number") {
        return this.userRepository.findOne({
            where: { id: id },
        });
        //    }

        //    return undefined;
    }

    findUserIdFortyTwo(idFT: number) {
        //    if (idFortyTwo !== null) {
        console.log("User Service argument: ", idFT);
        console.log("User Service argument_TYPE: ", typeof idFT);
        //    if (typeof idFT === "number") {
        return this.userRepository.findOne({
            where: { idFortyTwo: idFT },
        });
        //    }

        //    return undefined;
    }

    // The type annotation for userDetails argument is CreateUserParams (custom type defined in utils folder)
    createUser(userDetails: CreateUserParams) {
        // The spreader operator (...) will unpack the username and password property (from CreateUserParams)
        const newUser = this.userRepository.create({
            ...userDetails,
            createdAt: new Date(),
        });

        // Save the user instance to the database
        // save is an asynchronous method so it returns a promise which can be returned and we'll await it
        // from the controller

        return this.userRepository.save(newUser);
    }

    create42User(userDetails: Create42UserParams) {
        const newUser = this.userRepository.create({
            ...userDetails,
            createdAt: new Date(),
        });
        return this.userRepository.save(newUser);
    }

    updateUser(id: number, updateUserDetails: UpdateUserParams) {
        // The update will be performed if the user matches the id that was passed
        // Using the spreader operator here enables only the fields included by the user to be updated
        return this.userRepository.update({ id }, { ...updateUserDetails });
    }

    update42User(id: number, update42UserDetails: Update42UserParams) {
        return this.userRepository.update({ id }, { ...update42UserDetails });
    }

    deleteUser(id: number) {
        return this.userRepository.delete({ id });
    }
}
