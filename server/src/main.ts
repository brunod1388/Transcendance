import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

// By setting whitelist: true, the fields that you don't need will be stripped out
// For example, if a user tries to inject an id into the db (a field which is
// autogenerated and not defined in the dto), it will be stripped out to avoid
// harmful behaviour
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        })
    );
    app.enableCors({
        origin: ["http://localhost:9000"],
        credentials: true,
    });
    //    await app.listen(3333);
    await app.listen(3000);
}
bootstrap();
