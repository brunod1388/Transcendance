import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Index,
    OneToOne,
    JoinTable,
} from "typeorm";
import { Channel } from "./Channel.entity";
import { User } from "../../users/entities/User.entity";