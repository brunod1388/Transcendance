import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Book } from './books/book.entity';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
	// Connexion database
	TypeOrmModule.forRoot({
		// type eg: mysql, postgresql, mariadb...
		type: 'postgres',
		// host: nom du container docker
		host: 'postgresql',
		// port de la database
		port: 5432,
		// information de connexion
		username: 'root',
		password: 'root',
		database: 'myDB',
		// entitées nestjs
		entities: [Book],
		// Il faudrais mettre a false avant la fin du projet
		synchronize: true,
		}),
		// Tous les modules utilisés
		BooksModule
	],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
