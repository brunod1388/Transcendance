import { Controller, Get, Post, Body } from "@nestjs/common";
import { BooksService } from "./books.service";
import { CreateBookDto } from "./dto/create-book.dto";

@Controller("books")
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @Get()
    getAll() {
        return this.booksService.findAll();
    }

    @Post()
    create(@Body() createBookDto: CreateBookDto) {
        return this.booksService.create(createBookDto);
    }
}