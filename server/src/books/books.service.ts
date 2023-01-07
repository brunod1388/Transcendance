import { Injectable } from "@nestjs/common";
import { Book } from "./book.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateBookDto } from "./dto/create-book.dto";

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private readonly booksRepository: Repository<Book>
    ) {}

    async findByTitle(bookTitle: string): Promise<Book> {
        return await this.booksRepository.findOneBy({ title: `${bookTitle}` });
    }

    async findByAuthor(bookAuthor: string): Promise<Book[]> {
        return await this.booksRepository.findBy({ author: `${bookAuthor}` });
    }

    async findByGenre(bookGenre: string): Promise<Book[]> {
        return await this.booksRepository.findBy({ genre: `${bookGenre}` });
    }

    async findOne(createBookDto: CreateBookDto): Promise<Book> {
        return await this.findByTitle(createBookDto.title);
    }

    async findAll(): Promise<Book[]> {
        return await this.booksRepository.find();
    }

    async create(createBookDto: CreateBookDto) {
        const newBook = this.booksRepository.create(createBookDto);
        return this.booksRepository.save(newBook);
    }
}
