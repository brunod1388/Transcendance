import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../../typeorm/entities/User";
import { CreateUserParams, UpdateUserParams } from "../../../utils/types";

@Injectable()
export class UsersService {
    // The argument (with name userRepository) has type Repository (generic type which accepts the entity User)
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}

    // defining the methods below that the users controller will need to invoke
    findUsers() {
        // find is asynchronous method (see further details on such methods below)
        return this.userRepository.find();
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

    updateUser(id: number, updateUserDetails: UpdateUserParams) {
        // The update will be performed if the user matches the id that was passed
        // Using the spreader operator here enables only the fields included by the user to be updated
        return this.userRepository.update({ id }, { ...updateUserDetails });
    }

    deleteUser(id: number) {
        return this.userRepository.delete({ id });
    }
}
