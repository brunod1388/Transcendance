COMPOSE		= docker compose

all:		
		${COMPOSE} up
up:
		${COMPOSE} up
down:
		${COMPOSE} down
clean:
		${COMPOSE} down --volumes --rmi all --remove-orphans

fclean:		clean
		docker system prune --volumes --all --force

re:		fclean  all

.PHONY:		all up down clean fclean re
