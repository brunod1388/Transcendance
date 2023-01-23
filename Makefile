COMPOSE		= docker compose

all:		
		${COMPOSE} up --build
up:
		${COMPOSE} up --build
down:
		${COMPOSE} down
clean:
		${COMPOSE} down --volumes --rmi all --remove-orphans

fclean:		clean
		docker system prune --volumes --all --force

re:		fclean  all

.PHONY:		all up down clean fclean re
